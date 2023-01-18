import { Tab } from "@headlessui/react";
import cx from "classnames";
import { useAddConditionForm } from "./condition-hooks";
import { FilterCollection } from "./patient-conditions-filters";
import { Badge } from "@/components/core/badge";
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

  return (
    <>
      <div className="ctw-justify-end ctw-space-x-2 ctw-border-0 ctw-border-b ctw-border-t ctw-border-solid ctw-border-divider-light ctw-py-5">
        <div className="ctw-space-x-4">
          <Tab.Group>
            <Tab.List className="ctw-space-x-2">
              <Tab
                className={cx(
                  activeClass("patient"),
                  "ctw-tab-underline ctw-tab ctw-relative"
                )}
              >
                <button
                  type="button"
                  className={cx(
                    activeClass("patient"),
                    "ctw-tab-underline ctw-tab ctw-relative"
                  )}
                  onClick={() => {
                    onCollectionChange("patient");
                  }}
                >
                  Condition List
                </button>
              </Tab>
              <Tab
                className={cx(
                  activeClass("other"),
                  "ctw-tab-underline ctw-tab ctw-relative ctw-space-x-2"
                )}
              >
                <button
                  type="button"
                  className={cx(
                    activeClass("other"),
                    "ctw-tab-underline ctw-tab ctw-relative ctw-space-x-2"
                  )}
                  onClick={() => {
                    onCollectionChange("other");
                  }}
                >
                  <span>Other Provider Records</span>
                  <Badge text={`${activeCount}`} color="primary" />
                </button>
              </Tab>
            </Tab.List>
          </Tab.Group>
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
