import { getInformationRecipientData } from "./data";
import { DocumentOnlyProps } from "../../types";
import { Table } from "../Table/Table";
import { isEmpty } from "@/utils/nodash";

export const InformationRecipient = ({ document }: DocumentOnlyProps) => {
  const informationRecipients = getInformationRecipientData(document);

  if (!informationRecipients || isEmpty(informationRecipients)) return null;

  const finalData = informationRecipients.flatMap((informationRecipient) => [
    {
      label: "Information Recipient",
      value: informationRecipient.name ?? "Unnamed",
    },
    {
      label: "ID",
      value: informationRecipient.id,
    },
    {
      label: "Organization",
      value: informationRecipient.organization,
    },
  ]);

  return <Table data={finalData} chunkSize={3} />;
};
