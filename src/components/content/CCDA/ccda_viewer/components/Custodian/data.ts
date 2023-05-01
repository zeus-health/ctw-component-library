import xpath from "xpath";
import { getContactDetails } from "../../helpers";
import { GeneralInfo } from "../../types";

export const getCustodianData = (document: Document): GeneralInfo | undefined => {
  const representedCustodianOrganization = xpath.select1(
    "*[name()='ClinicalDocument']/*[name()='custodian']/*[name()='assignedCustodian']/*[name()='representedCustodianOrganization']",
    document
  ) as Document | undefined;

  if (!representedCustodianOrganization) return undefined;

  const name = String(xpath.select1("string(*[name()='name'])", representedCustodianOrganization));

  const contactDetails = getContactDetails(
    xpath.select1(
      "*[name()='ClinicalDocument']/*[name()='custodian']/*[name()='assignedCustodian']/*[name()='representedCustodianOrganization']/*[name()='addr']",
      document
    ) as Document,
    xpath.select1(
      "*[name()='ClinicalDocument']/*[name()='custodian']/*[name()='assignedCustodian']/*[name()='representedCustodianOrganization']/*[name()='telecom']",
      document
    ) as Document
  );

  return { name, contactDetails };
};
