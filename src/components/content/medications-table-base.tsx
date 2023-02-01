import type { MedicationStatementModel } from "@/fhir/models/medication-statement";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { ReactNode, useRef, useState } from "react";
import { DropdownMenu, MenuItem } from "@/components/core/dropdown-menu";
import { Table, TableBaseProps } from "@/components/core/table/table";
import {
  MinRecordItem,
  TableColumn,
  TableSort,
} from "@/components/core/table/table-helpers";
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
  const [sort, setSort] = useState<TableSort>();

  const columns = compact([
    {
      title: "Medication Name",
      render: (medication) => (
        <>
          <div className="ctw-font-medium">{medication.display}</div>
          <div className="ctw-font-light">{medication.dosage}</div>
        </>
      ),
      widthPercent: 35,
      minWidth: 270,
      sortIndices: [{ index: "display" }, { index: "dosage", dir: "asc" }],
    },
    {
      title: "Dispensed",
      render: (medication) => (
        <>
          {medication.quantity && <div>{medication.quantity}</div>}
          {medication.refills && <div>{medication.refills} refills</div>}
        </>
      ),
      widthPercent: 14,
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
      sortIndices: [
        { index: "status" },
        { index: "dateAsserted", dir: "desc" },
      ],
      widthPercent: 14,
    },
    {
      title: "Last Filled",
      dataIndex: "lastFillDate",
      sortIndices: [{ index: "lastFillDate" }],
      widthPercent: 18,
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
      sortIndices: [
        { index: "lastPrescribedDate" },
        { index: "lastPrescriber", dir: "asc" },
      ],
      widthPercent: 18,
      minWidth: "90px",
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
        sort={sort}
        onSort={setSort}
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
