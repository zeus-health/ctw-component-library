import { orderBy } from "lodash";
import { patientTimelineColumns } from "./patient-timeline-columns";
import { Table } from "@/components/core/table/table";
import { usePatientEncounters } from "@/fhir/encounters";
import "./patient-timeline.scss";

export type PatientTimelineProps = {
  className?: string;
};

export function PatientTimeline({ className }: PatientTimelineProps) {
  const patientEncounterQuery = usePatientEncounters();

  const encounters = orderBy(
    patientEncounterQuery.data ?? [],
    [(encounter) => encounter.resource.period?.start ?? ""],
    ["desc"]
  );

  return (
    <div>
      <Table
        className="-ctw-mx-px !ctw-rounded-none"
        showTableHead={false}
        isLoading={patientEncounterQuery.isLoading}
        records={encounters}
        columns={patientTimelineColumns}
      />
    </div>
  );
}
