import cx from "classnames";
import { diagnosticReportColumns } from "./columns";
import { defaultObservationSort, observationSortOptions } from "./sorts";
import { ResourceTable, ResourceTableProps } from "../../resource/resource-table";
import {
  ResourceTableActions,
  ResourceTableActionsProps,
} from "../../resource/resource-table-actions";
import { useObservationsDetailsDrawer } from "@/components/content/observations/helpers/drawer";
import { defaultFilters, filters } from "@/components/content/observations/helpers/filters";
import { DiagnosticReportModel } from "@/fhir/models";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";

export type PatientObservationsTableProps = {
  action?: ResourceTableActionsProps<DiagnosticReportModel>["action"];
  className?: cx.Argument;
  query: { data?: DiagnosticReportModel[]; isLoading: boolean };
  rowActions?: ResourceTableProps<DiagnosticReportModel>["rowActions"];
};

export const PatientObservationsBase = ({
  action,
  className,
  query,
  rowActions,
}: PatientObservationsTableProps) => {
  const openDrawer = useObservationsDetailsDrawer();
  const { data, setFilters, setSort } = useFilteredSortedData({
    defaultSort: defaultObservationSort,
    records: query.data,
    defaultFilters,
  });

  return (
    <div className={cx(className, "ctw-scrollable-pass-through-height")}>
      <ResourceTableActions
        filterOptions={{
          onChange: setFilters,
          defaultState: defaultFilters,
          filters: filters(query.data ?? []),
        }}
        sortOptions={{
          defaultSort: defaultObservationSort,
          options: observationSortOptions,
          onChange: setSort,
        }}
        action={action}
      />

      <ResourceTable
        className="ctw-patient-observations"
        columns={diagnosticReportColumns}
        data={data}
        emptyMessage="There are no observation records available."
        isLoading={query.isLoading}
        rowActions={rowActions}
        onRowClick={openDrawer}
      />
    </div>
  );
};
