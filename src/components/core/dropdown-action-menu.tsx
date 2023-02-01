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
  children: ReactNode;
  options: {
    items: OptionsItem[];
    onItemSelect: (clickedItem: {
      key: string;
      name: string;
      value: boolean;
    }) => void;
    type?: DropDownMenuItemType;
  };
  customOptionRender?: (optionsItem: OptionsItem) => JSX.Element;
  pinnedActions: MenuItem[];
};

export function DropdownMenuAction({
  children,
  options,
  pinnedActions,
}: DropdownMenuProps) {
  const { ctwProviderRef } = useCTW();

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
                key={menuItem.key}
                className={cx("ctw-dropdown-action-menu-item")}
                onClick={() => {
                  options.onItemSelect({
                    key: menuItem.key,
                    name: menuItem.name,
                    value: !menuItem.isSelected,
                  });
                }}
              >
                <RenderCorrectFieldType
                  inputType={options.type}
                  menuItem={menuItem}
                />
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

export type RenderCorrectFieldTypeProps = {
  inputType?: DropDownMenuItemType;
  menuItem: OptionsItem;
};

const RenderCorrectFieldType = ({
  inputType,
  menuItem,
}: RenderCorrectFieldTypeProps) => {
  switch (inputType) {
    case "checkbox":
      return (
        <div>
          <label htmlFor={menuItem.name}>
            <input
              type="checkbox"
              id={menuItem.name}
              name={menuItem.name}
              value={menuItem.name}
              checked={menuItem.isSelected}
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
