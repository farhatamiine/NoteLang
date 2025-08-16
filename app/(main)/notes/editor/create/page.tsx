'use client'

import {useRouter} from "next/navigation";
import {NoteFormValues} from "@/lib/schemas";
import {NoteFormManager} from "@/components/note/NoteFormManager";
import {useCreateNote} from "@/lib/queries/notes";

function CreateNotePage() {
    const router = useRouter()
    const createNoteMutation = useCreateNote()

    const handleSubmit = async (data: NoteFormValues) => {
        createNoteMutation.mutate(data,{
            onSuccess: () => {
                router.push("/"); // or wherever you want to redirect
            },
            onError: (error) => {
                console.error("Error creating note:", error);
            },
        })
    }

    const handleCancel = () => {
        router.back()
    }

    return (
        <NoteFormManager
            mode="create"
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={createNoteMutation.isPending}
        />
    )

}

export default CreateNotePage;