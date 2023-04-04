import { getAuthorizationData } from "./data";
import { DocumentOnlyProps } from "../../types";
import { Table } from "../Table/Table";
import { isEmpty } from "@/utils/nodash";

export const Authorization = ({ document }: DocumentOnlyProps) => {
  const authorizations = getAuthorizationData(document);

  if (isEmpty(authorizations)) return null;

  const finalData = authorizations.flatMap((authorization) => [
    {
      label: "Consent",
      value: `Order: ${authorization[0].value || "Unknown"}, ${
        authorization[1].value || "Unknown"
      }, ${authorization[2].value || "Unknown"}`,
    },
    { label: "", value: "" },
  ]);

  return <Table data={finalData} />;
};
