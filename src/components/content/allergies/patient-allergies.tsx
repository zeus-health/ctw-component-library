import cx from "classnames";
import { useEffect, useRef } from "react";
import { allergyFilter, defaultAllergyFilters } from "./helpers/filters";
import { useAllergiesHistory } from "./helpers/history";
import { allergySortOptions, defaultAllergySort } from "./helpers/sort";
import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { ResourceTable } from "../resource/resource-table";
import { ResourceTableActions } from "../resource/resource-table-actions";
import { patientAllergiesColumns } from "@/components/content/allergies/patient-allergies-column";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { useCTW } from "@/components/core/providers/ctw-provider";
import { usePatientAllergies } from "@/fhir/allergies";
import { AllergyModel } from "@/fhir/models/allergies";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";
import { capitalize } from "@/utils/nodash";
import { Telemetry } from "@/utils/telemetry";

export type PatientAllergiesProps = {
  className?: string;
  enableFqs?: boolean;
};

function PatientAllergiesComponent({ className }: PatientAllergiesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { featureFlags } = useCTW();
  const patientAllergiesQuery = usePatientAllergies();
  const { data, setFilters, setSort } = useFilteredSortedData({
    defaultFilters: defaultAllergyFilters,
    defaultSort: defaultAllergySort,
    records: patientAllergiesQuery.data,
  });
  const openDetails = useResourceDetailsDrawer({
    header: (m) => capitalize(m.display),
    details: allergyData,
    getHistory: useAllergiesHistory,
    getSourceDocument: true,
  });

  // Get our allergies.
  const { isLoading } = patientAllergiesQuery;

  useEffect(() => {
    if (!isLoading) {
      Telemetry.reportZAPRecordCount("allergies", patientAllergiesQuery.data?.length);
    }
  }, [isLoading, patientAllergiesQuery.data]);

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
          filters: allergyFilter(),
        }}
        sortOptions={{
          defaultSort: defaultAllergySort,
          options: allergySortOptions,
          onChange: setSort,
        }}
      />
      <div className="ctw-scrollable-pass-through-height">
        <ResourceTable
          showTableHead
          isLoading={isLoading}
          data={data}
          columns={patientAllergiesColumns(featureFlags?.enableViewFhirButton)}
          onRowClick={openDetails}
        />
      </div>
    </div>
  );
}

export const PatientAllergies = withErrorBoundary(PatientAllergiesComponent, "PatientAllergies");

const allergyData = (allergy: AllergyModel) => [
  { label: "Recorded Date", value: allergy.recordedDate },
  { label: "Recording Organization", value: allergy.managingOrganization },
  { label: "Status", value: allergy.clinicalStatus },
  { label: "Type", value: capitalize(allergy.type) },
  { label: "Onset", value: allergy.onset },
  { label: "Reaction", value: capitalize(allergy.manifestations) },
  { label: "Severity", value: capitalize(allergy.severity) },
  { label: "Note", value: allergy.note },
];
