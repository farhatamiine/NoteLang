import {z} from "zod";
import {DifficultyEnum} from "./enums.schema";

export const noteFormSchema = z.object({
    nativeText: z.string().min(1, "Native text is required"),
    learningText: z.string().min(1, "Learning text is required"),
    pronunciation: z.string().optional(),
    noteType: z.string().min(1, "Note type is required"),
    category: z.string().min(1, "Category is required"),
    tags: z.array(z.string()),
    difficulty: DifficultyEnum.optional(),
});

export type NoteFormValues = z.infer<typeof noteFormSchema>;
