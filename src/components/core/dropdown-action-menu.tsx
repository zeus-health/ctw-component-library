import { Menu } from "@headlessui/react";
import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import cx from "classnames";
import { ReactNode } from "react";
import { useCTW } from "./providers/ctw-provider";
import "./dropdown-menu.scss";

export type MenuItem = {
  name: string;
  action: () => void;
  className?: string;
};

export type OptionsItem = { key: string; name: string; isSelected?: boolean };
export type DropDownMenuItemType = "checkbox" | "select";

export type DropdownMenuProps = {
  buttonClassName?: cx.Argument;
  children: ReactNode;
  items: OptionsItem[];
  onItemSelect: (clickedItem: {
    key: string;
    name: string;
    value: boolean;
  }) => void;
  type?: DropDownMenuItemType;
  customOptionRender?: (optionsItem: OptionsItem) => JSX.Element;
  pinnedActions?: MenuItem[];
};

export function DropdownMenuAction({
  children,
  items,
  onItemSelect,
  type,
  pinnedActions,
  buttonClassName,
}: DropdownMenuProps) {
  const { ctwProviderRef } = useCTW();

  return (
    <Menu>
      <RadixDropdownMenu.Root modal={false}>
        <RadixDropdownMenu.Trigger
          className={cx(buttonClassName, "ctw-border-none ctw-bg-transparent")}
          aria-label="dropdown"
        >
          {children}
        </RadixDropdownMenu.Trigger>
        <RadixDropdownMenu.Portal container={ctwProviderRef.current}>
          <RadixDropdownMenu.Content
            align="start"
            // Prevent focus from closing menu, this fixes
            // an issue with interactive testing where a "click"
            // would fire twice, once for the mousedown and
            // again for focus on the button being clicked.
            onFocusOutside={(event) => event.preventDefault()}
            className="ctw-dropdown-action-menu"
            collisionPadding={10}
          >
            {items.map((menuItem) => (
              <RadixDropdownMenu.Item
                key={menuItem.key}
                className={cx("ctw-dropdown-action-menu-item ctw-bg-bg-white")}
                onClick={(e) => {
                  if (type === "checkbox") {
                    e.preventDefault();
                  }

                  onItemSelect({
                    key: menuItem.key,
                    name: menuItem.name,
                    value: !menuItem.isSelected,
                  });
                }}
              >
                <RenderCorrectFieldType
                  inputType={type}
                  menuItem={menuItem}
                  onClick={onItemSelect}
                />
              </RadixDropdownMenu.Item>
            ))}

            <RadixDropdownMenu.Separator className="ctw-dropdown-separator" />
            {pinnedActions &&
              pinnedActions.map((menuItem) => (
                <RadixDropdownMenu.Item
                  onClick={() => menuItem.action()}
                  key={menuItem.name}
                  className={cx(
                    menuItem.className,
                    "ctw-dropdown-action-menu-item"
                  )}
                >
                  {menuItem.name}
                </RadixDropdownMenu.Item>
              ))}
          </RadixDropdownMenu.Content>
        </RadixDropdownMenu.Portal>
      </RadixDropdownMenu.Root>
    </Menu>
  );
}

export type RenderCorrectFieldTypeProps = {
  inputType?: DropDownMenuItemType;
  menuItem: OptionsItem;
  onClick: (clickedItem: { key: string; name: string; value: boolean }) => void;
};

const RenderCorrectFieldType = ({
  inputType,
  menuItem,
  onClick,
}: RenderCorrectFieldTypeProps) => {
  switch (inputType) {
    case "checkbox":
      return (
        <div>
          <label
            htmlFor={menuItem.name}
            className="ctw-flex ctw-cursor-pointer ctw-items-center ctw-space-x-2"
          >
            <input
              type="checkbox"
              name={menuItem.name}
              onClick={(e) => {
                onClick({
                  key: menuItem.key,
                  name: menuItem.name,
                  value: !menuItem.isSelected,
                });
                e.stopPropagation();
              }}
              checked={menuItem.isSelected}
              onChange={(e) => {
                e.stopPropagation();
              }}
            />
            <span>{menuItem.name}</span>
          </label>
        </div>
      );
    case "select":
      return <div>{menuItem.name}</div>;
    default:
      return <div>{menuItem.name}</div>;
  }
};
