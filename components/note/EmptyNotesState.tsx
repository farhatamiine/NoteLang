"use client"

import {Button} from "@/components/ui/button"
import {CardContent} from "@/components/ui/card"
import {FileText, Lightbulb, PlusCircle} from "lucide-react"

interface EmptyNotesStateProps {
    onCreateNote: () => void
}


export function EmptyNotesState({onCreateNote}: EmptyNotesStateProps) {
    return (
        <div className="flex-1 flex items-center justify-center p-6">
            <div className="w-full max-w-md text-center">
                <CardContent className="pt-8 pb-6">
                    <div className="mb-6">
                        <div className="relative mx-auto w-24 h-24 mb-4">
                            <div
                                className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                                <FileText className="w-10 h-10 "/>
                            </div>
                            <div className="absolute -top-1 -right-1 bg-yellow-100 rounded-full p-1">
                                <Lightbulb className="w-4 h-4 text-yellow-600"/>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Welcome to Your Notes!</h2>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                        You don&apos;t have any notes yet. Start capturing your thoughts, ideas, and important
                        information by
                        creating
                        your first note.
                    </p>

                    <Button
                        onClick={onCreateNote}
                        size="lg"
                        className="w-full  text-white font-medium"
                    >
                        <PlusCircle className="w-5 h-5 mr-2"/>
                        Create Your First Note
                    </Button>

                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-500">
                            💡 Tip: You can access your notes offline once you start creating them
                        </p>
                    </div>
                </CardContent>
            </div>
        </div>
    )
}