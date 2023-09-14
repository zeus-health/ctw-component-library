type NotesListProps = {
  notes: string[];
};

export const NotesList = ({ notes }: NotesListProps) => (
  <div className="ctw-flex ctw-flex-col ctw-space-y-4">
    {notes.map((note, i) => (
      <div key={note + i}>
        <div>{note}</div>
      </div>
    ))}
  </div>
);
