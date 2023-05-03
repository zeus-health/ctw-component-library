import { Resource } from "fhir/r4";
import { useEffect, useState } from "react";
import { usePatientDiagnosticReportsOutside } from "./diagnostic-report";
import { usePatientEncounters } from "./encounters";
import { TimelineEventModel, TimelineEventResource } from "./models/timeline-event";
import { ResourceMap } from "@/fhir/types";
import { compact, concat, flatten, some } from "@/utils/nodash";
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

  const queries = [patientEncountersQuery, diagnosticReportQuery];

  useEffect(() => {
    const models = compact(
      flatten(concat(queries.map((query) => query.data?.map(createTimelineEventModel))))
    );

    setTimelineEvents(
      applySorts(models, [
        { dir: "desc", key: "date", isDate: true },
        { dir: "desc", key: "type" },
      ])
    );
    // Disabling because including queries will cause infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientEncountersQuery.data, diagnosticReportQuery.data]);

  const isLoading = some(queries, "isLoading");
  const isFetching = some(queries, "isFetching");
  const isError = some(queries, "isError");

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
}: TimelineEventModelParams) => new TimelineEventModel(resource, includedResources, revIncludes);
