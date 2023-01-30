import { useEncounterDetailsDrawer } from "./encounter-details-drawer";
import { patientTimelineColumns } from "./patient-timeline-columns";
import { Table } from "@/components/core/table/table";
import { usePatientEncounters } from "@/fhir/encounters";
import { EncounterModel } from "@/fhir/models/encounter";
import { orderBy } from "@/utils/nodash";

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

  function handleRowClick(encounter: EncounterModel) {
    openDetails(encounter);
  }

  return (
    <div>
      <Table
        className="-ctw-mx-px !ctw-rounded-none"
        showTableHead={false}
        isLoading={patientEncounterQuery.isLoading}
        records={encounters}
        columns={patientTimelineColumns}
        handleRowClick={handleRowClick}
      />
    </div>
  );
}
