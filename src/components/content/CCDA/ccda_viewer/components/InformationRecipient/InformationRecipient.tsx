import { DocumentOnlyProps } from "../../types";
import { Table } from "../Table/Table";
import { getInformationRecipientData } from "./data";
import { isEmpty } from "@/utils/nodash";

export const InformationRecipient = ({ document }: DocumentOnlyProps) => {
  const informationRecipients = getInformationRecipientData(document);

  if (!informationRecipients || isEmpty(informationRecipients)) return null;

  const finalData = informationRecipients.flatMap((informationRecipient) => [
    {
      label: "Information Recipient",
      value: informationRecipient.name,
    },
    {
      label: "Contact Details",
      value: informationRecipient.contactDetails,
    },
    {
      label: "Organization",
      value: informationRecipient.organization.name,
    },
    {
      label: "Contact Details (Organization)",
      value: informationRecipient.organization.contactDetails,
    },
  ]);

  return <Table data={finalData} />;
};
