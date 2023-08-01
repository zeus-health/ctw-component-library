import { faker } from "@faker-js/faker";
import { Coding, DiagnosticReport, Observation } from "fhir/r4";
import { DiagnosticReportModel } from "./diagnostic-report";
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

describe("ObservationModel", () => {
  describe("constructor", () => {
    test("no trends", () => {
      const resource = syntheticObservation([
        {
          code: "2345-7", // glucose
          system: SYSTEM_LOINC,
        },
      ]);
      const model = new ObservationModel(resource, []);
      expect(model.trends).toEqual([]);
    });

    test("unassociated trends", () => {
      const resource1 = syntheticObservation([
        {
          code: "2345-7", // glucose
          system: SYSTEM_LOINC,
        },
      ]);
      const resource2 = syntheticObservation([
        {
          code: "17856-6", // a1c
          system: SYSTEM_LOINC,
        },
      ]);
      const trend1 = new ObservationModel(resource1);
      const trend2 = new ObservationModel(resource2);
      const model = new ObservationModel(resource1, [trend1, trend2]);
      expect(model.trends).toEqual([trend1]);
    });

    test("associated trends", () => {
      const resource1 = syntheticObservation([
        {
          code: "2345-7", // glucose
          system: SYSTEM_LOINC,
        },
      ]);
      const resource2 = syntheticObservation([
        {
          code: "2345-7", // glucose
          system: SYSTEM_LOINC,
        },
      ]);
      const trend1 = new ObservationModel(resource1);
      const trend2 = new ObservationModel(resource2);
      const model = new ObservationModel(resource1, [trend1, trend2]);
      expect(model.trends).toEqual([trend1, trend2]);
    });

    test("associated trends w/ incorrectly coded glucose (LOINC)", () => {
      const diagnosticReport = new DiagnosticReportModel(
        syntheticDiagnosticReport([
          {
            code: "4548-4",
            system: SYSTEM_LOINC,
          },
        ])
      );
      const resource1 = syntheticObservation([
        {
          code: "2345-7", // glucose
          system: SYSTEM_LOINC,
        },
      ]);
      const resource2 = syntheticObservation([
        {
          code: "2345-7", // glucose
          system: SYSTEM_LOINC,
        },
      ]);
      const trend1 = new ObservationModel(resource1);
      const trend2 = new ObservationModel(resource2);
      const model = new ObservationModel(resource1, [trend1, trend2], diagnosticReport);
      expect(model.trends).toEqual([]);
    });

    test("associated trends w/ incorrectly coded glucose (CPT)", () => {
      const diagnosticReport = new DiagnosticReportModel(
        syntheticDiagnosticReport([
          {
            code: "83036",
            system: SYSTEM_CPT,
          },
        ])
      );
      const resource1 = syntheticObservation([
        {
          code: "2345-7", // glucose
          system: SYSTEM_LOINC,
        },
      ]);
      const resource2 = syntheticObservation([
        {
          code: "2345-7", // glucose
          system: SYSTEM_LOINC,
        },
      ]);
      const trend1 = new ObservationModel(resource1);
      const trend2 = new ObservationModel(resource2);
      const model = new ObservationModel(resource1, [trend1, trend2], diagnosticReport);
      expect(model.trends).toEqual([]);
    });

    test("associated trends w/ incorrectly coded glucose (display)", () => {
      const diagnosticReport = new DiagnosticReportModel(
        syntheticDiagnosticReport([
          {
            display: "a1c",
          },
        ])
      );
      const resource1 = syntheticObservation([
        {
          code: "2345-7", // glucose
          system: SYSTEM_LOINC,
        },
      ]);
      const resource2 = syntheticObservation([
        {
          code: "2345-7", // glucose
          system: SYSTEM_LOINC,
        },
      ]);
      const trend1 = new ObservationModel(resource1);
      const trend2 = new ObservationModel(resource2);
      const model = new ObservationModel(resource1, [trend1, trend2], diagnosticReport);
      expect(model.trends).toEqual([]);
    });

    test("associated trends w/ incorrectly and correctly coded glucose", () => {
      const diagnosticReport = new DiagnosticReportModel(
        syntheticDiagnosticReport([
          {
            display: "a1c",
          },
        ])
      );
      const resource1 = syntheticObservation([
        {
          code: "2345-7", // glucose
          system: SYSTEM_LOINC,
        },
      ]);
      const resource2 = syntheticObservation([
        {
          code: "2345-7", // glucose
          system: SYSTEM_LOINC,
        },
      ]);
      const resource3 = syntheticObservation([
        {
          code: "17856-6", // a1c
          system: SYSTEM_LOINC,
        },
      ]);
      const resource4 = syntheticObservation([
        {
          code: "4548-4", // a1c
          system: SYSTEM_LOINC,
        },
      ]);
      const trend1 = new ObservationModel(resource1);
      const trend2 = new ObservationModel(resource2);
      const trend3 = new ObservationModel(resource3);
      const trend4 = new ObservationModel(resource4);
      const model = new ObservationModel(
        resource3,
        [trend1, trend2, trend3, trend4],
        diagnosticReport
      );
      expect(model.trends).toEqual([trend3, trend4]);
    });
  });
});
