import { useState } from "react";
import { compact } from "lodash/fp";
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
  showLensStatus?: boolean;
  className?: string;
};

// @todo this isn't doing pagination
export const MedicationsTableBase = ({
  className = "",
  medicationStatements,
  showLensStatus = false,
  total,
}: MedicationsTableBaseProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMedication, setSelectedMedication] =
    useState<MedicationStatementModel>();

  function handleRowClick(row: MedicationStatementModel) {
    setSelectedMedication(row);
    setDrawerOpen(true);
  }

  const columns: TableColumn<MedicationStatementModel>[] = compact([
    {
      title: "Medication Name",
      dataIndex: "display",
      className: "w-[30%] min-w-[14rem]",
    },
    {
      title: "Dosage",
      dataIndex: "dosage",
      className: "w-[30%] min-w-[20rem]",
    },
    {
      title: "Status",
      dataIndex: "status",
      className: "w-[20%] min-w-[8rem]",
    },
    !showLensStatus
      ? null
      : {
          title: "Lens Status",
          render: () => <ActiveColumn status="active" />,
          className: "w-[20%] min-w-[9rem]",
        },
  ]);

  return (
    <div className={`ctw-table ${className}`.trim()}>
      <Table
        className="ctw-table"
        records={medicationStatements}
        columns={columns}
        message="There are no medications to display."
        handleRowClick={handleRowClick}
      />
      <MedicationDrawer
        medication={selectedMedication}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
};
