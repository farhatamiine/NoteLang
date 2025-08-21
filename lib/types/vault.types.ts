import { Database } from "@/lib/types/database.types";

// Raw row from Supabase (snake_case)
export type VaultRow = Database["public"]["Tables"]["vaults"]["Row"];

// For creating via Supabase insert (snake_case)
export type VaultInsert = {
    user_id: string;
    name: string;
    native_language: string;
    target_language: string;
    icon: string | null;
    color: string | null;
};

// App-facing shape (camelCase)
export type Vault = {
    id: string;
    userId: string;
    name: string;
    nativeLanguage: string;
    targetLanguage: string;
    icon: string | null;
    color: string | null;
    created_at: string;
    updated_at: string;
};

// Used when creating a vault in the app (camelCase)
export type CreateVaultData = {
    userId: string;
    name: string;
    nativeLanguage: string;
    targetLanguage: string;
    icon: string | null;
    color: string | null;
};

// For updating fields (snake_case, optional)
export type VaultUpdate = Partial<{
    name: string;
    native_language: string;
    target_language: string;
    icon: string | null;
    color: string | null;
}>;
