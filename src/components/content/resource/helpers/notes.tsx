import sanitizeHtml from "sanitize-html";
import { NotesEntry } from "./notes-entry";
import { DocumentModel } from "@/fhir/models/document";

export type NotesProps = {
  entries: DocumentModel[];
};

function getNoteDisplay(noteText: string | undefined) {
  if (noteText === undefined) {
    return undefined;
  }
  const cleanNote = sanitizeHtml(noteText, {
    disallowedTagsMode: "escape",
  });
  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={{ __html: cleanNote }} />;
}

export const Notes = ({ entries }: NotesProps) => (
  <div className="ctw-space-y-4">
    <div className="ctw-text-lg ctw-font-semibold">Notes</div>
    {entries.map((entry, idx) => (
      // We can have multiple items with the same condition id
      // eslint-disable-next-line react/no-array-index-key
      <div key={`${entry.id}-${idx}`}>
        <NotesEntry
          id={entry.id}
          title={entry.title}
          hideEmpty={false}
          details={{
            value: getNoteDisplay(entry.text),
          }}
        />
      </div>
    ))}
  </div>
);
