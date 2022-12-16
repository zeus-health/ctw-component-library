import { isBefore, isEqual } from "date-fns";
import { Period } from "fhir/r4";
import xpath from "xpath";
import { parseToISOString } from "./parseToISOString";

export const getPeriod = (xmlData: Document): Period => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!xmlData) return {};

  const low = String(xpath.select1("string(*[name()='low']/@value)", xmlData));
  const high = String(
    xpath.select1("string(*[name()='high']/@value)", xmlData)
  );

  if (!low && !high) return {};

  if (low && !high) {
    return {
      start: parseToISOString(low),
    };
  }

  if (!low && high) {
    return {
      end: parseToISOString(high),
    };
  }

  let start = parseToISOString(low);
  let end = parseToISOString(high);

  // it indicates that at least on of the dates has minutes so both have to be parsed to iso string
  if (start.includes("T") || end.includes("T")) {
    start = parseToISOString(start);
    end = parseToISOString(end);
  }

  if (
    isBefore(new Date(start), new Date(end)) ||
    isEqual(new Date(start), new Date(end))
  ) {
    return { start, end };
  }

  return { start };
};
