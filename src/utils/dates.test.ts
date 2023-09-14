import { parseISO } from "date-fns";
import { parseWithoutFormat } from "./dates";

describe("date parsing tests", () => {
  const tests = [
    {
      name: "iso, no locale, seconds",
      input: "2023-04-07T12:34:45",
      expected: parseISO("2023-04-07T12:34:45"),
    },
    {
      name: "iso, UTC locale, seconds",
      input: "2023-04-07T12:34:45Z",
      expected: parseISO("2023-04-07T12:34:45Z"),
    },

    {
      name: "iso, NYC EST locale, seconds",
      input: "2023-04-07T12:34:45-04:00",
      expected: parseISO("2023-04-07T12:34:45-04:00"),
    },
    {
      name: "us format, no locale, seconds",
      input: "04/07/2023 13:34:45",
      expected: parseISO("2023-04-07T13:34:45-04:00"),
    },
    {
      name: "us format, no locale, mins",
      input: "04/07/2023 3:34 PM",
      expected: parseISO("2023-04-07T15:34:00-04:00"),
    },
    {
      name: "us format, no locale, mins, no padded zeroes",
      input: "4/7/2023 3:34 PM",
      expected: parseISO("2023-04-07T15:34:00-04:00"),
    },
    {
      name: "us format, no locale, mins, no padded zeroes",
      input: "4/7/2023 15:34",
      expected: parseISO("2023-04-07T15:34:00-04:00"),
    },
  ];

  test.each(tests)("$name", ({ input, expected }) => {
    const actual = parseWithoutFormat(input);
    expect(expected).toEqual(actual);
  });
});
