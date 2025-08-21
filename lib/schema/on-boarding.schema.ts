import z from "zod";


export const onBoardingFormSchema = z.object({
    username: z.string().min(2).max(50),
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    nativeLanguage: z.string().min(2).max(50),
    targetLanguage: z.string().min(2).max(50),
    avatarUrl: z.url().optional(),
})
