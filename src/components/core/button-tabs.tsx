import { Tab } from "@headlessui/react";
import type { ReactNode } from "react";

export type ButtonTabsProps = {
  tabs: string[];
  children: ReactNode;
};

export function ButtonTabs({ tabs, children }: ButtonTabsProps) {
  return (
    <Tab.Group>
      <Tab.List className="ctw-btn-group ctw-text-black">
        {tabs.map((tab) => (
          <Tab
            key={tab}
            className={({ selected }) =>
              selected ? "ctw-btn-primary" : "ctw-btn-default"
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
