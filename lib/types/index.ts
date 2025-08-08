interface Note {
    id: string;
    nativeText: string;
    learningText: string;
    pronunciation: string;
    noteType: string;
    reviewCount: number;
    category: string;
    lastReviewedAt: string | null;
    nextReviewAt: string | null;
    ease: number | null;
    tags: string[];
    difficulty?: "beginner" | "intermediate" | "advanced";
    createdAt: string;
    updatedAt: string;
    slug: string;
    user_id: string;
    NoteExample?: NoteExample[];
}

interface NoteExample {
    id: string;
    noteId: string;
    native: string;
    learning: string;
    pronunciation?: string;
    createdAt: string;
    updatedAt: string;
}

interface Result<T> {
    success: boolean;
    data?: T;
    error?: string;
}


export type {
    Result,
    NoteExample,
    Note,
}