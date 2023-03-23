import cx from "classnames";
import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { patientTimelineColumns } from "./patient-timeline-columns";
import { useCTW } from "@/components/core/providers/ctw-provider";
import { Table } from "@/components/core/table/table";
import { TimelineEventModel } from "@/fhir/models/timeline-event";
import { useTimelineEvents } from "@/fhir/timeline-event";
import { useState } from "react";
import { CollapsibleDataListEntry } from "@/components/core/collapsible-data-list";
import { usePatientEncounterDetailsDrawer } from "../timeline/patient-timeline";
import { EncounterModel } from "@/fhir/models/encounter";
import {
  ObservationsDrawer,
  useObservationsDetailsDrawer,
} from "../observations/helpers/drawer";
import { DiagnosticReportModel, MedicationDispenseModel } from "@/fhir/models";
import { useDrawer } from "@/components/core/providers/drawer-provider";
import { useQueryMedicationStatement } from "@/hooks/use-medications";
import { MedicationDrawer } from "../medications/history/medication-drawer";
import { MedicationRequestModel } from "@/fhir/models/medication-request";
import { DrawerProps } from "@/components/core/drawer";

export type PatientTimelineProps = {
  className?: cx.Argument;
};

export function PatientTimelineV2({ className }: PatientTimelineProps) {
  const timelineEventsQuery = useTimelineEvents();
  const { featureFlags } = useCTW();
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
      <Table
        isLoading={timelineEventsQuery.isLoading}
        records={timelineEventsQuery.data}
        columns={patientTimelineColumns(true)}
        handleRowClick={(record) => {
          if (record.model.constructor === EncounterModel) {
            openEncounterDetails(record.model);
          } else if (record.model.constructor === DiagnosticReportModel) {
            openDiagnosticReportDetails(record.model);
          } else if (record.model.constructor === MedicationDispenseModel) {
            openMedicationDispenseDetails(record.model);
          }
        }}
      />
    </div>
  );
}

export function useMedicationStatementDetailsDrawer() {
  const { openDrawer } = useDrawer();

  return (medicationDispense: MedicationDispenseModel) => {
    openDrawer({
      component: (props) => (
        <MedicationDrawerComponent
          medicationEventModel={medicationDispense}
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
  const medStatement = useQueryMedicationStatement(
    props.medicationEventModel.rxNorm
  );
  if (medStatement?.data?.length) {
    return <MedicationDrawer medication={medStatement.data?.[0]} {...props} />;
  }
  return <>Test Test</>;
};
