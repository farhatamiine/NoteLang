import React from 'react';

interface LanguageInfoProps {
    nativeLanguage?: string;
    targetLanguage?: string;
}


const LanguageInfo = ({targetLanguage, nativeLanguage}: LanguageInfoProps) => {
    return (
        <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
                <span className="text-gray-600">Native Language:</span>
                <span className="text-black font-medium">{nativeLanguage?.toUpperCase()}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-gray-600">Target Language:</span>
                <span className="text-black font-medium">{targetLanguage?.toUpperCase()}</span>
            </div>
        </div>
    );
};

export default LanguageInfo;