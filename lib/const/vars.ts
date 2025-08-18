export const DEFAULT_URL = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const APP_NAME = "Wordy";

export const DEFAULT_LANGUAGE = "French";

export const TABLES = {
    NOTES: "notes",
    NOTE_EXAMPLES: "note_examples",
    EXAMPLE_SETS: "example_sets",
    CARDS: "cards",
    VAULTS: "vaults",
    PROFILES: "profiles",
} as const;

export const LANGUAGES = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "darija", label: "Darija" },
] as const;


export const ROUTES = {
    HOME: "/",
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    PROFILE: "/profile",
    NOTES: "/notes",
    NOTE_DETAIL: "/notes/:slug",
    NOTE_CREATE: "/notes/editor/create",
    NOTE_EDIT: "/notes/editor/:slug",
    AI: "/ai",
} as const;