import {
  faCheck,
  faChevronDown,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Listbox } from "@headlessui/react";
import cx from "classnames";
import { Fragment, useState } from "react";
import type { ReactNode } from "react";
import { MenuItem } from "../menu/menu-item";
import { FilterOptionSelect } from "@/components/core/filter-bar/filter-bar-types";
import { isFunction } from "@/utils/nodash";
import "./list-box.scss";

export type MinListBoxItem = {
  className?: cx.Argument;
  display: string | ((status: ListBoxOptionStatus) => ReactNode);
  icon?: IconDefinition;
  key: string;
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
    <div className="ctw-relative ctw-inline-block">
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
            !useBasicStyles && "focus-visible:ctw-outline-primary-dark",
            "ctw-relative ctw-cursor-pointer ctw-justify-between ctw-space-x-2 ctw-border-0 ctw-border-transparent"
          )}
        >
          {children || renderDisplay(selectedItem, { listView: false })}
          {!useBasicStyles && (
            <FontAwesomeIcon icon={faChevronDown} className="ctw-w-2" />
          )}
        </Listbox.Button>
        <Listbox.Options className={cx(optionsClassName, "ctw-list-box")}>
          {items.map((item, index) => (
            <Listbox.Option key={item.key} value={index} as={Fragment}>
              {({ active, selected }) => (
                <li
                  className={cx(
                    "ctw-flex ctw-cursor-pointer ctw-justify-between ctw-px-3 ctw-py-2",
                    "hover:ctw-bg-bg-lighter",
                    item.className,
                    {
                      "ctw-text-medium": active || selected,
                      "ctw-text-content-black": !(active || selected),
                      "ctw-bg-bg-lighter": active,
                    }
                  )}
                >
                  <span
                    className={cx("ctw-inline-flex ctw-align-middle", {
                      "ctw-font-semibold": selected && !useBasicStyles,
                    })}
                  >
                    {renderDisplay(item, { active, selected, listView: true })}
                  </span>
                  {!useBasicStyles && selected && !item.key.startsWith("_") && (
                    <span className="ctw-inline-flex ctw-pb-0.5">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="ctw-inline-block ctw-h-4 ctw-stroke-0 ctw-align-middle ctw-text-primary-dark"
                      />
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

// TODO pull this out?
// A helper function to render items for both the ListBox button and options.
export function renderDisplay<T extends MinListBoxItem>(
  item: T,
  status: ListBoxOptionStatus
) {
  return (
    <MenuItem icon={item.icon}>
      {isFunction(item.display) ? item.display(status) : item.display}
    </MenuItem>
  );
}
