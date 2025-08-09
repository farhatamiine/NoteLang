'use client'

import Container from "@/components/Container";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {BookOpen, Plus, Tag, Volume2} from "lucide-react";
import {getDifficultyColor, ok} from "@/lib/utils";
import {useParams} from "next/navigation";
import {useNoteBySlug} from "@/lib/features/note/useNotes";
import {NoteDetailSkeleton} from "@/components/note/NoteDetailSkeleton";
import {AiInput, Note} from "@/lib/types";
import {useGenerateExample} from "@/lib/features/useAi";
import LanguageExamples from "@/components/note/LanguageExamples";

export default function NoteDetailPage() {

    const params = useParams<{ slug: string; }>()

    const {data: noteResponse, isLoading, error} = useNoteBySlug(params.slug || "");
    const generateExampleMutation = useGenerateExample(noteResponse?.data?.id || "");



    const handleGenerate = () => {
        if (!noteResponse?.data) return;

        const input: AiInput = {
            word: { learning: noteResponse.data.learningText },
            nativeLanguage: "French",
            level: noteResponse.data.difficulty || "beginner",
            includeTransliteration: true,
            maxWords: 14,
            requireGenderVariants: false,
        };

        generateExampleMutation.mutate(input);
    };

    if (isLoading) return <NoteDetailSkeleton/>;
    if (error || !noteResponse) {
        return (
            <div className="text-center text-red-500 mt-8">
                Failed to load notes. Please try again.
            </div>
        );
    }

    const note = noteResponse?.data as Note;

    return (
        <Container>
            <Card className="border-0 shadow-md">
                <CardContent className="p-3">
                    <div className="text-center space-y-4">
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
                            >
                                <Volume2 className="h-5 w-5"/>
                            </Button>
                        </div>
                        <div className="flex justify-center gap-2">
                            <Badge className={`${getDifficultyColor(note.difficulty)} text-sm px-3 py-1`}>
                                {note.difficulty || "Unknown"}
                            </Badge>
                            <Badge className={`bg-gray-100 border-gray-200 text-gray-800 text-sm px-3 py-1`}>
                                {note.category || "Unknown"}
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>
            {/* Examples */}
            {/* Generate Example Button */}
            <div className="flex justify-between items-center">
                <h3 className="text-md font-semibold flex items-center gap-2">
                    <BookOpen className="h-5 w-5"/>
                    Examples ({note.NoteExample?.length || 0})
                </h3>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGenerate}
                    disabled={generateExampleMutation.isPending}
                    className="h-9"
                >
                    {generateExampleMutation.isPending ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent mr-2" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Plus className="h-4 w-4 mr-2" />
                            Generate
                        </>
                    )}
                </Button>
            </div>
            {ok(generateExampleMutation.data) && (
                <LanguageExamples examples={generateExampleMutation.data.data} />
            )}
            {/* Tags */}
            {note.NoteExample && note.NoteExample.length > 0 && (
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
                                <Badge key={tag} variant="secondary" className="text-sm px-3 py-1">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>)
            }
        </Container>
    );
}
