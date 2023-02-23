import { useRef } from "react";
import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { patientAllergiesColumns } from "@/components/content/allergies/patient-allergies-column";
import { Table } from "@/components/core/table/table";
import { usePatientAllergies } from "@/fhir/allergies";
import { AllergyModel } from "@/fhir/models/allergies";
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
  const openDetails = useResourceDetailsDrawer({
    header: (m) => m.display,
    details: allergyData,
  });

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
        handleRowClick={openDetails}
      />
    </div>
  );
}

const allergyData = (allergy: AllergyModel) => [
  { label: "Onset", value: allergy.onset },
  { label: "Description", value: allergy.display },
  { label: "Type", value: allergy.type },
  { label: "Category", value: allergy.categories },
  { label: "Manifestations", value: allergy.manifestations },
];
