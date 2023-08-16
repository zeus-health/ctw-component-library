import { useEffect, useState } from "react";
import { usePatientAllDiagnosticReports } from "./diagnostic-report";
import { usePatientEncounters } from "./encounters";
import { TimelineEventModel } from "./models/timeline-event";
import { compact, concat, flatten, some } from "@/utils/nodash";
import { applySorts } from "@/utils/sort";

export function useTimelineEvents() {
  const [timelineEvents, setTimelineEvents] = useState<TimelineEventModel[]>();
  const patientEncountersQuery = usePatientEncounters();
  const diagnosticReportQuery = usePatientAllDiagnosticReports();

  const queries = [patientEncountersQuery, diagnosticReportQuery];

  useEffect(() => {
    const models = compact(
      flatten(concat(queries.map((query) => query.data?.map((m) => new TimelineEventModel(m)))))
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
