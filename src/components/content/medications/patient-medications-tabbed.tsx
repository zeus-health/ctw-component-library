import { Tab } from "@headlessui/react";
import cx from "classnames";
import { useRef, useState } from "react";
import {
  BadgeOtherProviderMedCount,
  OtherProviderMedsTable,
} from "@/components/content/medications/other-provider-meds-table";
import { ProviderInactiveMedicationsTable } from "@/components/content/medications/provider-inactive-medications-table";
import { ProviderMedsTable } from "@/components/content/medications/provider-meds-table";
import * as CTWBox from "@/components/core/ctw-box";
import { FilterBar } from "@/components/core/filter-bar/filter-bar";
import { ListBox } from "@/components/core/list-box/list-box";
import { MedicationStatementModel } from "@/fhir/models";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import "./patient-medications.scss";

export type PatientMedicationsTabbedProps = {
  className?: string;
  forceHorizontalTabs?: boolean;
  handleAddToRecord?: (m: MedicationStatementModel) => void;
};

// const AddFilterBar = ({ listView }) =>
//   !listView ? (
//     <>
//       <PlusIcon className={cx(iconClassNames)} />
//       <span>Add Filter</span>
//     </>
//   ) : (
//     <>
//       <TrashIcon className={cx(iconClassNames)} />
//       <span>Clear All Filters</span>
//     </>
//   );
//
// const DismissedMedsButton = ({ listView, tagView }) =>
//   tagView ? (
//     <span>Dismissed Records</span>
//   ) : (
//     <>
//       <EyeIcon
//         className={cx(iconClassNames, listView ? "ctw-top-0" : "-ctw-top-2.5")}
//       />
//       <span>show dismissed records</span>
//     </>
//   );

const tabbedContent = [
  {
    key: "medication-list",
    display: () => "Medication List",
    render: () => <ProviderMedsTable />,
  },
  {
    key: "inactive-provider-records",
    display: () => "Inactive",
    render: () => <ProviderInactiveMedicationsTable />,
  },
  {
    key: "other-provider-records",
    display: () => (
      <>
        <span className="ctw-pr-2">Other Provider Records</span>
        <BadgeOtherProviderMedCount />
      </>
    ),
    render: ({
      handleAddToRecord,
    }: {
      handleAddToRecord: (m: MedicationStatementModel) => void;
    }) => (
      <>
        <FilterBar
          className="-ctw-mt-2"
          filters={[
            {
              key: "dismissed",
              type: "tag",
              icon: "eye",
              display: ({ active }) =>
                active ? "dismissed records" : "show dismissed records",
            },
            {
              key: "who-sits-shotgun",
              type: "select",
              display: "sitting shotgun",
              values: [
                "Joe",
                "Mike",
                "Kristen",
                "peter",
                "sir kitty cat woofington",
              ],
            },
            {
              key: "cool-things",
              type: "checkbox",
              icon: "plus",
              display: ({ active }) =>
                active ? "cool things" : "filter cool things",
              values: [
                "cats",
                { key: "dogs", display: "doggies" },
                "pizza",
                "showtime",
              ],
            },
          ]}
          handleOnChange={console.log}
        />
        <OtherProviderMedsTable />
      </>
    ),
    // This function puts a smaller margin on this panel to adjust for filters
    getPanelClassName: (sm: boolean) => (sm ? "ctw-mt-0" : "ctw-mt-1.5"),
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
  handleAddToRecord,
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
            <ListBox
              btnClassName="ctw-tab"
              optionsClassName="ctw-tab-list"
              onChange={setSelectedTabIndex}
              items={tabbedContent}
            />
          )}
          <Tab.List
            className={cx(
              "ctw-border-default ctw-flex ctw-justify-start ctw-border-b ctw-border-divider-light",
              { "ctw-hidden": isVertical }
            )}
          >
            {/* Renders button for each tab using "display | display()" */}
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
                      "ctw-tab ctw-text-sm ctw-capitalize",
                      "hover:after:ctw-bg-content-black",
                      "focus-visible:ctw-outline-primary-dark focus-visible:after:ctw-bg-transparent",
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

          {/* Renders body of each tab using "render()" */}
          <Tab.Panels>
            {tabbedContent.map(
              ({
                key,
                render,
                getPanelClassName = (sm: boolean) =>
                  sm ? "ctw-mt-0" : "ctw-mt-4",
              }) => (
                <Tab.Panel
                  key={key}
                  className={cx(getPanelClassName(breakpoints.sm))}
                >
                  {render({ handleAddToRecord })}
                </Tab.Panel>
              )
            )}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </CTWBox.StackedWrapper>
  );
}
