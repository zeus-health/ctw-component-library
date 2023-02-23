import { useRef } from "react";
import { patientAllergiesColumns } from "@/components/content/allergies/patient-allergies-column";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { Table } from "@/components/core/table/table";
import { usePatientAllergies } from "@/fhir/allergies";
import { useBreakpoints } from "@/hooks/use-breakpoints";

export type PatientAllergiesProps = {
  className?: string;
  enableFqs?: boolean;
};

function PatientAllergiesComponent({
  className,
  enableFqs,
}: PatientAllergiesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(containerRef);
  const patientAllergiesQuery = usePatientAllergies(enableFqs);

  // Get our allergies.
  const allergies = patientAllergiesQuery.data ?? [];
  const { isLoading } = patientAllergiesQuery;

  return (
    <div
      className={className}
      ref={containerRef}
      data-zus-telemetry-namespace="Allergies"
    >
      <div className="ctw-overflow-hidden">
        <Table
          stacked={breakpoints.sm}
          className="-ctw-mx-px !ctw-rounded-none"
          removeLeftAndRightBorders
          isLoading={isLoading}
          records={allergies}
          columns={patientAllergiesColumns}
        />
      </div>
    </div>
  );
}

export const PatientAllergies = withErrorBoundary(
  PatientAllergiesComponent,
  "PatientAllergies"
);
