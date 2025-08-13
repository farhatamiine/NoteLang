import {CreateProfileData, Profile, ProfileStats, ProfileWithStats, Result, UpdateProfileData} from "@/lib/types";
import {SupabaseClient} from "@supabase/supabase-js";
import {ERROR_MESSAGES, TABLES} from "@/lib/const";
import {getCurrentUser} from "@/lib/auth/getCurrentUser";
import {onBoardingFormSchema} from "@/lib/schemas";


export interface ProfileRepository {
    /**
     * Creates a new user profile
     * @param profileData - Profile data to create
     * @returns Promise with the created profile
     */
    create(
        profileData: CreateProfileData
    ): Promise<Result<Profile>>;

    /**
     * Gets a user profile by user ID
     * @param userId - The user's unique identifier
     * @returns Promise with the user profile
     */
    getById(userId: string): Promise<Result<Profile>>;

    /**
     * Gets a user profile with statistics
     * @param userId - The user's unique identifier
     * @returns Promise with the user profile including stats
     */
    getWithStats(userId: string): Promise<Result<ProfileWithStats>>;

    /**
     * Updates a user profile
     * @param userId - The user's unique identifier
     * @param profileData - Profile data to update
     * @returns Promise with the updated profile
     */
    update(
        userId: string,
        profileData: UpdateProfileData
    ): Promise<Result<Profile>>;

    /**
     * Deletes a user profile
     * @param userId - The user's unique identifier
     * @returns Promise with the result of deletion
     */
    delete(userId: string): Promise<Result<void>>;

    /**
     * Gets profile statistics only
     * @param userId - The user's unique identifier
     * @returns Promise with profile statistics
     */
    getStats(userId: string): Promise<Result<ProfileStats>>;

    /**
     * Checks if a profile exists for the user
     * @param userId - The user's unique identifier
     * @returns Promise with boolean indicating if profile exists
     */
    exists(userId: string): Promise<Result<boolean>>;

    /**
     * Updates the last active timestamp
     * @param userId - The user's unique identifier
     * @returns Promise with the result of the update
     */
    updateLastActive(userId: string): Promise<Result<void>>;


    /**
     * Updates the last active timestamp
     * @returns Promise with the result of the update
     */
    signOut(): Promise<Result<void>>;
}

export class SupabaseProfileRepository implements ProfileRepository {

    constructor(private readonly db: SupabaseClient) {
    }

    async create(profileData: CreateProfileData): Promise<Result<Profile>> {

        try {
            const user = await getCurrentUser();

            if (!user) return {success: false, error: "User not authenticated"}


            const validationResult = onBoardingFormSchema.safeParse(profileData);

            if (!validationResult.success) {
                return {success: false, error: ERROR_MESSAGES.INVALID_FORM};
            }

            const {data, error} = await this.db.from(TABLES.PROFILE)
                .insert({
                    ...profileData,
                    id: user.id,
                })
                .select()
                .single();

            if (error) {
                return {success: false, error: error.message};
            }

            return {success: true, data};

        } catch (e) {
            console.error("Error creating profile:", e);
            return {success: false, error: ERROR_MESSAGES.GENERIC_ERROR};
        }
    }

    async delete(userId: string): Promise<Result<void>> {

        const {error} = await this.db.from(TABLES.PROFILE)
            .delete()
            .eq("id", userId)

        if (error) {
            return {success: false, error: error.message};
        }

        return {success: true};
    }

    async exists(userId: string): Promise<Result<boolean>> {
        const {data, error} = await this.db.from(TABLES.PROFILE)
            .select("id")
            .eq("id", userId)
            .single();

        if (error) {
            return {success: false, error: error.message};
        }
        return {success: true, data: !!data};
    }

    async getById(userId: string): Promise<Result<Profile>> {
        const {data, error} = await this.db.from(TABLES.PROFILE)
            .select("*")
            .eq("id", userId)
            .single();

        if (error) {
            return {success: false, error: error.message};
        }

        return {success: true, data};

    }

    async getStats(userId: string): Promise<Result<ProfileStats>> {
        // This would typically involve aggregating data from multiple tables
        // For now, returning a basic implementation that you can expand based on your needs
        const {error} = await this.db.from(TABLES.PROFILE)
            .select("*")
            .eq("id", userId)
            .single();

        if (error) {
            return {success: false, error: error.message};
        }

        // You'll need to implement the actual stats calculation based on your ProfileStats type
        // This is a placeholder that assumes ProfileStats has these fields
        const stats: ProfileStats = {
            lastActiveAt: "2 days ago",
            noteCount: 0,
            streakDays: 0,
            totalReviews: 0
        };

        return {success: true, data: stats};

    }

    async getWithStats(userId: string): Promise<Result<ProfileWithStats>> {
        const profileResult = await this.getById(userId);
        if (!profileResult.success || !profileResult.data) {
            return {success: false, error: "Profile not found"};
        }

        const statsResult = await this.getStats(userId);
        if (!statsResult.success || !statsResult.data) {
            return {success: false, error: "Stats not found"};
        }

        const profileWithStats: ProfileWithStats = {
            ...profileResult.data,
            stats: statsResult.data
        };

        return {success: true, data: profileWithStats};


    }

    async update(userId: string, profileData: UpdateProfileData): Promise<Result<Profile>> {
        const {data, error} = await this.db.from(TABLES.PROFILE)
            .update(profileData)
            .eq("id", userId)
            .select()
            .single();

        if (error) {
            return {success: false, error: error.message};
        }

        return {success: true, data};

    }

    async updateLastActive(userId: string): Promise<Result<void>> {
        const {error} = await this.db.from(TABLES.PROFILE)
            .update({lastActiveAt: new Date().toISOString()})
            .eq("id", userId);

        if (error) {
            return {success: false, error: error.message};
        }

        return {success: true};

    }

    async signOut(): Promise<Result<void>> {
        const {error} = await this.db.auth.signOut();
        if (error) {
            return {success: false, error: error.message};
        }
        return {success: true};
    }

}
