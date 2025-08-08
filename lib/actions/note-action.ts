// lib/actions/note-actions.ts
"use server";

import {createClient} from "@/lib/supabase/server";
import {Note, Result} from "@/lib/types";
import {getCurrentUser} from "@/lib/auth/getCurrentUser";
import {NoteService} from "@/lib/services/note-service";
import {SupabaseNoteRepository} from "@/lib/repositories/note-repository";


type NoteState = {
    notes: Note[];
    loading: boolean;
    error: Error | null;
};

export type NotesResponse = {
    success?: boolean;
    data?: Note[] | Note;
    error?: string;
};



async function withNoteService<T>(
    action: (service: NoteService, userId: string) => Promise<Result<T>>
): Promise<Result<T>> {
    try {
        const supabase = await createClient();
        const user = await getCurrentUser();

        if (!user) {
            return {success: false, error: "Not authenticated"};
        }

        const noteRepository = new SupabaseNoteRepository(supabase);
        const noteService = new NoteService(noteRepository);

        return await action(noteService, user.id);
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        };
    }
}


export async function addNoteAction(prevState: NoteState, formData: FormData) {
    return withNoteService(async (service, userId) => {
        const note: Omit<Note, 'id' | 'created_at'> = {
            nativeText: formData.get("native_text") as string,
            learningText: formData.get("learning_text") as string,
            user_id: userId,
            pronunciation: "",
            noteType: formData.get("noteType") as string,
            reviewCount: 0,
            category: formData.get("category") as string,
            lastReviewedAt: null,
            nextReviewAt: null,
            ease: null,
            tags: formData.getAll("tags") as string[],
            createdAt: "",
            updatedAt: "",
            slug: ""
        };

        return await service.createNote(note);
    });
}


export async function getNoteBySlugAction(slug: string) {
    return withNoteService(async (service, userId) => {
        return await service.getNoteBySlug(slug, userId);
    });

}

// Main function with improved type safety and error handling
export async function getNotesAction() {
    return withNoteService(async (service, userId) => {
        return await service.getUserNotes(userId);
    });

}


