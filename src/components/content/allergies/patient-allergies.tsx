import cx from "classnames";
import { allergyFilter, defaultAllergyFilters } from "./helpers/filters";
import { useAllergiesHistory } from "./helpers/history";
import { allergySortOptions, defaultAllergySort } from "./helpers/sort";
import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { ResourceTable } from "../resource/resource-table";
import { ResourceTableActions } from "../resource/resource-table-actions";
import { patientAllergiesColumns } from "@/components/content/allergies/helpers/column";
import { EmptyTable } from "@/components/core/empty-table";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { useUserBuilderId } from "@/components/core/providers/user-builder-id";
import { usePatientAllergies } from "@/fhir/allergies";
import { AllergyModel } from "@/fhir/models/allergies";
import { useFQSFeatureToggle } from "@/hooks/use-feature-toggle";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";
import { capitalize } from "@/utils/nodash";

export type PatientAllergiesProps = {
  className?: string;
};

function PatientAllergiesComponent({ className }: PatientAllergiesProps) {
  const { enabled } = useFQSFeatureToggle("allergies");
  const patientAllergiesQuery = usePatientAllergies();
  const { data, setFilters, setSort } = useFilteredSortedData({
    defaultFilters: defaultAllergyFilters,
    defaultSort: defaultAllergySort,
    records: patientAllergiesQuery.data,
  });
  const userBuilderId = useUserBuilderId();
  const isEmptyQuery = patientAllergiesQuery.data.length === 0;
  const hasZeroFilteredRecords = !isEmptyQuery && data.length === 0;

  const openDetails = useResourceDetailsDrawer({
    header: (m) => capitalize(m.display),
    details: allergyData,
    getHistory: useAllergiesHistory,
    getSourceDocument: true,
    enableFQS: enabled,
  });

  return (
    <div className={cx(className, "ctw-scrollable-pass-through-height")}>
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
      <ResourceTable
        showTableHead
        isLoading={patientAllergiesQuery.isLoading}
        data={data}
        columns={patientAllergiesColumns(userBuilderId)}
        onRowClick={openDetails}
        enableDismissAndReadActions
        emptyMessage={
          <EmptyTable hasZeroFilteredRecords={hasZeroFilteredRecords} resourceName="allergies" />
        }
      />
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
