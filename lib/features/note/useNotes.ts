'use client'
import {useQuery} from "@tanstack/react-query";
import {getNoteBySlugAction, getNotesAction} from "@/lib/actions/note-action";
import {Note, Result} from "@/lib/types";


const STALE_TIME = 1000 * 60 * 5; // 5 minutes

interface NoteQueries {
    useNotes: () => {
        data?: Result<Note[]>;
        isLoading: boolean;
        error: Error | null;
    };
    useNoteBySlug: (slug: string) => {
        data?: Result<Note>;
        isLoading: boolean;
        error: Error | null;
    };
}


export const noteQueries: NoteQueries = {
    useNotes: () => {
        return useQuery({
            queryKey: ['notes'],
            queryFn: getNotesAction,
            staleTime: STALE_TIME,
        });
    },

    useNoteBySlug: (slug: string) => {
        return useQuery({
            queryKey: ['note', slug],
            queryFn: () => getNoteBySlugAction(slug),
            staleTime: STALE_TIME,
            enabled: !!slug,
        });
    },
};

// Optional: Export individual hooks if you prefer
export const {useNotes, useNoteBySlug} = noteQueries;
