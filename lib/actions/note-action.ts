// lib/actions/note-actions.ts
"use server";

import {createClient} from "@/lib/supabase/server";

export async function addNoteAction(prevState: any, formData: FormData) {
    const supabase = await createClient()

    const nativeText = formData.get("native_text") as string;
    const learningText = formData.get("learning_text") as string;

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    const { error } = await supabase.from("Notes").insert({
        nativeText,
        learningText,
        user_id: user.id,
    });

    return { success: !error, error: error?.message };
}
