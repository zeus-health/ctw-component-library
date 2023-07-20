import { ObservationModel, PatientModel } from "./models";
import { SYSTEM_LOINC } from "./system-urls";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import {
  usePatientVersion,
  useQueryWithPatient,
} from "@/components/core/providers/patient-provider";
import { useTrendingLabsFeatureToggle } from "@/hooks/use-feature-toggle";
import { createGraphqlClient, fqsRequest } from "@/services/fqs/client";
import { ObservationGraphqlResponse, observationQuery } from "@/services/fqs/queries/observations";
import { QUERY_KEY_PATIENT_OBSERVATIONS } from "@/utils/query-keys";
import { Telemetry, withTimerMetric } from "@/utils/telemetry";

export function usePatientObservations(loincCodes: string[]) {
  const trendingLabs = useTrendingLabsFeatureToggle();
  const patient = usePatientVersion(1);

  // TODO: Remove the usePatientVersion() call above and conditional below once DRT backfills Observations.
  return useQueryWithPatient(
    `${QUERY_KEY_PATIENT_OBSERVATIONS}_${loincCodes.join("_")}`,
    [trendingLabs.enabled, patient.data],
    trendingLabs.enabled &&
      patient.data?.resource &&
      patient.data.resource.meta &&
      patient.data.resource.meta.lastUpdated &&
      patient.data.resource.meta.lastUpdated >= "2023-07-20" // don't bother fetching observations if this patient was created before 07/20
      ? withTimerMetric(fetchObservations(loincCodes), "req.timing.all_observations")
      : async () =>
          new Promise<ObservationModel[]>((resolve) => {
            resolve([]);
          })
  );
}

function fetchObservations(loincCodes: string[]) {
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
      const nodes = data.ObservationConnection.edges.map((x) => x.node);
      const observations = nodes.map((o) => new ObservationModel(o));
      if (observations.length === 0) {
        Telemetry.countMetric("req.count.all_observations.none", 1, ["fqs"]);
      }
      Telemetry.histogramMetric(`req.count.all_observations`, observations.length, ["fqs"]);
      return observations;
    } catch (e) {
      throw Telemetry.logError(
        e as Error,
        `Failed fetching observations for patient: ${patient.UPID}`
      );
    }
  };
}
