import type { MedicationStatementModel } from "@/fhir/models/medication-statement";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { compact, isFunction } from "lodash/fp";
import { ReactNode, useRef } from "react";
import { MinRecordItem, TableColumn } from "../core/table/table-helpers";
import { DropdownMenu, MenuItem } from "@/components/core/dropdown-menu";
import { Table, TableBaseProps } from "@/components/core/table/table";
import { useBreakpoints } from "@/hooks/use-breakpoints";

export type MedicationsTableBaseProps<T extends MinRecordItem> = {
  medicationStatements: MedicationStatementModel[];
  rowActions?: (condition: MedicationStatementModel) => MenuItem[];
  readOnly?: boolean;
  className?: string;
  children?: ReactNode;
} & TableBaseProps<MedicationStatementModel>;

export const MedicationsTableBase = ({
  children,
  className = "",
  rowActions,
  readOnly = false,
  medicationStatements,
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

  if (!readOnly && isFunction(rowActions)) {
    columns.push({
      className: "ctw-table-action-column",
      render: (medication) => (
        <DropdownMenu menuItems={rowActions(medication)}>
          <DotsHorizontalIcon className="ctw-w-5" />
        </DropdownMenu>
      ),
    });
  }

  return (
    <div className={className} ref={containerRef}>
      <Table
        stacked={breakpoints.sm}
        records={medicationStatements}
        columns={columns}
        message="There are no medications to display."
        {...tableProps}
      />
      {children}
    </div>
  );
};
