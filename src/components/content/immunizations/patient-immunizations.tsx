import cx from "classnames";
import { useRef } from "react";
import { useImmunizationDetailsDrawer } from "./immunizations-details-drawer";
import { patientImmunizationsColumns } from "./patient-immunizations-columns";
import { Heading, StackedWrapper } from "@/components/core/ctw-box";
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
    <StackedWrapper className={cx("ctw-patient-immunizations", className)}>
      <Heading title="Immunizations" />
      <div
        ref={containerRef}
        className={cx(
          "ctw-border ctw-border-solid ctw-border-divider-light ctw-bg-white",
          className,
          {
            "ctw-stacked": breakpoints.sm,
          }
        )}
      >
        <Table
          RowActions={breakpoints.sm ? viewRecordFHIR : undefined}
          stacked={breakpoints.sm}
          className="-ctw-mx-px !ctw-rounded-none"
          isLoading={patientImmunizationsQuery.isLoading}
          records={patientImmunizationsQuery.data ?? []}
          columns={patientImmunizationsColumns(breakpoints.sm)}
          handleRowClick={handleRowClick}
        />
      </div>
    </StackedWrapper>
  );
}
