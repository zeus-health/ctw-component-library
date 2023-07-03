import { useEffect, useState } from "react";
import { useBasic } from "./basic";
import { getIncludedResources } from "./bundle";
import { PatientModel } from "./models";
import { ImmunizationModel } from "./models/immunization";
import { searchCommonRecords } from "./search-helpers";
import { useFeatureFlaggedQueryWithPatient } from "..";
import { applyImmunizationFilters } from "@/components/content/immunizations/helpers/filters";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { useFQSFeatureToggle } from "@/hooks/use-fqs-feature-toggle";
import { createGraphqlClient } from "@/services/fqs/client";
import {
  ImmunizationGraphqlResponse,
  immunizationsQuery,
} from "@/services/fqs/queries/immunizations";
import { QUERY_KEY_PATIENT_IMMUNIZATIONS } from "@/utils/query-keys";
import { Telemetry } from "@/utils/telemetry";

export function usePatientImmunizations() {
  const fqs = useFQSFeatureToggle("immunizations");
  const [immunizations, setImmunizations] = useState<ImmunizationModel[]>([]);

  const patientImmunizationsQuery = useFeatureFlaggedQueryWithPatient(
    QUERY_KEY_PATIENT_IMMUNIZATIONS,
    [],
    "immunizations",
    "req.timing.immunizations",
    getImmunizationFromFQS,
    getImmunizationFromODS
  );

  const basicsQuery = useBasic(fqs);

  useEffect(() => {
    const patientImmunizations = patientImmunizationsQuery.data ?? [];
    const basics = basicsQuery.data ?? [];
    // If basic data came back from the above useBasic call, manually map any basic data to the condition
    // it corresponds to.
    if (basics.length > 0) {
      patientImmunizations.forEach((a, i) => {
        const filteredBasics = basics.filter(
          (b) => b.subject?.reference === `Immunization/${a.id}`
        );
        patientImmunizations[i].revIncludes = filteredBasics;
      });
    }

    setImmunizations([...patientImmunizations]); // spread syntax here needed to make sure the array is a new reference in order to trigger a re-render
  }, [basicsQuery.data, patientImmunizationsQuery.data]);

  const isLoading = patientImmunizationsQuery.isLoading || basicsQuery.isLoading;
  const isError = patientImmunizationsQuery.isError || basicsQuery.isError;
  const isFetching = patientImmunizationsQuery.isFetching || basicsQuery.isFetching || !fqs.ready;
  return {
    isLoading,
    isError,
    isFetching,
    data: immunizations,
  };
}

async function getImmunizationFromFQS(requestContext: CTWRequestContext, patient: PatientModel) {
  try {
    const graphClient = createGraphqlClient(requestContext);
    const { data } = await fqsRequest<ImmunizationGraphqlResponse>(
      graphClient,
      immunizationsQuery,
      {
        upid: patient.UPID,
        cursor: "",
        first: 1000,
        sort: {
          lastUpdated: "DESC",
        },
      }
    );
    const nodes = data.ImmunizationConnection.edges.map((x) => x.node);
    const results = applyImmunizationFilters(nodes, requestContext.builderId);
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
    const { bundle, resources: immunizations } = await searchCommonRecords(
      "Immunization",
      requestContext,
      {
        patientUPID: patient.UPID,
      }
    );
    const includedResources = getIncludedResources(bundle);
    const results = applyImmunizationFilters(
      immunizations,
      requestContext.builderId,
      includedResources
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
