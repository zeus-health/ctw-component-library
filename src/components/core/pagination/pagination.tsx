import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import cx from "classnames";
import type { ReactNode } from "react";
import { Fragment } from "react";
import "./pagination.scss";
import { Loading } from "@/components/core/loading";
import { uniq } from "@/utils/nodash";

export type PaginationProps = {
  currentPage: number;
  isLoading?: boolean;
  pageSize: number;
  setCurrentPage: (n: number) => void;
  total: number;
};

export const Pagination = ({
  currentPage,
  isLoading = false,
  pageSize,
  setCurrentPage,
  total,
}: PaginationProps) => {
  const start = Math.min(total, (currentPage - 1) * pageSize + 1);
  const finish = Math.min(currentPage * pageSize, total);
  const pageCount = Math.ceil(total / pageSize);
  const prevPage = Math.max(currentPage - 1, 1);
  const nextPage = Math.min(currentPage + 1, pageCount);

  // Always show the first page link and the last.
  let pagesToShow = [1, pageCount];
  // Always show currentPage and one before and after.
  pagesToShow.push(currentPage - 1, currentPage, currentPage + 1);
  // Dedupe, sort and filter away any pages that are out of range.
  pagesToShow = uniq(
    pagesToShow
      .sort((a, b) => a - b)
      .filter((page) => page >= 1 && page <= pageCount)
  );

  return (
    <div
      className="ctw-flex ctw-justify-between ctw-px-6 ctw-py-3"
      data-zus-telemetry-namespace="Pagination"
    >
      <div className="ctw-text-gray-600 ctw-text-sm">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <span className="ctw-font-medium">{start}</span> to{" "}
            <span className="ctw-font-medium">{finish}</span> of{" "}
            <span className="ctw-font-medium">{total}</span> results
          </>
        )}
      </div>

      {pageCount > 1 && (
        <div>
          <nav className="ctw-pagination-nav" aria-label="Pagination">
            <Page
              page={prevPage}
              setCurrentPage={setCurrentPage}
              className="ctw-pagination-group-start ctw-hover:ctw-bg-gray-50"
              disabled={currentPage === 1}
            >
              <span className="ctw-sr-only">Previous</span>
              <ChevronLeftIcon className="ctw-h-5 ctw-w-5" aria-hidden="true" />
            </Page>

            {pagesToShow.map((page, index) => {
              const prev = pagesToShow[index - 1] ?? 0;
              const pagesSkipped = page - prev - 1;

              return (
                <Fragment key={page}>
                  {pagesSkipped > 1 && (
                    <span className="ctw-pagination-ellipsis">...</span>
                  )}
                  {pagesSkipped === 1 && (
                    <Page
                      page={page - 1}
                      setCurrentPage={setCurrentPage}
                      currentPage={currentPage}
                    />
                  )}

                  <Page
                    setCurrentPage={setCurrentPage}
                    page={page}
                    currentPage={currentPage}
                  />
                </Fragment>
              );
            })}

            <Page
              page={nextPage}
              setCurrentPage={setCurrentPage}
              className="ctw-pagination-group-end"
              disabled={currentPage === pageCount}
            >
              <span className="ctw-sr-only">Next</span>
              <ChevronRightIcon
                className="ctw-h-5 ctw-w-5"
                aria-hidden="true"
              />
            </Page>
          </nav>
        </div>
      )}
    </div>
  );
};

type PageProps = {
  children?: ReactNode;
  className?: cx.Argument;
  disabled?: boolean;
  currentPage?: number;
  page: number;
  setCurrentPage: (n: number) => void;
};

const Page = ({
  setCurrentPage,
  page,
  currentPage,
  children,
  className,
  disabled = false,
}: PageProps) => {
  const active = page === currentPage;
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => setCurrentPage(page)}
      className={cx(className, "ctw-pagination-page-btn", { active, disabled })}
      data-zus-telemetry-click="paginate"
    >
      {children || page}
    </button>
  );
};
