import { getAuthorData } from "./data";
import { DocumentOnlyProps } from "../../types";
import { Table } from "../Table/Table";
import { isEmpty } from "@/utils/nodash";

export const Author = ({ document }: DocumentOnlyProps) => {
  const authors = getAuthorData(document);

  if (!authors || isEmpty(authors)) return null;

  const finalData = authors.flatMap((author) => [
    {
      label: "Author",
      value: `${author.name || "Unknown"}${
        author.organization.name ? `, Organization: ${author.organization.name}` : ""
      }`,
    },
    {
      label: "Contact Details",
      value: author.contactDetails,
    },
    {
      label: "Contact Details (Organization)",
      value: author.organization.contactDetails,
    },
  ]);

  return <Table data={finalData} chunkSize={3} />;
};
