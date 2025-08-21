import {ProfileService} from "@/service/profile/profile.service";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {CreateProfileData} from "@/lib/types/profile.types";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

const profileService = new ProfileService();


export const useCreateProfile = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["createProfile"],
        mutationFn: (data: CreateProfileData) => profileService.createProfile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["profile"]})
            router.push("/vault")
        },
        onError: (error) => {
            toast.error(error instanceof Error ? error.message : 'Failed to create profile');

        }
    })
}


export const useGetProfileById = (userId: string) => {
    return useQuery({
        queryKey: ["profile", userId],
        queryFn: () => {
            if (!userId) throw new Error("No userId provided");
            return profileService.getProfileById(userId)
        },
        enabled: !!userId,
    })
}