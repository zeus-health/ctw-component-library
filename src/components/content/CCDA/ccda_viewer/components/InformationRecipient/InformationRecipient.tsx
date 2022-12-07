import { isEmpty } from "lodash";
import { Table } from "../Table/Table";
import { DocumentOnlyProps } from "../../types";
import { getInformationRecipientData } from "./data";

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
