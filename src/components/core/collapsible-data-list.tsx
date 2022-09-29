import { ChevronRightIcon } from "@heroicons/react/outline";
import cx from "classnames";
import { useState } from "react";
import { CodeListElement } from "./code-list";

export const CollapsibleDataList = ({ entry }) => {
  const [isDetailShown, setIsDetailShown] = useState(false);

  return (
    <ul className="ctw-divide-gray-200 ctw-sbg-white ctw-divide-y">
      <div className="ctw-min-w-0 ctw-flex-1">
        <div className="ctw-text-primary-700 ctw-truncate ctw-text-sm ctw-font-medium">
          <div className="ctw-divide-y ctw-bg-bg-lighter">
            <dl className="ctw-left-2 ctw-flex ctw-space-y-2" key={entry.id}>
              {entry.previewData.map(({ label, value }) => {
                if (value) {
                  return (
                    <div
                      // label is not guarenteed to be unique so append index.
                      // eslint-disable-next-line react/no-array-index-key
                      key={label + Math.random}
                      className="ctw-text-gray-900 ctw-flex ctw-items-baseline ctw-space-x-4"
                    >
                      <div className="ctw-flex ctw-align-bottom">
                        {label === "Recorded Date" && value && (
                          <dd className="ctw-flex-grow">{value}</dd>
                        )}
                      </div>
                      <div>
                        {label === "SNOMED Display" && value && (
                          <dd className="ctw-flex-grow">{value}</dd>
                        )}
                      </div>
                      <div>
                        {label === "Managing Organization" && value && (
                          <dd className="ctw-flex-grow">{value}</dd>
                        )}
                      </div>
                    </div>
                  );
                }
                return <div />;
              })}
            </dl>
            <div className="ctw-justify-right ctw-flex">
              <ChevronRightIcon
                className={cx(
                  "ctw-h-5 ctw-w-5",
                  !isDetailShown ? "" : "ctw-rotate-90"
                )}
                onClick={() => setIsDetailShown(!isDetailShown)}
              />
            </div>
          </div>
        </div>
      </div>
      {isDetailShown && (
        <div className="ctw-space-y-4 ctw-bg-bg-lighter">
          <div className="ctw-divide-y ctw-rounded-lg ctw-border">
            <dl className="ctw-space-y-2 ctw-p-4" key={entry.id}>
              <div> Details </div>
              {entry.detailData.map(({ label, value }) => {
                if (label) {
                  if (label === "Code") {
                    return <CodeListElement label={label} value={value} />;
                  }
                  if (value) {
                    return (
                      <div
                        // label is not guarenteed to be unique so append index.
                        // eslint-disable-next-line react/no-array-index-key
                        key={label + Math.random}
                        className="ctw-text-gray-900 ctw-flex ctw-items-baseline ctw-space-x-4"
                      >
                        <dt className="ctw-w-1/3 ctw-flex-shrink-0 ctw-font-medium">
                          {label}
                        </dt>
                        <dd className="ctw-flex-grow">{value}</dd>
                      </div>
                    );
                  }
                }
                return <div />;
              })}
            </dl>
          </div>
        </div>
      )}
    </ul>
  );
};
