'use client'

import {Badge} from "../ui/badge";
import {BookOpen, FileText, MessageSquare, Zap} from "lucide-react";
import {Note} from "@/lib/types";
import {useRouter} from "next/navigation";
import Link from "next/link";


const typeIcons = {
    word: BookOpen,
    phrase: MessageSquare,
    sentence: FileText,
    grammar: Zap,
};

const difficultyColors = {
    beginner: "bg-green-100 text-green-800",
    intermediate: "bg-yellow-100 text-yellow-800",
    advanced: "bg-red-100 text-red-800",
};

const typeColors = {
    word: "bg-gradient-to-br from-emerald-400 to-emerald-500",
    phrase: "bg-gradient-to-br from-blue-400 to-blue-500",
    sentence: "bg-gradient-to-br from-purple-400 to-purple-500",
    grammar: "bg-gradient-to-br from-amber-400 to-amber-500",
}

const difficultyConfig = {
    beginner: {
        color: "bg-gradient-to-r from-green-400 to-emerald-500 text-white",
        shadow: "shadow-green-200",
    },
    intermediate: {
        color: "bg-gradient-to-r from-amber-400 to-orange-500 text-white",
        shadow: "shadow-amber-200",
    },
    advanced: {
        color: "bg-gradient-to-r from-red-400 to-pink-500 text-white",
        shadow: "shadow-red-200",
    },
}

function NoteCard({note}: { note: Note }) {
    const navigate = useRouter();
    const Icon = typeIcons[note.noteType as keyof typeof typeIcons] ?? BookOpen
    const iconBg = typeColors[note.noteType as keyof typeof typeColors] ?? typeColors.word
    const difficultyStyle = note.difficulty ? difficultyConfig[note.difficulty] : difficultyConfig.beginner


    return (
        <>
            <Link href={`/notes/${note.id}`} prefetch className="hidden" aria-hidden="true"/>
            <div
                data-testid={`note-${note.id}`}
                key={note.id}
                className={"card-interactive"}
                onClick={() => navigate.push(`/notes/${note.id}`)}
            >
                {/*{note.isCompleted && (*/}
                {/*    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full p-2 shadow-lg">*/}
                {/*        <Trophy className="h-4 w-4 text-white" />*/}
                {/*    </div>*/}
                {/*)}*/}

                <div className="flex items-start gap-4">
                    <div
                        className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-200`}
                    >
                        <Icon className="h-7 w-7 text-white drop-shadow-sm"/>
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-2">
                            <h3 className="font-bold text-lg text-gray-800 truncate font-sans">{note.learningText}</h3>
                            <div className="flex items-center gap-2">
                                {/*{note.xp && (*/}
                                {/*    <div className="flex items-center gap-1 bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-sm">*/}
                                {/*        <Star className="h-3 w-3" />*/}
                                {/*        {note.xp} XP*/}
                                {/*    </div>*/}
                                {/*)}*/}
                                <Badge
                                    variant="outline"
                                    className="text-xs font-semibold capitalize bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                                >
                                    {note.noteType}
                                </Badge>
                            </div>
                        </div>

                        <p className="text-base text-gray-600 mb-3 font-medium leading-relaxed">{note.nativeText}</p>

                        {/*{note.progress !== undefined && (*/}
                        {/*    <div className="mb-3">*/}
                        {/*        <div className="flex items-center justify-between mb-1">*/}
                        {/*            <span className="text-xs font-semibold text-gray-500">Progress</span>*/}
                        {/*            <span className="text-xs font-bold text-amber-600">{note.progress}%</span>*/}
                        {/*        </div>*/}
                        {/*        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">*/}
                        {/*            <div*/}
                        {/*                className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-500 ease-out shadow-sm"*/}
                        {/*                style={{ width: `${note.progress}%` }}*/}
                        {/*            />*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*)}*/}

                        <div className="flex items-center gap-2 flex-wrap">
                            {note.difficulty && (
                                <Badge
                                    className={`text-xs font-bold px-3 py-1 rounded-full border-0 ${difficultyStyle.color} ${difficultyStyle.shadow} shadow-md`}
                                >
                                    {note.difficulty}
                                </Badge>
                            )}
                            {note.tags.map((tag) => (
                                <Badge
                                    key={tag}
                                    className="text-xs font-semibold bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200 hover:from-blue-200 hover:to-indigo-200 transition-colors duration-200 rounded-full px-3 py-1"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NoteCard;
