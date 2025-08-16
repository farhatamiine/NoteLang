export type AiInput = {
    word?: { learning: string; latin?: string; pos?: string };
    nativeLanguage: string;
    targetLanguage: string;
    topic?: string | null;
    level?: string;
    style?: "formal" | "casual" | "slang" | string | null;
    includeTransliteration?: boolean;
    maxWords?: number;
    requireGenderVariants?: boolean;
};

export type GeneratedExample = {
    native: string;
    learning: string;
    pronunciation?: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    explanation: string;
    tokens: Array<{ word: string; translit?: string; pos?: string; gloss: string; note?: string }>;
    morphology?: { gender: "none" | "masculine" | "feminine" | "plural"; notes?: string };
};

export type GeneratedExamplesPayload = {
    examples: GeneratedExample[];
    meta?: {
        topic?: string;
        level: "beginner" | "intermediate" | "advanced";
        style?: "formal" | "casual" | "slang";
        maxWords?: number;
        model: string;
    };
};
