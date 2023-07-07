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
import { EmptyTable } from "@/components/core/empty-table";
import { DiagnosticReportModel } from "@/fhir/models";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";

export type PatientObservationsTableProps = {
  action?: ResourceTableActionsProps<DiagnosticReportModel>["action"];
  className?: cx.Argument;
  query: { data?: DiagnosticReportModel[]; isLoading: boolean };
  rowActions?: ResourceTableProps<DiagnosticReportModel>["RowActions"];
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

  const isEmptyQuery = query.data?.length === 0;
  const hasZeroFilteredRecords = !isEmptyQuery && data.length === 0;

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
        emptyMessage={
          <EmptyTable hasZeroFilteredRecords={hasZeroFilteredRecords} resourceName="observations" />
        }
        isLoading={query.isLoading}
        RowActions={rowActions}
        onRowClick={openDrawer}
      />
    </div>
  );
};
