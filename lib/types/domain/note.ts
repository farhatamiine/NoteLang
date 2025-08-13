import { NoteExample } from "@/lib/types";

export interface Note {
    id: string;
    nativeText: string;
    learningText: string;
    pronunciation: string | null;
    noteType: string | null;
    reviewCount: number;
    category: string | null;
    lastReviewedAt: string | null;
    nextReviewAt: string | null;
    ease: number | null;
    tags: string[];
    difficulty?: "beginner" | "intermediate" | "advanced";
    createdAt: string;
    updatedAt?: string;
    slug: string;
    user_id: string;
    NoteExample?: NoteExample[];
}
