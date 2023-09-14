import { XIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import cx from "classnames";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
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
  PatientRecordSearchResults,
  usePatientRecordSearch,
} from "@/services/patient-record-search/patient-record-search";
import "./helpers/style.scss";

export type PatientRecordSearchProps = {
  hideTitle?: boolean;
  className?: cx.Argument;
};

function PatientRecordSearchComponent({ className, hideTitle = false }: PatientRecordSearchProps) {
  const [results, setResults] = useState<PatientRecordSearchResults>(EMPTY_SEARCH_RESULTS);
  const [count, setCount] = useState(0);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchWasQuestion, setSearchWasQuestion] = useState(false);
  const [searchedValue, setSearchedValue] = useState<string>();
  const patientRecordSearch = usePatientRecordSearch(searchedValue);
  const { trackInteraction } = useAnalytics();

  useEffect(() => {
    const { data, isFetching, isError } = patientRecordSearch;
    if (!isFetching && !isError && data) {
      setResults(data);
    }
  }, [patientRecordSearch]);

  const handleSubmitForm = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const query = searchInputValue.trim();
      setSearchWasQuestion(query[query.length - 1] === "?");
      setSearchedValue(query);
      setResults(EMPTY_SEARCH_RESULTS);
      setCount(DEFAULT_PAGE_SIZE);
      trackInteraction("search", { action: "patient-record-search" });
    },
    [searchInputValue, trackInteraction]
  );

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(event.target.value);
  };

  const clearSearch = useCallback(() => {
    trackInteraction("clear_search", { action: "patient-record-search" });
    setSearchInputValue("");
    setSearchedValue("");
    setResults(EMPTY_SEARCH_RESULTS);
  }, [trackInteraction]);

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
          value={searchInputValue}
          onChange={handleChangeInput}
        />
        <button type="button" onClick={clearSearch} className="ctw-clear-search-icon-wrapper">
          <XIcon className="ctw-clear-search-icon" />
        </button>
      </form>

      {patientRecordSearch.isFetching || patientRecordSearch.isLoading ? (
        <div className="ctw-mt-3 ctw-flex ctw-justify-center ctw-space-x-1 ctw-align-middle">
          <Loading />
        </div>
      ) : (
        <div className="ctw-patient-record-search-results-list ctw-scrollable-pass-through-height">
          <div className="ctw-patient-record-search-results ctw-align-left ctw-ml-0">
            <RenderIf condition={!results.query}>
              <span className="ctw-text-1xl ctw-text-content-dark ctw-block ctw-text-left ctw-font-medium">
                Search patient conditions, medications, documents and allergies.
              </span>
            </RenderIf>

            <RenderIf condition={!!results.query && results.results.length === 0}>
              <span className="ctw-text-1xl ctw-text-content-dark ctw-block ctw-text-left ctw-font-medium">
                Search did not return any results.
              </span>
            </RenderIf>

            <RenderIf condition={!!results.query && patientRecordSearch.isError}>
              <div className="ctw-w-full">
                <ErrorAlert header="Error">There was an error running your search.</ErrorAlert>
              </div>
            </RenderIf>

            <RenderIf condition={!!results.query && results.results.length > 0}>
              {/* FeedbackProvider will allow all the feedback forms to get the id of the query */}
              <FeedbackProvider id={results.id}>
                <RenderIf condition={searchWasQuestion}>
                  <span className="ctw-font-normal">
                    {results.response}
                    <FeedbackForm name="query-response" />
                  </span>
                </RenderIf>

                {/* Search Results */}
                <span className="ctw-text-1xl ctw-text-content-dark ctw-block ctw-text-left ctw-font-medium">
                  Found {results.results.length} results
                </span>
                {results.results.slice(0, count).map((result: PatientRecordSearchResult, idx) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <SearchResultRow key={idx} document={result.document} />
                ))}
              </FeedbackProvider>
              <div className="ctw-mt-5">
                <PaginationList
                  total={results.results.length}
                  count={count}
                  changeCount={setCount}
                />
              </div>
            </RenderIf>
          </div>
        </div>
      )}
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
