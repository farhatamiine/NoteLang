const DEFAULT_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";
const LANGUAGES = [
    {value: "english", label: "English"},
    {value: "spanish", label: "Spanish"},
    {value: "french", label: "French"},
    {value: "darija", label: "Darija"},
]


export {
    DEFAULT_URL,
    LANGUAGES
}