import { format, formatISO, isValid, parse, parseISO } from "date-fns";

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
// C-CDA date to ISO Date
export function ccdaDatetimeToISO(date: string): Date | undefined {
  if (!date) return undefined;
  return parseISO(`${date.substring(0, 8)} ${date.substring(8)}`);
}
// Takes ISO Date and converts to string date.
export function displayDateTimeasString(date: Date | undefined): string {
  if (!date) return "";
  try {
    return format(new Date(date), "MMMM dd, yyyy HH:mm:ss").replace(
      "00:00:00",
      ""
    );
  } catch {
    return "";
  }
}
