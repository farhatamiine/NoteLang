'use client'

import Container from "@/components/Container";
import {useNotes} from "@/lib/features/note/useNotes";
import {SkeletonCard} from "@/components/SkeletonCard";
import NotesList from "@/components/note/NotesList";

export default function Home() {
    const {data: notes, isLoading: isNoteLoading, isError: isNoteError} = useNotes();


    if (isNoteLoading) return <SkeletonCard/>;
    if (isNoteError || !Array.isArray(notes?.data)) {
        return (
            <div className="text-center text-red-500 mt-8">
                Failed to load notes. Please try again.
            </div>
        );
    }
    return (
        <Container>
            <NotesList notes={notes.data}/>
        </Container>
    );
}
