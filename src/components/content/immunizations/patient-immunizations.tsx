import cx from "classnames";
import { patientImmunizationsColumns } from "./helpers/columns";
import { defaultImmunizationsFilters, immunizationsFilter } from "./helpers/filters";
import { defaultImmunizationSort, immunizationSortOptions } from "./helpers/sort";
import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { ResourceTable } from "../resource/resource-table";
import { ResourceTableActions } from "../resource/resource-table-actions";
import { entryFromArray } from "@/components/core/data-list";
import { EmptyTable } from "@/components/core/empty-table";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { useUserBuilderId } from "@/components/core/providers/user-builder-id";
import { usePatientImmunizations } from "@/fhir/immunizations";
import { ImmunizationModel } from "@/fhir/models/immunization";
import { useFQSFeatureToggle } from "@/hooks/use-feature-toggle";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";

export type PatientImmunizationsProps = {
  className?: string;
};

function PatientImmunizationsComponent({ className }: PatientImmunizationsProps) {
  const userBuilderId = useUserBuilderId();
  const { enabled } = useFQSFeatureToggle("immunizations");
  const patientImmunizationsQuery = usePatientImmunizations();
  const { data, setFilters, setSort } = useFilteredSortedData({
    defaultFilters: defaultImmunizationsFilters,
    defaultSort: defaultImmunizationSort,
    records: patientImmunizationsQuery.data,
  });

  const isEmptyQuery = patientImmunizationsQuery.data.length === 0;
  const hasZeroFilteredRecords = !isEmptyQuery && data.length === 0;

  const openDetails = useResourceDetailsDrawer({
    header: (m) => m.description,
    details: immunizationData,
    getSourceDocument: true,
    enableFQS: enabled,
  });

  return (
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
      <ResourceTable
        showTableHead
        isLoading={patientImmunizationsQuery.isLoading}
        data={data}
        columns={patientImmunizationsColumns(userBuilderId)}
        onRowClick={openDetails}
        enableDismissAndReadActions
        emptyMessage={
          <EmptyTable
            hasZeroFilteredRecords={hasZeroFilteredRecords}
            resourceName="immunizations"
          />
        }
      />
    </div>
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
