import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { patientTimelineColumns } from "./patient-timeline-columns";
import { CodingList } from "@/components/core/coding-list";
import { Heading } from "@/components/core/ctw-box";
import { useCTW } from "@/components/core/providers/ctw-provider";
import { Table } from "@/components/core/table/table";
import { usePatientEncounters } from "@/fhir/encounters";
import { EncounterModel } from "@/fhir/models/encounter";
import { capitalize, orderBy } from "@/utils/nodash";

export type PatientTimelineProps = {
  className?: string;
};

export function PatientTimeline({ className }: PatientTimelineProps) {
  const patientEncounterQuery = usePatientEncounters();
  const { featureFlags } = useCTW();
  const openDetails = useResourceDetailsDrawer({
    header: (m) => `${m.periodStart} - ${m.periodEnd}`,
    subHeader: (m) => m.typeDisplay,
    getSourceDocument: true,
    details: encounterData,
  });

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
        isLoading={patientEncounterQuery.isLoading}
        records={encounters}
        columns={patientTimelineColumns(
          featureFlags?.enablePatientTimelineFhirButton
        )}
        handleRowClick={openDetails}
      />
    </div>
  );
}

const encounterData = (encounter: EncounterModel) => [
  { label: "Period Start", value: encounter.periodStart },
  { label: "Period End", value: encounter.periodEnd },
  { label: "Status", value: capitalize(encounter.status) },
  { label: "Class", value: encounter.class },
  {
    label: "Type",
    value: encounter.typeCodings.length ? (
      <CodingList codings={encounter.typeCodings} />
    ) : undefined,
  },
  { label: "Location", value: encounter.location },
  { label: "Participants", value: encounter.participants },
  { label: "Reason", value: encounter.reason },
  { label: "Diagnosis", value: encounter.diagnosis },
  { label: "Discharge Disposition", value: encounter.dischargeDisposition },
];
