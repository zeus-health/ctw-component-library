import { format, formatISO, isValid, parse, parseISO } from "date-fns";
import { compact } from "@/utils/nodash/fp";

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
  return compact([value, unit]).join(" ");
}

// Formats a string ISO date to MM/DD/YYY.
export function formatISODateStringToDate(dateStr?: string): string | undefined {
  if (!dateStr) return undefined;

  const day = dateStr.substring(8, 10);
  const month = dateStr.substring(5, 7);
  const year = dateStr.substring(0, 4);

  return `${month}/${day}/${year}`;
}

export function formatDate(dateStr: string | undefined, pattern: string): string | undefined {
  if (!dateStr) return undefined;

  return format(new Date(dateStr), pattern);
}
