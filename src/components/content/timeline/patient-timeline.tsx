import cx from "classnames";
import { useEffect } from "react";
import { patientTimelineColumns } from "./patient-timeline-columns";
import { usePatientEncounterDetailsDrawer } from "../timeline-2.0/helpers/modal-hooks";
import { useCTW } from "@/components/core/providers/ctw-provider";
import { Table } from "@/components/core/table/table";
import { usePatientEncounters } from "@/fhir/encounters";
import { orderBy } from "@/utils/nodash";
import { Telemetry } from "@/utils/telemetry";

export type PatientTimelineProps = {
  className?: cx.Argument;
};

export function PatientTimeline({ className }: PatientTimelineProps) {
  const query = usePatientEncounters();
  const { featureFlags } = useCTW();
  const openDetails = usePatientEncounterDetailsDrawer();
  const encounters = orderBy(
    query.data ?? [],
    [(encounter) => encounter.resource.period?.start ?? ""],
    ["desc"]
  );

  useEffect(() => {
    if (!query.isLoading) {
      Telemetry.reportZAPRecordCount("encounters", query.data?.length);
    }
  }, [query.isLoading, query.data]);

  return (
    <div className={cx(className, "ctw-scrollable-pass-through-height")}>
      <Table
        isLoading={query.isLoading}
        records={encounters}
        columns={patientTimelineColumns(featureFlags?.enableViewFhirButton)}
        handleRowClick={openDetails}
      />
    </div>
  );
}
