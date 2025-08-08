import {Note, Result} from "@/lib/types";
import {SupabaseClient} from "@supabase/supabase-js";

interface NoteRepository {
    add(note: Note): Promise<Result<Note>>

    getById(noteId: string): Promise<Result<Note>>

    delete(noteId: string): Promise<Result<Note>>

    getBySlug(slug: string, userId: string): Promise<Result<Note>>;

    getAll(userId: string): Promise<Result<Note[]>>
}


export class SupabaseNoteRepository implements NoteRepository {
    private readonly NOTES_TABLE = "Notes";

    constructor(private readonly db: SupabaseClient) {
    }

    async add(note: Note): Promise<Result<Note>> {
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
            .select("*")
            .eq("user_id", userId)
            .eq("slug", slug)
            .single();

        if (error) {
            return {success: false, error: error.message};
        }

        return {success: true, data};
    }

    async delete(noteId: string): Promise<Result<Note>> {
        const {error} = await this.db
            .from(this.NOTES_TABLE)
            .delete()
            .eq("id", noteId);
        if (error) {
            return {success: false, error: error.message};
        }

        return {success: true};
    }

    async getById(noteId: string): Promise<Result<Note>> {
        const {data, error} = await this.db
            .from(this.NOTES_TABLE)
            .select("*")
            .eq("id", noteId)
            .single();

        if (error) {
            return {success: false, error: error.message};
        }

        return {success: true, data};
    }


}


export type {NoteRepository}