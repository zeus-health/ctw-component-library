import { Table } from "../Table/Table";
import { DocumentOnlyProps } from "../../types";
import { getDocumentData } from "./data";

export const Document = ({ document }: DocumentOnlyProps) => {
  const {
    id,
    createdOn,
    version,
    setId,
    confidentialityCode,
    code,
    languageCode,
  } = getDocumentData(document);

  const finalData = [
    {
      label: "Document",
      value: (
        <>
          <b>ID: </b>
          {id}
          {setId && (
            <>
              <br />
              <b>Set ID: </b>
              {setId}
            </>
          )}
        </>
      ),
    },
    {
      label: "Created on",
      value: createdOn,
    },
    {
      label: "Version",
      value: version || "Unknown",
    },
    {
      label: "Confidentiality",
      value: confidentialityCode,
    },
    {
      label: "Code",
      value: code,
    },
    {
      label: "Language",
      value: languageCode,
    },
  ];

  return <Table data={finalData} />;
};
