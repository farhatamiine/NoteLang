'use client'

import {useRouter} from "next/navigation";
import {NoteFormValues} from "@/lib/schemas";
import {NoteFormManager} from "@/components/note/NoteFormManager";

// interface CreateNotePageProps {
//
// }
//

function CreateNotePage() {
    const isLoading = false
    const router = useRouter()

    const handleSubmit = async (data: NoteFormValues) => {
        console.log(data)
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