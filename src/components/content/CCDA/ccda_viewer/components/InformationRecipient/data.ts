import xpath from "xpath";
import { getHumanName, getId } from "../../helpers";
import { InformationRecipient } from "../../types/InformationRecipient";
import { isEmpty } from "@/utils/nodash";

export const getInformationRecipientData = (
  document: Document
): InformationRecipient[] | undefined => {
  const intendedRecipients = xpath.select(
    "*[name()='ClinicalDocument']/*[name()='informationRecipient']/*[name()='intendedRecipient']",
    document
  ) as Document[];

  if (isEmpty(intendedRecipients)) return undefined;

  return intendedRecipients.map((intendedRecipient) => {
    let informationRecipientName = "";
    const informationRecipient = xpath.select1(
      "*[name()='informationRecipient']",
      intendedRecipient
    ) as Document | undefined;

    if (informationRecipient) {
      informationRecipientName = getHumanName(
        xpath.select1("*[name()='name']", informationRecipient) as Document
      );
    }

    const ids = (xpath.select("*[name()='id']", intendedRecipient) as Document[])
      .map(getId)
      .join(", ");

    let receivedOrganizationName = "";
    const receivedOrganization = xpath.select1(
      "*[name()='receivedOrganization']",
      intendedRecipient
    ) as Document | undefined;
    if (receivedOrganization) {
      receivedOrganizationName = String(
        xpath.select1("string(*[name()='name']/node())", receivedOrganization)
      );
    }

    return {
      name: informationRecipientName,
      id: ids,
      organization: receivedOrganizationName,
    };
  });
};
