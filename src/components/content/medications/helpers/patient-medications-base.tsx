import cx from "classnames";
import { ViewOption } from "../../resource/helpers/view-button";
import {
  ResourceTable,
  ResourceTableProps,
} from "../../resource/resource-table";
import {
  ResourceTableActions,
  ResourceTableActionsProps,
} from "../../resource/resource-table-actions";
import { patientMedicationColumns } from "./columns";
import { useMedicationDetailsDrawer } from "./details";
import { defaultMedicationFilters } from "./filters";
import { defaultMedicationSort, medicationSortOptions } from "./sorts";
import { FilterItem } from "@/components/core/filter-bar/filter-bar-types";
import { MedicationStatementModel } from "@/fhir/models";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";
import "./patient-medications.scss";

export type PatientMedicationsBaseProps = {
  action?: ResourceTableActionsProps<MedicationStatementModel>["action"];
  className?: string;
  query: { data?: MedicationStatementModel[]; isLoading: boolean };
  rowActions?: ResourceTableProps<MedicationStatementModel>["rowActions"];
  filters: FilterItem[];
  defaultView?: ViewOption;
  views?: ViewOption[];

  onOpenHistoryDrawer?: () => void;
};

export const PatientMedicationsBase = ({
  action,
  className,
  query,
  rowActions,
  filters,
  defaultView,
  views,
  onOpenHistoryDrawer,
}: PatientMedicationsBaseProps) => {
  const openDetailsDrawer = useMedicationDetailsDrawer();
  const { data, setFilters, setSort, setViewOption } = useFilteredSortedData({
    defaultView,
    defaultFilters: defaultMedicationFilters,
    defaultSort: defaultMedicationSort,
    records: query.data,
  });

  function handleRowClick(medication: MedicationStatementModel) {
    onOpenHistoryDrawer?.();
    openDetailsDrawer(medication);
  }

  return (
    <div className={cx("ctw-scrollable-pass-through-height", className)}>
      <ResourceTableActions
        viewOptions={
          defaultView && views
            ? {
                onChange: setViewOption,
                defaultView,
                options: views,
              }
            : undefined
        }
        filterOptions={{
          onChange: setFilters,
          defaultState: defaultMedicationFilters,
          filters,
        }}
        sortOptions={{
          defaultSort: defaultMedicationSort,
          options: medicationSortOptions,
          onChange: setSort,
        }}
        action={action}
      />

      <ResourceTable
        className="ctw-patient-medications"
        columns={patientMedicationColumns}
        data={data}
        emptyMessage="There are no medication records available."
        isLoading={query.isLoading}
        onRowClick={handleRowClick}
        rowActions={rowActions}
      />
    </div>
  );
};
