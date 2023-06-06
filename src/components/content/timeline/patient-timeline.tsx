import cx from "classnames";
import { useRef } from "react";
import { patientTimelineColumns } from "./helpers/columns";
import { defaultTimelineFilters, timelineFilters } from "./helpers/filters";
import { usePatientEncounterDetailsDrawer } from "./helpers/modal-hooks";
import { defaultTimelineSort, timelineSortOptions } from "./helpers/sorts";
import { useObservationsDetailsDrawer } from "../observations/helpers/drawer";
import { getDateRangeView } from "../resource/helpers/view-date-range";
import { ResourceTableActions } from "../resource/resource-table-actions";
import { ResourceTable } from "@/components/content/resource/resource-table";
import { useCTW } from "@/components/core/providers/use-ctw";
import { TimelineEventModel } from "@/fhir/models/timeline-event";
import { useTimelineEvents } from "@/fhir/timeline-event";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";

export type PatientTimelineProps = {
  className?: cx.Argument;
  enableFQS?: boolean;
};

export function PatientTimeline({ className, enableFQS = false }: PatientTimelineProps) {
  const timelineEventsQuery = useTimelineEvents(enableFQS);
  const containerRef = useRef<HTMLDivElement>(null);
  const { featureFlags } = useCTW();
  const { viewOptions, defaultView } = getDateRangeView<TimelineEventModel>("date");
  const { data, setFilters, setSort, setViewOption } = useFilteredSortedData({
    defaultView,
    defaultFilters: defaultTimelineFilters,
    defaultSort: defaultTimelineSort,
    records: timelineEventsQuery.data,
  });
  const openEncounterDetails = usePatientEncounterDetailsDrawer();
  const openDiagnosticReportDetails = useObservationsDetailsDrawer(enableFQS);

  return (
    <div className={cx(className, "ctw-scrollable-pass-through-height")} ref={containerRef}>
      <ResourceTableActions
        viewOptions={{
          onChange: setViewOption,
          options: viewOptions,
          defaultView,
        }}
        filterOptions={{
          onChange: setFilters,
          defaultState: defaultTimelineFilters,
          filters: timelineFilters(timelineEventsQuery.data),
        }}
        sortOptions={{
          defaultSort: defaultTimelineSort,
          options: timelineSortOptions,
          onChange: setSort,
        }}
      />
      <ResourceTable
        showTableHead={false}
        isLoading={timelineEventsQuery.isLoading}
        data={data}
        emptyMessage="There are no timeline records available."
        columns={patientTimelineColumns(featureFlags?.enableViewFhirButton)}
        onRowClick={(record) => {
          switch (record.model.kind) {
            case "Encounter":
              openEncounterDetails(record.model);
              break;
            case "DiagnosticReport":
              openDiagnosticReportDetails(record.model);
              break;
            default:
          }
        }}
      />
    </div>
  );
}
