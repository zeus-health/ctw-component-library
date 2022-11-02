import { Table, TableBaseProps, TableColumn } from "../core/table/table";

import { ConditionModel } from "@/models/condition";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { DropdownMenu, MenuItems } from "../core/dropdown-menu";

export type ConditionsTableBaseProps = {
  className?: string;
  conditions: ConditionModel[];
  rowActions: (condition: ConditionModel) => MenuItems[];
  hideMenu: boolean;
} & TableBaseProps<ConditionModel>;

export function ConditionsTableBase({
  className,
  conditions,
  rowActions,
  hideMenu,
  ...tableProps
}: ConditionsTableBaseProps) {
  const columns: TableColumn<ConditionModel>[] = [
    {
      title: "Condition",
      dataIndex: "display",
      widthPercent: 40,
      minWidth: 320,
    },
    {
      title: "Category",
      dataIndex: "ccsGrouping",
      widthPercent: 25,
      minWidth: 192,
    },
    {
      title: "Status",
      render: (condition) => (
        <div className="ctw-capitalize">
          <div className="ctw-text-content-black">
            {condition.clinicalStatus}
          </div>
          <div>{condition.verificationStatus}</div>
        </div>
      ),
      widthPercent: 17.5,
      minWidth: 128,
    },
    {
      title: "Last Recorded",
      dataIndex: "recordedDate",
      widthPercent: 17.5,
      minWidth: 132,
    },
  ];

  if (!hideMenu) {
    columns.push({
      className: "ctw-table-action-column",
      render: (condition: ConditionModel) => (
        <DropdownMenu menuItems={rowActions(condition)}>
          <DotsHorizontalIcon className="ctw-w-5" />
        </DropdownMenu>
      ),
    });
  }

  return (
    <Table
      className={className}
      records={conditions}
      columns={columns}
      {...tableProps}
    />
  );
}
