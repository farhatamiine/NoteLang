"use client";

import Container from "@/components/Container";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {BookOpen, Edit, MoreVertical, Plus, Tag, Trash2, Volume2} from "lucide-react";
import {getDifficultyColor} from "@/lib/utils";
import {useParams, useRouter} from "next/navigation";
import {NoteDetailSkeleton} from "@/components/note/NoteDetailSkeleton";
import {AiInput, Note} from "@/lib/types";
import {useGenerateExample} from "@/lib/features/ai/useAi";
import LanguageExamples from "@/components/note/LanguageExamples";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {useNoteById} from "@/lib/queries/notes";


// Extracted components for better organization
const NoteHeader = ({note, onEdit, onDelete}: { note: Note, onEdit: () => void; onDelete: () => void; }) => (
    <div className="text-center space-y-4">
        <div className="flex justify-end">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        aria-label="More options"
                    >
                        <MoreVertical className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={onEdit}>
                        <Edit className="h-4 w-4 mr-2"/>
                        Edit Note
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={onDelete}
                        className="text-red-600 focus:text-red-600"
                    >
                        <Trash2 className="h-4 w-4 mr-2"/>
                        Delete Note
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

        <div className="space-y-2">
            <h1 className="text-xl font-medium text-foreground capitalize">
                {note.learningText.toUpperCase()}
            </h1>
            <p className="text-lg text-muted-foreground">
                {note.nativeText}
            </p>
        </div>

        <div className="flex items-center justify-center gap-3">
      <span className="font-mono text-lg text-muted-foreground">
        {note.pronunciation}
      </span>
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
);

const NoteBadges = ({note}: { note: Note }) => (
    <div className="flex justify-center gap-2">
        <Badge
            className={`${getDifficultyColor(note.difficulty)} text-sm px-3 py-1`}
        >
            {note.difficulty || "Unknown"}
        </Badge>
        <Badge className="bg-gray-100 border-gray-200 text-gray-800 text-sm px-3 py-1">
            {note.category || "Unknown"}
        </Badge>
    </div>
);

const ExamplesSection = ({note, onGenerate, isGenerating}: {
    note: Note;
    onGenerate: () => void;
    isGenerating: boolean;
}) => (
    <>
        <div className="flex justify-between items-center">
            <h3 className="text-md font-semibold flex items-center gap-2">
                <BookOpen className="h-5 w-5"/>
                Examples ({note.NoteExample?.length || 0})
            </h3>
            <Button
                variant="outline"
                size="sm"
                onClick={onGenerate}
                disabled={isGenerating}
                className="h-9"
            >
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
);

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

    }


    if (isLoading) return <NoteDetailSkeleton/>;
    if (error || !noteResponse) return <ErrorState/>;

    const note = noteResponse;

    return (
        <div className="pb-16">
            <Container>
                <Card className="border-0 shadow-0">
                    <CardContent className="p-3">
                        <NoteHeader note={note}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                        />
                    </CardContent>
                </Card>

                <ExamplesSection
                    note={note}
                    onGenerate={handleGenerate}
                    isGenerating={generateExampleMutation.isPending}
                />

                <TagsSection note={note}/>
            </Container>
        </div>
    );
}
