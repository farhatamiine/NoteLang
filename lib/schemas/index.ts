import { z } from "zod";

// Auth schemas
export const SignInformSchema = z.object({
    email: z.email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
});

// Note form schema (main schema for forms)
export const noteFormSchema = z.object({
    nativeText: z.string().min(1, "Native text is required"),
    learningText: z.string().min(1, "Learning text is required"),
    pronunciation: z.string().optional(),
    noteType: z.string().min(1, "Note type is required"),
    category: z.string().min(1, "Category is required"),
    tags: z.array(z.string()),
    difficulty: z.enum(["beginner", "intermediate", "advanced"]).optional(),
});

// AI generation output schema
export const OutputSchema = z.object({
    examples: z.array(z.object({
        native: z.string(),
        learning: z.string(),
        pronunciation: z.string().optional(),
        difficulty: z.enum(["beginner", "intermediate", "advanced"]),
        explanation: z.string(),
        tokens: z.array(z.object({
            word: z.string(),
            translit: z.string().optional(),
            pos: z.string().optional(),
            gloss: z.string(),
            note: z.string().optional(),
        })),
        morphology: z.object({
            gender: z.enum(["none", "masculine", "feminine", "plural"]),
            notes: z.string().optional(),
        }).optional(),
    })).length(3),
    meta: z.object({
        topic: z.string().optional(),
        level: z.enum(["beginner", "intermediate", "advanced"]),
        style: z.enum(["formal", "casual", "slang"]).optional(),
        maxWords: z.number().optional(),
        model: z.string(),
    }),
});

// Type exports
export type NoteFormValues = z.infer<typeof noteFormSchema>;
export type GeneratedExample = z.infer<typeof OutputSchema>["examples"][number];
export type GeneratedExamplesPayload = z.infer<typeof OutputSchema>;