import { ObservationModel, PatientModel } from "./models";
import { SYSTEM_LOINC } from "./system-urls";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { useTrendingLabsFeatureToggle } from "@/hooks/use-feature-toggle";
import { createGraphqlClient, fqsRequest } from "@/services/fqs/client";
import { ObservationGraphqlResponse, observationQuery } from "@/services/fqs/queries/observations";
import { QUERY_KEY_PATIENT_OBSERVATIONS } from "@/utils/query-keys";
import { Telemetry, withTimerMetric } from "@/utils/telemetry";

export function usePatientObservations(loincCodes: string[]) {
  const trendingLabs = useTrendingLabsFeatureToggle();
  return useQueryWithPatient(
    `${QUERY_KEY_PATIENT_OBSERVATIONS}_${loincCodes.join("_")}`,
    [trendingLabs.enabled],
    trendingLabs.enabled
      ? withTimerMetric(fetchObservations(loincCodes), "req.timing.all_observations")
      : async () =>
          new Promise<ObservationModel[]>((resolve) => {
            resolve([]);
          })
  );
}

function fetchObservations(loincCodes: string[]) {
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
            anymatch: loincCodes,
          },
        },
      });
      const nodes = data.ObservationConnection.edges.map((x) => x.node);
      const observations = nodes.map((o) => new ObservationModel(o));
      const filteredObservations = filterObservationsByLOINCCodes(observations, loincCodes); // enforce system + code on the frontend since FQS only filters by code (not system).
      if (filteredObservations.length === 0) {
        Telemetry.countMetric("req.count.all_observations.none", 1, ["fqs"]);
      }
      Telemetry.histogramMetric(`req.count.all_observations`, filteredObservations.length, ["fqs"]);
      return filteredObservations;
    } catch (e) {
      throw Telemetry.logError(
        e as Error,
        `Failed fetching observations for patient: ${patient.UPID}`
      );
    }
  };
}

function filterObservationsByLOINCCodes(observations: ObservationModel[], codes: string[]) {
  const filteredObservations = observations.filter((o) =>
    o.resource.code.coding?.some(
      (c) => c.system === SYSTEM_LOINC && codes.some((cc) => cc === c.code)
    )
  );
  return filteredObservations;
}
