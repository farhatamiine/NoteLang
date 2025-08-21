import {Database} from "@/lib/types/database.types";

export type Profile = {
    id: string,
    username: string,
    full_name: string,
    native_language: string,
    target_language: string,
    avatar_url?: string,
    created_at: string;
    updated_at?: string;
}

export type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

export type CreateProfileData = {
    username: string,
    fullName: string,
    nativeLanguage: string,
    targetLanguage: string,
    avatarUrl?: string,
}