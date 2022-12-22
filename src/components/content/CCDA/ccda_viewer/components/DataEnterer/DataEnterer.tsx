import { DocumentOnlyProps } from "../../types";
import { Table } from "../Table/Table";
import { getDataEntererData } from "./data";

export const DataEnterer = ({ document }: DocumentOnlyProps) => {
  const dataEnterer = getDataEntererData(document);

  if (!dataEnterer) return null;

  const { name, contactDetails } = dataEnterer;
  const finalData = [
    {
      label: "Data Enterer",
      value: name,
    },
    {
      label: "Contact Details",
      value: contactDetails,
    },
  ];

  return <Table data={finalData} />;
};
