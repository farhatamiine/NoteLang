'use client'

import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {queryKeys} from "@/lib/queries/queryKeys";
import * as api from "@/lib/api/notes";
import {useRouter} from "next/navigation";
import {ROUTES} from "@/lib/const";
import {AiInput} from "@/lib/types";


const STALE_TIME = 1000 * 60 * 5; // 5 minutes


export function useNotes() {
    return useQuery({
        queryKey: queryKeys.notes,
        queryFn: api.getNotes,
        staleTime: STALE_TIME,
    });
}

export function useNoteById(id: string) {
    return useQuery({
        queryKey: queryKeys.note(id),
        queryFn: () => api.getNoteById(id),
        enabled: !!id,
        staleTime: STALE_TIME,
    });
}

export function useCreateNote() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: api.createNote,
        onSuccess: () => {
            qc.invalidateQueries({queryKey: queryKeys.notes});
        },
    });
}

export function useUpdateNote() {
    const qc = useQueryClient();
    const router = useRouter();
    return useMutation({
        mutationFn: api.updateNote,
        onSuccess: (note) => {
            qc.invalidateQueries({queryKey: queryKeys.notes});
            qc.invalidateQueries({queryKey: queryKeys.note(note.id)});
            router.back()
        },
    });
}

export function useDeleteNote(noteId: string) {
    const qc = useQueryClient();
    const router = useRouter();
    return useMutation({
        mutationFn: () => api.deleteNote(noteId),
        onSuccess: () => {
            qc.invalidateQueries({queryKey: queryKeys.notes});
            qc.invalidateQueries({queryKey: queryKeys.note(noteId)});
            router.push(ROUTES.HOME)
        },
    });
}


export function useGenerateWordExample(noteId: string, input: AiInput) {
    const qc = useQueryClient();
    const router = useRouter();
    return useMutation({
        mutationFn: () => api.generateWordExample(noteId, input),
        onSuccess: () => {
            qc.invalidateQueries({queryKey: queryKeys.notes});
            qc.invalidateQueries({queryKey: queryKeys.note(noteId)});
        }
    })
}