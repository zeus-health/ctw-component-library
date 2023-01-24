import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import cx from "classnames";
import { Fragment, useState } from "react";
import type { ReactNode } from "react";
import { isFunction } from "@/utils/nodash";

export type MinListBoxItem = {
  display: string | (() => ReactNode);
  key: string | number;
};

export type ListBoxProps<T> = {
  defaultIndex?: number;
  items: T[];
  onChange: (index: number, item: T) => void;
};

const renderDisplay = <T extends MinListBoxItem>(item: T) => {
  if (isFunction(item.display)) {
    return item.display();
  }
  return item.display;
};
export function ListBox<T extends MinListBoxItem>({
  items,
  defaultIndex = 0,
  onChange,
}: ListBoxProps<T>) {
  const [selectedTabIndex, setSelectedTabIndex] = useState(defaultIndex);
  const selectedItem = items[selectedTabIndex] ?? {
    display: "Choose a selection",
  };

  return (
    <Listbox
      value={selectedTabIndex}
      onChange={(index: number) => {
        onChange(index, items[index]);
        setSelectedTabIndex(index);
      }}
    >
      <Listbox.Button
        className={cx(
          "ctw-tab",
          "after:ctw-bg-content-black",
          "focus-visible:ctw-outline-primary-dark focus-visible:after:ctw-bg-transparent"
        )}
      >
        {renderDisplay(selectedItem)}
        <span className="ctw-relative ctw-inline-block ctw-w-7 ctw-align-middle">
          <ChevronDownIcon className="ctw-absolute -ctw-top-3 ctw-left-1.5 ctw-h-6" />
        </span>
      </Listbox.Button>
      <Listbox.Options
        className={cx(
          "ctw-tab-list ctw-absolute ctw-z-10 ctw-mt-1 ctw-list-outside ctw-list-none ctw-rounded-lg ctw-border ctw-border-solid ctw-border-divider-light ctw-bg-white ctw-p-0 ctw-text-sm",
          "focus-visible:ctw-outline-primary-dark"
        )}
      >
        {items.map((item, index) => (
          <Listbox.Option key={item.key} value={index} as={Fragment}>
            {({ active, selected }) => (
              <li
                className={cx(
                  "ctw-flex ctw-cursor-pointer ctw-justify-between ctw-px-3 ctw-py-2",
                  "first:ctw-pt-3 last:ctw-pb-3",
                  "hover:ctw-bg-bg-lighter",
                  {
                    "ctw-text-medium": active || selected,
                    "ctw-text-content-light": !(active || selected),
                    "ctw-bg-bg-lighter": active,
                  }
                )}
              >
                <span className="ctw-inline-flex ctw-align-middle">
                  {renderDisplay(item)}
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
  );
}
