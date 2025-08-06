import NoteCard from "./NoteCard";
import {Note} from "@/lib/types";

function NotesList({notes}: { notes: Note[] }) {
    return (
        <div className="overflow-y-auto h-full space-y-4">
            {notes.map((note) => {
                return <NoteCard note={note} key={note.id}/>;
            })}
        </div>
    );
}

export default NotesList;
