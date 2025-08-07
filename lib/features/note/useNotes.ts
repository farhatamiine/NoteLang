'use client'
import {useQuery} from "@tanstack/react-query";
import {getNoteBySlugAction, getNotesAction, NotesResponse} from "@/lib/actions/note-action";

export const useNotes = () => {
    return useQuery<NotesResponse>({
        queryKey: ["notes"],
        queryFn: getNotesAction,
        staleTime: 1000 * 60 * 5,
    });
};


export const useNoteBySlug = (slug: string) => {
    return useQuery<NotesResponse>({
        queryKey: ["note-slug", slug],
        queryFn:  () => getNoteBySlugAction(slug),
        staleTime: 1000 * 60 * 5,
    });
};