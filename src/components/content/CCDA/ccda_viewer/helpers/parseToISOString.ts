import { isFinite } from "lodash";

/**
 * Estimates the index of the timezone sign counting from the end of the string and the type of the sign itself ("-" or "+")
 *
 *
 * @param date - Raw date from C-CDA
 * @returns Index of the timezone signs from the end and sign timezone itself
 *
 */
const getIndexFromEnd = (
  date: string
): { index: number; timezoneSign?: "+" | "-" } => {
  const rawDate = date.replace(/:/g, "");
  const plusSign = rawDate.lastIndexOf("+");
  const minusSign = rawDate.lastIndexOf("-");

  if (plusSign > 0)
    // need to subtract 1 to count the array from the end from 0 index
    return { index: rawDate.length - plusSign - 1, timezoneSign: "+" };

  if (minusSign > 0) {
    // check if "-" sign is for timezone, it is needed to correctly parse such date 2013-02-2209
    const signOnThreePlacesLeft = rawDate[minusSign - 3];
    if (
      isFinite(Number(signOnThreePlacesLeft)) ||
      signOnThreePlacesLeft === "T" // needed to correctly parse such date 2013-02-22T09-05:00
    )
      // need to subtract 1 to count the array from the end from 0 index
      return { index: rawDate.length - minusSign - 1, timezoneSign: "-" };

    return { index: -1 };
  }
  return { index: -1 };
};

/**
 * Checks if fragment of the date is valid.
 *
 *
 * @param fragment - Fragment of the date (year, month, day, hour, minute, second)
 * @returns True if valid, otherwise false
 *
 */
const isCorrectValue = (fragment: string) =>
  fragment &&
  fragment.length > 1 &&
  fragment.split("").every((char) => isFinite(Number(char)));

const constructISOString = ({
  year,
  month,
  day,
  hour,
  minute,
  second,
  timezoneHour,
  timezoneMinute,
  timezoneSign,
}: {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  second: string;
  timezoneHour: string;
  timezoneMinute: string;
  timezoneSign: string | undefined;
}): string => {
  let result = "";

  if (isCorrectValue(year)) {
    result += year;
    if (isCorrectValue(month)) {
      result += `-${month}`;
      if (isCorrectValue(day)) {
        result += `-${day}`;
        if (isCorrectValue(hour)) {
          result += `T${hour}`;

          if (isCorrectValue(minute)) result += `:${minute}`;
          else result += ":00";

          if (isCorrectValue(second)) result += `:${second}`;
          else result += ":00";

          if (timezoneSign && isCorrectValue(timezoneHour)) {
            result += `${timezoneSign}${timezoneHour}`;
            if (isCorrectValue(timezoneMinute)) result += `:${timezoneMinute}`;
            else result += ":00";
          } else result += "-00:00";
        } else result += "T00:00:00-00:00";
      }
    }
  }
  return result;
};

/**
 * Convert a raw date from C-CDA to ISOString.
 *
 *
 * @param rawDate - Raw date from C-CDA
 * @returns Date in ISOString format
 *
 */
export const parseToISOString = (rawDate: string): string => {
  if (!rawDate) return "";

  const { index, timezoneSign } = getIndexFromEnd(rawDate);
  // delete all junk that can be in date in C-CDA document
  let date = rawDate
    .replace(/T/g, "")
    .replace(/-/g, "")
    // plus sign can be only once, no need for regexp
    .replace("+", "")
    .replace(/:/g, "");

  let timezone = "";

  // if sign index from the end is equal to 4 (-0500) or 2 (-05) and date has at least hour it means that there is a timezone
  if ((index === 4 || index === 2) && date.length > 9) {
    timezone = date.substring(date.length - index);
    date = date.substring(0, date.length - index);
  }

  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);
  const hour = date.slice(8, 10);
  const minute = date.slice(10, 12);
  const second = date.slice(12, 14);

  const timezoneHour = timezone.slice(0, 2);
  const timezoneMinute = timezone.slice(2);

  if (!day) return "";

  return constructISOString({
    year,
    month,
    day,
    hour,
    minute,
    second,
    timezoneHour,
    timezoneMinute,
    timezoneSign,
  });
};
