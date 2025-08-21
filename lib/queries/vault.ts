import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {VaultService} from "@/service/vault/vault.service";
import {CreateVaultData} from "@/lib/types/vault.types";

const vaultService = new VaultService();


export const useCreateVault = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["createVault"],
        mutationFn: (data: CreateVaultData) => vaultService.createVault(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["vault"]})
        },
        onError: (error) => {
            toast.error(error instanceof Error ? error.message : 'Failed to create vault');
        }
    })
}


export const useGetVaultById = (vaultId: string) => {
    return useQuery({
        queryKey: ["vault", vaultId],
        queryFn: () => {
            if (!vaultId) throw new Error("No vaultId provided");
            return vaultService.getVaultById(vaultId)
        },
        enabled: !!vaultId,
    })
}

export const useGetVaultByUserId = (userId: string) => {
    return useQuery({
        queryKey: ["vault", userId],
        queryFn: () => {
            if (!userId) throw new Error("No vaultId provided");
            return vaultService.getVaultsForUser(userId)
        },
        enabled: !!userId,
    })
}