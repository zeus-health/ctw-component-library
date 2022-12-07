import cx from "classnames";
import { FilterCollection } from "./patient-conditions-filters";
import { Badge } from "@/components/core/badge";

export type PatientConditionsHeaderProps = {
  collection: FilterCollection;
  otherCount: number;
  onCollectionChange: (collection: FilterCollection) => void;
};

export function PatientConditionsHeader({
  collection,
  otherCount,
  onCollectionChange,
}: PatientConditionsHeaderProps) {
  function activeClass(collection2: FilterCollection) {
    return collection === collection2 ? "ctw-btn-primary" : "ctw-btn-default";
  }

  return (
    <div className="ctw-flex ctw-items-center ctw-justify-between ctw-py-5 ctw-px-4">
      <div className="ctw-text-xl ctw-font-medium ctw-text-content-black">
        Conditions
      </div>
      <div className="ctw-space-x-2">
        <button
          type="button"
          className={activeClass("patient")}
          onClick={() => onCollectionChange("patient")}
        >
          Patient Record
        </button>
        <button
          type="button"
          className={cx(activeClass("other"), "ctw-space-x-2")}
          onClick={() => onCollectionChange("other")}
        >
          <span>Other Provider Records</span>
          <Badge text={`${otherCount}`} color="gray" />
        </button>
      </div>
    </div>
  );
}
