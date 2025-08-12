const DEFAULT_URL = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

const LANGUAGES = [
    {value: "english", label: "English"},
    {value: "spanish", label: "Spanish"},
    {value: "french", label: "French"},
    {value: "darija", label: "Darija"},
];

const TABLES = {
    NOTE_EXAMPLES: "NoteExample",
    NOTES: "Notes",
    PROFILE: "profiles",
    EXAMPLE_SETS: "example_sets",
};


const ERROR_MESSAGES = {
    INVALID_FORM: 'Invalid form data',
    SAVE_FAILED: 'Failed to save data',
    GENERIC_ERROR: 'Something went wrong. Please try again.'
}


const ROUTES = {
    HOME: "/",
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    PROFILE: "/profile",
    NOTE: "/note/:slug",
    NOTE_CREATE: "/notes/editor/create",
    NOTE_EDIT: "/notes/editor/:slug",
    NOTE_LIST: "/notes",
    AI: "/ai",
}

export {DEFAULT_URL, LANGUAGES, TABLES, ERROR_MESSAGES,ROUTES};
