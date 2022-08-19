import { ConditionModel } from "@/models/conditions";
import { useState } from "react";
import { Table, TableColumn, TableOptionProps } from "../core/table/table";
import { ConditionDrawer } from "./conditions-drawer";

export type ConditionsTableBaseProps = {
  conditions: ConditionModel[];
} & TableOptionProps<ConditionModel>;

export function ConditionsTableBase({
  conditions,
  isLoading,
  message,
}: ConditionsTableBaseProps) {
  const [detailsIsOpen, setDetailsIsOpen] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState<ConditionModel>();

  function openDetails(condition: ConditionModel) {
    setDetailsIsOpen(true);
    setSelectedCondition(condition);
  }

  function closeDetails() {
    setDetailsIsOpen(false);
  }

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
      <Table
        records={conditions}
        columns={columns}
        isLoading={isLoading}
        message={message}
        onRowClick={openDetails}
      />
      <ConditionDrawer
        condition={selectedCondition}
        isOpen={detailsIsOpen}
        onClose={closeDetails}
      />
    </div>
  );
}
