// schemas/note-insert.schema.ts (server)
import { z } from "zod";
import { noteFormSchema } from "./note-form.schema";

export const noteInsertSchema = noteFormSchema.extend({
    user_id: z.uuid(),     // must be the auth user
    slug: z.string().min(1),        // or generate in service and skip validating here
});

export type NoteInsert = z.infer<typeof noteInsertSchema>;
