import cx from "classnames";
import { useObservationsDetailsDrawer } from "../observations/helpers/drawer";
import { ResourceTableActions } from "../resource/resource-table-actions";
import { defaultTimelineFilters, timelineFilters } from "./helpers/filters";
import { useMedicationStatementDetailsDrawer } from "./helpers/medication-detail";
import { usePatientEncounterDetailsDrawer } from "./helpers/modal-hooks";
import { defaultTimelineSort, timelineSortOptions } from "./helpers/sorts";
import { patientTimelineColumns } from "./patient-timeline-columns";
import { ResourceTable } from "@/components/content/resource/resource-table";
import { useCTW } from "@/components/core/providers/ctw-provider";
import { DiagnosticReportModel, MedicationDispenseModel } from "@/fhir/models";
import { EncounterModel } from "@/fhir/models/encounter";
import { MedicationRequestModel } from "@/fhir/models/medication-request";
import { useTimelineEvents } from "@/fhir/timeline-event";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";

export type PatientTimelineProps = {
  className?: cx.Argument;
};

export function PatientTimelineV2({ className }: PatientTimelineProps) {
  const timelineEventsQuery = useTimelineEvents();
  const { featureFlags } = useCTW();
  const { data, setFilters, setSort } = useFilteredSortedData({
    defaultFilters: defaultTimelineFilters,
    defaultSort: defaultTimelineSort,
    records: timelineEventsQuery.data,
  });
  const openEncounterDetails = usePatientEncounterDetailsDrawer();
  const openDiagnosticReportDetails = useObservationsDetailsDrawer();
  const openMedicationDispenseDetails = useMedicationStatementDetailsDrawer();

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
          if (record.model.constructor === EncounterModel) {
            openEncounterDetails(record.model);
          } else if (record.model.constructor === DiagnosticReportModel) {
            openDiagnosticReportDetails(record.model);
          } else if (
            record.model.constructor === MedicationDispenseModel ||
            record.model.constructor === MedicationRequestModel
          ) {
            openMedicationDispenseDetails(record.model);
          }
        }}
      />
    </div>
  );
}
