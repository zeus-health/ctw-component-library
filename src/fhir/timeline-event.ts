import { Resource } from "fhir/r4";
import { useEffect, useState } from "react";
import {
  useQueryGetPatientMedDispenseCommon,
  useQueryGetPatientMedRequestsCommon,
} from "..";
import { usePatientDiagnosticReportsOutside } from "./diagnostic-report";
import { usePatientEncounters } from "./encounters";
import {
  TimelineEventModel,
  TimelineEventResource,
} from "./models/timeline-event";
import { ResourceMap } from "@/fhir/types";
import { compact, concat } from "@/utils/nodash";
import { applySorts } from "@/utils/sort";

type TimelineEventModelParams = {
  resource: TimelineEventResource;
  includedResources?: ResourceMap;
  revIncludes?: Resource[];
};

export function useTimelineEvents() {
  const [timelineEvents, setTimelineEvents] = useState<TimelineEventModel[]>();
  const patientEncountersQuery = usePatientEncounters();
  const diagnosticReportQuery = usePatientDiagnosticReportsOutside();
  const medicationRequestCommon = useQueryGetPatientMedRequestsCommon();
  const medicationDispenseCommon = useQueryGetPatientMedDispenseCommon();

  useEffect(() => {
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
    setTimelineEvents(
      applySorts(mergedModels, [
        { dir: "desc", key: "date", isDate: true },
        { dir: "desc", key: "type", isDate: true },
      ])
    );
  }, [
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
