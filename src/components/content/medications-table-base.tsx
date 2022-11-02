import { ReactNode, useRef } from "react";
import { compact, isFunction } from "lodash/fp";
import type { MinRecordItem, TableColumn } from "@/components/core/table/table";
import { Table, TableBaseProps } from "@/components/core/table/table";
import type { MedicationStatementModel } from "@/models/medication-statement";
import { DropdownMenu, MenuItems } from "@/components/core/dropdown-menu";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { useBreakpoints } from "@/hooks/use-breakpoints";

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
      render: (medication) => (
        <>
          <div className="ctw-font-medium">{medication.display}</div>
          <div className="ctw-font-light">{medication.dosage}</div>
        </>
      ),
    },
  ]) as TableColumn<MedicationStatementModel>[];

  if (!hideMenu && isFunction(rowActions)) {
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
