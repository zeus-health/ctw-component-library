import { Tab } from "@headlessui/react";
import cx from "classnames";
import { FilterCollection } from "./patient-conditions-filters";
import { Badge } from "@/components/core/badge";
import { ConditionModel } from "@/fhir/models";

export type PatientConditionsTabsProps = {
  collection: FilterCollection;
  otherConditions: ConditionModel[];
  onCollectionChange: (collection: FilterCollection) => void;
};

export function PatientConditionsTabs({
  collection,
  otherConditions,
  onCollectionChange,
}: PatientConditionsTabsProps) {
  function activeClass(collection2: FilterCollection) {
    return collection === collection2
      ? "ctw-text-content-black ctw-tab-underline ctw-relative"
      : "ctw-text-content-light";
  }

  const activeCount = otherConditions.filter(
    (condition) => condition.displayStatus === "Active"
  ).length;

  return (
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
              {({ selected }) => (
                <button
                  type="button"
                  className={cx(
                    activeClass("patient"),
                    selected
                      ? "ctw-tab-underline-hover ctw-tab-underline ctw-tab ctw-relative"
                      : "ctw-tab-underline-hover:focus-visible ctw-tab-underline ctw-tab ctw-relative"
                  )}
                  onClick={() => {
                    onCollectionChange("patient");
                  }}
                >
                  Condition List
                </button>
              )}
            </Tab>
            <Tab
              className={cx(
                activeClass("other"),
                "ctw-tab-underline ctw-tab ctw-relative ctw-space-x-2"
              )}
            >
              {({ selected }) => (
                <button
                  type="button"
                  className={cx(
                    activeClass("other"),
                    selected
                      ? "ctw-tab-underline ctw-tab-underline-hover ctw-tab ctw-relative ctw-space-x-2"
                      : "ctw-tab-underline ctw-tab-underline-hover:focus-visible ctw-tab ctw-relative ctw-space-x-2"
                  )}
                  onClick={() => {
                    onCollectionChange("other");
                  }}
                >
                  <span>Other Provider Records</span>
                  <Badge text={`${activeCount}`} color="primary" />
                </button>
              )}
            </Tab>
          </Tab.List>
        </Tab.Group>
      </div>
    </div>
  );
}
