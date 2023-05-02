import cx from "classnames";

export type SimplePaginationProps = {
  currentPage: number;
  isLoading?: boolean;
  setCurrentPage: (n: number) => void;
  hasNext?: boolean;
};

type PaginateButtonProps = {
  pageToNavigateTo: number;
  setCurrentPage: (n: number) => void;
  children: string;
  className?: cx.Argument;
};

export const SimplePagination = ({
  setCurrentPage,
  currentPage,
  hasNext,
}: SimplePaginationProps) => (
  <div
    className="ctw-simple-pagination ctw-flex ctw-justify-end ctw-space-x-3 ctw-px-6 ctw-py-3"
    data-zus-telemetry-namespace="Pagination"
  >
    <PaginateButton
      pageToNavigateTo={currentPage - 1}
      setCurrentPage={setCurrentPage}
      className={cx({ "ctw-invisible": currentPage === 1 })}
    >
      Prev
    </PaginateButton>

    <PaginateButton
      pageToNavigateTo={currentPage + 1}
      setCurrentPage={setCurrentPage}
      className={cx({ "ctw-invisible": !hasNext })}
    >
      Next
    </PaginateButton>
  </div>
);

const PaginateButton = ({
  pageToNavigateTo,
  setCurrentPage,
  children,
  className,
}: PaginateButtonProps) => (
  <button
    type="button"
    className={cx("ctw-btn-default", className)}
    data-zus-telemetry-click="paginate"
    onClick={() => setCurrentPage(pageToNavigateTo)}
  >
    {children}
  </button>
);
