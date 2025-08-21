// src/service/vault/vault.service.ts

import {CreateVaultData, Vault, VaultUpdate} from "@/lib/types/vault.types";
import {z} from "zod";
import {VaultRepository} from "@/repositories/vault/vault.repository";

// Full schema for creation
const createVaultSchema = z.object({
    userId: z.string(),
    name: z.string().min(2).max(50),
    nativeLanguage: z.string().min(2).max(50),
    targetLanguage: z.string().min(2).max(50),
    icon: z.string().nullable().default(null),
    color: z.string().nullable().default(null),
});


// Partial schema for updates
const updateVaultSchema = createVaultSchema.omit({userId: true}).partial();

export class VaultService {
    private repo: VaultRepository;

    constructor() {
        this.repo = new VaultRepository();
    }

    async getVaultsForUser(userId: string): Promise<Vault[]> {
        if (!userId) throw new Error("User ID is required");
        return this.repo.findByUser(userId);
    }

    async getVaultById(id: string): Promise<Vault | null> {
        if (!id) throw new Error("Vault ID is required");
        return this.repo.findById(id);
    }

    async createVault(data: CreateVaultData): Promise<Vault> {
        const parsed = createVaultSchema.safeParse(data);
        if (!parsed.success) throw new Error(parsed.error.message);
        return this.repo.create(parsed.data);
    }

    async updateVault(id: string, updates: VaultUpdate): Promise<Vault> {
        if (!id) throw new Error("Vault ID is required");

        const parsed = updateVaultSchema.safeParse(updates);
        if (!parsed.success) throw new Error(parsed.error.message);

        return this.repo.update(id, parsed.data);
    }

    async deleteVault(id: string): Promise<void> {
        if (!id) throw new Error("Vault ID is required");
        return this.repo.delete(id);
    }
}
