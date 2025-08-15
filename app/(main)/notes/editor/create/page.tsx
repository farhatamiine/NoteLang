'use client'

import {useRouter} from "next/navigation";
import {NoteFormValues} from "@/lib/schemas";
import {NoteFormManager} from "@/components/note/NoteFormManager";
import {useCreateNote} from "@/lib/queries/notes";

function CreateNotePage() {
    const isLoading = false
    const router = useRouter()
    const createNoteMutation = useCreateNote()

    const handleSubmit = async (data: NoteFormValues) => {
        console.log(data)
        createNoteMutation.mutate(data)
    }

    const handleCancel = () => {
        router.back()
    }

    return (
        <NoteFormManager
            mode="create"
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
        />
    )

}

export default CreateNotePage;