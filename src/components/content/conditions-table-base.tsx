import { ConditionModel } from "@/models/conditions";
import { Table, TableBaseProps, TableColumn } from "../core/table/table";

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
    },
    {
      title: "Status",
      dataIndex: "clinicalStatus",
    },
    {
      title: "Recorded Date",
      dataIndex: "recordedDate",
    },
  ];

  return <Table records={conditions} columns={columns} {...tableProps} />;
}
