import { Tab } from "@headlessui/react";
import type { ReactNode } from "react";

export type ButtonTabsProps = {
  tabs: string[];
  children: ReactNode;
};

export function ButtonTabs({ tabs, children }: ButtonTabsProps) {
  return (
    <Tab.Group>
      <Tab.List className="btn-group text-black">
        {tabs.map((tab) => (
          <Tab
            key={tab}
            className={({ selected }) =>
              selected ? "btn-primary" : "btn-default"
            }
          >
            {tab}
          </Tab>
        ))}
      </Tab.List>

      {children}
    </Tab.Group>
  );
}
