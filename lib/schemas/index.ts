import {z} from "zod";

export const SignInformSchema = z.object({
    email: z.email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
});

export const noteSchema = z.object({
    id: z.string().optional(),
    nativeText: z.string().min(1, "Native text is required"),
    learningText: z.string().min(1, "Learning text is required"),
    pronunciation: z.string().optional(),
    noteType: z.enum(["word", "phrase", "sentence", "grammar"]),
    tags: z.array(z.string()),
    notes: z.string().optional(),
    difficulty: z.enum(["beginner", "intermediate", "advanced"]),
    category: z.string().optional(),
    examples: z.array(z.string()).default([]),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    user_id: z.string().optional(),
});

export type NoteType = z.infer<typeof noteSchema.shape.noteType>;
export type Difficulty = z.infer<typeof noteSchema.shape.difficulty>;

export type NoteFormData = z.infer<typeof noteSchema>;

export const insertNoteSchema = noteSchema.omit({
    examples: true,
    createdAt: true,
    updatedAt: true,
});

export type InsertNoteFormData = z.infer<typeof insertNoteSchema>;
