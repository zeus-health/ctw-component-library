import cx from "classnames";
import { MedicationDrawer } from "../medications/history/medication-drawer";
import { useObservationsDetailsDrawer } from "../observations/helpers/drawer";
import { ResourceTableActions } from "../resource/resource-table-actions";
import { usePatientEncounterDetailsDrawer } from "../timeline/patient-timeline";
import {
  defaultTimelineFilters,
  defaultTimelineSort,
  timelineFilters,
  timelineSortOptions,
} from "./helpers/filters";
import { patientTimelineColumns } from "./patient-timeline-columns";
import { DrawerProps } from "@/components/core/drawer";
import { useCTW } from "@/components/core/providers/ctw-provider";
import { useDrawer } from "@/components/core/providers/drawer-provider";
import { Table } from "@/components/core/table/table";
import { DiagnosticReportModel, MedicationDispenseModel } from "@/fhir/models";
import { EncounterModel } from "@/fhir/models/encounter";
import { MedicationRequestModel } from "@/fhir/models/medication-request";
import { useTimelineEvents } from "@/fhir/timeline-event";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";
import { useQueryMedicationStatement } from "@/hooks/use-medications";

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
    <div
      className={cx(
        className,
        "ctw-scrollable-pass-through-height ctw-overflow-hidden"
      )}
    >
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
      <Table
        showTableHead={false}
        isLoading={timelineEventsQuery.isLoading}
        records={data}
        columns={patientTimelineColumns(true)}
        handleRowClick={(record) => {
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

export function useMedicationStatementDetailsDrawer() {
  const { openDrawer } = useDrawer();

  return (
    medicationModel: MedicationDispenseModel | MedicationRequestModel
  ) => {
    openDrawer({
      component: (props) => (
        <MedicationDrawerComponent
          medicationEventModel={medicationModel}
          {...props}
        />
      ),
    });
  };
}

type MedicationDrawerComponentProps = {
  medicationEventModel: MedicationDispenseModel | MedicationRequestModel;
} & Pick<DrawerProps, "isOpen" | "onClose" | "onOpen" | "onAfterOpen">;

const MedicationDrawerComponent = (props: MedicationDrawerComponentProps) => {
  const { medicationEventModel } = props;
  const medStatement = useQueryMedicationStatement(medicationEventModel.rxNorm);
  if (medStatement.data?.length) {
    return <MedicationDrawer medication={medStatement.data[0]} {...props} />;
  }
  return <></>;
};
