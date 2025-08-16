import {NextResponse} from "next/server";
import {withNoteService} from "@/lib/utils/withNoteService";
import {AiInputSchema} from "@/lib/schemas";


type IdParams = Promise<{ id: string }>;

export async function POST(req: Request, {params}: { params: IdParams }) {
    try {
        const { id:noteId } = await params;

        // parse body
        const json = await req.json().catch(() => null);
        if (!json) {
            return NextResponse.json({error: "Invalid JSON body."}, {status: 400});
        }
        const parse = AiInputSchema.safeParse(json);
        if (!parse.success) {
            return NextResponse.json(
                {error: "Bad input.", details: parse.error},
                {status: 400}
            );
        }
        const aiInput = parse.data;

        // call domain service (your code)
        return await withNoteService(async (noteService, userId) => {
            const result = await  noteService.generateWordExample(noteId, userId, aiInput);
            if (!result.success) {
                return NextResponse.json({error: result.error}, {status: 400});
            }

            return NextResponse.json(result.data, {status: 200});
        });


    } catch (err) {
        return NextResponse.json(
            {error: err instanceof Error ? err.message : "Unexpected error."},
            {status: 500}
        );
    }
}