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
      className: "ctw-w-[50%]",
    },
    {
      title: "Status",
      dataIndex: "clinicalStatus",
      className: "ctw-w-[20%]",
    },
    {
      title: "Recorded Date",
      dataIndex: "recordedDate",
      className: "ctw-w-[20%]",
    },
    {
      className: "ctw-w-[10%] ctw-table-action-column",
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
