import { format, formatISO, isValid, parse, parseISO } from "date-fns";
import { filter } from "@/utils/nodash/fp";

// Formats a date from YYYY-MM-DD to MM/DD/YYYY.
export function formatDateISOToLocal(dateStr?: string): string | undefined {
  if (!dateStr) return undefined;

  const date = parseISO(dateStr);
  return format(date, "P");
}

export const matchDatePattern = (dateStr: string): Date | string => {
  const patterns = ["P", "yyyyMMddHHmm"];

  // Going to try to parse all the patterns and if pattern is not recognized then will return date as is
  for (let i = 0; i < patterns.length; i += 1) {
    const parsedDate = parse(dateStr, patterns[i], new Date());
    if (isValid(parsedDate)) {
      return parsedDate;
    }
  }

  return dateStr;
};

// Formats a date from MM/DD/YYYY to YYYY-MM-DD.
export function formatDateLocalToISO(dateStr?: string): string | undefined {
  if (!dateStr) return undefined;

  const date = matchDatePattern(dateStr);
  if (date instanceof Date) {
    return formatISO(date, { representation: "date" });
  }

  return date;
}

// Formats a string yyyymmdd or yyyyMMddHHmmss into MM/DD/YYYY.
export function formatStringToDate(dateStr?: string): string | undefined {
  if (!dateStr) return undefined;

  const month = dateStr.substring(4, 6);
  const day = dateStr.substring(6, 8);
  const year = dateStr.substring(0, 4);

  return `${month}/${day}/${year}`;
}

// Returns the ISO string (YYYY-MM-DD) for a given date.
// We avoid using date-fn's format method to avoid timezone issues.
export function dateToISO(date?: Date) {
  if (date) {
    return date.toISOString().split("T")[0];
  }

  return undefined;
}

// Takes a phone number of any format and returns it in 555-555-5555 format.
export function formatPhoneNumber(phoneNumber?: string): string | undefined {
  if (!phoneNumber) return undefined;

  // Remove all non digits.
  const cleaned = phoneNumber.replace(/\D/g, "");

  // Match our group of digits.
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  // Return the new format OR the original if we don't have a match.
  // This would happen if we didn't have the expected 10 digits.
  return match ? `${match[1]}-${match[2]}-${match[3]}` : phoneNumber;
}

// Tries to format a date string from either YYYYMMDD or YYYYMMDDkkmmss
// to MM/DD/YYYY kk:mm:ss.
export function maybeFormatDateStringToLocal(dateStr?: string): string | undefined {
  if (dateStr && /^\d+$/.test(dateStr) && dateStr.length >= 8) {
    let result = "";
    try {
      result = format(parse(dateStr.substring(0, 8), "yyyyMMdd", new Date()), "P");
      // eslint-disable-next-line no-empty
    } catch {}

    // Check if there's a time component and add it.
    // Result will be MM/DD/YYY kk:mm:ss.
    if (dateStr.length === 14) {
      try {
        result += ` ${format(parse(dateStr.substring(9, 15), "kkmmss", new Date()), "kk:mm:ss")}`;
        // eslint-disable-next-line no-empty
      } catch {}
    }
    return result;
  }

  return dateStr;
}

// Formats an age as value followed by unit, or whichever one is available.
export function formatAge(age: fhir4.Age): string {
  const { value, unit } = age;
  return compactToTruthyAndZero([value, unit]).join(" ");
}

// Formats a string ISO date to MM/DD/YYY.
export function formatISODateStringToDate(dateStr?: string | number): string | undefined {
  if (!dateStr) return undefined;
  const ensureJsTimestamp = (n: number) => (`${n}`.length <= 11 ? n * 1000 : n);
  const date =
    typeof dateStr === "number" ? new Date(ensureJsTimestamp(dateStr)).toISOString() : dateStr;

  const day = date.substring(8, 10);
  const month = date.substring(5, 7);
  const year = date.substring(0, 4);

  return `${month}/${day}/${year}`;
}

export function formatDate(dateStr: string | undefined, pattern: string): string | undefined {
  if (!dateStr) return undefined;

  return format(new Date(dateStr), pattern);
}

export function formatPeriod(period: fhir4.Period) {
  const { start, end } = period;
  if (!start && !end) return "";

  if (!start || !end) {
    return formatDateISOToLocal(start ?? end) ?? "";
  }

  return `${formatDateISOToLocal(start)} - ${formatDateISOToLocal(end)}`;
}

// Returns the low and high value and units of a range or unknown if not available.
// Examples:
// "" # blank when both low.value and high.value don't exist
// "2.4 mmol/L" # Shows single value when low or high is missing
// "1.2 l/L - 2.4 mmol/L" # Shows both units if they both exist and are different
// "1.2 - 2.4 mmol/L" # Shows single unit at end when one unit isn't provided
// "1.2 - 2.4" # Drops units when both low.unit and high.unit are not provided
export function formatRange(range: fhir4.Range) {
  const { low, high } = range;

  // No values, show blank.
  if (low?.value === undefined && high?.value === undefined) return "";

  const unit = low?.unit ?? high?.unit;
  const unitStr = unit ? ` ${unit}` : "";

  // Only one value, show that value and the unit if it exists.
  if (low?.value === undefined || high?.value === undefined) {
    const value = low?.value ?? high?.value ?? "";
    return `${value}${unitStr}`;
  }

  // Both values exist, show both values and both units if units exist and are different.
  if (low.unit !== undefined && high.unit !== undefined && low.unit !== high.unit) {
    return `${low.value} ${low.unit} - ${high.value} ${high.unit}`;
  }

  return `${low.value} - ${high.value}${unitStr}`;
}

export function formatQuantity(quantity: fhir4.Quantity) {
  const { value, unit } = quantity;
  return compactToTruthyAndZero([value, unit]).join(" ");
}

export const compactToTruthyAndZero = <T>(arr: T[] | null | undefined) =>
  filter(onlyTruthyAndZero, arr);

export function onlyTruthyAndZero(val: unknown | undefined) {
  return val || val === 0;
}
