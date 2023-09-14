import { XIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import cx from "classnames";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { SearchResultRow } from "./helpers/search-result-row";
import { FeedbackForm } from "@/components/content/patient-record-search/helpers/feedback-form";
import { FeedbackProvider } from "@/components/content/patient-record-search/helpers/feedback-provider";
import { ErrorAlert } from "@/components/core/alert";
import { Title } from "@/components/core/ctw-box";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { Loading } from "@/components/core/loading";
import { DEFAULT_PAGE_SIZE, PaginationList } from "@/components/core/pagination/pagination-list";
import { AnalyticsProvider } from "@/components/core/providers/analytics/analytics-provider";
import { useAnalytics } from "@/components/core/providers/analytics/use-analytics";
import { RenderIf } from "@/components/core/render-if";
import {
  EMPTY_SEARCH_RESULTS,
  PatientRecordSearchResult,
  usePatientRecordSearch,
} from "@/services/patient-record-search/patient-record-search";
import "./helpers/style.scss";

export type PatientRecordSearchProps = {
  hideTitle?: boolean;
  className?: cx.Argument;
};

function PatientRecordSearchComponent({ className, hideTitle = false }: PatientRecordSearchProps) {
  const [count, setCount] = useState(DEFAULT_PAGE_SIZE);
  const [searchTextInputValue, setSearchTextInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchWasQuestion, setSearchWasQuestion] = useState(false);
  const {
    data = EMPTY_SEARCH_RESULTS,
    isFetching,
    isLoading,
    isError,
  } = usePatientRecordSearch(searchValue);
  const { trackInteraction } = useAnalytics();

  const handleSubmitForm = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const query = searchTextInputValue.trim();
      setSearchWasQuestion(query[query.length - 1] === "?");
      setSearchValue(query);
      setCount(DEFAULT_PAGE_SIZE);
      trackInteraction("search", { action: "patient-record-search" });
    },
    [searchTextInputValue, trackInteraction]
  );

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTextInputValue(event.target.value);
  };

  const clearSearch = () => {
    trackInteraction("clear_search", { action: "patient-record-search" });
    setSearchTextInputValue("");
    setSearchValue("");
  };

  const showSearchResults = data !== EMPTY_SEARCH_RESULTS;
  const showLoadingSpinner = !showSearchResults && (isFetching || isLoading);
  const displayedResults = data.results.slice(0, count);

  return (
    <div
      className={cx(
        className,
        "ctw-patient-record-search ctw-scrollable-pass-through-height ctw-space-x-0 ctw-space-y-2 ctw-text-base"
      )}
    >
      <RenderIf condition={!hideTitle}>
        <Title className="ctw-border-0 ctw-border-b-0 ctw-border-solid ctw-border-divider-light">
          <h3 className="ctw-m-0 ctw-inline-block ctw-p-0 ctw-pb-3 ctw-text-lg ctw-font-medium ctw-capitalize">
            search records
          </h3>
        </Title>
      </RenderIf>

      <form className="ctw-patient-record-search-input ctw-relative" onSubmit={handleSubmitForm}>
        <div className="ctw-search-icon-wrapper">
          <SearchIcon className="ctw-search-icon" />
        </div>

        <input
          type="text"
          className="ctw-w-full ctw-rounded-md ctw-border ctw-border-solid ctw-border-icon-light ctw-bg-bg-white ctw-px-3 ctw-py-2 ctw-pl-10 ctw-pr-3 ctw-text-sm ctw-shadow-sm"
          placeholder="Search"
          name="patientRecordSearch"
          value={searchTextInputValue}
          onChange={handleChangeInput}
        />
        <button type="button" onClick={clearSearch} className="ctw-clear-search-icon-wrapper">
          <XIcon className="ctw-clear-search-icon" />
        </button>
      </form>

      <RenderIf condition={showLoadingSpinner}>
        <div className="ctw-mt-3 ctw-flex ctw-justify-center ctw-space-x-1 ctw-align-middle">
          <Loading />
        </div>
      </RenderIf>

      <div className="ctw-patient-record-search-results-list ctw-scrollable-pass-through-height">
        <div className="ctw-patient-record-search-results ctw-align-left ctw-ml-0">
          <RenderIf condition={isError}>
            <div className="ctw-w-full">
              <ErrorAlert header="Sorry">
                Unfortunately, there was a problem fetching patient record search results.
              </ErrorAlert>
            </div>
          </RenderIf>

          <RenderIf condition={showSearchResults}>
            {/* FeedbackProvider will allow all the feedback forms to get the id of the query */}
            <FeedbackProvider id={data.id}>
              <RenderIf condition={searchWasQuestion || data.results.length === 0}>
                <span className="ctw-font-normal">
                  {data.response}
                  <FeedbackForm name="query-response" />
                </span>
              </RenderIf>

              <RenderIf condition={displayedResults.length > 0}>
                {/* Search Results */}
                <span className="ctw-text-1xl ctw-text-content-dark ctw-block ctw-text-left ctw-font-medium">
                  Results:
                </span>
                {displayedResults.map((result: PatientRecordSearchResult, idx) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <SearchResultRow key={idx} document={result.document} />
                ))}
                {!isLoading && (
                  <div className="ctw-mt-5">
                    <PaginationList
                      total={data.results.length}
                      count={count}
                      changeCount={setCount}
                    />
                  </div>
                )}
              </RenderIf>
            </FeedbackProvider>
          </RenderIf>
        </div>
      </div>
    </div>
  );
}

export const PatientRecordSearch = withErrorBoundary(
  (props: PatientRecordSearchProps) => (
    <AnalyticsProvider componentName="PatientRecordSearch">
      <PatientRecordSearchComponent {...props} />
    </AnalyticsProvider>
  ),
  "PatientRecordSearch"
);
