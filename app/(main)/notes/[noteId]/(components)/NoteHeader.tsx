// Extracted components for better organization
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Clock, Edit, MoreVertical, Trash2, Volume2} from "lucide-react";
import {NoteBadges} from "@/app/(main)/notes/[noteId]/(components)/NoteBadges";
import {Note} from "@/lib/types";

export const NoteHeader = ({note, onEdit, onDelete}: { note: Note; onEdit: () => void; onDelete: () => void }) => (
    <>
        <div className="flex justify-end mb-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-amber-100 text-amber-600 hover:text-amber-700 rounded-full transition-colors duration-200 h-8 w-8 p-0"
                        aria-label="More options"
                    >
                        <MoreVertical className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white border-amber-200">
                    <DropdownMenuItem onClick={onEdit} className="hover:bg-amber-50">
                        <Edit className="h-4 w-4 mr-2"/>
                        Edit Note
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onDelete}
                                      className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="h-4 w-4 mr-2"/>
                        Delete Note
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <div className="space-y-4">
            <div className="text-center space-y-3">
                <h2 className="text-3xl font-bold text-gray-900">{note.learningText}</h2>
                <p className="text-xl text-gray-600">{note.nativeText}</p>
                {note.pronunciation && (
                    <div className="flex items-center justify-center gap-2">
                        <Volume2 className="w-5 h-5 text-gray-500"/>
                        <span className="text-gray-500">/{note.pronunciation}/</span>
                    </div>
                )}
            </div>
            <NoteBadges note={note}/>

            {/* Metadata */}
            <div
                className="flex items-center justify-center gap-4 text-sm text-gray-500 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4"/>
                    <span>Created: {new Date(note.createdAt).toLocaleDateString()}</span>
                </div>
                <span>•</span>
                <span>Type: {note.noteType}</span>
            </div>
        </div>
    </>

)
