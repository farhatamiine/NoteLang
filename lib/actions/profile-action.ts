"use server"


import {onBoardingFormSchema} from "@/lib/schema";
import {createClient} from "@/lib/supabase/server";

import {SupabaseClient} from '@supabase/supabase-js';
import {getCurrentUser} from "@/lib/auth/getCurrentUser";

/** Represents user profile data structure */
interface UserProfileData {
    firstName: string;
    lastName: string;
    nativeLanguage: string;
    targetLanguage: string;
    noteCount?: number;
}

/** Response type for profile creation */
interface ProfileResponse {
    success?: boolean;
    error?: string;
    data?: UserProfileData;
}

const ERROR_MESSAGES = {
    INVALID_FORM: 'Invalid form data',
    SAVE_FAILED: 'Failed to save onboarding data',
    GENERIC_ERROR: 'Something went wrong. Please try again.'
} as const;

/**
 * Creates a user profile in the database
 * @param formData - Form data containing user profile information
 * @returns Promise with the result of profile creation
 */
export async function createUserProfile(formData: FormData): Promise<ProfileResponse> {
    const supabase = await createClient();

    const profileData: UserProfileData = {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        nativeLanguage: formData.get('nativeLanguage') as string,
        targetLanguage: formData.get('targetLanguage') as string,
    };

    const validationResult = validateProfileData(profileData);
    if (!validationResult.success) {
        return {error: ERROR_MESSAGES.INVALID_FORM};
    }

    return await saveProfileToDatabase(supabase, profileData);
}

function validateProfileData(data: UserProfileData) {
    return onBoardingFormSchema.safeParse(data);
}

async function saveProfileToDatabase(supabase: SupabaseClient, profileData: UserProfileData): Promise<ProfileResponse> {
    try {

        const user = await getCurrentUser();

        if (!user) {
            return {error: "User not authenticated"};
        }


        const {error} = await supabase.from('profiles').insert({
            ...profileData,
            id: user.id,
        });

        if (error) {
            console.log(error)
            return {error: ERROR_MESSAGES.SAVE_FAILED};
        }

        return {success: true};
    } catch (error) {
        console.log(error)
        return {error: ERROR_MESSAGES.GENERIC_ERROR};
    }
}


export async function getUserProfileWithStats(): Promise<ProfileResponse> {
    const supabase = await createClient();
    const user = await getCurrentUser();

    if (!user) {
        return {error: "User not authenticated"};
    }

    const {data: profile, error: profileError} = await supabase.from('profiles').select('*').eq('id', user.id).single()
    if (profileError || !profile) {
        console.log("Error fetching profile:", profileError?.message || "No profile found")
        return {error: ERROR_MESSAGES.GENERIC_ERROR};
    }

    // 3. Count notes
    const {count: noteCount, error: noteError} = await supabase
        .from("Notes")
        .select("*", {count: "exact", head: true}) // head:true avoids returning data
        .eq("user_id", user.id);

    if (noteError) {
        console.error("Error counting notes:", noteError);
        return {error: ERROR_MESSAGES.GENERIC_ERROR};
    }
    // 4. Return extended profile
    return {
        success: true,
        data: {
            ...profile,
            noteCount: noteCount ?? 0,
        }
    };
}


