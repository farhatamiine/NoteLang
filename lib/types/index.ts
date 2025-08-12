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
    difficulty?: "beginner" | "intermediate" | "advanced";
    explanation?: string;
    tokens: Array<{
        word: string;
        translit?: string;
        pos?: string;
        gloss: string;
        note?: string;
    }>;
    morphology?: {
        gender: "none" | "masculine" | "feminine" | "plural";
        notes?: string;
    };
    createdAt: string;
    updatedAt: string;
}

interface Result<T> {
    success: boolean;
    data?: T;
    error?: string;
}

type AiInput = {
    word: { learning: string; latin?: string; pos?: string };
    nativeLanguage: string;
    topic?: string | null;
    level: string;
    style?: "formal" | "casual" | "slang" | string | null;
    includeTransliteration?: boolean;
    maxWords?: number;
    requireGenderVariants?: boolean;
};

type GeneratedExample = {
    native: string;
    learning: string;
    pronunciation?: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    explanation: string;
    tokens: Array<{
        word: string;
        translit?: string;
        pos?: string;
        gloss: string;
        note?: string;
    }>;
    morphology?: {
        gender: "none" | "masculine" | "feminine" | "plural";
        notes?: string;
    };
};

type GeneratedExamplesPayload = {
    examples: NoteExample[];
    meta?: {
        topic?: string;
        level: "beginner" | "intermediate" | "advanced";
        style?: "formal" | "casual" | "slang";
        maxWords?: number;
        model: string;
    };
};

interface Profile {
    id: string;
    firstName: string;
    lastName: string;
    nativeLanguage: string;
    targetLanguage: string;
    createdAt: string;
    updatedAt: string;
    noteCount?: number;
}

interface ProfileStats {
    noteCount: number;
    totalReviews: number;
    streakDays: number;
    lastActiveAt: string | null;
}

interface ProfileWithStats extends Profile {
    stats: ProfileStats;
}

interface CreateProfileData {
    firstName: string;
    lastName: string;
    nativeLanguage: string;
    targetLanguage: string;
}

interface UpdateProfileData {
    firstName?: string;
    lastName?: string;
    nativeLanguage?: string;
    targetLanguage?: string;
}


export type {
    Result,
    NoteExample,
    Note,
    UpdateProfileData,
    CreateProfileData,
    GeneratedExample,
    GeneratedExamplesPayload,
    AiInput,
    Profile,
    ProfileStats,
    ProfileWithStats,
};
