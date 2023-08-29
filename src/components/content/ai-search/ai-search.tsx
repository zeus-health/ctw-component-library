import { XIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import cx from "classnames";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AiSearchResultRow } from "./helpers/ai-search-result-row";
import { FeedbackForm } from "@/components/content/ai-search/helpers/feedback-form";
import { FeedbackProvider } from "@/components/content/ai-search/helpers/feedback-provider";
import { Title } from "@/components/core/ctw-box";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { Loading } from "@/components/core/loading";
import { AnalyticsProvider } from "@/components/core/providers/analytics/analytics-provider";
import { RenderIf } from "@/components/core/render-if";
import {
  AiSearchResult,
  AiSearchResults,
  EMPTY_SEARCH_RESULTS,
  useAiSearch,
} from "@/services/ai-search/ai-search";
import "./helpers/style.scss";

export type AiSearchProps = {
  hideTitle?: boolean;
  className?: cx.Argument;
};

export const AiSearch = withErrorBoundary(({ className, hideTitle = false }: AiSearchProps) => {
  const [results, setResults] = useState<AiSearchResults>(EMPTY_SEARCH_RESULTS);
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [searchedValue, setSearchedValue] = useState<string>();
  const aiSearch = useAiSearch(searchedValue);

  useEffect(() => {
    const { data, isFetching, isError } = aiSearch;
    if (!isFetching && !isError && data) {
      setResults(data);
    }
  }, [aiSearch]);

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResults(EMPTY_SEARCH_RESULTS);
    setSearchedValue(searchInputValue);
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(event.target.value);
  };

  const clearSearch = () => {
    setSearchInputValue("");
    setSearchedValue("");
    setResults(EMPTY_SEARCH_RESULTS);
  };

  const showSearchResults = results.results.length > 0;
  const showLoadingSpinner = !showSearchResults && (aiSearch.isLoading || aiSearch.isLoading);

  return (
    <AnalyticsProvider componentName="AiSearch">
      <div
        className={cx(
          className,
          "ctw-ai-search ctw-scrollable-pass-through-height ctw-space-x-0 ctw-space-y-2 ctw-text-base"
        )}
      >
        <RenderIf condition={!hideTitle}>
          <Title className="ctw-border-b-2 ctw-border-l-0 ctw-border-r-0 ctw-border-t-0 ctw-border-solid ctw-border-divider-light">
            <h3 className="ctw-m-0 ctw-inline-block ctw-p-0 ctw-pb-3 ctw-text-lg ctw-font-medium ctw-capitalize">
              Search outside records
            </h3>
          </Title>
        </RenderIf>

        <form className="ctw-ai-search-input ctw-relative" onSubmit={handleSubmitForm}>
          <div className="ctw-search-icon-wrapper">
            <SearchIcon className="ctw-search-icon" />
          </div>

          <input
            type="text"
            className="ctw-w-full ctw-rounded-md ctw-border ctw-border-solid ctw-border-icon-light ctw-bg-bg-white ctw-px-3 ctw-py-2 ctw-pl-10 ctw-pr-3 ctw-text-sm ctw-shadow-sm"
            placeholder="Search"
            name="aiSearch"
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

        <div className="ctw-ai-search-results-list ctw-ml-0">
          <RenderIf condition={showSearchResults}>
            <FeedbackProvider id={results.query}>
              <div className="ctw-ai-search-results ctw-align-left ctw-ml-0 ctw-space-y-2">
                <div>
                  <span className="ctw-font-medium">Answer: </span>
                  <span className="ctw-font-normal">
                    {results.response}
                    <FeedbackForm name={results.id} />
                  </span>
                </div>

                <h4 className="ctw-text-left ctw-text-content-light">Results:</h4>

                {results.results.map((result: AiSearchResult) => {
                  const { page_content: key = "" } = result;
                  return <AiSearchResultRow key={key} result={result} />;
                })}
              </div>

              <div>
                <span className="ctw-font-medium">Found {results.results.length} Results</span>
              </div>
            </FeedbackProvider>
          </RenderIf>
        </div>
      </div>
    </AnalyticsProvider>
  );
}, "AiSearch");
