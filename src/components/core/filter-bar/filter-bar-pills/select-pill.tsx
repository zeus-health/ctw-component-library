import cx from "classnames";
import { ReactNode } from "react";
import {
  FilterItemStatus,
  FilterOptionSelect,
} from "@/components/core/filter-bar/filter-bar-types";
import { getIcon } from "@/components/core/filter-bar/filter-bar-utils";
import {
  ListBox,
  ListBoxOptionStatus,
} from "@/components/core/list-box/list-box";
import { isString } from "@/utils/nodash";
import { isFunction } from "@/utils/nodash/fp";

type FilterBarSelectPillProps = {
  filter: FilterOptionSelect;
  onChange: (key: string, isSelected: boolean) => void;
  onRemove: () => void;
};

const buttonClassName =
  "ctw-flex ctw-items-center ctw-capitalize ctw-text-content-black ctw-bg-bg-dark ctw-text-sm ctw-rounded ctw-my-2 ctw-py-2 ctw-px-3 ctw-relative ctw-mr-1 ctw-cursor-pointer ctw-border-0 ctw-border-transparent";
const renderDisplay = (
  display: string | ((status: FilterItemStatus) => string | ReactNode)
) => (isFunction(display) ? display({ active: false }) : display);
const builtInButton = (name: string, key: string, icon: string) => ({
  key,
  display: ({ listView, filter }: ListBoxOptionStatus) =>
    listView ? (
      <span>
        {getIcon(icon)} {name}
      </span>
    ) : (
      filter && renderDisplay(filter.display)
    ),
});
const resetButton = builtInButton("reset filter", "_reset", "reset");
const removeButton = builtInButton("remove filter", "_remove", "trash");

export function FilterBarSelectPill({
  filter,
  onChange,
  onRemove,
}: FilterBarSelectPillProps) {
  const filterNames = filter.values.map((value) =>
    isString(value) ? value : value.display
  );
  const items = [...filterNames, resetButton, removeButton];
  return (
    <ListBox
      useBasicStyles
      defaultIndex={items.length - 1} // clear index
      btnClassName={buttonClassName}
      optionsClassName="ctw-capitalize"
      items={items.map((item) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        display: ({ listView }: ListBoxOptionStatus) => {
          if (item === resetButton || item === removeButton) {
            return item.display({ listView, filter });
          }
          return listView ? (
            <span className="ctw-whitespace-nowrap">{item}</span>
          ) : (
            <>
              {renderDisplay(filter.display)}: {item}
            </>
          );
        },
        key: isString(item) ? item : item.key,
        className: cx("ctw-capitalize", {
          "ctw-border ctw-capitalize ctw-border-solid ctw-border-divider-light ctw-border-b-0":
            item === resetButton,
        }),
      }))}
      onChange={(index, item) => {
        if (item.key === "_remove") {
          onRemove();
        } else if (item.key === "_reset") {
          onChange("", false);
        } else {
          onChange(item.key, true);
        }
      }}
    />
  );
}
