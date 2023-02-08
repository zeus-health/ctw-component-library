import { Tab } from "@headlessui/react";
import cx from "classnames";
import { PatientHistoryStatus } from "../patient-history/patient-history-message-status";
import { usePatientHistory } from "../patient-history/use-patient-history";
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
      ? "ctw-text-content-black"
      : "ctw-text-content-light";
  }

  const activeCount = otherConditions.filter(
    (condition) => condition.displayStatus === "Active"
  ).length;

  // Issue: Clicking on tab enables focus-visible and not only via keyboard interactions.
  // Resolution: https://github.com/tailwindlabs/headlessui/issues/1694
  function blurClicked() {
    // Guard against server side where document isn't defined.
    if (typeof document !== "undefined") {
      requestAnimationFrame(() => {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      });
    }
  }

  const sharedTabStyles = "ctw-relative ctw-tab-underline ctw-tab";
  const patientHistory = usePatientHistory();

  return (
    <div className="ctw-justify-end ctw-space-x-2 ctw-border-0 ctw-border-b ctw-border-t ctw-border-solid ctw-border-divider-light">
      {collection === "other" && (
        <div className="ctw-space-y-3">
          <PatientHistoryStatus
            status={patientHistory.lastStatus}
            date={patientHistory.dateCreatedAt}
          />
        </div>
      )}
      <div className="ctw-space-x-4">
        <Tab.Group
          // Keyboard navigation requires onChange instead of onClick.
          onChange={(index) => {
            onCollectionChange(index === 0 ? "patient" : "other");
          }}
        >
          <Tab.List className="ctw-mt-3">
            <Tab
              onClick={blurClicked}
              className={({ selected }) =>
                cx(activeClass("patient"), sharedTabStyles, {
                  "ctw-tab-underline-selected": selected,
                })
              }
            >
              Condition List
            </Tab>
            <Tab
              onClick={blurClicked}
              className={({ selected }) =>
                cx(activeClass("other"), sharedTabStyles, "ctw-space-x-2", {
                  "ctw-tab-underline-selected": selected,
                })
              }
            >
              <span>Other Provider Records</span>
              <Badge text={`${activeCount}`} color="caution" />
            </Tab>
          </Tab.List>
        </Tab.Group>
      </div>
    </div>
  );
}
