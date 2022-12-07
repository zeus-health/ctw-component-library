import { isEmpty } from "lodash";
import { Table } from "../Table/Table";
import { DocumentOnlyProps } from "../../types";
import { getAuthorizationData } from "./data";

export const Authorization = ({ document }: DocumentOnlyProps) => {
  const authorizations = getAuthorizationData(document);

  if (!authorizations || isEmpty(authorizations)) return null;

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
