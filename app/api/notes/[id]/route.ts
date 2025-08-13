import {withNoteService} from "@/lib/utils/withNoteService";
import {NextResponse} from "next/server";
import {NoteUpdateSchema} from "@/lib/schemas";


export async function GET(_req: Request,  context: any) {
    const { params } = context;

    return withNoteService(async (noteService, userId) => {
        const result = await noteService.getNoteById(params.id, userId);

        if (!result.success) {
            return NextResponse.json({error: result.error}, {status: 404});
        }
        return NextResponse.json(result.data, {status: 200});
    });
}

export async function PATCH(req: Request,  context: any) {
    const { params } = context;

    return withNoteService(async (noteService, userId) => {
        try {
            const body = await req.json();
            const parsed = NoteUpdateSchema.parse({...body, id: params.id});

            const result = await noteService.updateNote(parsed, userId);

            if (!result.success) {
                return NextResponse.json({error: result.error}, {status: 400});
            }
            return NextResponse.json(result.data, {status: 200});
        } catch (err) {
            return NextResponse.json({error: (err as Error).message}, {status: 400});
        }
    });
}
