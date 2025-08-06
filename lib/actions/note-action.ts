// lib/actions/note-actions.ts
"use server";

import {createClient} from "@/lib/supabase/server";
import {Note} from "@/lib/types";

export async function addNoteAction(prevState: any, formData: FormData) {
    const supabase = await createClient()

    const nativeText = formData.get("native_text") as string;
    const learningText = formData.get("learning_text") as string;

    const {
        data: {user},
    } = await supabase.auth.getUser();

    if (!user) return {error: "Not authenticated"};

    const {error} = await supabase.from("Notes").insert({
        nativeText,
        learningText,
        user_id: user.id,
    });

    return {success: !error, error: error?.message};
}

// Custom types for better type safety and reusability
export type NotesResponse = {
    success: boolean;
    data?: Note[];
    error?: string;
};

type SupabaseError = {
    message: string;
};

// Database table name constant
const NOTES_TABLE = "Notes" as const;

// Main function with improved type safety and error handling
export async function getNotesAction(): Promise<NotesResponse> {
    try {
        const supabase = await createClient();
        const {data: {user}} = await supabase.auth.getUser();

        if (!user) {
            return handleError("User authentication required");
        }

        const {data, error} = await supabase
            .from(NOTES_TABLE)
            .select("*")
            .eq("user_id", user.id);

        if (error) {
            return handleError(error.message);
        }

        return {
            success: true,
            data: data as Note[]
        };

    } catch (error) {
        return handleError(
            error instanceof Error ? error.message : "An unexpected error occurred"
        );
    }
}

// Helper function for consistent error handling
function handleError(message: string): NotesResponse {
    return {
        success: false,
        error: message
    };
}
