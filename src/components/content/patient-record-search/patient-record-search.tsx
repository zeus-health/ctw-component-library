import { XIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import cx from "classnames";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { SearchResultRow } from "./helpers/search-result-row";
import { FeedbackForm } from "@/components/content/patient-record-search/helpers/feedback-form";
import { FeedbackProvider } from "@/components/content/patient-record-search/helpers/feedback-provider";
import { Title } from "@/components/core/ctw-box";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { Loading } from "@/components/core/loading";
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
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [searchedValue, setSearchedValue] = useState<string>();
  const patientRecordSearch = usePatientRecordSearch(searchedValue);
  const { trackInteraction } = useAnalytics();

  useEffect(() => {
    const { data, isFetching, isError } = patientRecordSearch;
    if (!isFetching && !isError && data) {
      setResults(data);
    }
  }, [patientRecordSearch]);

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResults(EMPTY_SEARCH_RESULTS);
    setSearchedValue(searchInputValue);
    trackInteraction("search", { value: "patient-record-search" });
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(event.target.value);
  };

  const clearSearch = () => {
    trackInteraction("clear_search", { value: "patient-record-search" });
    setSearchInputValue("");
    setSearchedValue("");
    setResults(EMPTY_SEARCH_RESULTS);
  };

  const showSearchResults = results.results.length > 0;
  const showLoadingSpinner =
    !showSearchResults && (patientRecordSearch.isLoading || patientRecordSearch.isLoading);

  return (
    <div
      className={cx(
        className,
        "ctw-patient-record-search ctw-scrollable-pass-through-height ctw-space-x-0 ctw-space-y-2 ctw-text-base"
      )}
    >
      <RenderIf condition={!hideTitle}>
        <Title className="ctw-border-b-2 ctw-border-solid ctw-border-divider-light">
          <h3 className="ctw-m-0 ctw-inline-block ctw-p-0 ctw-pb-3 ctw-text-lg ctw-font-medium ctw-capitalize">
            Search outside records
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

      <RenderIf condition={showLoadingSpinner}>
        <div className="ctw-flex ctw-justify-center ctw-space-x-1 ctw-align-middle">
          <Loading />
        </div>
      </RenderIf>

      <div className="ctw-patient-record-search-results-list ctw-ml-0">
        <RenderIf condition={showSearchResults}>
          {/* FeedbackProvider will allow all the feedback forms to get the id of the query */}
          <FeedbackProvider id={results.id}>
            <div className="ctw-patient-record-search-results ctw-align-left ctw-ml-0 ctw-space-y-2">
              <div>
                <span className="ctw-font-medium">Answer: </span>
                <span className="ctw-font-normal">
                  {results.response}
                  <FeedbackForm name="query-response" />
                </span>
              </div>

              {/* Search Results */}
              <h4 className="ctw-text-left ctw-text-content-light">Results:</h4>
              {results.results.map((result: PatientRecordSearchResult, idx) => (
                // eslint-disable-next-line react/no-array-index-key
                <SearchResultRow key={idx} document={result.document} />
              ))}
            </div>

            <div>
              <span className="ctw-font-medium">Found {results.results.length} Results</span>
            </div>
          </FeedbackProvider>
        </RenderIf>
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
