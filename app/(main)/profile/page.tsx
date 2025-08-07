'use client'


import {useGetProfileWithStats} from "@/lib/features/profile/useProfile";
import {Separator} from "@/components/ui/separator";
import {Edit, LogOut, Settings, Trash2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {ThemeSwitcher} from "@/components/theme-switcher";
import ProfileHeader from "@/components/profile/ProfileHeader";
import LanguageInfo from "@/components/profile/LanguageInfo";
import StatsCard from "@/components/profile/StatsCard";
import ProfileSkeleton from "@/components/profile/ProfileSkeleton";

export default function ProfilePage() {

    const {data: profile, isLoading, isError} = useGetProfileWithStats()


    if (isLoading) return <ProfileSkeleton/>;
    if (isError) return <div>Error loading profile</div>;

    return (
        <div className="p-4">
            <div className="mx-auto max-w-md space-y-6">
                {/* Profile Header */}
                <ProfileHeader firstName={profile?.data?.firstName} lastName={profile?.data?.lastName}/>

                <Separator className="border-gray-200"/>

                {/* Language Info */}
                <LanguageInfo targetLanguage={profile?.data?.targetLanguage}
                              nativeLanguage={profile?.data?.nativeLanguage}/>

                {/* Stats Cards */}
                <StatsCard noteCount={profile?.data?.noteCount}/>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                        <Edit className="w-4 h-4 mr-2"/>
                        Edit Profile
                    </Button>
                    <Button variant="outline" className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50">
                        <LogOut className="w-4 h-4 mr-2"/>
                        Logout
                    </Button>
                </div>

                <Separator className="border-gray-200"/>

                {/* Settings Section */}
                <div className="border border-gray-200">
                    <div className="border-b border-gray-200 p-4">
                        <h3 className="flex items-center text-base font-medium text-black">
                            <Settings className="w-4 h-4 mr-2"/>
                            Settings
                        </h3>
                    </div>
                    <div className="p-4 space-y-4">
                        {/* Dark Mode Toggle */}
                        <div className="flex items-center justify-between">
                            <span className="text-gray-800">Dark mode:</span>

                            <ThemeSwitcher/>
                        </div>

                        <Separator className="border-gray-200"/>

                        {/* Delete Account */}
                        <Button variant="ghost" className="w-full justify-start text-red-700 hover:bg-gray-50 p-0">
                            <Trash2 className="w-4 h-4 mr-2"/>
                            Delete My Account
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
