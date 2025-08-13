import { z } from "zod";

export const onBoardingFormSchema = z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    nativeLanguage: z.string().min(2).max(50),
    targetLanguage: z.string().min(2).max(50),
});
