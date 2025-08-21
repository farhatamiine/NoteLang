import {ProfileRepository} from "@/repositories/profile/profile.repository";
import {CreateProfileData, Profile} from "@/lib/types/profile.types";

export class ProfileService {
    private profileRepository = new ProfileRepository()

    async createProfile(data: CreateProfileData): Promise<Profile | null> {

        const available = await this.profileRepository.checkUsernameAvailability(data.username);

        if (!available) {
            throw new Error("Username already exists");
        }


        const mapped: CreateProfileData = {
            username: data.username,
            fullName: data.fullName,
            nativeLanguage: data.nativeLanguage,
            targetLanguage: data.targetLanguage,
            avatarUrl: data.avatarUrl,
        };
        return await this.profileRepository.create(mapped);
    }

}