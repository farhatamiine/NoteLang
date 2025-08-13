import { z } from "zod";
import { DifficultyEnum } from "./enums.schema";

export const NoteUpdateSchema = z.object({
    id: z.string().min(1),
    nativeText: z.string().optional(),
    learningText: z.string().optional(),
    pronunciation: z.string().nullish(),
    category: z.string().nullish(),
    noteType: z.string().nullish(),
    difficulty: DifficultyEnum.nullish(),
    tags: z.array(z.string()).optional(),
    reviewCount: z.number().int().min(0).optional(),
    ease: z.number().nullish(),
    lastReviewedAt: z.iso.datetime().nullish(),
    nextReviewAt: z.iso.datetime().nullish(),
});

export type NoteUpdate = z.output<typeof NoteUpdateSchema>;
