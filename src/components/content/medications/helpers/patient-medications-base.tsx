import cx from "classnames";
import { patientMedicationColumns } from "./columns";
import { useMedicationDetailsDrawer } from "./details";
import { defaultMedicationFilters } from "./filters";
import { defaultMedicationSort, medicationSortOptions } from "./sorts";
import { QUERY_KEY_PATIENT_SUMMARY_MEDICATIONS } from "../../../../utils/query-keys";
import { ViewOption } from "../../resource/helpers/view-button";
import { PatientResourceTable } from "../../resource/patient-resource-table";
import {
  ResourceTableActions,
  ResourceTableActionsProps,
} from "../../resource/resource-table-actions";
import { EmptyPatientTable } from "@/components/core/empty-table";
import { FilterItem } from "@/components/core/filter-bar/filter-bar-types";
import { RowActionsConfigProp } from "@/components/core/table/table-rows";
import { MedicationStatementModel } from "@/fhir/models";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";
import "./patient-medications.scss";

export type PatientMedicationsBaseProps = {
  action?: ResourceTableActionsProps<MedicationStatementModel>["action"];
  className?: string;
  query: { data?: MedicationStatementModel[]; isLoading: boolean };
  rowActions?: (record: MedicationStatementModel) => RowActionsConfigProp<MedicationStatementModel>;
  filters: FilterItem[];
  defaultView?: ViewOption<MedicationStatementModel>;
  views?: ViewOption<MedicationStatementModel>[];
  enableFQS?: boolean;
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
  const openDetailsDrawer = useMedicationDetailsDrawer({ rowActions });
  const { data, setFilters, setSort, setViewOption } = useFilteredSortedData({
    defaultView,
    defaultFilters: defaultMedicationFilters,
    defaultSort: defaultMedicationSort,
    records: query.data,
  });

  const isEmptyQuery = query.data?.length === 0;
  const hasZeroFilteredRecords = !isEmptyQuery && data.length === 0;

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

      <PatientResourceTable
        className="ctw-patient-medications"
        columns={patientMedicationColumns}
        data={data}
        emptyMessage={
          <EmptyPatientTable
            hasZeroFilteredRecords={hasZeroFilteredRecords}
            resourceName="medications"
          />
        }
        isLoading={query.isLoading}
        onRowClick={handleRowClick}
        rowActions={rowActions}
        queryKey={QUERY_KEY_PATIENT_SUMMARY_MEDICATIONS}
      />
    </div>
  );
};
