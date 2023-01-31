import cx from "classnames";
import { useRef } from "react";
import { useAllergyDetailsDrawer } from "./allergy-details-drawer";
import { patientAllergiesColumns } from "@/components/content/allergies/patient-allergies-column";
import { Heading } from "@/components/core/ctw-box";
import { Table } from "@/components/core/table/table";
import { ViewFHIR } from "@/components/core/view-fhir";
import { usePatientAllergies } from "@/fhir/allergies";
import { AllergyModel } from "@/fhir/models/allergies";
import { useBreakpoints } from "@/hooks/use-breakpoints";

export type PatientAllergiesProps = {
  className?: string;
};

const viewRecordFHIR = ({ record }: { record: AllergyModel }) => (
  <ViewFHIR name="Allergy Resource" resource={record.resource} />
);

export function PatientAllergies({ className }: PatientAllergiesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(containerRef);
  const patientAllergiesQuery = usePatientAllergies();

  const openDetails = useAllergyDetailsDrawer();

  function handleRowClick(allergy: AllergyModel) {
    openDetails(allergy);
  }

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
      <Heading title="Allergies" />
      <Table
        RowActions={viewRecordFHIR}
        stacked={breakpoints.sm}
        className="-ctw-mx-px !ctw-rounded-none"
        isLoading={isLoading}
        records={allergies}
        columns={patientAllergiesColumns}
        handleRowClick={handleRowClick}
      />
    </div>
  );
}
