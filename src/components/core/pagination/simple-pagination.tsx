import cx from "classnames";
import { useAnalytics } from "@/components/core/providers/analytics/use-analytics";

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
}: SimplePaginationProps) => {
  if (hasNext) {
    return (
      <div className="ctw-simple-pagination ctw-flex ctw-justify-end ctw-space-x-3 ctw-px-6 ctw-py-3">
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
  }
  return <></>;
};

const PaginateButton = ({
  pageToNavigateTo,
  setCurrentPage,
  children,
  className,
}: PaginateButtonProps) => {
  const { trackInteraction } = useAnalytics();

  return (
    <button
      type="button"
      className={cx("ctw-btn-default", className)}
      onClick={() => {
        setCurrentPage(pageToNavigateTo);
        trackInteraction("change_page", {
          page: pageToNavigateTo,
        });
      }}
    >
      {children}
    </button>
  );
};
