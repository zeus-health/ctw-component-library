import type {
  FilterChangeEvent,
  FilterItem,
} from "@/components/core/filter-bar/filter-bar-types";
import { Tab } from "@headlessui/react";
import cx from "classnames";
import { ReactNode, useRef, useState } from "react";
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
  handleAddToRecord: (m: MedicationStatementModel) => void;
};

type TabbedContent<T> = {
  key: string;
  display: () => string | ReactNode;
  render: (props: {
    handleAddToRecord: (record: T) => void;
  }) => string | ReactNode;
  getPanelClassName?: (sm: boolean) => cx.Argument;
};

const tabbedContent: TabbedContent<MedicationStatementModel>[] = [
  {
    key: "medication-list",
    display: () => "medication list",
    render: () => <ProviderMedsTable />,
  },
  {
    key: "inactive-provider-records",
    display: () => "inactive",
    render: () => <ProviderInactiveMedicationsTable />,
  },
  {
    key: "other-provider-records",
    display: () => (
      <>
        <span className="ctw-pr-2 ctw-capitalize">other provider records</span>
        <BadgeOtherProviderMedCount />
      </>
    ),
    render: OtherProviderMedsTableTab,
    // This function puts a smaller margin on this panel to adjust for filters
    getPanelClassName: (sm: boolean) => (sm ? "ctw-mt-0" : "ctw-mt-1.5"),
  },
];

function OtherProviderMedsTableTab({
  handleAddToRecord,
}: PatientMedicationsTabbedProps) {
  const [filters, setFilters] = useState<FilterChangeEvent>({});
  const showDismissed = "dismissed" in filters;
  const showInactive = "inactive" in filters;
  const filterItems: FilterItem[] = [
    {
      key: "dismissed",
      type: "tag",
      icon: "eye",
      display: ({ active }) =>
        active ? "dismissed records" : "show dismissed records",
    },
  ];

  return (
    <>
      <FilterBar filters={filterItems} handleOnChange={setFilters} />
      <OtherProviderMedsTable
        showDismissed={showDismissed}
        showInactive={showInactive}
        handleAddToRecord={handleAddToRecord}
      />
    </>
  );
}

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
      <div ref={containerRef} className="ctw-relative ctw-w-full">
        <Tab.Group
          selectedIndex={selectedTabIndex}
          onChange={setSelectedTabIndex}
        >
          {isVertical && (
            <ListBox
              btnClassName="ctw-tab ctw-capitalize"
              optionsClassName="ctw-tab-list ctw-capitalize"
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
            {tabbedContent.map((item) => (
              <Tab.Panel
                key={item.key}
                className={cx(item.getPanelClassName?.(breakpoints.sm))}
              >
                {item.render({ handleAddToRecord })}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </CTWBox.StackedWrapper>
  );
}
