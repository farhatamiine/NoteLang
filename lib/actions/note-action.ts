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





// Main function with improved type safety and error handling
export async function getNotesAction() {
    return withNoteService(async (service, userId) => {
        return await service.getUserNotes(userId);
    });

}


export async function generateWordExamplesAction(noteId: string, input: AiInput) {
    return withNoteService(async (service, userId) => {
        return service.generateWordExample(noteId, userId, input)
    });
}

export async function updateNoteAction(prevState: NoteState, formData: FormData) {
    return withNoteService(async (service,userId) => {
        const s = (k: string) => {
            const v = formData.get(k);
            return typeof v === "string" ? v : "";
        };
        //Optional
        const sOpt = (k: string) => {
            const v = formData.get(k);
            return typeof v === "string" ? v : null;
        };
        //Number
        const nOpt = (k: string) => {
            const v = formData.get(k);
            if (typeof v !== "string" || v.trim() === "") return undefined;
            const num = Number(v);
            return Number.isFinite(num) ? num : undefined;
        };
        //Iso date
        const isoOpt = (k: string) => {
            const v = formData.get(k);
            if (typeof v !== "string" || v.trim() === "") return null;
            const d = new Date(v);
            return isNaN(+d) ? null : d.toISOString();
        };
        const list = (k: string) =>
            formData
                .getAll(k) // supports multiple inputs named "tags"
                .flatMap(v => typeof v === "string" ? v.split(",") : [])
                .map(t => t.trim())
                .filter(Boolean);
        const difficulty = (() => {
            const v = s("difficulty");
            return v ? (["beginner", "intermediate", "advanced"].includes(v) ? v as NoteUpdateInput["difficulty"] : null) : null;
        })();
        //convert to Object

        const input: NoteUpdateInput = {
            id: s("id"),
            nativeText: formData.has("nativeText") ? s("nativeText") : undefined,
            learningText: formData.has("learningText") ? s("learningText") : undefined,
            pronunciation: formData.has("pronunciation") ? sOpt("pronunciation") : undefined,
            category: formData.has("category") ? sOpt("category") : undefined,
            noteType: formData.has("noteType") ? sOpt("noteType") : undefined,
            difficulty,
            tags: formData.has("tags") ? list("tags") : undefined,
            reviewCount: nOpt("reviewCount"),
            ease: nOpt("ease") ?? null,
            lastReviewedAt: formData.has("lastReviewedAt") ? isoOpt("lastReviewedAt") : undefined,
            nextReviewAt: formData.has("nextReviewAt") ? isoOpt("nextReviewAt") : undefined,
        };

        const parsed = NoteUpdateSchema.safeParse(input);
        if (!parsed.success) return {success: false, error: "Invalid data"};

        return service.updateNote(parsed.data,userId)
    })
}

