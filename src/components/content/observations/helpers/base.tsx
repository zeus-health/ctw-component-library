import {
  ResourceTable,
  ResourceTableProps,
} from "../../resource/resource-table";
import {
  ResourceTableActions,
  ResourceTableActionsProps,
} from "../../resource/resource-table-actions";
import { patientObservationsColumns } from "./columns";
import { defaultObservationSort, observationSortOptions } from "./sorts";
import { useObservationsDetailsDrawer } from "@/components/content/observations/helpers/drawer";
import {
  defaultObservationFilters,
  diagnosticReportFilters,
} from "@/components/content/observations/helpers/filters";
import { DiagnosticReportModel } from "@/fhir/models";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";

export type PatientObservationsTableProps = {
  action?: ResourceTableActionsProps<DiagnosticReportModel>["action"];
  className?: string;
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
    defaultFilters: defaultObservationFilters,
  });

  return (
    <div className={className}>
      <ResourceTableActions
        filterOptions={{
          onChange: setFilters,
          defaultState: defaultObservationFilters,
          filters: diagnosticReportFilters(query.data ?? []),
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
        columns={patientObservationsColumns}
        data={data}
        emptyMessage="There are no observation records available."
        isLoading={query.isLoading}
        rowActions={rowActions}
        onRowClick={openDrawer}
      />
    </div>
  );
};
