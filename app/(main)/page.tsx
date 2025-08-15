'use client'

import Container from "@/components/Container";
import {SkeletonCard} from "@/components/SkeletonCard";
import NotesList from "@/components/note/NotesList";
import {EmptyNotesState} from "@/components/note/EmptyNotesState";
import {useRouter} from "next/navigation";
import {ROUTES} from "@/lib/const";
import {useNotes} from "@/lib/queries/notes";
import FloatingAddButton from "@/components/FloatingAddButton";

export default function Home() {
    const {data: notes, isLoading: isNoteLoading, error: isNoteError} = useNotes();
    const router = useRouter();


    if (isNoteLoading) return <SkeletonCard/>;
    if (isNoteError || !Array.isArray(notes)) {
        return (
            <div className="text-center text-red-500 mt-8">
                Failed to load notes. Please try again.
            </div>
        );
    }

    const goToCreateNote = () => {
        router.push(ROUTES.NOTE_CREATE)
    }

    return (
        <Container>
            {
                notes.length > 0 ?
                    <NotesList notes={notes}/>
                    :
                    <EmptyNotesState onCreateNote={() => {
                        router.push(ROUTES.NOTE_CREATE)
                    }}/>
            }
            <FloatingAddButton onClick={goToCreateNote}/>
        </Container>
    );
}
