import cx from "classnames";
import { defaultTimelineFilters, timelineFilters } from "./helpers/filters";
import {
  useDispenseRequestDetailsDrawer,
  usePatientEncounterDetailsDrawer,
} from "./helpers/modal-hooks";
import { defaultTimelineSort, timelineSortOptions } from "./helpers/sorts";
import { patientTimelineColumns } from "./patient-timeline-columns";
import { useObservationsDetailsDrawer } from "../observations/helpers/drawer";
import { ResourceTableActions } from "../resource/resource-table-actions";
import { ResourceTable } from "@/components/content/resource/resource-table";
import { useCTW } from "@/components/core/providers/ctw-provider";
import { useTimelineEvents } from "@/fhir/timeline-event";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";

export type PatientTimelineV2Props = {
  className?: cx.Argument;
};

export function PatientTimelineV2({ className }: PatientTimelineV2Props) {
  const timelineEventsQuery = useTimelineEvents();
  const { featureFlags } = useCTW();
  const { data, setFilters, setSort } = useFilteredSortedData({
    defaultFilters: defaultTimelineFilters,
    defaultSort: defaultTimelineSort,
    records: timelineEventsQuery.data,
  });
  const openEncounterDetails = usePatientEncounterDetailsDrawer();
  const openDiagnosticReportDetails = useObservationsDetailsDrawer();
  const openDispenseRequestDetails = useDispenseRequestDetailsDrawer();

  return (
    <div className={cx(className, "ctw-scrollable-pass-through-height")}>
      <ResourceTableActions
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
            case "MedicationDispense":
            case "MedicationRequest":
              openDispenseRequestDetails(record.model);
              break;
            default:
          }
        }}
      />
    </div>
  );
}
