import { faInbox, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type EmptyTableProps = {
  resourceName: string;
  hasZeroFilteredRecords: boolean;
};

export const EmptyTable = ({ resourceName, hasZeroFilteredRecords }: EmptyTableProps) => {
  let icon = faInbox;
  let errorText = `No ${resourceName}`;
  let subText = "We didn't find any records for this patient.";
  if (hasZeroFilteredRecords) {
    icon = faMagnifyingGlass;
    errorText = `No matching ${resourceName} found`;
    subText = "Try changing the filters.";
  }
  return (
    <div>
      <div className="ctw-flex ctw-justify-center">
        <FontAwesomeIcon icon={icon} className="ctw-h-16 ctw-text-icon-light" />
      </div>
      <div className="ctw-pt-6 ctw-text-center ctw-text-xl ctw-font-medium">{errorText}</div>
      <div className="ctw-pt-3 ctw-text-center ctw-text-base ctw-font-normal">{subText}</div>
    </div>
  );
};
