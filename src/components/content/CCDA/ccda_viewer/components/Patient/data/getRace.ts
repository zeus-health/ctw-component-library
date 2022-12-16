import { isEmpty } from "lodash";
import xpath from "xpath";

export const getRace = (patient: Document): string => {
  const race = xpath.select1("*[name()='raceCode']", patient) as Document;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (race) return String(xpath.select1("string(@displayName)", race));

  const detailedRace = xpath.select(
    "*[name()='sdtc:raceCode']",
    patient
  ) as Document[];

  if (isEmpty(detailedRace)) return "";

  return String(xpath.select1("string(@displayName)", detailedRace[0]));
};
