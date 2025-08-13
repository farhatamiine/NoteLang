// lib/api/notes.ts
import type { Note } from "@/lib/types";
import {NoteUpdate} from "@/lib/schemas";

export async function getNotes(): Promise<Note[]> {
    const res = await fetch("/api/notes");
    if (!res.ok) throw new Error("Failed to fetch notes");
    return res.json();
}

export async function getNoteById(id: string): Promise<Note> {
    const res = await fetch(`/api/notes/${id}`);
    if (!res.ok) throw new Error("Failed to fetch note");
    return res.json();
}

export async function createNote(payload: Partial<Note>): Promise<Note> {
    const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to create note");
    return res.json();
}

export async function updateNote(payload: NoteUpdate): Promise<Note> {
    const res = await fetch(`/api/notes/${payload.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to update note");
    return res.json();
}

export async function deleteNote(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`/api/notes/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete note");
    return res.json();
}
