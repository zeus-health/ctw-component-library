import { Tab } from "@headlessui/react";
import cx from "classnames";
import {
  BadgeOtherProviderMedCount,
  OtherProviderMedsTable,
} from "@/components/content/medications/other-provider-meds-table";
import { ProviderMedsTable } from "@/components/content/medications/provider-meds-table";
import * as CTWBox from "@/components/core/ctw-box";
import "./patient-medications.scss";

export type PatientMedicationsTabbedProps = {
  className?: string;
};

const tabbedContent = [
  {
    key: "medication-list",
    display: () => "Medication List",
    render: () => <ProviderMedsTable />,
  },
  {
    key: "historical",
    display: () => "Historical",
    render: () => <div>No Content...</div>,
  },
  {
    key: "other-provider-records",
    display: () => (
      <>
        <span className="ctw-pr-2">Other Provider Records</span>
        <BadgeOtherProviderMedCount />
      </>
    ),
    render: () => (
      <>
        <OtherProviderMedsTable />
      </>
    ),
  },
];
function onClickBlur() {
  if (typeof document !== "undefined") {
    requestAnimationFrame(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    });
  }
}
export function PatientMedicationsTabbed({
  className,
}: PatientMedicationsTabbedProps) {
  return (
    <CTWBox.StackedWrapper
      className={cx("ctw-patient-medications ctw-space-y-3", className)}
    >
      <div className="ctw-w-full ctw-p-4">
        <Tab.Group>
          <Tab.List className="ctw-flex ctw-justify-start">
            {tabbedContent.map(({ key, display }) => (
              <Tab
                key={key}
                onClick={onClickBlur}
                className={({ selected }) =>
                  cx("ctw-tab", {
                    "ctw-tab-active": selected,
                    "ctw-text-content-light": !selected,
                  })
                }
              >
                {display()}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels>
            {tabbedContent.map(({ key, render }) => (
              <Tab.Panel key={key} onClick={onClickBlur} className="ctw-mt-4">
                {render()}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </CTWBox.StackedWrapper>
  );
}
