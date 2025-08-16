import {Note} from "@/lib/types";
import {NoteDetailSkeleton} from "@/components/note/NoteDetailSkeleton";
import {NoteHeader} from "@/app/(main)/notes/[noteId]/(components)/NoteHeader";
import {Button} from "@/components/ui/button";
import LanguageExamples from "@/components/note/LanguageExamples";
import {BookOpen, Plus} from "lucide-react";

export const ExamplesSection = ({
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