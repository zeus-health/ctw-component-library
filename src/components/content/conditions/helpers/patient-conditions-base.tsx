import "./patient-conditions.scss";

import cx from "classnames";
import { ReactElement } from "react";
import { patientConditionsColumns } from "./columns";
import { useConditionDetailsDrawer } from "./details";
import { conditionFilters } from "./filters";
import { conditionSortOptions, defaultConditionSort } from "./sorts";
import { ConditionViewOptions, statusView } from "./views";
import { PatientResourceTable } from "../../resource/patient-resource-table";
import {
  ResourceTableActions,
  ResourceTableActionsProps,
} from "../../resource/resource-table-actions";
import { EmptyPatientTable } from "@/components/core/empty-table";
import { RowActionsProp } from "@/components/core/table/table-rows";
import { ConditionModel } from "@/fhir/models";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";

export type PatientConditionsTableProps = {
  action?: ResourceTableActionsProps<ConditionModel>["action"];
  className?: string;
  query: { data?: ConditionModel[]; isLoading: boolean };
  outside?: boolean;
  readOnly?: boolean;
  RowActions?: RowActionsProp<ConditionModel>;
  emptyMessage?: string | ReactElement | undefined;
  isLoading?: boolean;
};

export const PatientConditionsBase = ({
  action,
  className,
  query,
  outside = false,
  RowActions,
  emptyMessage,
  isLoading,
}: PatientConditionsTableProps) => {
  const openDetailsDrawer = useConditionDetailsDrawer({ RowActions });

  const { viewOptions, current } = statusView;

  const { data, setFilters, setSort, viewOption, setViewOption } = useFilteredSortedData({
    defaultSort: defaultConditionSort,
    records: query.data,
    defaultView: current,
  });

  const isEmptyQuery = query.data?.length === 0;
  const hasZeroFilteredRecords = !isEmptyQuery && data.length === 0;

  let empty = emptyMessage;
  if (emptyMessage === undefined) {
    empty = (
      <EmptyPatientTable
        hasZeroFilteredRecords={hasZeroFilteredRecords}
        resourceName="conditions"
      />
    );
  }

  return (
    <div className={cx(className, "ctw-scrollable-pass-through-height")}>
      <ResourceTableActions
        filterOptions={{
          onChange: setFilters,
          filters: conditionFilters(
            query.data ?? [],
            outside,
            !outside,
            viewOption?.display as ConditionViewOptions
          ),
        }}
        sortOptions={{
          defaultSort: defaultConditionSort,
          options: conditionSortOptions,
          onChange: setSort,
        }}
        viewOptions={{
          onChange: setViewOption,
          options: viewOptions,
          defaultView: current,
        }}
        action={action}
      />
      <PatientResourceTable
        className="ctw-patient-conditions"
        columns={patientConditionsColumns}
        data={data}
        emptyMessage={empty}
        isLoading={isLoading || query.isLoading}
        onRowClick={openDetailsDrawer}
        RowActions={RowActions}
      />
    </div>
  );
};
