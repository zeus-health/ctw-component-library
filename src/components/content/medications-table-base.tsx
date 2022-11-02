import { DropdownMenu, MenuItems } from "@/components/core/dropdown-menu";
import type { MinRecordItem, TableColumn } from "@/components/core/table/table";
import { Table, TableBaseProps } from "@/components/core/table/table";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import type { MedicationStatementModel } from "@/models/medication-statement";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { compact, isFunction } from "lodash/fp";
import { ReactNode, useRef } from "react";

export type MedicationsTableBaseProps<T extends MinRecordItem> = {
  medicationStatements: MedicationStatementModel[];
  rowActions?: (condition: MedicationStatementModel) => MenuItems[];
  hideMenu?: boolean;
  className?: string;
  children?: ReactNode;
} & TableBaseProps<MedicationStatementModel>;

export const MedicationsTableBase = ({
  children,
  className = "",
  rowActions,
  hideMenu = false,
  medicationStatements,
  ...tableProps
}: MedicationsTableBaseProps<MedicationStatementModel>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(containerRef);

  const columns = compact([
    {
      title: "Medication Name",
      render: (medication: MedicationStatementModel) => (
        <>
          <div className="ctw-font-medium">{medication.display}</div>
          <div className="ctw-font-light">{medication.dosage}</div>
        </>
      ),
    },
    {
      title: "Dispensed",
      render: (medication: MedicationStatementModel) => (
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
      render: (medication: MedicationStatementModel) => (
        <>
          {medication.lastPrescribedDate && (
            <div>{medication.lastPrescribedDate}</div>
          )}
          {/* TODO: add prescriber */}
        </>
      ),
    },
  ]) as TableColumn<MedicationStatementModel>[];

  if (!hideMenu && isFunction(rowActions)) {
    columns.push({
      className: "ctw-table-action-column",
      render: (medication: MedicationStatementModel) => (
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
