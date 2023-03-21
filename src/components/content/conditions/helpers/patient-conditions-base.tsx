import cx from "classnames";
import { useConditionHistory } from "../../condition-history/conditions-history-drawer";
import {
  ResourceTable,
  ResourceTableProps,
} from "../../resource/resource-table";
import {
  ResourceTableActions,
  ResourceTableActionsProps,
} from "../../resource/resource-table-actions";
import { patientConditionsColumns } from "./columns";
import { conditionFilters, defaultConditionFilters } from "./filters";
import { conditionSortOptions, defaultConditionSort } from "./sorts";
import "./patient-conditions.scss";
import { ConditionModel } from "@/fhir/models";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";

export type PatientConditionsTableProps = {
  action?: ResourceTableActionsProps<ConditionModel>["action"];
  className?: string;
  query: { data?: ConditionModel[]; isLoading: boolean };
  outside?: boolean;
  readOnly?: boolean;
  rowActions?: ResourceTableProps<ConditionModel>["rowActions"];
};

export const PatientConditionsBase = ({
  action,
  className,
  query,
  outside = false,
  readOnly = false,
  rowActions,
}: PatientConditionsTableProps) => {
  const showConditionHistory = useConditionHistory();
  const { data, setFilters, setSort } = useFilteredSortedData({
    defaultFilters: defaultConditionFilters,
    defaultSort: defaultConditionSort,
    records: query.data,
  });

  return (
    <div className={cx(className, "ctw-scrollable-pass-through-height")}>
      <ResourceTableActions
        filterOptions={{
          onChange: setFilters,
          defaultState: defaultConditionFilters,
          filters: conditionFilters(query.data ?? [], outside),
        }}
        sortOptions={{
          defaultSort: defaultConditionSort,
          options: conditionSortOptions,
          onChange: setSort,
        }}
        action={action}
      />
      <ResourceTable
        className="ctw-patient-conditions"
        columns={patientConditionsColumns}
        data={data}
        emptyMessage="There are no condition records available."
        isLoading={query.isLoading}
        onRowClick={(condition) =>
          showConditionHistory({
            condition,
            readOnly,
          })
        }
        rowActions={rowActions}
      />
    </div>
  );
};
