import { isEmpty } from "lodash";
import xpath from "xpath";

export const getEthnicity = (patient: Document): string => {
  const ethnicGroup = xpath.select1(
    "*[name()='ethnicGroupCode']",
    patient
  ) as Document;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (ethnicGroup) {
    return String(xpath.select1("string(@displayName)", ethnicGroup));
  }

  const detailedEthnicGroup = xpath.select(
    "*[name()='sdtc:ethnicGroupCode']",
    patient
  ) as Document[];

  if (isEmpty(detailedEthnicGroup)) return "";

  return String(xpath.select1("string(@displayName)", detailedEthnicGroup[0]));
};
