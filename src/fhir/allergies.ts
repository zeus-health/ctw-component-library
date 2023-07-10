import { useEffect, useState } from "react";
import { useBasic } from "./basic";
import { getIncludedResources } from "./bundle";
import { PatientModel } from "./models";
import { AllergyModel } from "./models/allergies";
import { searchCommonRecords } from "./search-helpers";
import { applyAllergyFilters } from "@/components/content/allergies/helpers/allergies-filter";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { useFeatureFlaggedQueryWithPatient } from "@/components/core/providers/patient-provider";
import { useFQSFeatureToggle } from "@/hooks/use-fqs-feature-toggle";
import { createGraphqlClient, fqsRequest } from "@/services/fqs/client";
import { AllergyGraphqlResponse, allergyQuery } from "@/services/fqs/queries/allergies";
import { QUERY_KEY_PATIENT_ALLERGIES } from "@/utils/query-keys";
import { Telemetry } from "@/utils/telemetry";

export function usePatientAllergies() {
  const fqs = useFQSFeatureToggle("allergies");
  const [allergies, setAllergies] = useState<AllergyModel[]>([]);

  const patientAllergiesQuery = useFeatureFlaggedQueryWithPatient(
    QUERY_KEY_PATIENT_ALLERGIES,
    [],
    "allergies",
    "req.timing.allergies",
    getAllergyIntoleranceFromFQS,
    getAllergyIntoleranceFromODS
  );

  const basicsQuery = useBasic(fqs);

  useEffect(() => {
    const patientAllergies = patientAllergiesQuery.data ?? [];
    const basics = basicsQuery.data ?? [];
    // If basic data came back from the above useBasic call, manually map any basic data to the condition
    // it corresponds to.
    if (basics.length > 0) {
      patientAllergies.forEach((a, i) => {
        const filteredBasics = basics.filter(
          (b) => b.subject?.reference === `AllergyIntolerance/${a.id}`
        );
        patientAllergies[i].revIncludes = filteredBasics;
      });
    }

    setAllergies([...patientAllergies]); // spread syntax here needed to make sure the array is a new reference in order to trigger a re-render
  }, [basicsQuery.data, patientAllergiesQuery.data]);

  const isLoading = patientAllergiesQuery.isLoading || basicsQuery.isLoading;
  const isError = patientAllergiesQuery.isError || basicsQuery.isError;
  const isFetching = patientAllergiesQuery.isFetching || basicsQuery.isFetching || !fqs.ready;
  return {
    isLoading,
    isError,
    isFetching,
    data: allergies,
  };
}

async function getAllergyIntoleranceFromFQS(
  requestContext: CTWRequestContext,
  patient: PatientModel
) {
  try {
    const graphClient = createGraphqlClient(requestContext);
    const { data } = await fqsRequest<AllergyGraphqlResponse>(graphClient, allergyQuery, {
      upid: patient.UPID,
      cursor: "",
      first: 1000,
      sort: {
        lastUpdated: "DESC",
      },
    });
    const nodes = data.AllergyIntoleranceConnection.edges.map((x) => x.node);
    const results = applyAllergyFilters(nodes, requestContext.builderId);
    if (results.length === 0) {
      Telemetry.countMetric("req.count.allergies.none", 0, ["fqs"]);
    }
    Telemetry.histogramMetric("req.count.allergies", results.length, ["fqs"]);
    return results;
  } catch (e) {
    throw new Error(`Failed fetching allergies information for patient ${patient.UPID}`);
  }
}

async function getAllergyIntoleranceFromODS(
  requestContext: CTWRequestContext,
  patient: PatientModel
) {
  try {
    const { bundle, resources } = await searchCommonRecords("AllergyIntolerance", requestContext, {
      patientUPID: patient.UPID,
      _include: ["AllergyIntolerance:patient"],
      "_include:iterate": "Patient:organization",
      _revinclude: "Basic:subject",
    });

    const includedResources = getIncludedResources(bundle);
    const results = applyAllergyFilters(resources, requestContext.builderId, includedResources);
    if (results.length === 0) {
      Telemetry.countMetric("req.count.allergies.none");
    }
    Telemetry.histogramMetric("req.count.allergies", results.length);
    return results;
  } catch (e) {
    throw new Error(`Failed fetching allergies information for patient ${patient.UPID}`);
  }
}
