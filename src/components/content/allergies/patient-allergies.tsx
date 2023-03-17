import { useRef } from "react";
import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { patientAllergiesColumns } from "@/components/content/allergies/patient-allergies-column";
import {
  ScrollableContainer,
  ScrollingContainerProps,
} from "@/components/core/ctw-box";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { Table } from "@/components/core/table/table";
import { usePatientAllergies } from "@/fhir/allergies";
import { AllergyModel } from "@/fhir/models/allergies";
import { useBreakpoints } from "@/hooks/use-breakpoints";

export type PatientAllergiesProps = {
  className?: string;
  enableFqs?: boolean;
} & ScrollingContainerProps;

function PatientAllergiesComponent({
  className,
  enableFqs,
  height,
  scrollingEnabled = false,
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
  const isScrollingEnabled = !!(scrollingEnabled || height);

  return (
    <ScrollableContainer
      height={height}
      scrollingEnabled={scrollingEnabled}
      className={className}
      ref={containerRef}
      data-zus-telemetry-namespace="Allergies"
    >
      <ScrollableContainer
        className="ctw-overflow-hidden"
        scrollingEnabled={isScrollingEnabled}
      >
        <Table
          stacked={breakpoints.sm}
          isLoading={isLoading}
          records={allergies}
          columns={patientAllergiesColumns}
          handleRowClick={openDetails}
          scrollingEnabled={isScrollingEnabled}
        />
      </ScrollableContainer>
    </ScrollableContainer>
  );
}

export const PatientAllergies = withErrorBoundary(
  PatientAllergiesComponent,
  "PatientAllergies"
);

const allergyData = (allergy: AllergyModel) => [
  { label: "Onset", value: allergy.onset },
  { label: "Description", value: allergy.display },
  { label: "Type", value: allergy.type },
  { label: "Category", value: allergy.categories },
  { label: "Manifestations", value: allergy.manifestations },
];
