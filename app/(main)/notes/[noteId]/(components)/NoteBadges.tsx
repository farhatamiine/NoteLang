import {Note} from "@/lib/types";
import {Tag} from "lucide-react";
import {getDifficultyColor} from "@/lib/utils";


const getCategoryColor = (category?: string) => {
    switch (category?.toLowerCase()) {
        case "daily":
            return "bg-blue-100 text-blue-800 border-blue-200"
        case "greeting":
            return "bg-purple-100 text-purple-800 border-purple-200"
        case "conversation":
            return "bg-pink-100 text-pink-800 border-pink-200"
        default:
            return "bg-gray-100 text-gray-800 border-gray-200"
    }
}

export const NoteBadges = ({note}: { note: Note }) => (

    <div className="flex flex-wrap gap-2 justify-center mb-6">
        {note.tags?.map((tag, index) => (
            <span
                key={index}
                className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm border border-gray-200"
            >
                <Tag className="w-3 h-3"/>
                {tag}
            </span>
        ))}

        {/* Difficulty */}
        <span
            className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(
                note.difficulty
            )}`}
        >
            {note.difficulty}
        </span>

        {/* Category */}
        <span
            className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(
                note.category || ""
            )}`}
        >
            {note.category}
        </span>
    </div>
)
