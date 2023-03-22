import cx from "classnames";
import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { patientTimelineColumns } from "./patient-timeline-columns";
import { CodingList } from "@/components/core/coding-list";
import { useCTW } from "@/components/core/providers/ctw-provider";
import { Table } from "@/components/core/table/table";
import { usePatientEncounters } from "@/fhir/encounters";
import { EncounterModel } from "@/fhir/models/encounter";
import { capitalize, orderBy } from "@/utils/nodash";

export type PatientTimelineProps = {
  className?: cx.Argument;
};

export function PatientTimelinV2({ className }: PatientTimelineProps) {
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
    <div
      className={cx(
        className,
        "ctw-scrollable-pass-through-height ctw-overflow-hidden"
      )}
    >
      <Table
        isLoading={patientEncounterQuery.isLoading}
        records={encounters}
        columns={patientTimelineColumns(featureFlags?.enableViewFhirButton)}
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
