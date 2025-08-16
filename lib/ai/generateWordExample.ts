// app/actions/generateWordExamples.ts
"use server";

import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { GeneratedExamplesPayload, OutputSchema } from "@/lib/schemas";
import { AiInput, Note } from "@/lib/types";

const model = google("gemini-2.5-flash");

// Arabic Unicode block check
const ARABIC_RE = /[\u0600-\u06FF]/;
const hasArabic = (s: string) => ARABIC_RE.test(s ?? "");

export async function generateWordExamples(
    input: AiInput,
    note: Note
): Promise<GeneratedExamplesPayload> {
    const term = (note.learningText || "").trim();
    if (!term) throw new Error("Note has no learning text");

    const targetLang = (input.targetLanguage || "Darija").trim();
    const nativeLang = (input.nativeLanguage || "French").trim();
    const isDarija = targetLang.toLowerCase() === "darija";

    // Ensure deterministic numeric field and force the saved term into input
    const normalizedInput = {
        ...input,
        word: { learning: term },
        includeTransliteration: isDarija ? true : !!input.includeTransliteration,
        maxWords: 14,
    };

    // SYSTEM: allow your wording, add a strict line for Darija learning text
    const system = [
        `You create short, correct ${targetLang} examples for a single word.`,
        `Return ONLY JSON that matches the provided schema.`,
        `Include:`,
        `- 3 sentences in ${targetLang.toLowerCase()} ("learning") with a ${nativeLang.toLowerCase()} translation ("native") dont put . at the end of the sentence.`,
        `- if the ${targetLang.toLowerCase()} is darija write in french word not arabic`,
        isDarija ? `- The "learning" sentences MUST be Latin letters only (French-style transliteration). Never use Arabic script.` : "",
        `- "pronunciation" (transliteration) when requested.`,
        `- Per-sentence "explanation", "tokens" (word, translit, pos, gloss, note?), and "morphology" (gender & notes) in ${nativeLang.toLowerCase()}.`,
        `Fill meta.model with the model id you’re using.`,
    ]
        .filter(Boolean)
        .join(" ");

    // PROMPT: keep your TASK block unchanged
    const prompt = [
        "TASK:",
        `- Use the provided word to build 3 distinct, natural sentences in ${targetLang.toLowerCase()}.`,
        `- Keep each sentence under maxWords.`,
        `- Tokens must include: word (in ${targetLang.toLowerCase()}), translit (Latin), pos, and brief gloss in ${nativeLang.toLowerCase()}.`,
        `- morphology.gender: one of "none" | "masculine" | "feminine" | "plural".`,
        "",
        "INPUT JSON:",
        JSON.stringify(normalizedInput, null, 2),
    ].join("\n");

    const call = async (sys: string) => {
        const { object } = await generateObject({
            model,
            schema: OutputSchema,
            temperature: 0.25, // less drift
            system: sys,
            prompt,
        });
        if (!object?.meta?.model) object.meta.model = "gemini-2.5-flash";
        return object as GeneratedExamplesPayload;
    };

    // 1) first attempt
    let out = await call(system);

    // 2) Post-validation
    const containsTerm = (s: string) =>
        new RegExp(`\\b${term.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}\\b`, "i").test(s);

    const badScript = isDarija && out.examples.some(ex => hasArabic(ex.learning));
    const missingTerm = out.examples.some(ex => !containsTerm(ex.learning));

    if (badScript || missingTerm) {
        // 3) retry once with reinforced system
        const reinforced =
            system +
            " STRICT: The 'learning' text must be Latin-only and must contain the exact provided word/phrase verbatim.";

        out = await call(reinforced);

        // 4) last-resort fallback: replace any Arabic-script learning with pronunciation if available
        if (isDarija) {
            out.examples = out.examples.map(ex =>
                hasArabic(ex.learning) && ex.pronunciation
                    ? { ...ex, learning: ex.pronunciation }
                    : ex
            );
        }
    }

    // 5) final guard
    if (!out?.examples?.length) throw new Error("AI returned no examples");
    if (out.examples.some(ex => !containsTerm(ex.learning))) {
        throw new Error("Generated examples missing the exact note term");
    }
    if (isDarija && out.examples.some(ex => hasArabic(ex.learning))) {
        throw new Error("Generated Darija learning sentences are not Latin-only");
    }

    return out;
}
