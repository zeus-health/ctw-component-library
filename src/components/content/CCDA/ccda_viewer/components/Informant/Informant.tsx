import { DocumentOnlyProps } from "../../types";
import { Table } from "../Table/Table";
import { getInformantData } from "./data";
import { isEmpty } from "@/utils/nodash";

export const Informant = ({ document }: DocumentOnlyProps) => {
  const informants = getInformantData(document);

  if (!informants || isEmpty(informants)) return null;

  const finalData = informants.flatMap((informant) => [
    {
      label: "Informant",
      value: `${informant.name || "Unknown"}${
        informant.relationship ? ` - ${informant.relationship}` : ""
      }`,
    },
    {
      label: "Contact Details",
      value: informant.contactDetails,
    },
  ]);

  return <Table data={finalData} />;
};
