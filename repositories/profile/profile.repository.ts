import {createClient} from "@/lib/supabase/client";
import {TABLES} from "@/lib/const";
import {CreateProfileData, Profile, ProfileRow} from "@/lib/types/profile.types";

export class ProfileRepository {
    private supabase = createClient();

    private toDomain(row: ProfileRow | null): Profile | null {
        if (!row) return null;
        return {
            id: row.id,
            username: row.username ?? "",
            full_name: row.full_name ?? "",
            native_language: row.native_language,
            target_language: row.target_language,
            avatar_url: row.avatar_url ?? undefined,
            created_at: row.created_at,
            updated_at: row.updated_at ?? undefined,
        };
    }

    private toPersistence(data: CreateProfileData, userId: string) {
        return {
            id: userId,
            username: data.username.trim().toLowerCase(),
            full_name: data.fullName,
            native_language: data.nativeLanguage,
            target_language: data.targetLanguage,
            avatar_url: data.avatarUrl ?? null,
        };
    }

    async findById(userId: string): Promise<Profile | null> {
        const {data, error} = await this.supabase.from(TABLES.PROFILES)
            .select('*')
            .eq('id', userId)
            .maybeSingle();
        if (error) throw error;
        return this.toDomain(data);
    }

    async findByUsername(username: string): Promise<Profile | null> {
        const {data, error} = await this.supabase.from(TABLES.PROFILES)
            .select('*')
            .eq('username', username)
            .maybeSingle();
        if (error) throw error;

        return this.toDomain(data);
    }

    async create(data: CreateProfileData): Promise<Profile | null> {
        const {
            data: {user},
        } = await this.supabase.auth.getUser();

        if (!user) {
            throw new Error('User not found');
        }

        const insertData = this.toPersistence(data, user.id);
        console.log(insertData)
        const {data: createdProfile, error} = await this.supabase.from(TABLES.PROFILES)
            .insert(
                insertData
            )
            .single();

        if (error) throw new Error(`Failed to create profile: ${error.message}`);
        return this.toDomain(createdProfile);
    }

    async delete(): Promise<void> {
        const {
            data: {user},
        } = await this.supabase.auth.getUser();

        if (!user) {
            throw new Error("User not found");
        }

        const {error} = await this.supabase.from(TABLES.PROFILES)
            .delete()
            .eq('id', user.id)

        if (error) throw error;
    }

    async update(data: Partial<Omit<Profile, "username">>): Promise<void> {
        const {
            data: {user},
        } = await this.supabase.auth.getUser();

        if (!user) {
            throw new Error("User not found");
        }

        const {error} = await this.supabase
            .from(TABLES.PROFILES)
            .update({
                ...data,
                updated_at: new Date().toISOString(),
            })
            .eq("id", user.id)
            .single();

        if (error) throw error;
    }

    async checkUsernameAvailability(username: string): Promise<boolean> {
        const normalized = username.trim().toLowerCase();

        const { data, error } = await this.supabase
            .from(TABLES.PROFILES)
            .select("username")
            .eq("username", normalized)
            .maybeSingle();

        if (error && error.code !== "PGRST116") {
            throw new Error(`Could not check username availability: ${error.message}`);
        }

        // if no row was found, it's available
        return data === null;
    }
}