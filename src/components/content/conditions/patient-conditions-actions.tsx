import { useAddConditionForm } from "./condition-hooks";
import { FilterCollection } from "./patient-conditions-filters";
import { Toggle } from "@/components/core/toggle";
import { ConditionModel } from "@/fhir/models";

export type PatientConditionsActionsProps = {
  hideAdd: boolean;
  onToggleShowHistoric: () => void;
  collection: FilterCollection;
  otherConditions: ConditionModel[];
  onCollectionChange: (collection: FilterCollection) => void;
};
export function PatientConditionsActions({
  hideAdd,
  onToggleShowHistoric,
  collection,
  otherConditions,
  onCollectionChange,
}: PatientConditionsActionsProps) {
  const showAddConditionForm = useAddConditionForm();
  function activeClass(collection2: FilterCollection) {
    return collection === collection2
      ? "ctw-text-content-black ctw-tab-underline ctw-relative"
      : "ctw-text-content-light";
  }
  const activeCount = otherConditions.filter(
    (condition) => condition.displayStatus === "Active"
  ).length;
  const tabbedContent = [
    {
      key: "condition-list",
      display: "Condition List",
      render: () => onCollectionChange("patient"),
    },
    {
      key: "other-provider-records",
      display: "Other Provider Records",
      render: () => onCollectionChange("other"),
    },
  ];
  return (
    <>
      <div className="ctw-justify-end ctw-space-x-2 ctw-border-0 ctw-border-b ctw-border-t ctw-border-solid ctw-border-divider-light ctw-py-5">
        <div className="ctw-space-x-4">
          {/* <button
            type="button"
            className={cx(
              activeClass("patient"),
              "ctw-tab-underline ctw-tab ctw-relative"
            )}
            onClick={() => onCollectionChange("patient")}
          >
            Condition List
          </button>
          <button
            type="button"
            className={cx(
              activeClass("other"),
              "ctw-tab-underline ctw-tab ctw-relative ctw-space-x-2"
            )}
            onClick={() => onCollectionChange("other")}
          >
            <span>Other Provider Records</span>
            <Badge text={`${activeCount}`} color="primary" />
          </button> */}
        </div>
      </div>
      {!hideAdd ? (
        <div className="ctw-flex ctw-items-center ctw-justify-end ctw-space-x-2 ctw-p-4">
          <Toggle
            name="historic"
            text="Historic"
            onChange={onToggleShowHistoric}
          />
          <button
            type="button"
            className="ctw-btn-primary"
            onClick={() => showAddConditionForm()}
          >
            Add Condition
          </button>
        </div>
      ) : (
        <div className="ctw-p-4" />
      )}
    </>
  );
}