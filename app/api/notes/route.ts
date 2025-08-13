import {NextResponse} from "next/server";
import {withNoteService} from "@/lib/utils/withNoteService";

export async function GET() {
    return withNoteService(async (noteService, userId) => {
        const result = await noteService.getUserNotes(userId);

        if (!result.success) {
            return NextResponse.json({error: result.error}, {status: 400});
        }

        return NextResponse.json(result.data, {status: 200});
    });
}

export async function POST() {

}