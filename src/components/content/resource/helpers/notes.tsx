import { Element, Interweave, Node } from "interweave";
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
        return <Thead>{children}</Thead>;
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
      <Interweave
        content={`<table>
            <tr>
               <th>Student Name</th>
               <th>Father Name</th>
               <th>Maths</th>
               <th>English</th>
               <th>Sociology</th>
               <th>Frencg LangComputer</th>
               <th>Politics</th>
               <th>Technical Writing</th>
               <th>Sociology</th>
               <th>Finance</th>
               <th>Biblical Studies</th>
               <th>Economics</th>
            </tr>
            <tr>
               <td>Jilla</td>
               <td>Smith</td>
               <td>90</td>
               <td>80</td>
               <td>60</td>
               <td>92</td>
               <td>45</td>
               <td>65</td>
               <td>78</td>
               <td>88</td>
               <td>65</td>
               <td>71</td>
            </tr>
            <tr>
               <td>Eva</td>
               <td>John</td>
               <td>50</td>
               <td>50</td>
               <td>78</td>
               <td>80</td>
               <td>60</td>
               <td>50</td>
               <td>50</td>
               <td>52</td>
               <td>50</td>
               <td>81</td>
            </tr>
            <tr>
               <td>Nourine</td>
               <td>Watson</td>
               <td>63</td>
               <td>90</td>
               <td>37</td>
               <td>65</td>
               <td>89</td>
               <td>78</td>
               <td>47</td>
               <td>69</td>
               <td>44</td>
               <td>98</td>
            </tr>
         </table>`}
        transform={turnTablesResponsive}
      />
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
