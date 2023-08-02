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
      const diagnosticReport = new DiagnosticReportModel(syntheticDiagnosticReport([]));
      const resource = syntheticObservation([
        {
          code: "2345-7", // glucose
          system: SYSTEM_LOINC,
        },
      ]);
      const model = new ObservationModel(resource);
      model.diagnosticReport = diagnosticReport;
      expect(model.trends).toBeUndefined();
    });

    test("unassociated trends", () => {
      const diagnosticReport = new DiagnosticReportModel(syntheticDiagnosticReport([]));
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
      const trends = [resource1, resource2].map((r) => {
        const trend = new ObservationModel(r);
        trend.diagnosticReport = diagnosticReport;
        return trend;
      });
      const model = new ObservationModel(resource1);
      model.diagnosticReport = diagnosticReport;
      model.setTrends(trends);
      expect(model.trends).toEqual([trends[0]]);
    });

    test("associated trends", () => {
      const diagnosticReport = new DiagnosticReportModel(syntheticDiagnosticReport([]));
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
      const trends = [resource1, resource2].map((r) => {
        const trend = new ObservationModel(r);
        trend.diagnosticReport = diagnosticReport;
        return trend;
      });
      const model = new ObservationModel(resource1);
      model.diagnosticReport = diagnosticReport;
      model.setTrends(trends);
      expect(model.trends).toEqual(trends);
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
      const trends = [resource1, resource2].map((r) => {
        const trend = new ObservationModel(r);
        trend.diagnosticReport = diagnosticReport;
        return trend;
      });
      const model = new ObservationModel(resource1);
      model.diagnosticReport = diagnosticReport;
      model.setTrends(trends);
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
      const trends = [trend1, trend2].map((t) => {
        const trend = t;
        trend.diagnosticReport = diagnosticReport;
        return t;
      });
      const model = new ObservationModel(resource1);
      model.diagnosticReport = diagnosticReport;
      model.setTrends(trends);
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
      const trends = [resource1, resource2].map((r) => {
        const trend = new ObservationModel(r);
        trend.diagnosticReport = diagnosticReport;
        return trend;
      });
      const model = new ObservationModel(resource1);
      model.diagnosticReport = diagnosticReport;
      model.setTrends(trends);
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
      const trends = [resource1, resource2, resource3, resource4].map((r) => {
        const trend = new ObservationModel(r);
        trend.diagnosticReport = diagnosticReport;
        return trend;
      });
      const model = new ObservationModel(resource3);
      model.diagnosticReport = diagnosticReport;
      model.setTrends(trends);
      expect(model.trends).toEqual([trends[2], trends[3]]);
    });
  });
});
