import { isEmpty } from "lodash";
import { Table } from "../Table/Table";
import { DocumentOnlyProps } from "../../types";
import { getDocumentationOfData } from "./data";

export const DocumentationOf = ({ document }: DocumentOnlyProps) => {
  const documentationOfs = getDocumentationOfData(document);

  if (!documentationOfs || isEmpty(documentationOfs)) return null;

  const finalData = documentationOfs.flatMap((documentationOf) => [
    { label: "Documentation of - Date/Time", value: documentationOf.dateTime },
    { label: "", value: "" },
    ...documentationOf.finalPerformers.flatMap((performer) => [
      {
        label: "Performer",
        value: `${performer.name || "Unknown"}${
          performer.functionCode ? ` - ${performer.functionCode}` : ""
        }`,
      },
      { label: "Contact Details", value: performer.contactDetails },
    ]),
  ]);

  return <Table data={finalData} />;
};
