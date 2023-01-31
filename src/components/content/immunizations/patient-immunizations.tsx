import cx from "classnames";
import { useRef } from "react";
import { useImmunizationDetailsDrawer } from "./immunizations-details-drawer";
import { patientImmunizationsColumns } from "./patient-immunizations-columns";
import { Heading } from "@/components/core/ctw-box";
import { Table } from "@/components/core/table/table";
import { ViewFHIR } from "@/components/core/view-fhir";
import { usePatientImmunizations } from "@/fhir/immunizations";
import { ImmunizationModel } from "@/fhir/models/immunization";
import { useBreakpoints } from "@/hooks/use-breakpoints";

export type PatientImmunizationsProps = {
  className?: string;
};

const viewRecordFHIR = ({ record }: { record: ImmunizationModel }) => (
  <ViewFHIR name="Immunization Resource" resource={record.resource} />
);

export function PatientImmunizations({ className }: PatientImmunizationsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(containerRef);
  const patientImmunizationsQuery = usePatientImmunizations();
  const openDetails = useImmunizationDetailsDrawer();

  function handleRowClick(immunization: ImmunizationModel) {
    openDetails(immunization);
  }

  return (
    <div
      ref={containerRef}
      className={cx(
        "ctw-patient-immunizations ctw-border ctw-border-solid ctw-border-divider-light ctw-bg-white",
        className,
        {
          "ctw-stacked": breakpoints.sm,
        }
      )}
    >
      <Heading title="Immunizations" />
      <Table
        RowActions={viewRecordFHIR}
        stacked={breakpoints.sm}
        className="-ctw-mx-px !ctw-rounded-none"
        isLoading={patientImmunizationsQuery.isLoading}
        records={patientImmunizationsQuery.data ?? []}
        columns={patientImmunizationsColumns}
        handleRowClick={handleRowClick}
      />
    </div>
  );
}
