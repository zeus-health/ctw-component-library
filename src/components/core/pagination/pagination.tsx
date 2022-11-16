export const DEFAULT_PAGE_SIZE = 10;

export type PaginationProps = {
  total: number;
  count: number;
  changeCount: (amount: number) => void;
};

export const Pagination = ({ total, count, changeCount }: PaginationProps) => {
  const allShown = count >= total || total === 0;
  const hasPages = total > DEFAULT_PAGE_SIZE;

  return (
    <div className="ctw-pagination ctw-flex ctw-items-center ctw-justify-between ctw-px-6">
      <div className="ctw-text-gray-600 ctw-text-sm">
        Showing{" "}
        <span className="ctw-font-medium">{Math.min(count, total)}</span> of{" "}
        <span className="ctw-font-medium">{total}</span> results
      </div>

      {(!allShown || hasPages) && (
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

          {allShown && hasPages && (
            <button
              type="button"
              className="ctw-btn-primary ctw-w-28 ctw-whitespace-nowrap"
              onClick={() => changeCount(DEFAULT_PAGE_SIZE)}
            >
              Reset
            </button>
          )}
        </div>
      )}
    </div>
  );
};
