import {NoteRepository} from "@/lib/repositories/note-repository";
import {Note, Result} from "@/lib/types";

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

    async getNoteBySlug(slug: string, userId: string): Promise<Result<Note>> {
        return this.noteRepository.getBySlug(slug, userId);
    }

}