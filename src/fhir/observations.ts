import { ObservationModel, PatientModel } from "./models";
import { SYSTEM_LOINC } from "./system-urls";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { useFeatureToggle } from "@/hooks/use-feature-toggle";
import { createGraphqlClient, fqsRequest } from "@/services/fqs/client";
import { ObservationGraphqlResponse, observationQuery } from "@/services/fqs/queries/observations";
import { QUERY_KEY_PATIENT_OBSERVATIONS } from "@/utils/query-keys";
import { Telemetry, withTimerMetric } from "@/utils/telemetry";

// Returns observation models for the patient that represent trend data (matching loincCodes).
export function usePatientObservationsTrendData(loincCodes: string[]) {
  const trendingLabsToggle = useFeatureToggle("ctw-trending-labs");

  return useQueryWithPatient(
    QUERY_KEY_PATIENT_OBSERVATIONS,
    [trendingLabsToggle.enabled, loincCodes],
    async (requestContext, patient) =>
      // Don't fetching observations if this patient was created before 07/19/2023.
      // This is a temporary work around until FQS backfills observations for all patients.
      // See https://zeushealth.atlassian.net/browse/CDEV-296
      trendingLabsToggle.enabled && patient.createdAt && patient.createdAt >= "2023-07-19"
        ? withTimerMetric(fetchObservationsTrendData(loincCodes), "req.timing.all_observations")(
            requestContext,
            patient
          )
        : []
  );
}

function fetchObservationsTrendData(loincCodes: string[]) {
  const codes = loincCodes.map((loincCode) => `${SYSTEM_LOINC}|${loincCode}`); // turn supplied loincCodes into system|code format expected by FQS
  return async (requestContext: CTWRequestContext, patient: PatientModel) => {
    try {
      const graphClient = createGraphqlClient(requestContext);
      const { data } = await fqsRequest<ObservationGraphqlResponse>(graphClient, observationQuery, {
        upid: patient.UPID,
        cursor: "",
        first: 1000,
        sort: {
          lastUpdated: "DESC",
        },
        filter: {
          code: {
            anymatch: codes,
          },
        },
      });

      const observations = data.ObservationConnection.edges.map(
        ({ node }) => new ObservationModel(node)
      );

      if (observations.length === 0) {
        Telemetry.countMetric("req.count.all_observations.none", 1);
      }
      Telemetry.histogramMetric(`req.count.all_observations`, observations.length);

      return observations;
    } catch (e) {
      throw Telemetry.logError(
        e as Error,
        `Failed fetching observations for patient: ${patient.UPID}`
      );
    }
  };
}

export async function fetchObservationsById(
  requestContext: CTWRequestContext,
  patient: PatientModel,
  ids: string[]
) {
  try {
    const graphClient = createGraphqlClient(requestContext);
    const { data } = await fqsRequest<ObservationGraphqlResponse>(graphClient, observationQuery, {
      upid: patient.UPID,
      cursor: "",
      first: 500,
      sort: {},
      filter: {
        ids: {
          anymatch: ids,
        },
      },
    });

    return data.ObservationConnection.edges.map(({ node }) => new ObservationModel(node));
  } catch (e) {
    throw Telemetry.logError(
      e as Error,
      `Failed fetching observations by ID for patient: ${patient.UPID}`
    );
  }
}
