import { ReactNode } from "react";

export type DetailEntry = {
  label?: string;
  value: ReactNode;
};

export type DetailsProps = {
  hideEmpty?: boolean;
  details: DetailEntry[];
  documentButton?: ReactNode;
};

export const DetailsCard = ({ details, hideEmpty = true, documentButton }: DetailsProps) => (
  <div className="ctw-rounded-lg ctw-bg-bg-lighter">
    <dl className="ctw-m-0 ctw-space-y-2 ctw-px-4 ctw-py-6">
      <div className="ctw-flex ctw-justify-between ctw-space-x-2 ctw-text-sm ctw-uppercase ctw-text-content-light">
        <div className="ctw-title-container">Details</div>
        <div className="ctw-flex">{documentButton}</div>
      </div>
      {details
        .filter((d) => !hideEmpty || d.value || d.value === 0)
        .map(({ label, value }, idx) => {
          if (!label) {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <div key={idx} className="ctw-text-gray-900 ctw-flex ctw-items-baseline">
                <div className="ctw-m-0">{value}</div>
              </div>
            );
          }
          return (
            <div key={label} className="ctw-text-gray-900 ctw-flex ctw-items-baseline">
              <dt className="ctw-w-1/3 ctw-flex-shrink-0 ctw-font-medium">{label}</dt>
              <dd className="ctw-m-0">{value}</dd>
            </div>
          );
        })}
    </dl>
  </div>
);
