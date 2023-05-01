import xpath from "xpath";
import { getContactDetails, getHumanName, getId } from "../../helpers";
import { GeneralInfoWithOrg } from "../../types";
import { isEmpty } from "@/utils/nodash";

export const getInformationRecipientData = (
  document: Document
): GeneralInfoWithOrg[] | undefined => {
  const intendedRecipients = xpath.select(
    "*[name()='ClinicalDocument']/*[name()='informationRecipient']/*[name()='intendedRecipient']",
    document
  ) as Document[];

  if (isEmpty(intendedRecipients)) return undefined;

  return intendedRecipients.map((intendedRecipient) => {
    const informationRecipient = xpath.select1(
      "*[name()='informationRecipient']",
      intendedRecipient
    ) as Document | undefined;

    const receivedOrganization = xpath.select1(
      "*[name()='receivedOrganization']",
      intendedRecipient
    ) as Document | undefined;

    if (informationRecipient) {
      const informationRecipientName = getHumanName(
        xpath.select1("*[name()='name']", informationRecipient) as Document
      );
      const informationRecipientOrganizationName = String(
        xpath.select1("string(*[name()='name']/node())", receivedOrganization)
      );

      return {
        name: informationRecipientName,
        contactDetails: "",
        organization: {
          name: informationRecipientOrganizationName,
          contactDetails: "",
        },
      };
    }

    const ids = (xpath.select("*[name()='id']", intendedRecipient) as Document[])
      .map(getId)
      .join(", ");

    const informationRecipientContactDetails = getContactDetails(
      xpath.select("*[name()='addr']", intendedRecipient) as Document[],
      xpath.select("*[name()='telecom']", intendedRecipient) as Document[]
    );

    const result = {
      name: ids,
      contactDetails: informationRecipientContactDetails,
      organization: {
        name: "",
        contactDetails: "",
      },
    };

    if (receivedOrganization) {
      const receivedOrganizationName = String(
        xpath.select1("string(*[name()='name']/node())", receivedOrganization)
      );

      const informationRecipientReceivedOrganizationContactDetails = getContactDetails(
        xpath.select("*[name()='addr']", receivedOrganization) as Document[],
        xpath.select("*[name()='telecom']", receivedOrganization) as Document[]
      );

      return {
        ...result,
        organization: {
          name: receivedOrganizationName,
          contactDetails: informationRecipientReceivedOrganizationContactDetails,
        },
      };
    }

    return result;
  });
};
