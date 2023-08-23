import {
  formatAge,
  formatPeriod,
  formatPhoneNumber,
  formatQuantity,
  formatRange,
} from "./formatters";

describe("formatters", () => {
  describe("formatAge", () => {
    test("returns formatted string when zero is the age", () => {
      const age: fhir4.Age = {
        value: 0,
        unit: "years",
      };
      expect(formatAge(age)).toEqual("0 years");
    });

    test("returns formatted string when non-zero is the age", () => {
      const age: fhir4.Age = {
        value: 1,
        unit: "year",
      };
      expect(formatAge(age)).toEqual("1 year");
    });

    test("returns blank string when empty age", () => {
      const age: fhir4.Age = {};
      expect(formatAge(age)).toEqual("");
    });
  });

  test("formatPhoneNumber correctly formats phone number", () => {
    const phoneNumber = "1234567890";
    expect(formatPhoneNumber(phoneNumber)).toEqual("123-456-7890");
  });

  describe("formatPeriod", () => {
    test("returns formatted string when start and end exist", () => {
      const period: fhir4.Period = {
        start: "2022-01-01",
        end: "2022-01-31",
      };
      expect(formatPeriod(period)).toEqual("01/01/2022 - 01/31/2022");
    });

    test("returns blank when neither start nor end exist", () => {
      const period: fhir4.Period = {};
      expect(formatPeriod(period)).toEqual("");
    });

    test("just returns start when end doesn't exist", () => {
      const period: fhir4.Period = {
        start: "2022-01-01",
      };
      expect(formatPeriod(period)).toEqual("01/01/2022");
    });

    test("just returns end when start doesn't exist", () => {
      const period: fhir4.Period = {
        end: "2022-01-31",
      };
      expect(formatPeriod(period)).toEqual("01/31/2022");
    });
  });

  describe("formatRange", () => {
    test("returns 'low - high unit' when values and units exist", () => {
      const range = {
        low: { value: 1.2, unit: "mmol/L" },
        high: { value: 3.4, unit: "mmol/L" },
      };
      expect(formatRange(range)).toEqual("1.2 - 3.4 mmol/L");
    });

    test("returns 'low unit - high unit' when units differ", () => {
      const range = {
        low: { value: 1.2, unit: "l/L" },
        high: { value: 3.4, unit: "mmol/L" },
      };
      expect(formatRange(range)).toEqual("1.2 l/L - 3.4 mmol/L");
    });

    test("returns single unit at end when only one unit exists", () => {
      const range = {
        low: { value: 1.2 },
        high: { value: 3.4, unit: "mmol/L" },
      };
      expect(formatRange(range)).toEqual("1.2 - 3.4 mmol/L");
      const range2 = {
        low: { value: 1.2, unit: "mmol/L" },
        high: { value: 3.4 },
      };
      expect(formatRange(range2)).toEqual("1.2 - 3.4 mmol/L");
    });

    test("returns no units when neither have units", () => {
      const range = {
        low: { value: 1.2 },
        high: { value: 3.4 },
      };
      expect(formatRange(range)).toEqual("1.2 - 3.4");
    });

    test("returns single value when one value is undefined", () => {
      const range = {
        low: {},
        high: { value: 3.4, unit: "mmol/L" },
      };
      expect(formatRange(range)).toEqual("3.4 mmol/L");
    });

    test("returns blank if no values exist", () => {
      const range2 = {
        low: {},
        high: {},
      };
      expect(formatRange(range2)).toEqual("");
    });
  });

  describe("formatQuantity", () => {
    test("returns formatted string when value and unit are provided", () => {
      const quantity: fhir4.Quantity = {
        value: 1.2,
        unit: "mg",
      };
      expect(formatQuantity(quantity)).toEqual("1.2 mg");
    });

    test("returns formatted string when only value is provided", () => {
      const quantity: fhir4.Quantity = {
        value: 1.2,
      };
      expect(formatQuantity(quantity)).toEqual("1.2");
    });

    test("returns empty string when no value is provided", () => {
      const quantity: fhir4.Quantity = {};
      expect(formatQuantity(quantity)).toEqual("");
    });

    test("returns 0% string when value is zero", () => {
      const quantity: fhir4.Quantity = {
        value: 0,
        unit: "%",
      };
      expect(formatQuantity(quantity)).toEqual("0 %");
    });
  });
});
