import { z } from "zod";
import { DifficultyEnum, GenderEnum } from "./enums.schema";

const AiTokenSchema = z.object({
    word: z.string(),
    translit: z.string().optional(),
    pos: z.string().optional(),
    gloss: z.string(),
    note: z.string().optional(),
});

const AiExampleSchema = z.object({
    native: z.string(),
    learning: z.string(),
    pronunciation: z.string().optional(),
    difficulty: DifficultyEnum,
    explanation: z.string(),
    tokens: z.array(AiTokenSchema),
    morphology: z
        .object({
            gender: GenderEnum,
            notes: z.string().optional(),
        })
        .optional(),
});

export const OutputSchema = z.object({
    examples: z.array(AiExampleSchema).length(3),
    meta: z.object({
        topic: z.string().optional(),
        level: DifficultyEnum,
        style: z.enum(["formal", "casual", "slang"]).optional(),
        maxWords: z.number().optional(),
        model: z.string(),
    }),
});

export type GeneratedExample = z.infer<typeof AiExampleSchema>;
export type GeneratedExamplesPayload = z.infer<typeof OutputSchema>;
