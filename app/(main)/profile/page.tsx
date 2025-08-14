'use client'


import {useGetProfileWithStats, useSignOut} from "@/lib/features/profile/useProfile";
import {Separator} from "@/components/ui/separator";
import {Edit, LogOut, Settings, Trash2} from "lucide-react";
import {Button} from "@/components/ui/button";
import ProfileHeader from "@/components/profile/ProfileHeader";
import LanguageInfo from "@/components/profile/LanguageInfo";
import ProfileSkeleton from "@/components/profile/ProfileSkeleton";

export default function ProfilePage() {

    const {data, isLoading, isError} = useGetProfileWithStats()
    const mutation = useSignOut();


    const handleSignOut = async () => {
        try {
            mutation.mutate()
        } catch (e) {
            console.log(e)
        }
    }


    if (isLoading) return <ProfileSkeleton/>;
    if (isError) return <div>Error loading profile</div>;

    return (
        <div className="p-4 h-full overflow-y-auto">
            {/*<div className="mx-auto max-w-md space-y-6">*/}
            {/*    /!* Profile Header *!/*/}
            {/*    <ProfileHeader firstName={profile} lastName={data.lastName}/>*/}

            {/*    <Separator className="border-gray-200"/>*/}

            {/*    /!* Language Info *!/*/}
            {/*    <LanguageInfo targetLanguage={profile?.targetLanguage}*/}
            {/*                  nativeLanguage={profile?.nativeLanguage}/>*/}

            {/*    /!*//*!/*/}
            {/*    /!*<StatsCard noteCount={profile?.noteCount}/>*!/*/}

            {/*    /!* Action Buttons *!/*/}
            {/*    <div className="flex gap-3">*/}
            {/*        <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">*/}
            {/*            <Edit className="w-4 h-4 mr-2"/>*/}
            {/*            Edit Profile*/}
            {/*        </Button>*/}
            {/*        <Button onClick={handleSignOut} variant="outline"*/}
            {/*                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50">*/}
            {/*            <LogOut className="w-4 h-4 mr-2"/>*/}
            {/*            Logout*/}
            {/*        </Button>*/}
            {/*    </div>*/}

            {/*    <Separator className="border-gray-200"/>*/}

            {/*    /!* Settings Section *!/*/}
            {/*    <div className="border border-gray-200">*/}
            {/*        <div className="border-b border-gray-200 p-4">*/}
            {/*            <h3 className="flex items-center text-base font-medium text-black">*/}
            {/*                <Settings className="w-4 h-4 mr-2"/>*/}
            {/*                Settings*/}
            {/*            </h3>*/}
            {/*        </div>*/}
            {/*        <div className="py-4 space-y-4">*/}
            {/*            /!*//*!/*/}
            {/*            /!*<div className="flex items-center justify-between">*!/*/}
            {/*            /!*    <span className="text-gray-800">Dark mode:</span>*!/*/}

            {/*            /!*    <ThemeSwitcher/>*!/*/}
            {/*            /!*</div>*!/*/}


            {/*            /!* Delete Account *!/*/}
            {/*            <Button variant="ghost" className="w-full justify-start text-red-700 hover:bg-gray-50 p-0">*/}
            {/*                <Trash2 className="w-4 h-4 mr-2"/>*/}
            {/*                Delete My Account*/}
            {/*            </Button>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            SOON
        </div>
    );
}
