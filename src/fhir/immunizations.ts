import { PatientModel } from "./models";
import { searchCommonRecords } from "./search-helpers";
import { useFeatureFlaggedQueryWithPatient } from "..";
import { applyImmunizationFilters } from "@/components/content/immunizations/helpers/filters";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { createGraphqlClient } from "@/services/fqs/client";
import {
  ImmunizationGraphqlResponse,
  immunizationsQuery,
} from "@/services/fqs/queries/immunizations";
import { orderBy } from "@/utils/nodash";
import { QUERY_KEY_PATIENT_IMMUNIZATIONS } from "@/utils/query-keys";
import { Telemetry } from "@/utils/telemetry";

export function usePatientImmunizations() {
  return useFeatureFlaggedQueryWithPatient(
    QUERY_KEY_PATIENT_IMMUNIZATIONS,
    [],
    "immunizations",
    "req.timing.immunizations",
    getImmunizationFromFQS,
    getImmunizationFromODS
  );
}

async function getImmunizationFromFQS(requestContext: CTWRequestContext, patient: PatientModel) {
  try {
    const graphClient = createGraphqlClient(requestContext);
    const data = (await graphClient.request(immunizationsQuery, {
      upid: patient.UPID,
      cursor: "",
      first: 1000,
      sort: {
        lastUpdated: "DESC",
      },
    })) as ImmunizationGraphqlResponse;
    const nodes = data.ImmunizationConnection.edges.map((x) => x.node);
    const results = orderBy(
      applyImmunizationFilters(nodes),
      [(model) => model.occurrence ?? ""],
      ["desc"]
    );
    if (results.length === 0) {
      Telemetry.countMetric("req.count.immunizations.none");
    }
    Telemetry.histogramMetric("req.count.immunizations", results.length);
    return results;
  } catch (e) {
    throw new Error(`Failed fetching immunization information for patient: ${e}`);
  }
}

async function getImmunizationFromODS(requestContext: CTWRequestContext, patient: PatientModel) {
  try {
    const { resources: immunizations } = await searchCommonRecords("Immunization", requestContext, {
      patientUPID: patient.UPID,
    });
    const results = orderBy(
      applyImmunizationFilters(immunizations),
      [(model) => model.occurrence ?? ""],
      ["desc"]
    );
    if (results.length === 0) {
      Telemetry.countMetric("req.count.immunizations.none");
    }
    Telemetry.histogramMetric("req.count.immunizations", results.length);
    return results;
  } catch (e) {
    throw new Error(`Failed fetching immunization information for patient: ${e}`);
  }
}
