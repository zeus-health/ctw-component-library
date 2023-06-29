import { faInbox, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type EmptyTableProps = {
  resourceName: string;
  isEmptyQuery: boolean;
  isEmptyFilters: boolean;
};

export const EmptyTable = ({ resourceName, isEmptyQuery, isEmptyFilters }: EmptyTableProps) => {
  if (isEmptyQuery) {
    return (
      <div>
        <div className="ctw-flex ctw-justify-center">
          <FontAwesomeIcon icon={faInbox} className="ctw-h-16 ctw-text-icon-light" />
        </div>
        <div className="ctw-pt-6 ctw-text-center ctw-text-xl ctw-font-medium">
          No {resourceName} yet
        </div>
        <div className="ctw-pt-3 ctw-text-center ctw-text-base ctw-font-normal">
          We didn&apos;t find any records for this patient.
        </div>
      </div>
    );
  }
  if (isEmptyFilters) {
    return (
      <div>
        <div className="ctw-flex ctw-justify-center">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="ctw-h-16 ctw-text-icon-light" />
        </div>
        <div className="ctw-pt-6 ctw-text-center ctw-text-xl ctw-font-medium">
          No matching {resourceName} found
        </div>
        <div className="ctw-pt-3 ctw-text-center ctw-text-base ctw-font-normal">
          Try changing the filters.
        </div>
      </div>
    );
  }
  return <div>blah</div>;
};
