import { Table, TableBaseProps, TableColumn } from "../core/table/table";

import { ConditionModel } from "@/models/conditions";

export type ConditionsTableBaseProps = {
  conditions: ConditionModel[];
} & TableBaseProps<ConditionModel>;

export function ConditionsTableBase({
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

  return <Table records={conditions} columns={columns} {...tableProps} />;
}
