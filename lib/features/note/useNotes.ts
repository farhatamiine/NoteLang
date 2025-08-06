'use client'
import {useQuery} from "@tanstack/react-query";
import {getNotesAction, NotesResponse} from "@/lib/actions/note-action";

export const useNotes = () => {
    return useQuery<NotesResponse>({
        queryKey: ["notes"],
        queryFn: getNotesAction,
        staleTime: 1000 * 60 * 5,
    });
};


//
// export const useAddNote = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (newNote: InsertNoteFormData) => {
//       const {
//         data: { user },
//         error: userError,
//       } = await supabase.auth.getUser();
//
//       if (userError || !user) {
//         throw new Error("User not authenticated");
//       }
//
//       const noteSlug = slugify(
//         `${newNote.learningText} ${newNote.nativeText}`,
//         {
//           replacement: "-",
//           lower: true,
//           strict: true,
//           locale: "fr",
//           trim: true,
//         }
//       );
//       const noteData = {
//         ...newNote,
//         slug: noteSlug,
//         user_id: user.id,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//       };
//
//       const { data, error } = await supabase
//         .from("Notes")
//         .insert([noteData])
//         .single();
//
//       if (error) {
//         throw error;
//       }
//
//       return data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["notes"],
//       });
//     },
//     onError: (error) => {
//       console.error("Error adding note:", error);
//     },
//   });
// };
//
// export const useUpdateNote = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async ({
//       id,
//       ...updateData
//     }: InsertNoteFormData & { id: string }) => {
//       const {
//         data: { user },
//         error: userError,
//       } = await supabase.auth.getUser();
//
//       if (userError || !user) {
//         throw new Error("User not authenticated");
//       }
//
//       const noteData = {
//         ...updateData,
//         updatedAt: new Date().toISOString(),
//       };
//
//       const { data, error } = await supabase
//         .from("Notes")
//         .update(noteData)
//         .eq("id", id)
//         .eq("user_id", user.id)
//         .select("*")
//         .single();
//
//       if (error) {
//         throw error;
//       }
//
//       return data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["notes"],
//       });
//     },
//     onError: (error) => {
//       console.error("Error updating note:", error);
//     },
//   });
// };
//
// export const useNoteBySlug = (slug: string) => {
//   return useQuery({
//     queryKey: ["note-slug", slug],
//     queryFn: async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();
//       const { data: Note, error } = await supabase
//         .from("Notes")
//         .select("*,NoteExample:NoteExample(*)")
//         .eq("user_id", user?.id)
//         .eq("slug", slug)
//         .single<Note>();
//
//       if (error) {
//         throw error;
//       }
//       return Note;
//     },
//     staleTime: 1000 * 60 * 5,
//   });
// };
//
// export const useNoteById = (id: string) => {
//   return useQuery({
//     queryKey: ["note-id", id],
//     queryFn: async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();
//       const { data: Note, error } = await supabase
//         .from("Notes")
//         .select("*,NoteExample:NoteExample(*)")
//         .eq("user_id", user?.id)
//         .eq("id", id)
//         .single<InsertNoteFormData>();
//
//       if (error) {
//         throw error;
//       }
//       return Note;
//     },
//     enabled: !!id,
//     staleTime: 1000 * 60 * 5,
//   });
// };
//
// export const useDeleteNote = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (slug: string) => {
//       const {
//         data: { user },
//         error: userError,
//       } = await supabase.auth.getUser();
//
//       if (userError || !user) {
//         throw new Error("User not authenticated");
//       }
//
//       const { error } = await supabase
//         .from("Notes")
//         .delete()
//         .eq("slug", slug)
//         .eq("user_id", user.id);
//
//       if (error) {
//         throw error;
//       }
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["notes"],
//       });
//     },
//     onError: (error) => {
//       console.error("Error deleting note:", error);
//     },
//   });
// };
