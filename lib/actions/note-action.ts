// lib/actions/note-actions.ts
"use server";

import {createClient} from "@/lib/supabase/server";
import {AiInput, Note, NoteUpdateInput, Result} from "@/lib/types";
import {getCurrentUser} from "@/lib/auth/getCurrentUser";
import {NoteService} from "@/lib/services/note-service";
import {SupabaseNoteRepository} from "@/lib/repositories/note-repository";
import {NoteUpdateSchema} from "../schemas";


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




export async function generateWordExamplesAction(noteId: string, input: AiInput) {
    return withNoteService(async (service, userId) => {
        return service.generateWordExample(noteId, userId, input)
    });
}

