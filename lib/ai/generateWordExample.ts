// app/actions/generateWordExamples.ts
"use server";

import {generateObject} from "ai";
import {google} from "@ai-sdk/google";
import {getUserProfileWithStats} from "@/lib/actions/profile-action";
import {AiInput} from "@/lib/types";
import {GeneratedExamplesPayload, OutputSchema} from "@/lib/schemas";

const model = google("gemini-2.5-flash");

export async function generateWordExamples(
    input: AiInput
): Promise<GeneratedExamplesPayload> {
    const user = await getUserProfileWithStats().catch(() => null);

    // Safe fallbacks (don’t crash if profile fields are missing)
    const targetLang = user?.data?.targetLanguage ?? "Darija";
    const nativeLang = user?.data?.nativeLanguage ?? "French";

    // IMPORTANT: Ensure numeric; your cache uses this value too
    const normalizedInput = {
        ...input,
        maxWords: typeof input.maxWords === "number" ? input.maxWords : 14,
    };

    const system = [
        `You create short, correct ${targetLang} examples for a single word.`,
        `Return ONLY JSON that matches the provided schema.`,
        `Include:`,
        `- 3 sentences in ${targetLang} ("learning") with a ${nativeLang} translation ("native") dont put . at the end of the sentence and if the ${nativeLang} is darija write in french word not arabic`,
        `- "pronunciation" (transliteration) when requested.`,
        `- Per-sentence "explanation", "tokens" (word, translit, pos, gloss, note?), and "morphology" (gender & notes) in ${nativeLang}.`,
        `Fill meta.model with the model id you’re using.`,
    ].join(" ");

    const prompt = [
        "TASK:",
        `- Use the provided word to build 3 distinct, natural sentences in ${targetLang}.`,
        `- Keep each sentence under maxWords.`,
        `- Tokens must include: word (in ${targetLang}), translit (Latin), pos, and brief gloss in ${nativeLang}.`,
        `- morphology.gender: one of "none" | "masculine" | "feminine" | "plural".`,
        "",
        "INPUT JSON:",
        JSON.stringify(normalizedInput, null, 2),
    ].join("\n");

    const {object} = await generateObject({
        model,
        schema: OutputSchema,
        temperature: 0.4,
        system,
        prompt,
    });

    // Safety: if the model forgets meta.model, set it here so DB has a value
    if (!object?.meta?.model) {
        object.meta.model = "gemini-2.5-flash";
    }
    console.log(object);
    return object;
}
