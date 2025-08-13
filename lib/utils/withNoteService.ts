'use server'

import {NoteService} from "@/lib/services/note-service";
import {createClient} from "@/lib/supabase/server";
import {getCurrentUser} from "@/lib/auth/getCurrentUser";
import {SupabaseNoteRepository} from "@/lib/repositories/note-repository";

export async function withNoteService<T>(
    action: (service: NoteService, userId: string) => Promise<T>
): Promise<T | Response> {
    const supabase = await createClient();
    const user = await getCurrentUser();

    if (!user) {
        return new Response(JSON.stringify({error: "Not authenticated"}), {
            status: 401,
        });
    }

    const noteRepository = new SupabaseNoteRepository(supabase);
    const noteService = new NoteService(noteRepository);

    return action(noteService, user.id);
}