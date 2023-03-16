import { useRef } from "react";
import { ScrollableContainer } from "@/components/core/ctw-box";
import { Table, TableProps } from "@/components/core/table/table";
import { MinRecordItem } from "@/components/core/table/table-helpers";
import { useBreakpoints } from "@/hooks/use-breakpoints";

export type ResourceTableProps<T extends MinRecordItem> = {
  className?: string;
  columns: TableProps<T>["columns"];
  data: T[];
  emptyMessage?: string;
  isLoading: boolean;
  onRowClick?: TableProps<T>["handleRowClick"];
  rowActions?: TableProps<T>["RowActions"];
  scrollingEnabled?: boolean;
};

export const ResourceTable = <T extends MinRecordItem>({
  className,
  columns,
  data,
  emptyMessage,
  isLoading,
  onRowClick,
  rowActions,
  scrollingEnabled = false,
}: ResourceTableProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(containerRef);

  return (
    <ScrollableContainer
      scrollingEnabled={scrollingEnabled}
      className={className}
      ref={containerRef}
    >
      <Table
        scrollingEnabled={scrollingEnabled}
        showTableHead={!breakpoints.sm}
        stacked={breakpoints.sm}
        emptyMessage={emptyMessage}
        isLoading={isLoading}
        records={data}
        RowActions={rowActions}
        columns={columns}
        handleRowClick={onRowClick}
      />
    </ScrollableContainer>
  );
};
