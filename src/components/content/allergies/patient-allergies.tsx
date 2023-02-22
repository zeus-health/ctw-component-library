import { useRef } from "react";
import { patientAllergiesColumns } from "@/components/content/allergies/patient-allergies-column";
import { Table } from "@/components/core/table/table";
import { usePatientAllergies } from "@/fhir/allergies";
import { useBreakpoints } from "@/hooks/use-breakpoints";

export type PatientAllergiesProps = {
  className?: string;
  enableFqs?: boolean;
};

export function PatientAllergies({
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
      <Table
        stacked={breakpoints.sm}
        className="-ctw-mx-px !ctw-rounded-none"
        removeLeftAndRightBorders
        isLoading={isLoading}
        records={allergies}
        columns={patientAllergiesColumns}
      />
    </div>
  );
}
