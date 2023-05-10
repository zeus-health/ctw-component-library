import { Coding, DiagnosticReport, Observation } from "fhir/r4";
import * as dr from "./diagnostic-report";

const syntheticObservation = (): Observation => ({
  resourceType: "Observation",
  status: "unknown",
  code: {},
});

const syntheticDiagnosticReport = (codings: Coding[], text?: string): DiagnosticReport => ({
  code: {
    coding: codings,
    text,
  },
  resourceType: "DiagnosticReport",
  status: "final",
});

// This is a workaround to having to build a separate builder pattern for the entire
// observation
const set = <T>(field: string, x: T, v: unknown): T => ({
  ...x,
  [`${field}`]: v,
});

describe("Diagnostic Report Model Tests", () => {
  describe("filter falsy tests", () => {
    const table = [
      [["a", undefined], ["a"]],
      [[undefined], []],
      [[undefined, "b"], ["b"]],
      [[undefined, undefined], []],
      [
        ["a", "b"],
        ["a", "b"],
      ],
    ];

    test.each(table)("%v => %v", (input, expectedOutput) => {
      expect(dr.filterOutFalsy(input)).toStrictEqual(expectedOutput);
    });
  });

  describe("infer start date", () => {
    interface TestType {
      obs: (Observation | undefined)[] | undefined;
      expectedValue: string | undefined;
    }

    const table: TestType[] = [
      {
        expectedValue: undefined,
        obs: undefined,
      },
      {
        expectedValue: "04/01/2022",
        obs: [
          set("effectiveDateTime", syntheticObservation(), "2022-04-02"),
          set("effectiveDateTime", syntheticObservation(), "2022-04-01"),
        ],
      },
      {
        expectedValue: "04/01/2022",
        obs: [undefined, set("effectiveDateTime", syntheticObservation(), "2022-04-01")],
      },
      {
        expectedValue: "04/01/2022",
        obs: [
          undefined,
          set("effectivePeriod", syntheticObservation(), { start: "2022-04-01", end: undefined }),
        ],
      },
    ];

    test.each(table)("%v => %v", (tc) => {
      expect(dr.inferStartDateFromResults(tc.obs)).toStrictEqual(tc.expectedValue);
    });
  });

  describe("Display", () => {
    interface TestType {
      dr: DiagnosticReport;
      expectedDisplay: string;
    }

    const table: TestType[] = [
      {
        dr: syntheticDiagnosticReport([
          {
            code: "NA",
            system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
            display: "not applicable",
          },
        ]),
        expectedDisplay: "not applicable",
      },
      {
        dr: syntheticDiagnosticReport([
          {
            code: "4548-4",
            display: "Hgb A1c Fr Bld",
            system: "http://loinc.org",
          },
          {
            code: "4548-4",
            display: "Hemoglobin A1c/Hemoglobin.total in Blood",
            extension: [
              {
                url: "https://zusapi.com/terminology/enrichment",
                valueString: "LOINC Standardization",
              },
            ],
            system: "http://loinc.org",
            userSelected: false,
          },
        ]),
        expectedDisplay: "Hemoglobin A1c/Hemoglobin.total in Blood",
      },
      {
        dr: syntheticDiagnosticReport([
          {
            code: "4548-4",
            display: "Hgb A1c Fr Bld",
            system: "http://loinc.org",
          },
          {
            code: "4548-4",
            display: "Hemoglobin A1c/Hemoglobin.total in Blood",
            system: "http://loinc.org",
            userSelected: false,
          },
        ]),
        expectedDisplay: "Hgb A1c Fr Bld",
      },
    ];

    test.each(table)("%v => %v", (tc) => {
      const drModel = new dr.DiagnosticReportModel(tc.dr);
      expect(drModel.displayName).toStrictEqual(tc.expectedDisplay);
    });
  });
});
