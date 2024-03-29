import DOMPurify from "dompurify";
import { Interweave } from "interweave";
import { NotesEntry } from "./notes-entry";
import { DocumentModel } from "@/fhir/models/document";

export type NotesProps = {
  entries: DocumentModel[];
  documentIdToStartOpen?: string;
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

export const Notes = ({ entries, documentIdToStartOpen }: NotesProps) => (
  <div className="ctw-space-y-4">
    <div className="ctw-text-lg ctw-font-semibold">Notes</div>
    {entries.map((entry, idx) => (
      // eslint-disable-next-line react/no-array-index-key
      <div key={`${entry.id}-${idx}`}>
        <NotesEntry
          id={entry.id}
          summary={
            <>
              {entry.title && (
                <div>
                  <div className="ctw-font-semibold ctw-text-content-black">{entry.title}</div>
                </div>
              )}
              {!entry.title && <div className="ctw-text-content-lighter">Unknown</div>}
            </>
          }
          hideEmpty={false}
          details={[
            {
              value: getNoteDisplay(entry.text),
              transposeTables: true,
            },
          ]}
          isDetailShownOnOpen={entry.id === documentIdToStartOpen}
        />
      </div>
    ))}
  </div>
);
