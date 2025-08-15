import {NoteRepository} from "@/lib/repositories/note-repository";
import {AiInput, CreateNoteInput, GeneratedExamplesPayload, Note, Result} from "@/lib/types";
import {NoteUpdate} from "@/lib/schemas";
import {generateUniqueSlug, stripNulls} from "@/lib/utils";
import slugify from "slugify";


export class NoteService {
    constructor(private readonly noteRepository: NoteRepository) {
    }

    async createNote(noteData:CreateNoteInput,userId:string): Promise<Result<Note>> {
        if (!noteData.nativeText || !noteData.learningText) {
            return {success: false, error: 'Native and learning text are required'};
        }
        // Set default values

        const note: CreateNoteInput = {
            ...noteData,
            user_id: userId,
            reviewCount: noteData.reviewCount ?? 0,
            tags: noteData.tags ?? [],
            slug:generateUniqueSlug(noteData.slug),
            ease: noteData.ease ?? 2.5, // default ease factor
        };
        return this.noteRepository.add(note,userId);

    }

    async getUserNotes(userId: string): Promise<Result<Note[]>> {
        return this.noteRepository.getAll(userId);
    }

    async getNoteById(id: string, userId: string): Promise<Result<Note>> {
        return this.noteRepository.getById(id, userId);
    }

    async generateWordExample(noteId: string, userId: string, input: AiInput): Promise<Result<GeneratedExamplesPayload>> {
        return this.noteRepository.generateWordExample(noteId, input, userId);
    }

    async deleteNote(noteId: string, userId: string): Promise<Result<boolean>> {
        return this.noteRepository.delete(noteId, userId);
    }

    async updateNote(noteData: NoteUpdate, userId: string): Promise<Result<Note>> {
        if (!noteData.id) return {success: false, error: "Missing note id"};
        const existing = await this.noteRepository.getById(noteData.id, userId);
        if (!existing.success || !existing.data) {
            return {success: false, error: "Note not found or not yours"};
        }
        const {id, ...raw} = noteData;

        const patch: Partial<Note> = stripNulls({
            ...raw,
            // if difficulty can be null from the form, drop it instead of sending null
            difficulty: raw.difficulty ?? undefined,
            updatedAt: new Date().toISOString(),
        });

        return this.noteRepository.updateNote(id, userId, patch);
    }

}