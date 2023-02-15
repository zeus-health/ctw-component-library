import { useEncounterDetailsDrawer } from "./encounter-details-drawer";
import { patientTimelineColumns } from "./patient-timeline-columns";
import { Heading } from "@/components/core/ctw-box";
import { Table } from "@/components/core/table/table";
import { usePatientEncounters } from "@/fhir/encounters";
import { orderBy } from "@/utils/nodash";

export type PatientTimelineProps = {
  className?: string;
  includeViewFhirResource: boolean;
};

export function PatientTimeline({
  className,
  includeViewFhirResource,
}: PatientTimelineProps) {
  const patientEncounterQuery = usePatientEncounters();
  const openDetails = useEncounterDetailsDrawer();

  const encounters = orderBy(
    patientEncounterQuery.data ?? [],
    [(encounter) => encounter.resource.period?.start ?? ""],
    ["desc"]
  );

  return (
    <div className={className}>
      <Heading title="Encounter Timeline" />
      <Table
        className="-ctw-mx-px !ctw-rounded-none"
        showTableHead={false}
        isLoading={patientEncounterQuery.isLoading}
        records={encounters}
        columns={patientTimelineColumns(includeViewFhirResource)}
        handleRowClick={(encounter) => openDetails(encounter)}
      />
    </div>
  );
}
