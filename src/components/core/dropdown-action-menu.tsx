import { faCheck, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "@headlessui/react";
import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import cx from "classnames";
import { ReactNode, useState } from "react";
import { MenuItem } from "./menu/menu-item";
import { useCTW } from "./providers/ctw-provider";
import "./dropdown-action-menu.scss";

export type MenuItem = {
  action: () => void;
  className?: string;
  icon?: IconDefinition;
  name: string;
};

export type OptionsItem = {
  key: string;
  name: string;
  display?: ReactNode;
  isSelected?: boolean;
};
export type DropDownMenuItemType = "checkbox" | "select";

export type DropdownMenuProps = {
  buttonClassName?: cx.Argument;
  children: ReactNode;
  items: OptionsItem[];
  onItemSelect: (clickedItem: { key: string; name: string; value: boolean }) => void;
  type?: DropDownMenuItemType;
  customOptionRender?: (optionsItem: OptionsItem) => JSX.Element;
  pinnedActions?: MenuItem[];
  isOpen?: boolean;
};

export function DropdownMenuAction({
  children,
  items,
  onItemSelect,
  type,
  buttonClassName,
  pinnedActions = [],
  isOpen,
}: DropdownMenuProps) {
  const { ctwProviderRef } = useCTW();
  const [isMenuOpen, setIsMenuOpen] = useState(isOpen);
  return (
    <Menu>
      <RadixDropdownMenu.Root
        modal={false}
        open={isMenuOpen}
        onOpenChange={(e) => setIsMenuOpen(e)}
      >
        <RadixDropdownMenu.Trigger className={cx(buttonClassName)} aria-label="dropdown">
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

            {pinnedActions.length > 0 && (
              <>
                <RadixDropdownMenu.Separator className="ctw-dropdown-separator" />
                {pinnedActions.map((menuItem) => (
                  <RadixDropdownMenu.Item
                    onClick={() => menuItem.action()}
                    key={menuItem.name}
                    className={cx(menuItem.className, "ctw-dropdown-action-menu-item")}
                  >
                    <MenuItem icon={menuItem.icon}>{menuItem.name}</MenuItem>
                  </RadixDropdownMenu.Item>
                ))}
              </>
            )}
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

const RenderCorrectFieldType = ({ inputType, menuItem, onClick }: RenderCorrectFieldTypeProps) => {
  switch (inputType) {
    case "checkbox":
      return (
        <div>
          <label
            htmlFor={menuItem.name}
            className="ctw-flex ctw-cursor-pointer ctw-items-center ctw-space-x-3"
          >
            <input
              type="checkbox"
              className="ctw-m-0 ctw-mb-px ctw-w-4"
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
            {menuItem.display ? menuItem.display : <span>{menuItem.name}</span>}
          </label>
        </div>
      );
    case "select":
      return (
        <div className="ctw-flex ctw-w-full ctw-justify-between">
          <span className={cx({ "ctw-font-semibold": menuItem.isSelected })}>
            {menuItem.display ? menuItem.display : menuItem.name}
          </span>
          {menuItem.isSelected && (
            <FontAwesomeIcon
              icon={faCheck}
              className="ctw-inline-block ctw-h-4 ctw-stroke-0 ctw-align-middle ctw-text-primary-dark"
            />
          )}
        </div>
      );
    default:
      return <div>{menuItem.name}</div>;
  }
};
