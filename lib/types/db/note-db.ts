export interface NoteDb {
    id: string;
    native_text: string;
    learning_text: string;
    pronunciation: string | null;
    note_type: string | null;
    review_count: number;
    category: string | null;
    last_reviewed_at: string | null;
    next_review_at: string | null;
    ease: number | null;
    tags: string[];
    difficulty?: "beginner" | "intermediate" | "advanced";
    created_at: string;
    updated_at?: string;
    slug: string;
    user_id: string;
}

export interface NoteExampleDb {
    id: string;
    note_id: string;
    set_id?: string;
    native: string;
    learning: string;
    pronunciation?: string | null;
    difficulty?: "beginner" | "intermediate" | "advanced";
    explanation?: string;
    tokens: unknown[]; // JSONB
    morphology?: unknown; // JSONB
    created_at: string;
    updated_at: string;
}
