'use client'

import Container from "@/components/Container";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {BookOpen, Plus, Tag, Volume2} from "lucide-react";
import {getDifficultyColor} from "@/lib/utils";
import {useParams} from "next/navigation";
import {useNoteBySlug} from "@/lib/features/note/useNotes";
import {NoteDetailSkeleton} from "@/components/note/NoteDetailSkeleton";
import {Note} from "@/lib/types";

export default function NoteDetailPage() {

    const params = useParams<{ slug: string; }>()

    const {data: noteResponse, isLoading, error} = useNoteBySlug(params.slug || "");
    const isGeneratingExample = false;

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
                    onClick={() => console.log("Generate Example")}
                    disabled={false}
                    className="h-9"
                >
                    {isGeneratingExample ? (
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
                <Card>

                    <CardContent className="space-y-4">
                        {note.NoteExample.map((example) => (
                            <div key={example.id} className="space-y-3 p-4 bg-muted/30 rounded-lg">
                                <div className="space-y-2">
                                    <p className="font-medium text-base">{example.native}</p>
                                    <p className="text-muted-foreground">{example.learning}</p>
                                </div>

                                {example.pronunciation && (
                                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm text-muted-foreground">
                        {example.pronunciation}
                      </span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => console.log(example.learning)}
                                            className="h-8 w-8 p-0"
                                        >
                                            <Volume2 className="h-4 w-4"/>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>
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
