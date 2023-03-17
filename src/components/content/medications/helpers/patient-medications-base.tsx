import {
  ResourceTable,
  ResourceTableProps,
} from "../../resource/resource-table";
import {
  ResourceTableActions,
  ResourceTableActionsProps,
} from "../../resource/resource-table-actions";
import { useMedicationHistory } from "../history/medication-history-drawer";
import { patientMedicationColumns } from "./columns";
import { defaultMedicationFilters } from "./filters";
import { defaultMedicationSort, medicationSortOptions } from "./sorts";
import { MedicationStatementModel } from "@/fhir/models";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";
import "./patient-medications.scss";
import { FilterItem } from "@/components/core/filter-bar/filter-bar-types";
import { ViewOption } from "../../resource/helpers/view-button";

export type PatientMedicationsTableProps = {
  action?: ResourceTableActionsProps<MedicationStatementModel>["action"];
  className?: string;
  query: { data?: MedicationStatementModel[]; isLoading: boolean };
  rowActions?: ResourceTableProps<MedicationStatementModel>["rowActions"];
  filters: FilterItem[];
  defaultView?: ViewOption;
  views?: ViewOption[];
};

export const PatientMedicationsBase = ({
  action,
  className,
  query,
  rowActions,
  filters,
  defaultView,
  views,
}: PatientMedicationsTableProps) => {
  const showMedicationHistory = useMedicationHistory();
  const { data, setFilters, setSort, setViewOption } = useFilteredSortedData({
    defaultView,
    defaultFilters: defaultMedicationFilters,
    defaultSort: defaultMedicationSort,
    records: query.data,
  });

  return (
    <div className={className}>
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
        onRowClick={(medication) => showMedicationHistory({ medication })}
        rowActions={rowActions}
      />
    </div>
  );
};
