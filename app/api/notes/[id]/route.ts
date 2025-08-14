import {withNoteService} from "@/lib/utils/withNoteService";
import {NextResponse} from "next/server";
import {NoteUpdateSchema} from "@/lib/schemas";


type IdParams = Promise<{ id: string }>;


export async function GET(_req: Request, { params }: { params: IdParams }) {
    const { id } = await params;


    return withNoteService(async (noteService, userId) => {
        const result = await noteService.getNoteById(id, userId);

        if (!result.success) {
            return NextResponse.json({error: result.error}, {status: 404});
        }
        return NextResponse.json(result.data, {status: 200});
    });
}

export async function PATCH(req: Request,  { params }: { params: IdParams }) {
    const { id } = await params;

    return withNoteService(async (noteService, userId) => {
        try {
            const body = await req.json();
            const parsed = NoteUpdateSchema.parse({...body, id: id});

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


export async function DELETE(_req: Request, { params }: { params: IdParams }) {
    const { id } = await params;
    console.log(id)
    return withNoteService(async (noteService, userId) => {
        try {
            const result = await noteService.deleteNote(id, userId);

            if (!result.success) {
                return NextResponse.json({error: result.error}, {status: 400});
            }
            return NextResponse.json(null, {status: 200});
        } catch (err) {
            return NextResponse.json({error: (err as Error).message}, {status: 400});
        }
    })
}