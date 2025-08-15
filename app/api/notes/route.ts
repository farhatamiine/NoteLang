import {NextResponse} from "next/server";
import {withNoteService} from "@/lib/utils/withNoteService";
import {noteFormSchema, noteInsertSchema} from "@/lib/schemas";
import {generateUniqueSlug} from "@/lib/utils";

export async function GET() {
    return withNoteService(async (noteService, userId) => {
        const result = await noteService.getUserNotes(userId);

        if (!result.success) {
            return NextResponse.json({error: result.error}, {status: 400});
        }

        return NextResponse.json(result.data, {status: 200});
    });
}

export async function POST(req: Request) {
    return withNoteService(async (noteService, userId) => {
        try {
            const body = await req.json();
            const formValues = noteFormSchema.parse(body);
            const payload = noteInsertSchema.parse({
                ...formValues,
                user_id: userId,
                slug: generateUniqueSlug(`${formValues.learningText} ${formValues.nativeText}`),
            });
            const result = await noteService.createNote(payload, userId);
            if (!result.success) {
                return NextResponse.json({error: result.error}, {status: 400});
            }
            return NextResponse.json(result.data, {status: 201});
        } catch (err) {
            return NextResponse.json({error: (err as Error).message}, {status: 400});
        }
    })
}