import {create} from "zustand";

import {devtools} from 'zustand/middleware'
import {Vault} from "@/lib/types/vault.types";

type VaultState = {
    selectedVault: Vault | null;
    vaults: Vault[] | null;
    setSelectedVault: (vault: Vault | null) => void;
    setVaults: (vaults: Vault[]) => void;
    resetVaults: () => void
};


export const useVaultStore = create<VaultState>()(devtools(
    (set) => ({
        selectedVault: null,
        vaults: null,
        setSelectedVault: (vault) => set({ selectedVault: vault }),
        setVaults: (vaults) => set({ vaults }),
        resetVaults: () => set({ vaults: null, selectedVault: null }),

    }),
    { name: "VaultStore" }
));