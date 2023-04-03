import { patientAllergiesColumns } from "@/components/content/allergies/patient-allergies-column";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { usePatientAllergies } from "@/fhir/allergies";
import { AllergyModel } from "@/fhir/models/allergies";
import cx from "classnames";
import { useRef } from "react";
import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { ResourceTable } from "../resource/resource-table";
import { useAllergiesHistory } from "./helpers/history";
import { allergySortOptions, defaultAllergySort } from "./helpers/sort";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";
import { ResourceTableActions } from "../resource/resource-table-actions";
import { defaultAllergyFilters, allergyFilter } from "./helpers/filters";
import { useCTW } from "@/components/core/providers/ctw-provider";

export type PatientAllergiesProps = {
  className?: string;
  enableFqs?: boolean;
};

function PatientAllergiesComponent({
  className,
  enableFqs,
}: PatientAllergiesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { featureFlags } = useCTW();
  const patientAllergiesQuery = usePatientAllergies();
  const { data, setFilters, setSort } = useFilteredSortedData({
    defaultFilters: defaultAllergyFilters,
    defaultSort: defaultAllergySort,
    records: patientAllergiesQuery.data,
  });
  const openDetails = useResourceDetailsDrawer({
    header: (m) => m.display,
    details: allergyData,
    getHistory: useAllergiesHistory,
  });

  // Get our allergies.
  const { isLoading } = patientAllergiesQuery;

  return (
    <div
      className={cx(className, "ctw-scrollable-pass-through-height")}
      ref={containerRef}
      data-zus-telemetry-namespace="Allergies"
    >
      <ResourceTableActions
        filterOptions={{
          onChange: setFilters,
          defaultState: defaultAllergyFilters,
          filters: allergyFilter(patientAllergiesQuery.data),
        }}
        sortOptions={{
          defaultSort: defaultAllergySort,
          options: allergySortOptions,
          onChange: setSort,
        }}
      />
      <div className="ctw-scrollable-pass-through-height">
        <ResourceTable
          showTableHead={true}
          isLoading={isLoading}
          data={data}
          columns={patientAllergiesColumns(featureFlags?.enableViewFhirButton)}
          onRowClick={openDetails}
        />
      </div>
    </div>
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
