import cx from "classnames";
import { useEffect, useRef } from "react";
import { patientImmunizationsColumns } from "./patient-immunizations-columns";
import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { CodingList } from "@/components/core/coding-list";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { useCTW } from "@/components/core/providers/ctw-provider";
import { Table } from "@/components/core/table/table";
import { ViewFHIR } from "@/components/core/view-fhir";
import { usePatientImmunizations } from "@/fhir/immunizations";
import { ImmunizationModel } from "@/fhir/models/immunization";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import { Telemetry } from "@/utils/telemetry";

export type PatientImmunizationsProps = {
  className?: string;
};

const viewRecordFHIR = ({ record }: { record: ImmunizationModel }) => (
  <ViewFHIR name="Immunization Resource" resource={record.resource} />
);

function PatientImmunizationsComponent({ className }: PatientImmunizationsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(containerRef);
  const { featureFlags } = useCTW();
  const query = usePatientImmunizations();
  const openDetails = useResourceDetailsDrawer({
    header: (m) => m.description,
    details: immunizationData,
    getSourceDocument: true,
  });

  useEffect(() => {
    if (!query.isLoading) {
      Telemetry.reportZAPRecordCount("immunization", query.data?.length);
    }
  }, [query.isLoading, query.data]);

  return (
    <div
      ref={containerRef}
      data-zus-telemetry-namespace="Immunizations"
      className={cx(
        "ctw-patient-immunizations ctw-scrollable-pass-through-height ctw-bg-white",
        className,
        {
          "ctw-stacked": breakpoints.sm,
        }
      )}
    >
      <Table
        RowActions={featureFlags?.enableViewFhirButton ? viewRecordFHIR : undefined}
        stacked={breakpoints.sm}
        isLoading={query.isLoading}
        records={query.data ?? []}
        columns={patientImmunizationsColumns}
        handleRowClick={openDetails}
      />
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
