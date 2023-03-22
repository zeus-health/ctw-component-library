import { useEffect, useState } from "react";
import {
  useQueryGetPatientMedDispenseCommon,
  useQueryGetPatientMedRequestsCommon,
} from "..";
import { usePatientDiagnosticReportsOutside } from "./diagnostic-report";
import { usePatientEncounters } from "./encounters";
import { TimelineEventModel } from "./models/timeline-event";
import { compact, concat, orderBy } from "@/utils/nodash";

export function useTimelineEvents() {
  const [timelineEvents, setTimelineEvents] = useState<TimelineEventModel[]>();
  const patientEncountersQuery = usePatientEncounters();
  const diagnosticReportQuery = usePatientDiagnosticReportsOutside();
  const medicaitonRequestCommon = useQueryGetPatientMedRequestsCommon();
  const medicaitonDispenseCommon = useQueryGetPatientMedDispenseCommon();

  useEffect(() => {
    const patientEncounterModels = patientEncountersQuery.data?.map(
      ({ resource, includedResources, revIncludes }) =>
        new TimelineEventModel(resource, includedResources, revIncludes)
    );
    const diagnosticReportModels = diagnosticReportQuery.data?.map(
      ({ resource, includedResources, revIncludes }) =>
        new TimelineEventModel(resource, includedResources, revIncludes)
    );
    const medicaitonRequestCommonModels = medicaitonRequestCommon.data?.map(
      ({ resource, includedResources, revIncludes }) =>
        new TimelineEventModel(resource, includedResources, revIncludes)
    );

    const medicaitonDispenseCommonModels = medicaitonDispenseCommon.data?.map(
      ({ resource, includedResources, revIncludes }) =>
        new TimelineEventModel(resource, includedResources, revIncludes)
    );

    const mergedModels = compact(
      concat(
        diagnosticReportModels,
        patientEncounterModels,
        medicaitonRequestCommonModels,
        medicaitonDispenseCommonModels
      )
    );
    setTimelineEvents(orderBy(mergedModels, "eventDate", "desc"));
  }, [
    patientEncountersQuery.data,
    diagnosticReportQuery.data,
    medicaitonRequestCommon.data,
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
