import { format, formatISO, parse, parseISO } from "date-fns";

// Formats a date from YYYY-MM-DD to MM/DD/YYYY.
export function formatDateISOToLocal(dateStr?: string): string | undefined {
  if (!dateStr) return undefined;

  const date = parseISO(dateStr);
  return format(date, "P");
}

// Formats a date from MM/DD/YYYY to YYYY-MM-DD.
export function formatDateLocalToISO(dateStr?: string): string | undefined {
  if (!dateStr) return undefined;
  try {
    const date = parse(dateStr, "P", new Date());
    return formatISO(date, { representation: "date" });
  } catch (e) {
    return dateStr;
  }
}

// Returns the ISO string (YYYY-MM-DD) for a given date.
// We avoid using date-fn's format method to avoid timezone issues.
export function dateToISO(date: Date) {
  return date.toISOString().split("T")[0];
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
