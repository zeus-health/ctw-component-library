import xpath from "xpath";
import { getId } from "../../helpers";
import { LabelValueType } from "../../types";
import { getEncounter } from "../Header/data/getEncounter";

export const getEncounterData = (document: Document) => {
  const encompassingEncounter = xpath.select1(
    "*[name()='ClinicalDocument']/*[name()='componentOf']/*[name()='encompassingEncounter']",
    document
  ) as Document | undefined;

  if (!encompassingEncounter) return undefined;

  const encounter = getEncounter(document) as LabelValueType[];

  const dischargeDisposition = String(
    xpath.select1(
      "string(*[name()='dischargeDispositionCode']/@displayName)",
      encompassingEncounter
    )
  );

  const encounterLocation = getId(
    xpath.select1(
      "*[name()='location']/*[name()='healthCareFacility']/*[name()='id']",
      encompassingEncounter
    ) as Document
  );

  return {
    id: encounter[0], // we now that they are returned in that order
    type: encounter[1],
    dateTime: encounter[2],
    dischargeDisposition,
    encounterLocation: encounterLocation ? `ID: ${encounterLocation}` : null,
  };
};
