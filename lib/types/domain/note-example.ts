export interface NoteExample {
    id: string;
    noteId: string;
    native: string;
    learning: string;
    pronunciation?: string | null;
    difficulty?: "beginner" | "intermediate" | "advanced";
    explanation?: string;
    tokens: Array<{ word: string; translit?: string; pos?: string; gloss: string; note?: string }>;
    morphology?: { gender: "none" | "masculine" | "feminine" | "plural"; notes?: string } | null;
    createdAt: string;
    updatedAt: string;
}
