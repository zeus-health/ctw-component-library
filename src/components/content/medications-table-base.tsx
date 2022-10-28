import { Badge } from "@/components/core/badge";
import type { TableColumn } from "@/components/core/table/table";
import { Table } from "@/components/core/table/table";
import type { MedicationStatementModel } from "@/models/medication-statement";
import { compact } from "lodash/fp";
import { useState } from "react";
import { MedicationDrawer } from "./medication-drawer";

const LensStatusColumn = ({ status }: { status: string }) => {
  function statusToColor() {
    switch (status.toLowerCase()) {
      case "inactive":
        return "caution";
      case "active":
        return "good";
      default:
        return "caution";
    }
  }

  return <Badge color={statusToColor()} text={status} className="uppercase" />;
};

export type MedicationsTableBaseProps = {
  medicationStatements: MedicationStatementModel[];
  showLensStatus?: boolean;
  className?: string;
  isLoading?: boolean;
};

export const MedicationsTableBase = ({
  className = "",
  medicationStatements,
  showLensStatus = false,
  isLoading = false,
}: MedicationsTableBaseProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMedication, setSelectedMedication] =
    useState<MedicationStatementModel>();

  function handleRowClick(row: MedicationStatementModel) {
    setSelectedMedication(row);
    setDrawerOpen(true);
  }

  const columns = compact([
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
          dataIndex: "lensStatus",
          className: "w-[20%] min-w-[9rem]",
          render: (ms: MedicationStatementModel) => (
            <LensStatusColumn status={ms.lensStatus} />
          ),
        },
  ]) as TableColumn<MedicationStatementModel>[];

  return (
    <div className={className}>
      <Table
        records={medicationStatements}
        columns={columns}
        message="There are no medications to display."
        handleRowClick={handleRowClick}
        isLoading={isLoading}
      />
      <MedicationDrawer
        medication={selectedMedication}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
};
