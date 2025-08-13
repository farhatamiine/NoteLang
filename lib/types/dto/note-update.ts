import { z } from "zod";

export const NoteUpdateSchema = z.object({
    id: z.string().min(1),
    nativeText: z.string().optional(),
    learningText: z.string().optional(),
    pronunciation: z.string().nullish(),
    category: z.string().nullish(),
    noteType: z.string().nullish(),
    difficulty: z.enum(["beginner","intermediate","advanced"]).nullish(),
    tags: z.array(z.string()).optional(),
    reviewCount: z.number().optional(),
    ease: z.number().nullish(),
    lastReviewedAt: z.string().nullish(),
    nextReviewAt: z.string().nullish(),
});

export type NoteUpdateInput = z.infer<typeof NoteUpdateSchema>;
