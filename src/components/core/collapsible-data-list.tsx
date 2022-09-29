import { ChevronRightIcon } from "@heroicons/react/outline";
import cx from "classnames";
import { useState } from "react";
import { CodeListElement } from "./code-list";

export const CollapsibleDataList = ({ entry }) => {
  const [isDetailShown, setIsDetailShown] = useState(false);

  return (
    <div className="ctw-divide-gray-200 ctw-sbg-white ctw-divide-y ctw-p-0">
      <DetailSummary
        entry={entry}
        isDetailShown={isDetailShown}
        setIsDetailShown={setIsDetailShown}
      />
      {isDetailShown && <Details entry={entry} />}
    </div>
  );
};

const DetailSummary = ({ entry, isDetailShown, setIsDetailShown }) => (
  <div className="ctw-flex ctw-divide-y ctw-bg-bg-lighter">
    <dl
      className="ctw-left-2 ctw-flex ctw-w-full ctw-justify-between ctw-space-y-2"
      key={entry.id}
    >
      <div className="ctw-flex-column ctw-flex">
        {entry.dateData[0].value && (
          <div className="ctw-text-gray-900 ctw-flex ctw-items-baseline ctw-space-x-4">
            <dd className="ctw-ml-5 ctw-flex-grow">
              {entry.dateData[0].value}
            </dd>
          </div>
        )}
        <div>
          {entry.previewData.map(
            ({ label, value }) =>
              value && (
                <div
                  // label is not guarenteed to be unique so append index.
                  key={label + Math.random}
                  className="ctw-text-gray-900 ctw-flex ctw-items-baseline ctw-space-x-4"
                >
                  <dd className="ctw-flex-grow">{value}</dd>
                </div>
              )
          )}
        </div>
      </div>
      <div className="ctw-justify-right ctw-flex">
        <ChevronRightIcon
          className={cx(
            "ctw-h-5 ctw-w-5",
            !isDetailShown ? "" : "ctw-rotate-90"
          )}
          onClick={() => setIsDetailShown(!isDetailShown)}
        />
      </div>
    </dl>
  </div>
);

const Details = ({ entry }) => (
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
);
