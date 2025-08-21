import {createClient} from "@/lib/supabase/client";
import {CreateVaultData, Vault, VaultInsert, VaultRow, VaultUpdate} from "@/lib/types/vault.types";
import {TABLES} from "@/lib/const";

export class VaultRepository {
    private supabase = createClient();

    private toDomain(row: VaultRow | null): Vault | null {
        if (!row) return null;

        return {
            id: row.id,
            userId: row.user_id,
            name: row.name,
            nativeLanguage: row.native_language,
            targetLanguage: row.target_language,
            icon: row.icon ?? null,
            color: row.color ?? null,
            created_at: row.created_at,
            updated_at: row.updated_at!,
        };
    }

    private toPersistence(data: CreateVaultData): VaultInsert {
        return {
            user_id: data.userId,
            name: data.name,
            native_language: data.nativeLanguage,
            target_language: data.targetLanguage,
            icon: data.icon ?? null,
            color: data.color ?? null,
        };
    }


    async findByUser(userId: string): Promise<Vault[]> {
        const {data, error} = await this.supabase
            .from(TABLES.VAULTS)
            .select("*")
            .eq("user_id", userId)
            .order("created_at", {ascending: true});

        if (error) throw new Error(error.message);
        return (data as VaultRow[]).map(this.toDomain) as Vault[];
    }

    async findById(id: string): Promise<Vault | null> {
        const {data, error} = await this.supabase
            .from(TABLES.VAULTS)
            .select("*")
            .eq("id", id)
            .maybeSingle();

        if (error) throw new Error(error.message);
        return this.toDomain(data as VaultRow | null);
    }

    async create(data: CreateVaultData): Promise<Vault> {
        const insertData = this.toPersistence(data);

        const {data: inserted, error} = await this.supabase
            .from(TABLES.VAULTS)
            .insert(insertData)
            .select()
            .single();

        if (error) throw new Error(error.message);
        return this.toDomain(inserted as VaultRow)!;
    }

    async update(
        id: string, updates: VaultUpdate
    ): Promise<Vault> {
        const {data, error} = await this.supabase
            .from(TABLES.VAULTS)
            .update(updates)
            .eq("id", id)
            .select()
            .single();

        if (error) throw new Error(error.message);
        return this.toDomain(data as VaultRow)!;
    }

    async delete(id: string): Promise<void> {
        const {error} = await this.supabase
            .from(TABLES.VAULTS)
            .delete()
            .eq("id", id);

        if (error) throw new Error(error.message);
    }
}
