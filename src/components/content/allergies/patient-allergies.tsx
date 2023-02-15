import cx from "classnames";
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
      ref={containerRef}
      className={cx(
        "ctw-border ctw-border-solid ctw-border-divider-light ctw-bg-white",
        className,
        {
          "ctw-stacked": breakpoints.sm,
        }
      )}
    >
      <div className="ctw-items-center ctw-justify-between ctw-py-5 ctw-px-4">
        <div className="ctw-ml-3 ctw-text-xl ctw-font-medium ctw-text-content-black">
          Allergies
        </div>
        <Table
          stacked={breakpoints.sm}
          className="-ctw-mx-px !ctw-rounded-none"
          isLoading={isLoading}
          records={allergies}
          columns={patientAllergiesColumns}
        />
      </div>
    </div>
  );
}
