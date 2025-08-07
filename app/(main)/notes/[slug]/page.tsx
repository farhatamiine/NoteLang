'use client'

import Container from "@/components/Container";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {BookOpen, Tag, TrendingUp, Volume2} from "lucide-react";
import {getDifficultyColor} from "@/lib/utils";
import {useParams} from "next/navigation";
import {useNoteBySlug} from "@/lib/features/note/useNotes";
import {NoteDetailSkeleton} from "@/components/note/NoteDetailSkeleton";
import {Note} from "@/lib/types";
import {Progress} from "@/components/ui/progress";

export default function NoteDetailPage() {

    const params = useParams<{ slug: string; }>()

    const {data: noteResponse, isLoading, isError} = useNoteBySlug(params.slug || "");

    if (isLoading) return <NoteDetailSkeleton/>;
    if (isError || !noteResponse) {
        return (
            <div className="text-center text-red-500 mt-8">
                Failed to load notes. Please try again.
            </div>
        );
    }

    const note = noteResponse?.data as Note;

    const getEaseProgress = (ease: number | null) => {
        if (!ease) return 0
        return Math.min((ease / 4) * 100, 100)
    }

    return (
        <Container>
            <Card className="border-0 shadow-md">
                <CardContent className="p-3">
                    <div className="text-center space-y-4">
                        <div className="space-y-2">
                            <h1 className="text-xl font-bold text-foreground">{note.nativeText}</h1>
                            <p className="text-lg text-muted-foreground">{note.learningText}</p>
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
                        <div className="flex justify-center">
                            <Badge className={`${getDifficultyColor(note.difficulty)} text-sm px-3 py-1`}>
                                {note.difficulty || "Unknown"}
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="grid grid-cols-3 gap-3">
                <Card className="text-center">
                    <CardContent className="p-4 space-y-3">
                        <div className="text-2xl font-bold">{note.reviewCount}</div>
                        <div className="text-xs text-muted-foreground">Reviews</div>
                    </CardContent>
                </Card>
                <Card className="text-center">
                    <CardContent className="p-4 space-y-3">
                        <div className="text-2xl font-bold">{note.ease?.toFixed(1) || "0"}</div>
                        <div className="text-xs text-muted-foreground">Ease</div>
                    </CardContent>
                </Card>
                <Card className="text-center">
                    <CardContent className="p-4 space-y-3">
                        <div className="text-xl font-meduim">{note.category}</div>
                        <div className="text-xs text-muted-foreground">Category</div>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <TrendingUp className="h-5 w-5"/>
                        Learning Progress
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Ease Factor</span>
                            <span className="font-medium">{note.ease?.toFixed(1) || "N/A"}</span>
                        </div>
                        <Progress value={getEaseProgress(note.ease)} className="h-3"/>
                    </div>
                </CardContent>
            </Card>
            {/* Examples */}
            {note.NoteExample && note.NoteExample.length > 0 && (
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <BookOpen className="h-5 w-5"/>
                            Examples ({note.NoteExample.length})
                        </CardTitle>
                    </CardHeader>
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
            </Card>
        </Container>
    );
}
