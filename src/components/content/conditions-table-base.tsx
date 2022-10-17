import { Table, TableBaseProps, TableColumn } from "../core/table/table";

import { Breakpoints } from "@/hooks/use-breakpoints";
import { ConditionModel } from "@/models/conditions";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { DropdownMenu, MenuItems } from "../core/dropdown-menu";

export type ConditionsTableBaseProps = {
  className?: string;
  conditions: ConditionModel[];
  rowActions: (condition: ConditionModel) => MenuItems[];
  breakPoint: Breakpoints;
} & TableBaseProps<ConditionModel>;

export function ConditionsTableBase({
  className,
  conditions,
  rowActions,
  breakPoint,
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
      title: "Group",
      dataIndex: "ccsGrouping",
      widthPercent: 25,
      minWidth: 192,
    },
    {
      title: "Status",
      dataIndex: "clinicalStatus",
      widthPercent: 17.5,
      minWidth: 128,
    },
    {
      title: "Recorded Date",
      dataIndex: "recordedDate",
      widthPercent: 17.5,
      minWidth: 132,
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

  if (breakPoint.esm) {
    columns.splice(-1);
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
