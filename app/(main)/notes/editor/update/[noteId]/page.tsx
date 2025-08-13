"use client"

import {useParams, useRouter} from "next/navigation"
import {NoteFormValues} from "@/lib/schemas"
import {NoteFormManager} from "@/components/note/NoteFormManager";
import {useNoteById, useUpdateNote} from "@/lib/queries/notes";

export default function UpdateNotePage() {


    const router = useRouter()
    const params = useParams<{ noteId: string }>()
    const noteId = params.noteId
    const {data, isLoading, error} = useNoteById(noteId)
    const updateNote = useUpdateNote();


    const handleCancel = () => {
        router.back()
    }

    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading note...</p>
                </div>
            </div>
        )
    }

    // Error state
    if (error || !data) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error?.message || "Note not found"}</p>
                    <button
                        onClick={() => router.back()}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        )
    }
    const handleSubmit = async (noteToUpdate: NoteFormValues) => {
        updateNote.mutate({
            id: data?.id,
            ...noteToUpdate,
        })
    }
    return (
        <NoteFormManager
            mode="update"
            initialData={data}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
        />
    )
}