import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import cx from "classnames";
import React, { Fragment, useState } from "react";
import type { ReactNode } from "react";
import { FilterOptionSelect } from "@/components/core/filter-bar/filter-bar-types";
import { isFunction } from "@/utils/nodash";

export type MinListBoxItem = {
  className?: cx.Argument;
  display: string | ((status: ListBoxOptionStatus) => ReactNode);
  key: string | number;
};

export type ListBoxProps<T> = {
  btnClassName?: cx.Argument;
  children?: ReactNode;
  defaultIndex?: number;
  items: T[];
  onChange: (index: number, item: T) => void;
  optionsClassName?: cx.Argument;
  useBasicStyles?: boolean;
};

export type ListBoxOptionStatus = {
  active?: boolean;
  filter?: FilterOptionSelect;
  listView?: boolean;
  selected?: boolean;
};

export function ListBox<T extends MinListBoxItem>({
  useBasicStyles = false,
  btnClassName,
  children,
  optionsClassName,
  items,
  defaultIndex = 0,
  onChange,
}: ListBoxProps<T>) {
  const [selectedTabIndex, setSelectedTabIndex] = useState(defaultIndex);
  const selectedItem = items[selectedTabIndex] ?? {
    display: "Choose a selection",
  };

  return (
    <div className="ctw-inline-block">
      <Listbox
        value={selectedTabIndex}
        onChange={(index: number) => {
          onChange(index, items[index]);
          setSelectedTabIndex(index);
        }}
      >
        <Listbox.Button
          className={cx(
            btnClassName,
            !useBasicStyles && "after:ctw-bg-content-black",
            !useBasicStyles &&
              "focus-visible:ctw-outline-primary-dark focus-visible:after:ctw-bg-transparent",
            "ctw-relative ctw-mr-2 ctw-cursor-pointer ctw-border-0 ctw-border-transparent"
          )}
        >
          {children || renderDisplay(selectedItem, { listView: false })}
          {!useBasicStyles && (
            <span className="ctw-relative ctw-inline-block ctw-w-7 ctw-align-middle">
              <ChevronDownIcon className="ctw-absolute -ctw-top-3 ctw-left-1.5 ctw-h-6" />
            </span>
          )}
        </Listbox.Button>
        <Listbox.Options
          className={cx(
            optionsClassName,
            "ctw-absolute ctw-z-10 -ctw-mt-1 ctw-list-outside ctw-list-none ctw-rounded-lg ctw-border ctw-border-solid ctw-border-divider-light ctw-bg-white ctw-p-0 ctw-text-sm",
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
                    item.className,
                    {
                      "ctw-text-medium": active || selected,
                      "ctw-text-content-light": !(active || selected),
                      "ctw-bg-bg-lighter": active,
                    }
                  )}
                >
                  <span className="ctw-inline-flex ctw-align-middle">
                    {renderDisplay(item, { active, selected, listView: true })}
                  </span>
                  {!useBasicStyles && selected && (
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
    </div>
  );
}

// A helper function to render items for both the ListBox button and options.
function renderDisplay<T extends MinListBoxItem>(
  item: T,
  status: ListBoxOptionStatus
) {
  if (isFunction(item.display)) {
    return item.display(status);
  }
  return item.display;
}
