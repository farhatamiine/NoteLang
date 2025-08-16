"use client";

import {useParams, useRouter} from "next/navigation";
import {NoteDetailSkeleton} from "@/components/note/NoteDetailSkeleton";
import {useDeleteNote, useGenerateWordExample, useNoteById} from "@/lib/queries/notes";
import {NoteHeader} from "@/app/(main)/notes/[noteId]/(components)/NoteHeader";
import {ExamplesSection} from "@/app/(main)/notes/[noteId]/(components)/ExamplesSection";
import {useAuthStore} from "@/lib/stores/useAuthStore";
import {AiInput} from "@/lib/types";



const ErrorState = () => (
    <div className="text-center text-red-500 mt-8">
        Failed to load notes. Please try again.
    </div>
);

export default function NoteDetailPage() {
    const params = useParams<{ noteId: string }>();
    const noteId = params.noteId || "";
    const router = useRouter();
    const {profile, loading, signOut} = useAuthStore();

    const {
        data: note,
        isLoading,
        error,
    } = useNoteById(noteId);


    const deleteNoteMutation = useDeleteNote(noteId);


    const createAiInput = (): AiInput => ({
        nativeLanguage: profile?.nativeLanguage || "English",
        targetLanguage: profile?.targetLanguage || "English",
    });

    const generateExampleMutation = useGenerateWordExample(
        note?.id || "",
        createAiInput()
    );


    const handleGenerate = () => {
        if (!note) return;
        generateExampleMutation.mutate();
    };

    const handleEdit = () => {
        router.push(`/notes/editor/update/${noteId}`)
    }

    const handleDelete = () => {
        deleteNoteMutation.mutate()
    }


    if (isLoading) return <NoteDetailSkeleton/>;
    if (error || !note) return <ErrorState/>;


    return (
        <div className="w-full mx-auto py-10 px-5 space-y-6">
            <NoteHeader note={note} onEdit={handleEdit} onDelete={handleDelete}/>
            <ExamplesSection
                note={note}
                onGenerate={handleGenerate}
                isGenerating={generateExampleMutation.isPending}
            />
        </div>
    )
}
