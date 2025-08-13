import { z } from "zod";

export const DifficultyEnum = z.enum(["beginner", "intermediate", "advanced"]);
export const GenderEnum = z.enum(["none", "masculine", "feminine", "plural"]);
