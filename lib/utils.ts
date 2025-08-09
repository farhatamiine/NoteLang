import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// This check can be removed, it is just for tutorial purposes
export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY;


export const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
        case "beginner": return "bg-green-100 text-green-800 border-green-200"
        case "intermediate": return "bg-yellow-100 text-yellow-800 border-yellow-200"
        case "advanced": return "bg-red-100 text-red-800 border-red-200"
        default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
}


export function ok<T>(r: { success: boolean; data?: T } | undefined): r is { success: true; data: T } {
    return !!r && r.success && r.data !== undefined;
}