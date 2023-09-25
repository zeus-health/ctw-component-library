import cx from "classnames";
import { allergyFilter, defaultAllergyFilters } from "./helpers/filters";
import { useAllergiesHistory } from "./helpers/history";
import { allergySortOptions, defaultAllergySort } from "./helpers/sort";
import { History } from "../resource/helpers/history";
import { PatientResourceTable } from "../resource/patient-resource-table";
import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { ResourceTableActions } from "../resource/resource-table-actions";
import { patientAllergiesColumns } from "@/components/content/allergies/helpers/column";
import { EmptyPatientTable } from "@/components/core/empty-table";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { AnalyticsProvider } from "@/components/core/providers/analytics/analytics-provider";
import { useAnalytics } from "@/components/core/providers/analytics/use-analytics";
import { useUserBuilderId } from "@/components/core/providers/user-builder-id";
import { usePatientAllergies } from "@/fhir/allergies";
import { AllergyModel } from "@/fhir/models/allergies";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";
import { capitalize } from "@/utils/nodash";

export type PatientAllergiesProps = {
  className?: string;
};

export const allergyHistory = (m: AllergyModel) => (
  <History getHistory={useAllergiesHistory} model={m} />
);

function PatientAllergiesComponent({ className }: PatientAllergiesProps) {
  const patientAllergiesQuery = usePatientAllergies();
  const { data, setFilters, setSort } = useFilteredSortedData({
    defaultFilters: defaultAllergyFilters,
    defaultSort: defaultAllergySort,
    records: patientAllergiesQuery.data,
  });
  const userBuilderId = useUserBuilderId();
  const isEmptyQuery = patientAllergiesQuery.data.length === 0;
  const hasZeroFilteredRecords = !isEmptyQuery && data.length === 0;
  const { trackInteraction } = useAnalytics();

  const openDetails = useResourceDetailsDrawer({
    header: (m) => capitalize(m.display),
    details: allergyData,
    renderChild: allergyHistory,
    getSourceDocument: true,
    enableDismissAndReadActions: true,
  });

  return (
    <AnalyticsProvider componentName="PatientAllergies">
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
        <PatientResourceTable
          showTableHead
          isLoading={patientAllergiesQuery.isLoading}
          data={data}
          columns={patientAllergiesColumns(userBuilderId)}
          onRowClick={openDetails}
          enableDismissAndReadActions
          emptyMessage={
            <EmptyPatientTable
              hasZeroFilteredRecords={hasZeroFilteredRecords}
              resourceName="allergies"
              trackInteraction={trackInteraction}
            />
          }
        />
      </div>
    </AnalyticsProvider>
  );
}

export const PatientAllergies = withErrorBoundary(PatientAllergiesComponent, "PatientAllergies");

export const allergyData = (allergy: AllergyModel) => [
  { label: "Recorded Date", value: allergy.recordedDate },
  { label: "Recording Organization", value: allergy.patientOrganizationName },
  { label: "Status", value: allergy.clinicalStatus },
  { label: "Type", value: capitalize(allergy.type) },
  { label: "Onset", value: allergy.onset },
  { label: "Reaction", value: capitalize(allergy.manifestations) },
  { label: "Severity", value: capitalize(allergy.severity) },
  { label: "Note", value: allergy.note },
];
