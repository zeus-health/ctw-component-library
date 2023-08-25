import { Interweave, Node } from "interweave";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "./note-style.scss";
import * as sanitizeHtml from "sanitize-html";
import { NotesEntry } from "./notes-entry";
import { DocumentModel } from "@/fhir/models/document";

export type NotesProps = {
  entries: DocumentModel[];
};

function getNoteDisplay(noteText: string | undefined) {
  console.log(noteText);

  if (noteText === undefined) {
    return undefined;
  }
  const cleanNote = sanitizeHtml(noteText, {
    disallowedTagsMode: "escape",
  });

  function turnTablesResponsive(node: HTMLElement, children: Node[]): React.ReactNode {
    switch (node.tagName) {
      case "TABLE":
        return (
          <Table className="ctw-my-3 ctw-border-solid ctw-border-divider-light ctw-bg-bg-lighter">
            {children}
          </Table>
        );
      case "THEAD":
        return <Thead>{...children}</Thead>;
      case "TBODY":
        return <Tbody>{children}</Tbody>;
      case "TR":
        return <Tr>{children}</Tr>;
      case "TH":
        return <Th>{children}</Th>;
      case "TD":
        return <Td className="ctw-overflow-scroll">{children}</Td>;
      default:
        return undefined;
    }
  }

  return (
    <div className="ctw-note">
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
