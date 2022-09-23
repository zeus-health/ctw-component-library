import { Table, TableBaseProps, TableColumn } from "../core/table/table";

import { ConditionModel } from "@/models/conditions";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { DropdownMenu, MenuItems } from "../core/dropdown-menu";

export type ConditionsTableBaseProps = {
  className?: string;
  conditions: ConditionModel[];
  rowActions: (condition: ConditionModel) => MenuItems[];
} & TableBaseProps<ConditionModel>;

export function ConditionsTableBase({
  className,
  conditions,
  rowActions,
  ...tableProps
}: ConditionsTableBaseProps) {
  const columns: TableColumn<ConditionModel>[] = [
    {
      title: "Condition",
      dataIndex: "display",
      widthPercent: 30,
      minWidth: 320,
    },
    {
      title: "Group",
      dataIndex: "ccsGrouping",
      widthPercent: 20,
      minWidth: 200,
    },
    {
      title: "Status",
      dataIndex: "clinicalStatus",
      widthPercent: 25,
      minWidth: 128,
    },
    {
      title: "Recorded Date",
      dataIndex: "recordedDate",
      widthPercent: 25,
      minWidth: 128,
    },
    {
      className: "ctw-table-action-column",
      render: (condition: ConditionModel) => (
        <DropdownMenu menuItems={rowActions(condition)}>
          <DotsHorizontalIcon className="ctw-w-5" />
        </DropdownMenu>
      ),
    },
  ];

  return (
    <Table
      className={className}
      records={conditions}
      columns={columns}
      {...tableProps}
    />
  );
}
