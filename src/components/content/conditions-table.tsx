import { ConditionModel } from "@/models/conditions";
import { Table, TableColumn, TableOptionProps } from "../core/table";

export type ConditionsTableProps = {
  conditions: ConditionModel[];
} & TableOptionProps<ConditionModel>;

export function ConditionsTable({ conditions }: ConditionsTableProps) {
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
      title: "Category",
      render: ({ categories }) => categories.join(", "),
    },
    {
      title: "Onset",
      dataIndex: "onset",
    },
    {
      title: "Recorded Date",
      dataIndex: "recordedDate",
    },
    {
      title: "Recorder",
      dataIndex: "recorder",
    },
  ];

  return (
    <div>
      <Table records={conditions} columns={columns} />
    </div>
  );
}
