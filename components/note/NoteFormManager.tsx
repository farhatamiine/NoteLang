"use client"

import React from "react"
import {NoteForm} from "./NoteForm"
import {Note} from "@/lib/types"
import {NoteFormValues} from "@/lib/schemas"
import {CardContent} from "@/components/ui/card"

interface NoteFormManagerProps {
    mode: "create" | "update"
    initialData?: Note
    onSubmit: (data: NoteFormValues) => Promise<void> | void
    onCancel: () => void
    isLoading?: boolean
}

export function NoteFormManager({
                                    mode,
                                    initialData,
                                    onSubmit,
                                    onCancel,
                                    isLoading = false
                                }: NoteFormManagerProps) {
    const handleSubmit = async (data: NoteFormValues) => {
        try {
            await onSubmit(data)
        } catch (error) {
            console.error("Error submitting note:", error)
            // You could add toast notification here
        }
    }

    return (
        <div className="flex-1 overflow-y-auto p-2">
            <div className="max-w-3xl mx-auto">
                <div>
                    <CardContent className="p-4">
                        <NoteForm
                            mode={mode}
                            initialData={initialData}
                            onSubmit={handleSubmit}
                            onCancel={onCancel}
                            isLoading={isLoading}
                        />
                    </CardContent>
                </div>
            </div>
        </div>
    )
}