import { z } from "zod";

export const SignInFormSchema = z.object({
    email: z.email({ message: "Please enter a valid email address." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});
