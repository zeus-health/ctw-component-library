import cx from "classnames";
import { FilterCollection } from "./patient-conditions-filters";
import { Badge } from "@/components/core/badge";
import { ConditionModel } from "@/fhir/models";

export type PatientConditionsHeaderProps = {
  collection: FilterCollection;
  otherConditions: ConditionModel[];
  onCollectionChange: (collection: FilterCollection) => void;
};

export function PatientConditionsHeader({
  collection,
  otherConditions,
  onCollectionChange,
}: PatientConditionsHeaderProps) {
  function activeClass(collection2: FilterCollection) {
    return collection === collection2 ? "ctw-btn-primary" : "ctw-btn-default";
  }

  const activeCount = otherConditions.filter(
    (condition) => condition.status === "Active"
  ).length;

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
          <Badge text={`${activeCount}`} color="gray" />
        </button>
      </div>
    </div>
  );
}
