import { Interweave, Node } from "interweave";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
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

  // eslint-disable-next-line consistent-return
  function turnTablesResponsive(node: HTMLElement, children: Node[]): React.ReactNode {
    switch (node.tagName) {
      case "TABLE":
        return <Table>{children}</Table>;
      case "THEAD":
        return <Thead>{...children}</Thead>;
      case "TBODY":
        return <Tbody>{children}</Tbody>;
      case "TR":
        return <Tr>{children}</Tr>;
      case "TH":
        return <Th>{children}</Th>;
      case "TD":
        return <Td>{children}</Td>;
      default:
        return undefined;
    }
  }

  return (
    <div>
      <Interweave content={cleanNote} transform={turnTablesResponsive} />
    </div>
  );
}

export const Notes = ({ entries }: NotesProps) => (
  <div className="ctw-space-y-4">
    <div className="ctw-text-lg ctw-font-semibold">Notes</div>
    {entries.map((entry, idx) => (
      // eslint-disable-next-line react/no-array-index-key
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
