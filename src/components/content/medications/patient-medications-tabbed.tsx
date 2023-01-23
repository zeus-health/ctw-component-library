import { Listbox, Tab } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import cx from "classnames";
import { Fragment, useRef, useState } from "react";
import { HistoricalMedRecordsTable } from "@/components/content/medications/historical-med-records-table";
import {
  BadgeOtherProviderMedCount,
  OtherProviderMedsTable,
} from "@/components/content/medications/other-provider-meds-table";
import { ProviderMedsTable } from "@/components/content/medications/provider-meds-table";
import * as CTWBox from "@/components/core/ctw-box";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import "./patient-medications.scss";

export type PatientMedicationsTabbedProps = {
  className?: string;
  forceHorizontalTabs?: boolean;
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
    render: () => <HistoricalMedRecordsTable />,
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

/**
 * This component is a tabbed view of patient medications from the current
 * provider, other providers and historical. When rendered in a small breakpoint
 * the component will change from horizontal tabs to a vertical dropdown menu.
 * If this is undesired, you may set the property `forceHorizontalTabs` to true
 * and the tabs will remain visible and horizontal. The `forceHorizontalTabs`
 * prop will not prevent the medication tables from switching to their stacked
 * view when viewed on smaller screens.
 */
export function PatientMedicationsTabbed({
  className,
  forceHorizontalTabs = false,
}: PatientMedicationsTabbedProps) {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(containerRef);
  const isVertical = !forceHorizontalTabs && breakpoints.sm;

  return (
    <CTWBox.StackedWrapper
      className={cx("ctw-patient-medications ctw-space-y-3", className)}
    >
      <div className="ctw-relative ctw-w-full ctw-p-4" ref={containerRef}>
        <Tab.Group
          selectedIndex={selectedTabIndex}
          onChange={setSelectedTabIndex}
        >
          {isVertical && (
            <Listbox value={selectedTabIndex} onChange={setSelectedTabIndex}>
              <Listbox.Button className="ctw-tab after:ctw-bg-content-black focus-visible:ctw-outline-primary-dark focus-visible:after:ctw-bg-transparent">
                {tabbedContent[selectedTabIndex]?.display() ?? "Select a tab"}
                <span className="ctw-relative ctw-inline-block ctw-w-7 ctw-align-middle">
                  <ChevronDownIcon className="ctw-absolute -ctw-top-3 ctw-left-1.5 ctw-h-6" />
                </span>
              </Listbox.Button>
              <Listbox.Options className="ctw-tab-list ctw-absolute ctw-z-10 ctw-mt-1 ctw-list-outside ctw-list-none ctw-rounded-lg ctw-border ctw-border-solid ctw-border-divider-light ctw-bg-white ctw-p-0 ctw-text-sm focus-visible:ctw-outline-primary-dark">
                {tabbedContent.map((item, index) => (
                  <Listbox.Option key={item.key} value={index} as={Fragment}>
                    {({ active, selected }) => (
                      <li
                        className={cx(
                          "ctw-flex ctw-cursor-pointer ctw-justify-between ctw-px-3 ctw-pb-4 first:ctw-pt-3 last:ctw-pb-3",
                          {
                            "ctw-text-medium": active || selected,
                            "ctw-text-content-light": !(active || selected),
                          }
                        )}
                      >
                        <span className="ctw-inline-flex ctw-align-middle">
                          {item.display()}
                        </span>
                        {selected && (
                          <span className="ctw-inline-flex ctw-pb-0.5">
                            <CheckIcon className="ctw-inline-block ctw-h-5 ctw-fill-primary-dark ctw-stroke-0 ctw-align-middle" />
                          </span>
                        )}
                      </li>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          )}
          <Tab.List
            className={cx(
              "ctw-border-default ctw-flex ctw-justify-start ctw-border-b ctw-border-divider-light",
              { "ctw-hidden": isVertical }
            )}
          >
            {tabbedContent.map(({ key, display }) => (
              <Tab
                key={key}
                onClick={function onClickBlur() {
                  if (typeof document !== "undefined") {
                    requestAnimationFrame(() => {
                      if (document.activeElement instanceof HTMLElement) {
                        document.activeElement.blur();
                      }
                    });
                  }
                }}
                className={({ selected }) =>
                  cx(
                    [
                      "ctw-tab",
                      "ctw-text-sm",
                      "hover:after:ctw-bg-content-black",
                      "focus-visible:ctw-outline-primary-dark",
                      "focus-visible:after:ctw-bg-transparent",
                    ],
                    {
                      "after:ctw-bg-content-black": selected,
                      "ctw-text-content-light": !selected,
                    }
                  )
                }
              >
                {display()}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels>
            {tabbedContent.map(({ key, render }) => (
              <Tab.Panel
                key={key}
                className={cx(breakpoints.sm ? "ctw-mt-0" : "ctw-mt-4")}
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
