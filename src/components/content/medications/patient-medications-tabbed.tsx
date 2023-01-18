import type { ClinicalStatus } from "@/fhir/medication";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import cx from "classnames";
import { useState } from "react";
import { AddNewMedDrawer } from "@/components/content/medications/add-new-med-drawer";
import { OtherProviderMedsTable } from "@/components/content/medications/other-provider-meds-table";
import { ProviderMedsTable } from "@/components/content/medications/provider-meds-table";
import * as CTWBox from "@/components/core/ctw-box";

export type PatientMedicationsTabbedProps = {
  className?: string;
  status?: ClinicalStatus;
  // should we render the Zus confirmed meds component (default true)?
  showConfirmedMedsTable?: boolean;
  // should we render the Zus other providers meds component (default true)?
  showOtherProvidersMedsTable?: boolean;
  // should we show the button to add new meds (default true)?
  readOnly?: boolean;
};
const tabbedContent = [
  {
    key: "builder-medications",
    display: "Builder Medications",
    render: () => <ProviderMedsTable />,
  },
  {
    key: "historic-medications",
    display: "Historic Medications",
    render: () => <div>No Content...</div>,
  },
  {
    key: "other-provider-medications",
    display: "Other Provider Medications",
    render: () => <OtherProviderMedsTable />,
  },
];
export function PatientMedicationsTabbed({
  className,
  readOnly = false,
  showConfirmedMedsTable = true,
  showOtherProvidersMedsTable = true,
}: PatientMedicationsTabbedProps) {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [includeInactiveMeds, setIncludeInactiveMeds] = useState(false);

  return (
    <CTWBox.StackedWrapper className={cx("ctw-patient-medications", className)}>
      <CTWBox.Heading title="Medications">
        {!readOnly && (
          <AddNewMedDrawer
            isOpen={drawerIsOpen}
            handleOnClose={() => setDrawerIsOpen(false)}
          >
            <button
              className="ctw-btn-clear ctw-link"
              type="button"
              onClick={() => setDrawerIsOpen(true)}
            >
              + Add Medication
            </button>
          </AddNewMedDrawer>
        )}
      </CTWBox.Heading>

      <div className="ctw-w-full ctw-px-2 ctw-py-2 sm:ctw-px-0">
        <Tab.Group>
          <Tab.List className="ctw-flex ctw-space-x-1 ctw-rounded-xl ctw-p-1">
            {tabbedContent.map(({ key, display }) => (
              <Tab
                key={key}
                className={({ selected }) =>
                  classNames(
                    "ctw-w-full ctw-rounded-lg ctw-py-2.5 ctw-text-sm ctw-font-medium",
                    "ctw-ring-white ctw-ring-opacity-60 ctw-ring-offset-2 focus:ctw-outline-none focus:ctw-ring-2",
                    selected
                      ? "ctw-bg-white ctw-shadow"
                      : "hover:ctw-bg-white/[0.12] ctw-cursor-pointer hover:ctw-text-white"
                  )
                }
              >
                {display}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className="mt-2">
            {tabbedContent.map(({ key, render }) => (
              <Tab.Panel
                key={key}
                className={classNames(
                  "ctw-rounded-xl ctw-p-3",
                  "focus:outline-none focus:ring-2"
                )}
              >
                {render()}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </CTWBox.StackedWrapper>
  );
}
