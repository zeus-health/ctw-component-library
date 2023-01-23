import { useEncounterDetailsDrawer } from "./encounter-details-drawer";
import { patientTimelineColumns } from "./patient-timeline-columns";
import { Table } from "@/components/core/table/table";
import { usePatientEncounters } from "@/fhir/encounters";
import { orderBy } from "@/utils/nodash";
import "./patient-timeline.scss";

export type PatientTimelineProps = {
  className?: string;
};

export function PatientTimeline({ className }: PatientTimelineProps) {
  const patientEncounterQuery = usePatientEncounters();
  const openDetails = useEncounterDetailsDrawer();

  const encounters = orderBy(
    patientEncounterQuery.data ?? [],
    [(encounter) => encounter.resource.period?.start ?? ""],
    ["desc"]
  );

  return (
    <div className={className}>
      <Table
        className="-ctw-mx-px !ctw-rounded-none"
        showTableHead={false}
        isLoading={patientEncounterQuery.isLoading}
        records={encounters}
        columns={patientTimelineColumns}
        handleRowClick={(encounter) => openDetails(encounter)}
      />
    </div>
  );
}
