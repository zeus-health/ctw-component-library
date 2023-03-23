import { UseQueryResult } from "@tanstack/react-query";
import { Resource } from "fhir/r4";
import { useEffect, useState } from "react";
import {
  useQueryGetPatientMedDispenseCommon,
  useQueryGetPatientMedRequestsCommon,
} from "..";
import { usePatientDiagnosticReportsOutside } from "./diagnostic-report";
import { usePatientEncounters } from "./encounters";
<<<<<<< HEAD
import {
  TimelineEventModel,
  TimelineEventResource,
} from "./models/timeline-event";
import { ResourceMap } from "@/fhir/types";
import { compact, concat, every, orderBy } from "@/utils/nodash";
import { sort } from "@/utils/sort";

type TimelineEventModelParams = {
  resource: TimelineEventResource;
  includedResources?: ResourceMap;
  revIncludes?: Resource[];
};
=======
import { TimelineEventModel } from "./models/timeline-event";
import { compact, concat } from "@/utils/nodash";
import { sort } from "@/utils/sort";
>>>>>>> timeline-2.0

export function useTimelineEvents() {
  const [timelineEvents, setTimelineEvents] = useState<TimelineEventModel[]>();
  const patientEncountersQuery = usePatientEncounters();
  const diagnosticReportQuery = usePatientDiagnosticReportsOutside();
  const medicationRequestCommon = useQueryGetPatientMedRequestsCommon();
  const medicationDispenseCommon = useQueryGetPatientMedDispenseCommon();
  const [queriesFinished, setQueriesFinished] = useState(false);
  const allSuccessful = (n: { isSuccess: boolean }[]) =>
    every(n, ({ isSuccess }: UseQueryResult) => isSuccess);
  const allDoneFetching = (n: { isSuccess: boolean }[]) =>
    every(n, ({ isFetching }: UseQueryResult) => !isFetching);

  useEffect(() => {
    const queries = [
      patientEncountersQuery,
      diagnosticReportQuery,
      medicationRequestCommon,
      medicationDispenseCommon,
    ];
    if (allDoneFetching(queries)) {
      setQueriesFinished(allSuccessful(queries));
    } else {
      setQueriesFinished(false);
    }
  }, [
    diagnosticReportQuery,
    medicationDispenseCommon,
    medicationRequestCommon,
    patientEncountersQuery,
  ]);

  useEffect(() => {
    if (queriesFinished) {
      const patientEncounterModels = patientEncountersQuery.data?.map(
        createTimelineEventModel
      );
      const diagnosticReportModels = diagnosticReportQuery.data?.map(
        createTimelineEventModel
      );
      const medicationRequestCommonModels = medicationRequestCommon.data?.map(
        createTimelineEventModel
      );
      const medicationDispenseCommonModels = medicationDispenseCommon.data?.map(
        createTimelineEventModel
      );
      const mergedModels = compact(
        concat(
          diagnosticReportModels,
          patientEncounterModels,
          medicationRequestCommonModels,
          medicationDispenseCommonModels
        )
      );
      setTimelineEvents(sort(mergedModels, "date", "desc", true));
    }
  }, [
    queriesFinished,
    patientEncountersQuery.data,
    diagnosticReportQuery.data,
    medicationRequestCommon.data,
    medicationDispenseCommon.data,
  ]);

  const isLoading =
    patientEncountersQuery.isLoading || diagnosticReportQuery.isLoading;
  const isFetching =
    patientEncountersQuery.isFetching || diagnosticReportQuery.isFetching;
  const isError =
    patientEncountersQuery.isError || diagnosticReportQuery.isError;

  return {
    isFetching,
    isLoading,
    isError,
    data: timelineEvents ?? [],
  };
}

const createTimelineEventModel = ({
  resource,
  includedResources,
  revIncludes,
}: TimelineEventModelParams) =>
  new TimelineEventModel(resource, includedResources, revIncludes);
