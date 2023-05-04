import { Observation } from "fhir/r4";
import * as dr from "./diagnostic-report";

const syntheticObservation = (): Observation => ({
  resourceType: "Observation",
  status: "unknown",
  code: {},
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
});
