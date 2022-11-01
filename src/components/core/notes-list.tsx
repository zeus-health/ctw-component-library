type NotesListProps = {
  notes: string[];
};

export const NotesList = ({ notes }: NotesListProps) => (
  <div className="ctw-flex ctw-flex-col ctw-space-y-4">
    {notes.map((note) => (
      <div key={`${note}`}>
        <div>{note}</div>
      </div>
    ))}
  </div>
);
