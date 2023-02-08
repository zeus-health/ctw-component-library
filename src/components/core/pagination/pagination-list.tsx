export const DEFAULT_PAGE_SIZE = 10;

export type PaginationListProps = {
  total: number;
  count: number;
  changeCount: (amount: number) => void;
};

export const PaginationList = ({
  total,
  count,
  changeCount,
}: PaginationListProps) => {
  const allShown = count >= total || total === 0;
  const hasPages = total > DEFAULT_PAGE_SIZE;

  return (
    <div className="ctw-pagination !ctw-mt-1 sm:!ctw-mt-2">
      <div className="ctw-text-gray-600 ctw-text-sm">
        Showing{" "}
        <span className="ctw-font-medium">{Math.min(count, total)}</span> of{" "}
        <span className="ctw-font-medium">{total}</span> records
      </div>

      {(!allShown || hasPages) && (
        <div className="ctw-leading-5">
          {!allShown && (
            <button
              type="button"
              className="ctw-btn-clear ctw-link ctw-whitespace-nowrap"
              onClick={() => changeCount(total)}
            >
              Show All
            </button>
          )}

          {allShown && hasPages && (
            <button
              type="button"
              className="ctw-btn-clear ctw-link ctw-whitespace-nowrap"
              onClick={() => changeCount(DEFAULT_PAGE_SIZE)}
            >
              Clear
            </button>
          )}
        </div>
      )}
    </div>
  );
};
