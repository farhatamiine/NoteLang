import {ProfileRepository} from "@/lib/repositories/profile-repository";
import {CreateProfileData} from "@/lib/types";

export class ProfileService {
    constructor(private readonly profileRepository: ProfileRepository) {
    }

    async deleteProfile(userId: string) {
        return await this.profileRepository.delete(userId);
    }

    async createProfile(profileData: CreateProfileData) {
        return await this.profileRepository.create(profileData);
    }

    async updateProfile(userId: string, profileData: CreateProfileData) {
        return await this.profileRepository.update(userId, profileData);
    }

    async getProfileStats(userId: string) {
        return await this.profileRepository.getWithStats(userId);
    }

    async signOutUser() {
        return await this.profileRepository.signOut();
    }

}