import { faker } from "@faker-js/faker";
import { Coding, DiagnosticReport, Observation, Reference } from "fhir/r4";
import * as dr from "./diagnostic-report";
import { ObservationModel } from "./observation";
import { SYSTEM_CPT, SYSTEM_LOINC } from "../system-urls";

const syntheticObservation = (coding: Coding[], text?: string): Observation => ({
  id: faker.datatype.uuid(),
  resourceType: "Observation",
  status: "final",
  code: {
    coding,
    text,
  },
});

const syntheticDiagnosticReport = (coding: Coding[], text?: string): DiagnosticReport => ({
  id: faker.datatype.uuid(),
  code: {
    coding,
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

  describe("constructor", () => {
    let d: DiagnosticReport;
    let o1: ObservationModel;
    let o2: ObservationModel;
    let o3: ObservationModel;
    let o4: ObservationModel;

    beforeEach(() => {
      d = syntheticDiagnosticReport([]);
      o1 = new ObservationModel(
        syntheticObservation([
          {
            code: "17856-6", // a1c
            system: SYSTEM_LOINC,
          },
        ])
      );
      o2 = new ObservationModel(
        syntheticObservation([
          {
            code: "4548-4", // a1c
            system: SYSTEM_LOINC,
          },
        ])
      );
      o3 = new ObservationModel(
        syntheticObservation([
          {
            code: "2345-7", // glucose
            system: SYSTEM_LOINC,
          },
        ])
      );
      o4 = new ObservationModel(
        syntheticObservation([
          {
            code: "2345-7", // glucose
            system: SYSTEM_LOINC,
          },
        ])
      );
    });

    test("no trends", () => {
      const model = new dr.DiagnosticReportModel(d, undefined, undefined, []);
      expect(model.hasTrends).toBe(false);
      expect(model.observations).toEqual([]);
    });

    test("unassociated trends", () => {
      d.result = [o1 as Reference, o3 as Reference];
      const model = new dr.DiagnosticReportModel(d, undefined, undefined, [o1, o3]);
      expect(model.hasTrends).toBe(false);
      expect(model.observations).toHaveLength(2);
      expect(model.observations[0].trends).toEqual([o1]);
      expect(model.observations[1].trends).toEqual([o3]);
    });

    test("associated trends", () => {
      d.result = [o1 as Reference, o3 as Reference];
      const model = new dr.DiagnosticReportModel(d, undefined, undefined, [o1, o2, o3, o4]);
      expect(model.hasTrends).toBe(true);
      expect(model.observations).toHaveLength(2);
      expect(model.observations[0].trends).toEqual([o1, o2]);
      expect(model.observations[1].trends).toEqual([o3, o4]);
    });

    test("associated trends w/ incorrectly coded glucose (LOINC)", () => {
      d = syntheticDiagnosticReport([
        {
          code: "4548-4",
          system: SYSTEM_LOINC,
        },
      ]);
      o3 = new ObservationModel(
        syntheticObservation([
          {
            code: "2345-7", // glucose
            system: SYSTEM_LOINC,
          },
        ])
      );
      d.result = [o3 as Reference];
      const model = new dr.DiagnosticReportModel(d, undefined, undefined, [o3, o4]);
      expect(model.hasTrends).toBe(false);
      expect(model.observations).toHaveLength(1);
      expect(model.observations[0].trends).toHaveLength(0);
    });

    test("associated trends w/ incorrectly coded glucose (CPT)", () => {
      d = syntheticDiagnosticReport([
        {
          code: "83036",
          system: SYSTEM_CPT,
        },
      ]);
      o3 = new ObservationModel(
        syntheticObservation([
          {
            code: "2345-7", // glucose
            system: SYSTEM_LOINC,
          },
        ])
      );
      d.result = [o3 as Reference];
      const model = new dr.DiagnosticReportModel(d, undefined, undefined, [o3, o4]);
      expect(model.hasTrends).toBe(false);
      expect(model.observations).toHaveLength(1);
      expect(model.observations[0].trends).toHaveLength(0);
    });

    test("associated trends w/ incorrectly coded glucose (display)", () => {
      d = syntheticDiagnosticReport([
        {
          display: "a1c",
        },
      ]);
      d.result = [o3 as Reference];
      const model = new dr.DiagnosticReportModel(d, undefined, undefined, [o3, o4]);
      expect(model.hasTrends).toBe(false);
      expect(model.observations).toHaveLength(1);
      expect(model.observations[0].trends).toHaveLength(0);
    });

    test("associated trends w/ incorrectly and correctly coded glucose", () => {
      d = syntheticDiagnosticReport([
        {
          display: "a1c",
        },
      ]);
      d.result = [o1 as Reference, o3 as Reference];
      const model = new dr.DiagnosticReportModel(d, undefined, undefined, [o1, o2, o3, o4]);
      expect(model.hasTrends).toBe(true);
      expect(model.observations).toHaveLength(2);
      expect(model.observations[0].trends).toEqual([o1, o2]);
      expect(model.observations[1].trends).toHaveLength(0);
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
          set("effectiveDateTime", syntheticObservation([]), "2022-04-02"),
          set("effectiveDateTime", syntheticObservation([]), "2022-04-01"),
        ],
      },
      {
        expectedValue: "04/01/2022",
        obs: [undefined, set("effectiveDateTime", syntheticObservation([]), "2022-04-01")],
      },
      {
        expectedValue: "04/01/2022",
        obs: [
          undefined,
          set("effectivePeriod", syntheticObservation([]), { start: "2022-04-01", end: undefined }),
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
