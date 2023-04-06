import cx from "classnames";
import { patientTimelineColumns } from "./patient-timeline-columns";
import { usePatientEncounterDetailsDrawer } from "../timeline-2.0/helpers/modal-hooks";
import { useCTW } from "@/components/core/providers/ctw-provider";
import { Table } from "@/components/core/table/table";
import { usePatientEncounters } from "@/fhir/encounters";
import { orderBy } from "@/utils/nodash";

export type PatientTimelineProps = {
  className?: cx.Argument;
};

export function PatientTimeline({ className }: PatientTimelineProps) {
  const patientEncounterQuery = usePatientEncounters();
  const { featureFlags } = useCTW();
  const openDetails = usePatientEncounterDetailsDrawer();
  const encounters = orderBy(
    patientEncounterQuery.data ?? [],
    [(encounter) => encounter.resource.period?.start ?? ""],
    ["desc"]
  );

  return (
    <div className={cx(className, "ctw-scrollable-pass-through-height")}>
      <Table
        isLoading={patientEncounterQuery.isLoading}
        records={encounters}
        columns={patientTimelineColumns(featureFlags?.enableViewFhirButton)}
        handleRowClick={openDetails}
      />
    </div>
  );
}
