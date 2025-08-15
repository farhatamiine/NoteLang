"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {BookOpen, Clock, Edit, MoreVertical, Plus, Tag, Trash2, Volume2} from "lucide-react";
import {getDifficultyColor} from "@/lib/utils";
import {useParams, useRouter} from "next/navigation";
import {NoteDetailSkeleton} from "@/components/note/NoteDetailSkeleton";
import {AiInput, Note} from "@/lib/types";
import {useGenerateExample} from "@/lib/features/ai/useAi";
import LanguageExamples from "@/components/note/LanguageExamples";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {useDeleteNote, useNoteById} from "@/lib/queries/notes";
import {NoteExampleCard} from "@/components/note/NoteExampleCard";


// Extracted components for better organization
const NoteHeader = ({note, onEdit, onDelete}: { note: Note; onEdit: () => void; onDelete: () => void }) => (
    <div className="text-center space-y-4">
        <div className="flex justify-end">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" aria-label="More options">
                        <MoreVertical className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={onEdit}>
                        <Edit className="h-4 w-4 mr-2"/>
                        Edit Note
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onDelete} className="text-red-600 focus:text-red-600">
                        <Trash2 className="h-4 w-4 mr-2"/>
                        Delete Note
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

        <div className="space-y-2">
            <h1 className="text-xl font-medium text-foreground capitalize">{note.learningText.toUpperCase()}</h1>
            <p className="text-lg text-muted-foreground">{note.nativeText}</p>
        </div>

        <div className="flex items-center justify-center gap-3">
            <span className="font-mono text-lg text-muted-foreground">{note.pronunciation}</span>
            <Button
                variant="outline"
                size="lg"
                onClick={() => console.log(note.learningText)}
                className="h-12 w-12 rounded-full p-0"
                aria-label="Play pronunciation"
            >
                <Volume2 className="h-5 w-5"/>
            </Button>
        </div>

        <NoteBadges note={note}/>
    </div>
)


const NoteBadges = ({note}: { note: Note }) => (
    <div className="flex justify-center gap-2">
        <Badge
            className={`${getDifficultyColor(note.difficulty)} text-sm px-3 py-1`}>{note.difficulty || "Unknown"}</Badge>
        <Badge
            className="bg-gray-100 border-gray-200 text-gray-800 text-sm px-3 py-1">{note.category || "Unknown"}</Badge>
    </div>
)


const ExamplesSection = ({
                             note,
                             onGenerate,
                             isGenerating,
                         }: {
    note: Note
    onGenerate: () => void
    isGenerating: boolean
}) => (
    <>
        <div className="flex justify-between items-center">
            <h3 className="text-md font-semibold flex items-center gap-2">
                <BookOpen className="h-5 w-5"/>
                Examples ({note.NoteExample?.length || 0})
            </h3>
            <Button variant="outline" size="sm" onClick={onGenerate} disabled={isGenerating}
                    className="h-9 bg-transparent">
                {isGenerating ? (
                    <>
                        <div
                            className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent mr-2"/>
                        Generating...
                    </>
                ) : (
                    <>
                        <Plus className="h-4 w-4 mr-2"/>
                        Generate
                    </>
                )}
            </Button>
        </div>

        {note.NoteExample && note.NoteExample.length > 0 && (
            <LanguageExamples
                examples={{
                    examples: note.NoteExample,
                    meta: {
                        topic: note.category || "General",
                        level: note.difficulty || "beginner",
                        style: "formal",
                        maxWords: 14,
                        model: "database",
                    },
                }}
            />
        )}
    </>
)

const TagsSection = ({note}: { note: Note }) => {
    if (!note.tags || note.tags.length === 0) return null;

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Tag className="h-5 w-5"/>
                    Tags
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {note.tags.map((tag) => (
                        <Badge
                            key={tag}
                            variant="secondary"
                            className="text-sm px-3 py-1"
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

const ErrorState = () => (
    <div className="text-center text-red-500 mt-8">
        Failed to load notes. Please try again.
    </div>
);

export default function NoteDetailPage() {
    const params = useParams<{ noteId: string }>();
    const noteId = params.noteId || "";
    const router = useRouter();

    const {
        data: noteResponse,
        isLoading,
        error,
    } = useNoteById(noteId);


    const deleteNoteMutation = useDeleteNote(noteId);

    const generateExampleMutation = useGenerateExample(
        noteResponse?.id || ""
    );

    const createAiInput = (note: Note): AiInput => ({
        word: {learning: note.learningText},
        nativeLanguage: "French",
        level: note.difficulty || "beginner",
        includeTransliteration: true,
        maxWords: 14,
        requireGenderVariants: false,
    });

    const handleGenerate = () => {
        if (!noteResponse) return;

        const input = createAiInput(noteResponse);
        generateExampleMutation.mutate(input);
    };

    const handleEdit = () => {
        router.push(`/notes/editor/update/${noteId}`)
    }

    const handleDelete = () => {
        deleteNoteMutation.mutate()
    }
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

    if (isLoading) return <NoteDetailSkeleton/>;
    if (error || !noteResponse) return <ErrorState/>;

    const note = noteResponse;




    return (
        <div className="w-full mx-auto py-10 px-5 space-y-6">

            <div className="flex justify-end mb-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-amber-100 text-amber-600 hover:text-amber-700 rounded-full transition-colors duration-200 h-8 w-8 p-0"
                            aria-label="More options"
                        >
                            <MoreVertical className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white border-amber-200">
                        <DropdownMenuItem onClick={handleEdit} className="hover:bg-amber-50">
                            <Edit className="h-4 w-4 mr-2"/>
                            Edit Note
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleDelete}
                                          className="text-red-600 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="h-4 w-4 mr-2"/>
                            Delete Note
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="space-y-4">
                <div className="text-center space-y-3">
                    <h2 className="text-3xl font-bold text-gray-900">{noteResponse.learningText}</h2>
                    <p className="text-xl text-gray-600">{noteResponse.nativeText}</p>
                    {noteResponse.pronunciation && (
                        <div className="flex items-center justify-center gap-2">
                            <Volume2 className="w-5 h-5 text-gray-500"/>
                            <span className="text-gray-500">/{noteResponse.pronunciation}/</span>
                        </div>
                    )}
                </div>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {/* Tags */}
                    {noteResponse.tags?.map((tag, index) => (
                        <span
                            key={index}
                            className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm border border-gray-200"
                        >
      <Tag className="w-3 h-3" />
                            {tag}
    </span>
                    ))}

                    {/* Difficulty */}
                    <span
                        className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(
                            noteResponse.difficulty
                        )}`}
                    >
    {noteResponse.difficulty}
  </span>

                    {/* Category */}
                    <span
                        className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(
                            noteResponse.category || ""
                        )}`}
                    >
    {noteResponse.category}
  </span>
                </div>

                {/* Metadata */}
                <div
                    className="flex items-center justify-center gap-4 text-sm text-gray-500 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4"/>
                        <span>Created: {new Date(noteResponse.createdAt).toLocaleDateString()}</span>
                    </div>
                    <span>•</span>
                    <span>Type: {noteResponse.noteType}</span>
                </div>
            </div>
            <ExamplesSection
                note={note}
                onGenerate={handleGenerate}
                isGenerating={generateExampleMutation.isPending}
            />
        </div>
    )
}
