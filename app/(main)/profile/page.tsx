'use client'


import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useGetProfileWithStats} from "@/lib/features/profile/useProfile";
import {Separator} from "@/components/ui/separator";
import {Edit, FileText, LogOut, Settings, Trash2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {ThemeSwitcher} from "@/components/theme-switcher";

export default function ProfilePage() {

    const {data: profile, isLoading, isError} = useGetProfileWithStats()

    return (
        <div className="p-4">
            <div className="mx-auto max-w-md space-y-6">
                {/* Profile Header */}
                <div className="text-center space-y-4 pt-6">
                    <Avatar className="w-16 h-16 mx-auto border border-gray-200">
                        <AvatarImage
                            src={`https://ui-avatars.com/api/?name=${profile?.data?.firstName}+${profile?.data?.lastName}`}
                            alt="Amine"/>
                        <AvatarFallback className="text-lg font-medium bg-gray-100 text-gray-800">
                            A
                        </AvatarFallback>
                    </Avatar>

                    <div>
                        <h1 className="text-xl font-semibold dark:text-white text-black">{profile?.data?.firstName} {profile?.data?.lastName}</h1>
                    </div>
                </div>

                <Separator className="border-gray-200"/>

                {/* Language Info */}
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Native Language:</span>
                        <span className="text-black font-medium">{profile?.data?.nativeLanguage.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Target Language:</span>
                        <span className="text-black font-medium">{profile?.data?.targetLanguage.toUpperCase()}</span>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="space-y-3">
                    <div className="border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <FileText className="w-4 h-4 text-gray-600"/>
                                <span className="text-gray-800">Notes Created:</span>
                            </div>
                            <span className="text-lg font-semibold text-black">{profile?.data?.noteCount}</span>
                        </div>
                    </div>
                </div>

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
