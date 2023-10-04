import DOMPurify from "dompurify";
import { Interweave } from "interweave";
import { NotesEntrySimple } from "./notes-entry";
import { DocumentModel } from "@/fhir/models/document";

export type NotesProps = {
  entries: DocumentModel[];
  documentIdToStartOpen?: string;
};

export function getNoteDisplay(noteText: string | undefined) {
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

export const Notes = ({ entries, documentIdToStartOpen }: NotesProps) => (
  <div className="ctw-space-y-4">
    <div className="ctw-text-lg ctw-font-semibold">Notes</div>
    {entries.map((entry, idx) => (
      // eslint-disable-next-line react/no-array-index-key
      <div key={`${entry.id}-${idx}`}>
        <NotesEntrySimple
          id={entry.id}
          title={entry.title}
          hideEmpty={false}
          details={{
            value: getNoteDisplay(entry.text),
            transposeTables: true,
          }}
          isDetailShownOnOpen={entry.id === documentIdToStartOpen}
        />
      </div>
    ))}
  </div>
);
