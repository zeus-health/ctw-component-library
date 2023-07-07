import cx from "classnames";
import { useEffect, useState } from "react";
import { patientImmunizationsColumns } from "./helpers/columns";
import { defaultImmunizationsFilters, immunizationsFilter } from "./helpers/filters";
import { defaultImmunizationSort, immunizationSortOptions } from "./helpers/sort";
import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { ResourceTable } from "../resource/resource-table";
import { ResourceTableActions } from "../resource/resource-table-actions";
import { entryFromArray } from "@/components/core/data-list";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { useCTW } from "@/components/core/providers/use-ctw";
import { usePatientImmunizations } from "@/fhir/immunizations";
import { ImmunizationModel } from "@/fhir/models/immunization";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";
import { useFQSFeatureToggle } from "@/hooks/use-fqs-feature-toggle";

export type PatientImmunizationsProps = {
  className?: string;
};

function PatientImmunizationsComponent({ className }: PatientImmunizationsProps) {
  const { getRequestContext } = useCTW();
  const { enabled } = useFQSFeatureToggle("immunizations");
  const patientImmunizationsQuery = usePatientImmunizations();
  const { data, setFilters, setSort } = useFilteredSortedData({
    defaultFilters: defaultImmunizationsFilters,
    defaultSort: defaultImmunizationSort,
    records: patientImmunizationsQuery.data,
  });
  const [userBuilderId, setUserBuilderId] = useState("");

  const openDetails = useResourceDetailsDrawer({
    header: (m) => m.description,
    details: immunizationData,
    getSourceDocument: true,
    enableFQS: enabled,
  });

  useEffect(() => {
    async function load() {
      const requestContext = await getRequestContext();
      setUserBuilderId(requestContext.builderId);
    }

    void load();
  }, [getRequestContext]);

  return (
    <div
      className={cx(className, "ctw-scrollable-pass-through-height")}
      data-zus-telemetry-namespace="Immunizations"
    >
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
