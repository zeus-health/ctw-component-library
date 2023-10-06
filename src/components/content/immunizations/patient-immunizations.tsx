import cx from "classnames";
import { patientImmunizationsColumns } from "./helpers/columns";
import { defaultImmunizationsFilters, immunizationsFilter } from "./helpers/filters";
import { defaultImmunizationSort, immunizationSortOptions } from "./helpers/sort";
import { PatientResourceTable } from "../resource/patient-resource-table";
import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { ResourceTableActions } from "../resource/resource-table-actions";
import { entryFromArray } from "@/components/core/data-list";
import { EmptyPatientTable } from "@/components/core/empty-table";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { AnalyticsProvider } from "@/components/core/providers/analytics/analytics-provider";
import { useUserBuilderId } from "@/components/core/providers/user-builder-id";
import { usePatientImmunizations } from "@/fhir/immunizations";
import { ImmunizationModel } from "@/fhir/models/immunization";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";

export type PatientImmunizationsProps = {
  className?: string;
};

function PatientImmunizationsComponent({ className }: PatientImmunizationsProps) {
  const userBuilderId = useUserBuilderId();
  const patientImmunizationsQuery = usePatientImmunizations();
  const { data, setFilters, setSort } = useFilteredSortedData({
    defaultFilters: defaultImmunizationsFilters,
    defaultSort: defaultImmunizationSort,
    records: patientImmunizationsQuery.data,
  });

  const isEmptyQuery = patientImmunizationsQuery.data.length === 0;
  const hasZeroFilteredRecords = !isEmptyQuery && data.length === 0;

  const openDetails = useResourceDetailsDrawer({
    isOpen: true,
    header: (m) => m.description,
    details: immunizationData,
    getSourceDocument: true,
    enableDismissAndReadActions: true,
  });

  return (
    <AnalyticsProvider componentName="PatientImmunizations">
      <div className={cx(className, "ctw-scrollable-pass-through-height")}>
        <ResourceTableActions
          filterOptions={{
            onChange: setFilters,
            defaultState: defaultImmunizationsFilters,
            filters: immunizationsFilter(),
          }}
          sortOptions={{
            defaultSort: defaultImmunizationSort,
            options: immunizationSortOptions,
            onChange: setSort,
          }}
        />
        <PatientResourceTable
          showTableHead
          isLoading={patientImmunizationsQuery.isLoading}
          data={data}
          columns={patientImmunizationsColumns(userBuilderId)}
          onRowClick={openDetails}
          enableDismissAndReadActions
          emptyMessage={
            <EmptyPatientTable
              hasZeroFilteredRecords={hasZeroFilteredRecords}
              resourceName="immunizations"
            />
          }
        />
      </div>
    </AnalyticsProvider>
  );
}

export const PatientImmunizations = withErrorBoundary(
  PatientImmunizationsComponent,
  "PatientImmunizations"
);

const immunizationData = (immunization: ImmunizationModel) => [
  { label: "Date Given", value: immunization.occurrence },
  { label: "Provider Organization", value: immunization.managingOrganization },
  { label: "Status", value: immunization.status },
  { label: "Dose Quantity", value: immunization.doseQuantity },
  { label: "Route", value: immunization.route },
  { label: "Site", value: immunization.site },
  { label: "Lot Number", value: immunization.resource.lotNumber },
  ...entryFromArray("Note", immunization.notesDisplay),
];
