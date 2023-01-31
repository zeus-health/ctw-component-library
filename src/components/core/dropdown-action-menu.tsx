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

export type DropdownMenuProps = {
  children: ReactNode;
  options: {
    items: { name: string; isSelected: boolean }[];
    onItemSelect: (clickedItem: { name: string; value: boolean }) => void;
  };
  pinnedActions: MenuItem[];
};

export function DropdownMenuAction({
  children,
  options,
  pinnedActions,
}: DropdownMenuProps) {
  const { ctwProviderRef } = useCTW();
  console.log("options", options);

  return (
    <Menu>
      <RadixDropdownMenu.Root modal={false}>
        <RadixDropdownMenu.Trigger
          // className="ctw-btn-clear ctw-link"
          className="ctw-border-none ctw-bg-transparent"
          aria-label="dropdown"
        >
          {children}
        </RadixDropdownMenu.Trigger>

        <RadixDropdownMenu.Portal container={ctwProviderRef.current}>
          <RadixDropdownMenu.Content
            // Prevent focus from closing menu, this fixes
            // an issue with interactive testing where a "click"
            // would fire twice, once for the mousedown and
            // again for focus on the button being clicked.
            onFocusOutside={(event) => event.preventDefault()}
            className="ctw-dropdown-action-menu"
            collisionPadding={10}
          >
            {options.items.map((menuItem) => (
              <RadixDropdownMenu.Item
                key={menuItem.name}
                className={cx("ctw-dropdown-action-menu-item")}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <input
                  type="checkbox"
                  id={menuItem.name}
                  name={menuItem.name}
                  onClick={(e) => {
                    console.log("hello", e.target.checked);
                    const clickedValue = {
                      name: e.target.value,
                      value: e.target.checked,
                    };
                    options.onItemSelect(clickedValue);
                    console.log("clickedValue", clickedValue);
                  }}
                  value={menuItem.name}
                  checked={menuItem.isSelected}
                />
                <label htmlFor={menuItem.name}> {menuItem.name}</label>
              </RadixDropdownMenu.Item>
            ))}

            <RadixDropdownMenu.Separator className="ctw-dropdown-separator" />
            {pinnedActions.map((menuItem) => (
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
