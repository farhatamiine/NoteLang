import {useMutation} from "@tanstack/react-query";
import {AiInput, GeneratedExamplesPayload, Result} from "@/lib/types";
import {generateWordExamplesAction} from "@/lib/actions/note-action";

export function useGenerateExample(noteId: string) {
    return useMutation<Result<GeneratedExamplesPayload>, Error, AiInput>({
        mutationKey: ['examples', noteId],
        mutationFn: (input) => generateWordExamplesAction(noteId, input),
    });
}