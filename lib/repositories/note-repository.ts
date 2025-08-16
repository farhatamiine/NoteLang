import {AiInput, CreateNoteInput, GeneratedExamplesPayload, Note, Result} from "@/lib/types";
import {SupabaseClient} from "@supabase/supabase-js";
import {generateWordExamples} from "@/lib/ai/generateWordExample";
import {createHash} from "node:crypto";

import {defaultModel} from "../ai";
import {toDomainNote} from "@/lib/mappers/note";

interface NoteRepository {
    add(note: CreateNoteInput,userId:string): Promise<Result<Note>>;

    getById(noteId: string, userId: string): Promise<Result<Note>>;

    delete(noteId: string, userId: string): Promise<Result<boolean>>;

    getBySlug(slug: string, userId: string): Promise<Result<Note>>;

    updateNote(id: string, userId: string, payload: Partial<Note>): Promise<Result<Note>>;

    getAll(userId: string): Promise<Result<Note[]>>;

    generateWordExample(
        noteId: string,
        input: AiInput,
        userId: string
    ): Promise<Result<GeneratedExamplesPayload>>;
}

export class SupabaseNoteRepository implements NoteRepository {
    private readonly NOTES_TABLE = "Notes";
    private readonly EXAMPLE_SETS = "example_sets";
    private readonly NOTE_EXAMPLE = "NoteExample";

    constructor(private readonly db: SupabaseClient) {
    }


    private hash(input: unknown) {
        return createHash("sha256")
            .update(JSON.stringify(input))
            .digest("hex");
    }

    async add(note: Note,userId:string): Promise<Result<Note>> {
        const {data, error} = await this.db
            .from(this.NOTES_TABLE)
            .insert(note)
            .select()
            .single();

        if (error) {
            return {success: false, error: error.message};
        }

        return {success: true, data};
    }

    async updateNote(id: string, userId: string, payload: Partial<Note>): Promise<Result<Note>> {
        const {data, error} = await this.db
            .from(this.NOTES_TABLE)
            .update(payload)
            .eq("id", id)
            .eq("user_id", userId)
            .select()
            .single();
        if (error) return {success: false, error: error.message};
        return {success: true, data};
    }


    async getAll(userId: string): Promise<Result<Note[]>> {
        const {data, error} = await this.db
            .from(this.NOTES_TABLE)
            .select("*")
            .eq("user_id", userId);

        if (error) {
            return {success: false, error: error.message};
        }

        return {success: true, data};
    }

    async getBySlug(slug: string, userId: string): Promise<Result<Note>> {
        const {data, error} = await this.db
            .from(this.NOTES_TABLE)
            .select("*, NoteExample(*)")
            .eq("user_id", userId)
            .eq("slug", slug)
            .single();

        if (error) {
            return {success: false, error: error.message};
        }

        return {success: true, data};
    }

    async delete(noteId: string, userId: string): Promise<Result<boolean>> {
        const {error} = await this.db
            .from(this.NOTES_TABLE)
            .delete()
            .eq('user_id', userId)
            .eq("id", noteId)
        if (error) {
            return {success: false, error: error.message};
        }

        return {success: true,};
    }

    async getById(noteId: string, userId: string): Promise<Result<Note>> {
        const {data, error} = await this.db
            .from(this.NOTES_TABLE)
            .select("*,NoteExample(*)")
            .eq("id", noteId)
            .eq("user_id", userId)
            .single();

        if (error) {
            return {success: false, error: error.message};
        }

        return {success: true, data};
    }

    async generateWordExample(
        noteId: string,
        input: AiInput,
        userId: string
    ): Promise<Result<GeneratedExamplesPayload>> {
        const {data: noteRow, error: noteErr} = await this.db
            .from(this.NOTES_TABLE)
            .select("id,nativeText,learningText,user_id")
            .eq("id", noteId)
            .single();
        if (noteErr || !noteRow || noteRow.user_id !== userId) {
            return {success: false, error: "Note not found or not yours."};
        }

        console.log(noteRow)
        // 2) Normalize + hash
        const normalized = {
            noteId,
            word: input.word, // { learning, latin?, pos? }
            nativeLanguage: input.nativeLanguage,
            targetLanguage: input.targetLanguage,
            topic: input.topic ?? null,
            level: input.level,
            style: input.style ?? null,
            includeTransliteration: !!input.includeTransliteration,
            maxWords: input.maxWords ?? 14,
            requireGenderVariants: !!input.requireGenderVariants,
        };
        const inputHash = this.hash(normalized);

        // 3) Cache (30 days)
        const FRESH_MS = 30 * 24 * 60 * 60 * 1000;
        const {data: cached} = await this.db
            .from(this.EXAMPLE_SETS)
            .select("id, output_json, created_at")
            .eq("note_id", noteId)
            .eq("input_hash", inputHash)
            .order("created_at", {ascending: false})
            .limit(1)
            .maybeSingle();

        if (
            cached &&
            Date.now() - new Date(cached.created_at).getTime() < FRESH_MS
        ) {
            return {
                success: true,
                data: cached.output_json as GeneratedExamplesPayload,
            };
        }
        const output = await generateWordExamples(normalized,toDomainNote(noteRow));
        if (!output?.examples?.length)
            return {success: false, error: "AI returned no examples."};

        // 5) Save set
        const {data: setRow, error: setErr} = await this.db
            .from(this.EXAMPLE_SETS)
            .insert({
                note_id: noteId,
                user_id: userId,
                input_hash: inputHash,
                input_json: normalized,
                output_json: output,
                model_id: defaultModel,
            })
            .select("id")
            .single();
        if (setErr || !setRow)
            return {
                success: false,
                error: setErr?.message ?? "Failed to save example set.",
            };

        // 6) Save flattened rows
        const rows = output.examples.map((ex) => ({
            setId: setRow.id,
            noteId,
            native: ex.native,
            learning: ex.learning,
            pronunciation: ex.pronunciation ?? null,
            difficulty: ex.difficulty,
            explanation: ex.explanation ?? "",
            tokens: ex.tokens ?? [],
            morphology: ex.morphology ?? null,
        }));
        const {error: exErr} = await this.db.from(this.NOTE_EXAMPLE).insert(rows);
        if (exErr) return {success: false, error: exErr.message};

        return {success: true, data: output};
    }
}

export type {NoteRepository};
