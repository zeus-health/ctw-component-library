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
import {
  ScrollableContainer,
  ScrollingContainerProps,
} from "@/components/core/ctw-box";
import { ConditionModel } from "@/fhir/models";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";

export type PatientConditionsTableProps = {
  action?: ResourceTableActionsProps<ConditionModel>["action"];
  className?: string;
  query: { data?: ConditionModel[]; isLoading: boolean };
  outside?: boolean;
  readOnly?: boolean;
  rowActions?: ResourceTableProps<ConditionModel>["rowActions"];
} & ScrollingContainerProps;

export const PatientConditionsBase = ({
  action,
  className,
  height,
  query,
  outside = false,
  readOnly = false,
  rowActions,
  scrollingEnabled = false,
}: PatientConditionsTableProps) => {
  const showConditionHistory = useConditionHistory();
  const { data, setFilters, setSort } = useFilteredSortedData({
    defaultFilters: defaultConditionFilters,
    defaultSort: defaultConditionSort,
    records: query.data,
  });

  return (
    <ScrollableContainer
      className={className}
      height={height}
      scrollingEnabled={scrollingEnabled}
    >
      <ScrollableContainer scrollingEnabled={!!(height || scrollingEnabled)}>
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
          scrollingEnabled={!!(height || scrollingEnabled)}
        />
      </ScrollableContainer>
    </ScrollableContainer>
  );
};
