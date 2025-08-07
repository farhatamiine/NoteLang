import React from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";


interface ProfileHeaderProps {
    firstName?: string;
    lastName?: string;
}


const ProfileHeader = ({firstName, lastName}: ProfileHeaderProps) => {
    return (
        <div className="text-center space-y-4 pt-6">
            <Avatar className="w-16 h-16 mx-auto border border-gray-200">
                <AvatarImage
                    src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}`}
                    alt="Amine"/>
                <AvatarFallback className="text-lg font-medium bg-gray-100 text-gray-800">
                    {firstName} ${lastName}
                </AvatarFallback>
            </Avatar>

            <div>
                <h1 className="text-xl font-semibold dark:text-white text-black">{firstName} {lastName}</h1>
            </div>
        </div>
    );
};

export default ProfileHeader;