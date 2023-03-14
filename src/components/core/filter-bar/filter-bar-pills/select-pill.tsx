import { faTrash, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import cx from "classnames";
import { ReactNode } from "react";
import { MenuItem } from "../../menu/menu-item";
import { FilterOptionSelect } from "@/components/core/filter-bar/filter-bar-types";
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
  "ctw-flex ctw-items-center ctw-capitalize ctw-text-content-black ctw-bg-bg-dark ctw-text-sm ctw-rounded ctw-py-2 ctw-px-3 ctw-relative ctw-cursor-pointer ctw-border-0 ctw-border-transparent";
const renderDisplay = (
  display: string | ((status: ListBoxOptionStatus) => string | ReactNode)
) => (isFunction(display) ? display({ active: false }) : display);
const builtInButton = (name: string, key: string, icon: IconDefinition) => ({
  key,
  display: ({ listView, filter }: ListBoxOptionStatus) =>
    listView ? (
      <MenuItem icon={icon}>{name}</MenuItem>
    ) : (
      filter && renderDisplay(filter.display)
    ),
});
const removeButton = builtInButton("remove filter", "_remove", faTrash);

export function FilterBarSelectPill({
  filter,
  onChange,
  onRemove,
}: FilterBarSelectPillProps) {
  const filterNames = filter.values.map((value) =>
    isString(value) ? value : value.display
  );
  const items = [...filterNames, removeButton];
  return (
    <ListBox
      defaultIndex={items.length - 1} // clear index
      btnClassName={buttonClassName}
      optionsClassName="ctw-capitalize"
      items={items.map((item) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        display: ({ listView }: ListBoxOptionStatus) => {
          if (item === removeButton) {
            return item.display({ listView, filter });
          }
          return listView ? (
            <span className="ctw-whitespace-nowrap">{item}</span>
          ) : (
            <div className="ctw-truncate ctw-font-medium ctw-text-content-black">
              {renderDisplay(filter.display)}
              <span className="ctw-font-normal">: {item}</span>
            </div>
          );
        },
        key: isString(item) ? item : item.key,
        className: cx("ctw-capitalize", {
          "ctw-border ctw-capitalize ctw-border-solid ctw-border-divider-light ctw-border-0 ctw-border-t":
            item === removeButton,
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
