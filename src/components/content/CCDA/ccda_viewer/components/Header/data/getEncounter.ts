import xpath from "xpath";
import { getId, getPeriod } from "../../../helpers";
import { LabelValueType } from "../../../types";
import { ccdaDatetimeToISO, displayDateTimeasString } from "@/fhir/formatters";

export const getEncounter = (
  document: Document
): LabelValueType[] | undefined => {
  const encompassingEncounter = xpath.select1(
    "*[name()='ClinicalDocument']/*[name()='componentOf']/*[name()='encompassingEncounter']",
    document
  ) as Document | undefined;

  if (!encompassingEncounter) return undefined;

  const id = getId(
    xpath.select1("*[name()='id']", encompassingEncounter) as Document
  );

  const type = String(
    xpath.select1(
      "string(*[name()='code']/@displayName)",
      encompassingEncounter
    ) as Document
  );

  const period = getPeriod(
    xpath.select1(
      "*[name()='effectiveTime']",
      encompassingEncounter
    ) as Document
  );

  return [
    {
      label: "ID:",
      value: period.start || period.end || id ? id || "Unknown" : "",
    },
    { label: "Type:", value: type },
    {
      label: "Date/Time:",
      value:
        period.start || period.end
          ? `from ${
              period.start
                ? displayDateTimeasString(ccdaDatetimeToISO(period.start))
                : "unknown"
            } to ${
              period.end
                ? displayDateTimeasString(ccdaDatetimeToISO(period.end))
                : "unknown"
            }`
          : "",
    },
  ];
};
