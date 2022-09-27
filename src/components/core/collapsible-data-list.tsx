import { ChevronRightIcon } from "@heroicons/react/outline";
import { useState } from "react";

export const CollapsibleDataList = ({ entry }) => {
  const [isDetailShown, setIsDetailShown] = useState(false);

  return (
    <ul className="ctw-divide-gray-200 ctw-sbg-white ctw-divide-y">
      <div className="ctw-min-w-0 ctw-flex-1">
        <div className="ctw-text-primary-700 ctw-truncate ctw-text-sm ctw-font-medium">
          <div className="ctw-divide-y ctw-bg-bg-lighter">
            hi
            <ChevronRightIcon
              className="ctw-h-5 ctw-w-5"
              onClick={() => setIsDetailShown(!isDetailShown)}
            />
          </div>
        </div>
      </div>
      {isDetailShown && (
        <div className="ctw-divide-gray-200 ctw-space-y-4">
          <div className="ctw-divide-y ctw-rounded-lg ctw-border">
            <dl className="ctw-space-y-2 ctw-p-4" key={entry.id}>
              {entry.data.map(({ label, value }, labelIndex) => (
                <div
                  // label is not guarenteed to be unique so append index.
                  // eslint-disable-next-line react/no-array-index-key
                  key={label + labelIndex}
                  className="ctw-text-gray-900 ctw-flex ctw-items-baseline ctw-space-x-4"
                >
                  <dt className="ctw-w-1/3 ctw-flex-shrink-0 ctw-font-medium">
                    {label}:
                  </dt>
                  <dd className="ctw-flex-grow">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </ul>
  );
};
