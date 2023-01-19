import xpath from "xpath";
import { isEmpty } from "@/utils/nodash";

export const getRace = (patient: Document): string => {
  const race = xpath.select1("*[name()='raceCode']", patient) as
    | Document
    | undefined;

  if (race) return String(xpath.select1("string(@displayName)", race));

  const detailedRace = xpath.select(
    "*[name()='sdtc:raceCode']",
    patient
  ) as Document[];

  if (isEmpty(detailedRace)) return "";

  return String(xpath.select1("string(@displayName)", detailedRace[0]));
};
