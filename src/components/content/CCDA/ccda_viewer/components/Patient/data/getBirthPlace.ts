import xpath from "xpath";
import { getAddress } from "../../../helpers";

export const getBirthPlace = (patient: Document): string => {
  const birthPlace = xpath.select1(
    "*[name()='birthplace']/*[name()='place']/*[name()='addr']",
    patient
  ) as Document | undefined;

  if (!birthPlace) return "";

  return getAddress(birthPlace);
};
