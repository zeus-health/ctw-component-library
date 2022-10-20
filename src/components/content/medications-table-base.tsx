import { useState } from "react";
import type { TableColumn } from "@/components/core/table/table";
import { Table } from "@/components/core/table/table";
import type { MedicationStatementModel } from "@/models/medication-statement";
import { ActiveColumn } from "./columns/active-column";
import { MedicationDrawer } from "./medication-drawer";

export type MedicationsTableBaseProps = {
  currentPage: number;
  medicationStatements: MedicationStatementModel[];
  pageSize: number;
  param: string;
  total: number;
  className?: string;
};

// @todo this isn't doing pagination
export const MedicationsTableBase = ({
  className = "",
  medicationStatements,
  total,
}: MedicationsTableBaseProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMedication, setSelectedMedication] =
    useState<MedicationStatementModel>();

  function handleRowClick(row: MedicationStatementModel) {
    setSelectedMedication(row);
    setDrawerOpen(true);
  }

  const columns: TableColumn<MedicationStatementModel>[] = [
    {
      title: "Medication Name",
      dataIndex: "display",
      className: "w-[17.5%] min-w-[14rem]",
    },
    {
      title: "Dosage",
      dataIndex: "dosage",
      className: "w-[25%] min-w-[20rem]",
    },
    {
      title: "Effective Start Period",
      dataIndex: "effectiveStart",
      className: "w-[10%] min-w-[9rem]",
    },
    {
      title: "Status",
      dataIndex: "status",
      className: "w-[10%] min-w-[8rem]",
    },
    {
      title: "Lens Status",
      render: () => <ActiveColumn status="active" />,
      className: "w-[10%] min-w-[9rem]",
    },
    {
      title: "Patient Status",
      dataIndex: "patientStatus",
      className: "w-[10%] min-w-[8rem]",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      className: "w-[17.5%] min-w-[14rem]",
    },
  ];

  return (
    <div className={`ctw-table ${className}`.trim()}>
      <Table
        className="ctw-table"
        records={medicationStatements}
        columns={columns}
        message="There are no medications to display."
      />
      <MedicationDrawer
        medication={selectedMedication}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
};
