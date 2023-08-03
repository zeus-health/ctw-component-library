import "./tab-group.scss";

import { Tab } from "@headlessui/react";
import cx from "classnames";
import { ReactNode, useEffect, useRef, useState } from "react";
import { ListBox } from "../list-box/list-box";
import { PatientHistoryStatus } from "@/components/content/patient-history/patient-history-message-status";
import { usePatientHistory } from "@/components/content/patient-history/use-patient-history";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { useBreakpoints } from "@/hooks/use-breakpoints";

export type TabGroupProps = {
  children?: ReactNode;
  className?: string;
  content: TabGroupItem[];
  forceHorizontalTabs?: boolean;
  onChange?: (index: number) => void; // optional event
  topRightContent?: ReactNode;
};

export type TabGroupItem = {
  display: () => string | ReactNode;
  key: string;
  render: (sm: boolean) => string | ReactNode;
};

/**
 * When rendered in a small breakpoint the component will change from horizontal
 * tabs to a vertical dropdown menu. If this is undesired, you may set the
 * property `forceHorizontalTabs` to true and the tabs will remain visible and
 * horizontal.
 */
function TabGroupComponent({
  children,
  className,
  forceHorizontalTabs = false,
  content,
  onChange,
  topRightContent,
}: TabGroupProps) {
  // Ugly cheat to account for margins between tabs (algins with ctw-space-x-5 on Tab.List)
  const TAB_SPACING = 20;
  // State used for responsive tab dropdown menu.
  const topRightContentRef = useRef<HTMLDivElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(containerRef);
  const [tabOverflowCutoff, setTabOverflowCutoff] = useState(content.length);

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const patientHistoryDetails = usePatientHistory();
  // Work around for not wanting to pre-mount all tabs.
  // https://github.com/tailwindlabs/headlessui/issues/2276#issuecomment-1456537475
  const [shown, setShown] = useState<Record<number, boolean>>({ 0: true });

  // Calculate how many tabs can fit in the container.
  useEffect(() => {
    // Force everything into the more menu if we are in a small breakpoint
    // and we are not forcing horizontal tabs.
    if (breakpoints.sm && !forceHorizontalTabs) {
      setTabOverflowCutoff(0);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // Start with the width of the container.
    let { width } = container.getBoundingClientRect();

    // Subtract the top right content if there is any.
    if (topRightContentRef.current) {
      width -= topRightContentRef.current.getBoundingClientRect().width + TAB_SPACING;
    }

    // Get width of the more menu and its spacing but don't subtract it yet.
    const moreWidth = (moreMenuRef.current?.getBoundingClientRect().width ?? 0) + TAB_SPACING;

    // Grab our tabs and keep subtracting their widths until we run out of space.
    const tabs = Array.from(container.querySelectorAll("button.ctw-tab")) as HTMLButtonElement[];
    setTabOverflowCutoff(
      tabs.filter((tab, index) => {
        // Subtract the tabs width and spacing for all but the first tab.
        width -= tab.getBoundingClientRect().width;
        if (index > 0) width -= TAB_SPACING;

        // All but the last tab must reserve space for the more menu.
        if (index < tabs.length - 1) {
          return width >= moreWidth;
        }

        // The last tab can use the remaining space and ignore more menu
        // as we'll not show more menu if we are displaying all tabs.
        return width >= 0;
      }).length
    );
  }, [breakpoints, forceHorizontalTabs]); // Recalculate when the breakpoint changes (resize observer).

  const handleOnChange = (index: number) => {
    setSelectedTabIndex(index);
    setShown({ ...shown, [index]: true });
    if (onChange) {
      onChange(index);
    }
  };

  const showTopRightContent = !!topRightContent;

  return (
    <div
      ref={containerRef}
      className={cx(className, "ctw-tab-group ctw-scrollable-pass-through-height ctw-w-full")}
    >
      <PatientHistoryStatus
        status={patientHistoryDetails.lastStatus}
        date={patientHistoryDetails.lastRetrievedAt}
      />
      <Tab.Group selectedIndex={selectedTabIndex} onChange={handleOnChange}>
        <Tab.List
          className={cx(
            // NOTE: Must keep ctw-space-x-5 aligned with the above TAB_SPACING above.
            "ctw-border-default ctw-flex ctw-space-x-5 ctw-border-b ctw-border-divider-light"
          )}
        >
          {/* Renders button for each tab using "display | display()" */}
          {content.map(({ key, display }, index) => (
            <Tab
              key={key}
              data-zus-telemetry-click={`open_tab.${key}`}
              onClick={onClickBlur}
              className={({ selected }) =>
                cx(
                  [
                    "ctw-tab ctw-whitespace-nowrap ctw-text-sm ctw-capitalize",
                    "hover:after:ctw-bg-content-black",
                    "focus-visible:ctw-outline-primary-dark focus-visible:after:ctw-bg-transparent",
                  ],
                  {
                    "after:ctw-bg-content-black": selected,
                    "ctw-text-content-light": !selected,
                  },
                  { "ctw-invisible !ctw-absolute": index >= tabOverflowCutoff }
                )
              }
            >
              {display()}
            </Tab>
          ))}

          {tabOverflowCutoff < content.length && (
            <ListBox
              ref={moreMenuRef}
              selectedIndex={selectedTabIndex - tabOverflowCutoff}
              btnClassName={cx(
                "ctw-more-tab ctw-text-sm ctw-whitespace-nowrap ctw-capitalize ctw-flex-shrink-0 ctw-h-full",
                "hover:after:ctw-bg-content-black",
                {
                  "-ctw-ml-5": tabOverflowCutoff === 0,
                  "after:ctw-bg-content-black": selectedTabIndex - tabOverflowCutoff >= 0,
                }
              )}
              optionsClassName="ctw-tab-list ctw-capitalize"
              onChange={(index) => handleOnChange(index + tabOverflowCutoff)}
              items={content.slice(tabOverflowCutoff)}
            >
              {tabOverflowCutoff !== 0 ? <span>More</span> : undefined}
            </ListBox>
          )}

          {showTopRightContent && (
            <div
              className="!ctw-ml-auto ctw-mr-1.5 ctw-flex ctw-flex-shrink-0 ctw-items-center ctw-whitespace-nowrap"
              ref={topRightContentRef}
            >
              {topRightContent}
            </div>
          )}
        </Tab.List>

        {/* Children are always rendered and appear above the active panel */}
        {children}

        {/* Renders body of each tab using "render()" */}
        <Tab.Panels className="ctw-scrollable-pass-through-height">
          {content.map((item, index) => (
            <Tab.Panel
              key={item.key}
              className={cx("ctw-scrollable-pass-through-height")}
              // Don't unmount our tabs. This fixes an issue
              // where ZAP filters/sort selections would get reset
              // when switching to a new tab and back again.
              unmount={false}
            >
              {shown[index] && item.render(breakpoints.sm)}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export const TabGroup = withErrorBoundary(TabGroupComponent, "TabGroup", false);

function onClickBlur() {
  if (typeof document !== "undefined") {
    requestAnimationFrame(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    });
  }
}
