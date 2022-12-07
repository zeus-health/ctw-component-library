import { Table } from "../Table/Table";
import { DocumentOnlyProps } from "../../types";
import { getCustodianData } from "./data";

export const Custodian = ({ document }: DocumentOnlyProps) => {
  const custodian = getCustodianData(document);

  if (!custodian) return null;

  const { name, contactDetails } = custodian;
  const finalData = [
    {
      label: "Custodian",
      value: name,
    },
    {
      label: "Contact Details",
      value: contactDetails,
    },
  ];

  return <Table data={finalData} />;
};
