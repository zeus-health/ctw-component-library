import cx from "classnames";
import { useRef } from "react";
import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { patientImmunizationsColumns } from "./patient-immunizations-columns";
import { CodingList } from "@/components/core/coding-list";
import { withErrorBoundary } from "@/components/core/error-boundary";
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

function PatientImmunizationsComponent({
  className,
}: PatientImmunizationsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(containerRef);
  const patientImmunizationsQuery = usePatientImmunizations();
  const openDetails = useResourceDetailsDrawer({
    header: (m) => m.description,
    details: immunizationData,
  });

  return (
    <div
      ref={containerRef}
      data-zus-telemetry-namespace="Immunizations"
      className={cx("ctw-patient-immunizations ctw-bg-white", className, {
        "ctw-stacked": breakpoints.sm,
      })}
    >
      <div className="ctw-overflow-hidden">
        <Table
          RowActions={viewRecordFHIR}
          stacked={breakpoints.sm}
          isLoading={patientImmunizationsQuery.isLoading}
          records={patientImmunizationsQuery.data ?? []}
          columns={patientImmunizationsColumns}
          handleRowClick={openDetails}
        />
      </div>
    </div>
  );
}

export const PatientImmunizations = withErrorBoundary(
  PatientImmunizationsComponent,
  "PatientImmunizations"
);

const immunizationData = (immunization: ImmunizationModel) => [
  { label: "Date", value: immunization.occurrence },
  { label: "Description", value: immunization.description },
  {
    label: "Vaccine Code",
    value: immunization.resource.vaccineCode.coding ? (
      <CodingList codings={immunization.resource.vaccineCode.coding} />
    ) : undefined,
  },
];
