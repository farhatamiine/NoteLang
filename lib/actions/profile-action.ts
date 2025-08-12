"use server"


import {createClient} from "@/lib/supabase/server";
import {getCurrentUser} from "@/lib/auth/getCurrentUser";
import {CreateProfileData, Result} from "@/lib/types";
import {ProfileService} from "@/lib/services/profile-service";
import {SupabaseProfileRepository} from "@/lib/repositories/profile-repository";


async function withProfileService<T>(
    action: (service: ProfileService, userId: string) => Promise<Result<T>>
): Promise<Result<T>> {
    try {
        const supabase = await createClient();
        const user = await getCurrentUser();

        if (!user) {
            return {success: false, error: "Not authenticated"};
        }

        const profileRepository = new SupabaseProfileRepository(supabase);
        const profileService = new ProfileService(profileRepository);

        return await action(profileService, user.id);
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        };
    }
}


/**
 * Creates a user profile in the database
 * @param formData - Form data containing user profile information
 * @returns Promise with the result of profile creation
 */
export async function createUserProfile(formData: FormData) {
    return withProfileService(async (service) => {

        const profileData: CreateProfileData = {
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            nativeLanguage: formData.get("nativeLanguage") as string,
            targetLanguage: formData.get("targetLanguage") as string,
        }

        return await service.createProfile(profileData)
    })
}


export async function getUserProfileWithStats() {
    return withProfileService(async (service, userId) => {
        return await service.getProfileStats(userId)
    })
}


export async function signOutUser() {
    return withProfileService(async (service) => {
        return await service.signOutUser()
    })
}

