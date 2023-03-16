import { Tab } from "@headlessui/react";
import cx from "classnames";
import { ReactNode, useRef, useState } from "react";
import { ScrollableContainer } from "@/components/core/ctw-box";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { ListBox } from "@/components/core/list-box/list-box";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import "./tab-group.scss";

export type TabGroupProps = {
  children?: ReactNode;
  className?: string;
  content: TabGroupItem[];
  forceHorizontalTabs?: boolean;
  onChange?: (index: number) => void; // optional event
  scrollingEnabled?: boolean;
};

export type TabGroupItem = {
  display: () => string | ReactNode;
  getPanelClassName?: (sm: boolean) => cx.Argument;
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
  scrollingEnabled = false,
}: TabGroupProps) {
  const [_, setSelectedTabIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(containerRef);
  const isVertical = !forceHorizontalTabs && breakpoints.sm;
  // Work around for not wanting to pre-mount all tabs.
  // https://github.com/tailwindlabs/headlessui/issues/2276#issuecomment-1456537475
  const [shown, setShown] = useState<Record<number, boolean>>({ 0: true });

  const handleOnChange = (index: number) => {
    setSelectedTabIndex(index);
    setShown({ ...shown, [index]: true });
    if (onChange) {
      onChange(index);
    }
  };

  return (
    <ScrollableContainer
      scrollingEnabled={scrollingEnabled}
      ref={containerRef}
      className={cx(className, "ctw-tab-group ctw-relative ctw-w-full")}
    >
      <Tab.Group>
        {isVertical && (
          <ListBox
            btnClassName="ctw-tab ctw-capitalize"
            optionsClassName="ctw-tab-list ctw-capitalize"
            onChange={handleOnChange}
            items={content}
          />
        )}
        <Tab.List
          className={cx(
            "ctw-border-default ctw-flex ctw-justify-start ctw-border-b ctw-border-divider-light",
            { "ctw-hidden": isVertical }
          )}
        >
          {/* Renders button for each tab using "display | display()" */}
          {content.map(({ key, display }) => (
            <Tab
              key={key}
              data-zus-telemetry-click={`Tab[${key}]`}
              onClick={onClickBlur}
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

        {/* Children are always rendered and appear above the active panel */}
        {children}

        {/* Renders body of each tab using "render()" */}
        <Tab.Panels
          className={cx({ "ctw-scrollable-container": scrollingEnabled })}
        >
          {content.map((item, index) => (
            <Tab.Panel
              key={item.key}
              className={cx(item.getPanelClassName?.(breakpoints.sm), {
                "ctw-scrollable-container": scrollingEnabled,
              })}
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
    </ScrollableContainer>
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
