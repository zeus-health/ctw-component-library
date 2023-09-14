import DOMPurify from "dompurify";
import { Interweave } from "interweave";
import { NotesEntry } from "./notes-entry";
import { DocumentModel } from "@/fhir/models/document";

export type NotesProps = {
  entries: DocumentModel[];
};

function getNoteDisplay(noteText: string | undefined) {
  if (noteText === undefined) {
    return undefined;
  }
  const cleanNote = DOMPurify.sanitize(noteText);

  return (
    <div className="ctw-overflow-auto">
      <Interweave content={cleanNote} />
    </div>
  );
}

export const Notes = ({ entries }: NotesProps) => (
  <div className="ctw-space-y-4">
    <div className="ctw-text-lg ctw-font-semibold">Notes</div>
    {entries.map((entry, idx) => (
      <div key={`${entry.id}-${idx}`}>
        <NotesEntry
          id={entry.id}
          title={entry.noteTitle}
          hideEmpty={false}
          details={{
            value: getNoteDisplay(entry.text),
          }}
        />
      </div>
    ))}
  </div>
);
