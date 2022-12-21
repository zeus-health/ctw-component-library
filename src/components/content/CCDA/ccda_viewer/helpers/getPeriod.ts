import { isBefore, isEqual } from "date-fns";
import { Period } from "fhir/r4";
import xpath from "xpath";
import { ccdaDatetimeToISO, displayDateTimeasString } from "@/fhir/formatters";

export const getPeriod = (xmlData?: Document): Period => {
  if (!xmlData) return {};

  const low = String(xpath.select1("string(*[name()='low']/@value)", xmlData));
  const high = String(
    xpath.select1("string(*[name()='high']/@value)", xmlData)
  );

  if (!low && !high) return {};

  if (low && !high) {
    return {
      start: displayDateTimeasString(ccdaDatetimeToISO(low)),
    };
  }

  if (!low && high) {
    return {
      end: displayDateTimeasString(ccdaDatetimeToISO(high)),
    };
  }

  let start = displayDateTimeasString(ccdaDatetimeToISO(low));
  let end = displayDateTimeasString(ccdaDatetimeToISO(high));

  // it indicates that at least on of the dates has minutes so both have to be parsed to iso string
  if (start.includes("T") || end.includes("T")) {
    start = displayDateTimeasString(ccdaDatetimeToISO(start));
    end = displayDateTimeasString(ccdaDatetimeToISO(end));
  }

  if (
    isBefore(new Date(start), new Date(end)) ||
    isEqual(new Date(start), new Date(end))
  ) {
    return { start, end };
  }

  return { start };
};
