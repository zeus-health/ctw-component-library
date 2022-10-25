export const DEFAULT_PAGE_SIZE = 10;

export type PaginationProps = {
  currentPage: number;
  pageSize: number;
  total: number;
  onNext: () => void;
  onAll: () => void;
  onReset: () => void;
};

export const Pagination = ({
  currentPage,
  pageSize = DEFAULT_PAGE_SIZE,
  total,
  onNext,
  onAll,
  onReset,
}: PaginationProps) => {
  const currentNumber = Math.min(currentPage * pageSize, total);
  const allShown = currentNumber === total;

  return (
    <div className="ctw-flex ctw-items-center ctw-justify-between ctw-py-3 ctw-px-6">
      <div className="ctw-text-gray-600 ctw-text-sm">
        {total === 0 ? (
          <>No results found</>
        ) : (
          <>
            Showing <span className="ctw-font-medium">{currentNumber}</span> of{" "}
            <span className="ctw-font-medium">{total}</span> results
          </>
        )}
      </div>
      <div className="ctw-flex ctw-h-full ctw-justify-end ctw-space-x-3">
        {!allShown && total > 20 && (
          <button type="button" className="ctw-btn-default" onClick={onNext}>
            Show More
          </button>
        )}
        {!allShown && (
          <button
            type="button"
            className="ctw-btn-primary ctw-w-28 ctw-whitespace-nowrap"
            onClick={onAll}
          >
            Show All
          </button>
        )}
        {allShown && total > 10 && (
          <button
            type="button"
            className="ctw-btn-primary ctw-w-28 ctw-whitespace-nowrap"
            onClick={onReset}
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};
