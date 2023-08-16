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
import { EmptyTable } from "@/components/core/empty-table";
import { AnalyticsProvider } from "@/components/core/providers/analytics/analytics-provider";
import { TimelineEventModel } from "@/fhir/models/timeline-event";
import { useTimelineEvents } from "@/fhir/timeline-event";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";

export type PatientTimelineProps = {
  className?: cx.Argument;
};

export function PatientTimeline({ className }: PatientTimelineProps) {
  const timelineEventsQuery = useTimelineEvents();
  const containerRef = useRef<HTMLDivElement>(null);
  const { viewOptions, past6Months } = getDateRangeView<TimelineEventModel>("date");
  const { data, setFilters, setSort, setViewOption } = useFilteredSortedData({
    defaultView: past6Months,
    defaultFilters: defaultTimelineFilters,
    defaultSort: defaultTimelineSort,
    records: timelineEventsQuery.data,
  });

  const isEmptyQuery = timelineEventsQuery.data.length === 0;
  const hasZeroFilteredRecords = !isEmptyQuery && data.length === 0;

  const openEncounterDetails = usePatientEncounterDetailsDrawer();
  const openDiagnosticReportDetails = useObservationsDetailsDrawer();

  return (
    <AnalyticsProvider componentName="PatientTimeline">
      <div className={cx(className, "ctw-scrollable-pass-through-height")} ref={containerRef}>
        <ResourceTableActions
          viewOptions={{
            onChange: setViewOption,
            options: viewOptions,
            defaultView: past6Months,
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
          emptyMessage={
            <EmptyTable
              hasZeroFilteredRecords={hasZeroFilteredRecords}
              resourceName="timeline records"
            />
          }
          columns={patientTimelineColumns}
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
    </AnalyticsProvider>
  );
}
