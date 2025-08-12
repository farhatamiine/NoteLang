'use client'

import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createUserProfile, getUserProfileWithStats, signOutUser} from "@/lib/actions/profile-action";
import {useRouter} from "next/navigation";

export const useSaveProfile = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createUserProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["profile"]});
            router.push("/");
        },
        onError: (error) => {
            console.error("Error saving profile:", error);
        },
    });
};


export const useGetProfileWithStats = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: getUserProfileWithStats,
    })
}


export const useSignOut = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => {
            return signOutUser()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["profile"]});
            router.push("/auth/login");
        }
    })
}