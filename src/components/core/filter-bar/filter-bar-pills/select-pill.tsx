import cx from "classnames";
import { ReactNode } from "react";
import {
  FilterItemStatus,
  FilterOptionSelect,
} from "@/components/core/filter-bar/filter-bar-types";
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
  "ctw-flex ctw-items-center ctw-max-w-[15rem] ctw-capitalize ctw-text-content-black ctw-bg-bg-dark ctw-text-sm ctw-rounded ctw-my-2 ctw-py-2 ctw-px-3 ctw-relative ctw-mr-1 ctw-cursor-pointer ctw-border-0 ctw-border-transparent";

export function FilterBarSelectPill({
  filter,
  onChange,
  onRemove,
}: FilterBarSelectPillProps) {
  const renderDisplay = (
    display: string | ((status: FilterItemStatus) => string | ReactNode)
  ) => (isFunction(display) ? display({ active: false }) : display);
  const clearButton = {
    display: ({ listView }: ListBoxOptionStatus) =>
      listView ? "clear filter" : renderDisplay(filter.display),
    key: "_clear",
  };
  const items = [...filter.values, clearButton];
  return (
    <ListBox
      useBasicStyles
      defaultIndex={items.length - 1} // clear index
      btnClassName={buttonClassName}
      optionsClassName="ctw-capitalize"
      items={items.map((item) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        display: ({ listView }: ListBoxOptionStatus) => {
          if (item === clearButton) {
            return item.display({ listView });
          }
          const title = isString(item) ? item : renderDisplay(item.display);
          return listView ? (
            title
          ) : (
            <>
              {renderDisplay(filter.display)}: {title}
            </>
          );
        },
        key: isString(item) ? item : item.key,
        className: cx("ctw-capitalize", {
          "ctw-border ctw-capitalize ctw-border-solid ctw-border-divider-light":
            item === clearButton,
        }),
      }))}
      onChange={(index, item) => {
        if (item.key === "reset") {
          onRemove();
        } else if (item.key === "clear") {
          onChange("", false);
        } else {
          onChange(item.key, true);
        }
      }}
    />
  );
}
