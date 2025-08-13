import {NoteRepository} from "@/lib/repositories/note-repository";
import {AiInput, GeneratedExamplesPayload, Note, Result} from "@/lib/types";
import {NoteUpdate} from "@/lib/schemas";
import {stripNulls} from "@/lib/utils";


export class NoteService {
    constructor(private readonly noteRepository: NoteRepository) {
    }

    async createNote(noteData: Omit<Note, 'id' | 'created_at'>): Promise<Result<Note>> {
        if (!noteData.nativeText || !noteData.learningText) {
            return {success: false, error: 'Native and learning text are required'};
        }
        // Set default values
        const note: Note = {
            ...noteData,
            id: crypto.randomUUID(), // or however you generate IDs
            reviewCount: noteData.reviewCount ?? 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            tags: noteData.tags ?? [],
            ease: noteData.ease ?? 2.5, // default ease factor
        };
        return this.noteRepository.add(note);

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