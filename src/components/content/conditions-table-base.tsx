import { ConditionModel } from "@/models/conditions";
import { Table, TableBaseProps, TableColumn } from "../core/table/table";

export type ConditionsTableBaseProps = {
  className?: string;
  conditions: ConditionModel[];
} & TableBaseProps<ConditionModel>;

export function ConditionsTableBase({
  className,
  conditions,
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
      className: "ctw-w-[30%]",
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
