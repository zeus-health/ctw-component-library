import type { MedicationStatementModel } from "@/fhir/models/medication-statement";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { ReactNode, useRef } from "react";
import { MinRecordItem, TableColumn } from "../core/table/table-helpers";
import { DropdownMenu, MenuItem } from "@/components/core/dropdown-menu";
import { Table, TableBaseProps } from "@/components/core/table/table";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import { compact, isFunction } from "@/utils/nodash/fp";

export type MedicationsTableBaseProps<T extends MinRecordItem> = {
  medicationStatements: MedicationStatementModel[];
  rowMenuActions?: (condition: MedicationStatementModel) => MenuItem[];
  hideMenu?: boolean;
  className?: string;
  telemetryNamespace?: string;
  children?: ReactNode;
} & TableBaseProps<MedicationStatementModel>;

export const MedicationsTableBase = ({
  children,
  className = "",
  rowMenuActions,
  hideMenu = false,
  medicationStatements,
  telemetryNamespace,
  ...tableProps
}: MedicationsTableBaseProps<MedicationStatementModel>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(containerRef);

  const columns = compact([
    {
      title: "Medication Name",
      render: (medication) => (
        <>
          <div className="ctw-font-medium">{medication.display}</div>
          <div className="ctw-font-light">{medication.dosage}</div>
        </>
      ),
    },
    {
      title: "Dispensed",
      render: (medication) => (
        <>
          {medication.quantity && <div>{medication.quantity}</div>}
          {medication.refills && <div>{medication.refills} refills</div>}
        </>
      ),
    },
    {
      title: "Status",
      render: (medication) => (
        <div className="ctw-capitalize">
          <div className="ctw-text-content-black">{medication.status}</div>
          {medication.isArchived && (
            <div className="ctw-font-light">Dismissed</div>
          )}
        </div>
      ),
      widthPercent: 17.5,
      minWidth: 128,
      sortIndices: [
        { index: "status" },
        { index: "dateAsserted", dir: "desc" },
      ],
    },
    {
      title: "Last Filled",
      dataIndex: "lastFillDate",
    },
    {
      title: "Last Prescribed",
      render: (medication) => (
        <>
          {medication.lastPrescribedDate && (
            <div>{medication.lastPrescribedDate}</div>
          )}
          {medication.lastPrescriber && <div>{medication.lastPrescriber}</div>}
        </>
      ),
    },
  ]) as TableColumn<MedicationStatementModel>[];

  if (!hideMenu && isFunction(rowMenuActions)) {
    columns.push({
      className: "ctw-table-action-column",
      render: (medication) => (
        <DropdownMenu
          menuItems={rowMenuActions(medication)}
          telemetryNamespace={telemetryNamespace}
        >
          <DotsHorizontalIcon className="ctw-w-5" />
        </DropdownMenu>
      ),
    });
  }

  return (
    <div
      className={className}
      ref={containerRef}
      data-zus-telemetry-namespace={telemetryNamespace}
    >
      <Table
        stacked={breakpoints.sm}
        records={medicationStatements}
        columns={columns}
        emptyMessage="There are no medications to display."
        {...tableProps}
      />
      {children}
    </div>
  );
};
