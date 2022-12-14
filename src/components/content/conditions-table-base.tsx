import { ReactElement } from "react";
import { MenuItem } from "../core/dropdown-menu";
import { Table, TableBaseProps } from "../core/table/table";
import { TableColumn } from "../core/table/table-helpers";
import { ConditionModel } from "@/fhir/models/condition";

export type ConditionsTableBaseProps = {
  className?: string;
  conditions: ConditionModel[];
  onRowClick?: (condition: ConditionModel) => Promise<void>;
  rowActions: (condition: ConditionModel) => MenuItem[];
  readOnly: boolean;
} & TableBaseProps<ConditionModel>;

export function ConditionsTableBase({
  className,
  conditions,
  onRowClick,
  rowActions,
  readOnly,
  sort = { columnTitle: "Last Recorded", dir: "desc" },
  onSort,
  ...tableProps
}: ConditionsTableBaseProps) {
  const columns: TableColumn<ConditionModel>[] = [
    {
      title: "Condition",
      dataIndex: "display",
      widthPercent: 40,
      minWidth: 320,
      sortIndices: [{ index: "display" }, { index: "recorded", dir: "desc" }],
    },
    {
      title: "Category",
      dataIndex: "ccsGrouping",
      widthPercent: 25,
      minWidth: 192,
      sortIndices: [{ index: "ccsGrouping" }, { index: "display", dir: "asc" }],
    },
    {
      title: "Status",
      render: (condition) => (
        <div className="ctw-capitalize">
          <div className="ctw-text-content-black">
            {condition.clinicalStatus}
          </div>
          <div>
            {condition.isArchived ? "Archived" : condition.verificationStatus}
          </div>
        </div>
      ),
      widthPercent: 17.5,
      minWidth: 128,
      sortIndices: [
        { index: "clinicalStatus" },
        { index: "verificationStatus" },
        { index: "recorded", dir: "desc" },
      ],
    },
    {
      title: "Last Recorded",
      dataIndex: "recordedDate",
      widthPercent: 17.5,
      minWidth: 132,
      sortIndices: [{ index: "recorded" }, { index: "display", dir: "asc" }],
    },
  ];

  let rowSibling: (condition: ConditionModel) => ReactElement = (condition) => (
    <></>
  );
  if (!readOnly) {
    rowSibling = (condition: ConditionModel) => (
      <div className="ctw-invisible ctw-absolute ctw-right-0 ctw-space-x-2 ctw-px-4 group-hover:ctw-visible">
        {rowActions(condition).map((rowAction) => (
          <button
            type="button"
            className="ctw-btn-primary ctw-z-50"
            onClick={rowAction.action}
          >
            {rowAction.name}
          </button>
        ))}
      </div>
    );
  }

  return (
    <Table
      className={className}
      records={conditions}
      onRowClick={onRowClick}
      columns={columns}
      rowSibling={rowSibling}
      sort={sort}
      onSort={onSort}
      {...tableProps}
    />
  );
}
