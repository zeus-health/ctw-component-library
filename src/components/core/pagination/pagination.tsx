import { ComponentType, useState } from "react";

export const DEFAULT_PAGE_SIZE = 10;

export type PaginationProps = {
  total: number;
  count: number;
  changeCount: (amount: number) => void;
};

export type WithPaginationProps = {
  records: unknown[];
};

export const Pagination = ({ total, count, changeCount }: PaginationProps) => {
  const shownCount = Math.min(count, total);
  const allShown = shownCount === total || total === 0;

  return (
    <div className="ctw-pagination ctw-flex ctw-items-center ctw-justify-between ctw-px-6">
      <div className="ctw-text-gray-600 ctw-text-sm">
        Showing <span className="ctw-font-medium">{shownCount}</span> of{" "}
        <span className="ctw-font-medium">{total}</span> results
      </div>
      <div className="ctw-flex ctw-h-full ctw-justify-end ctw-space-x-3">
        {!allShown && total > DEFAULT_PAGE_SIZE * 2 && (
          <button
            type="button"
            className="ctw-btn-default"
            onClick={() => changeCount(count + DEFAULT_PAGE_SIZE)}
          >
            Show More
          </button>
        )}
        {!allShown && (
          <button
            type="button"
            className="ctw-btn-primary ctw-w-28 ctw-whitespace-nowrap"
            onClick={() => changeCount(total)}
          >
            Show All
          </button>
        )}
        {allShown && total > DEFAULT_PAGE_SIZE && (
          <button
            type="button"
            className="ctw-btn-primary ctw-w-28 ctw-whitespace-nowrap"
            onClick={() => changeCount(DEFAULT_PAGE_SIZE)}
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Wrap any component that takes a property "records" to have pagination
 */
export const withPagination = <P extends WithPaginationProps>(
  PassedComponent: ComponentType<P>
) =>
  function MakeCounter(props: P) {
    const [count, setCount] = useState(DEFAULT_PAGE_SIZE);
    const { records = [] } = props;
    const paginatedRecords = records.slice(0, count);
    const total = records.length;

    return (
      <>
        <PassedComponent {...props} records={paginatedRecords} />
        <Pagination total={total} count={count} changeCount={setCount} />
      </>
    );
  };
