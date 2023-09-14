import { parse, parseISO } from "date-fns";

const DATE_FORMATS = [
  // 04/17/1983 3:50:00.000 PM
  "MM/dd/yyyy h:mm:ss.SSS aa",
  // 04/17/1983 15:50:00.000
  "MM/dd/yyyy HH:mm:ss.SSS",
  // 04/17/1983 3:50:00 PM
  "MM/dd/yyyy h:mm:ss aa",
  // 04/17/1983 15:50:00
  "MM/dd/yyyy HH:mm:ss",
  // 04/17/1983 3:50 PM
  "MM/dd/yyyy h:mm aa",
  // 4/17/1983 3:50 PM
  "M/dd/yyyy h:mm aa",
  // 04/17/1983 15:50
  "MM/dd/yyyy HH:mm",
  // 4/17/1983 15:50
  "M/dd/yyyy HH:mm",
  // 04/17/1983
  "MM/dd/yyyy",
];

export const parseWithoutFormat = (dateTime: string): Date | undefined => {
  // first try ISO
  let retval = parseISO(dateTime);
  if (!Number.isNaN(retval.getMilliseconds())) {
    return retval;
  }

  // next try our custom patterns that we expect
  for (let dateFormatIdx = 0; dateFormatIdx < DATE_FORMATS.length; dateFormatIdx += 1) {
    const dateFormat = DATE_FORMATS[dateFormatIdx];
    retval = parse(dateTime, dateFormat, new Date());
    if (!Number.isNaN(retval.getMilliseconds())) {
      return retval;
    }
  }

  return undefined;
};
