import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Menu } from "@headlessui/react";
import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import cx from "classnames";
import { ReactNode, useState } from "react";
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
  disabled?: boolean;
  isSelected?: boolean;
};

export type DropdownMenuSimpleProps = {
  buttonClassName?: cx.Argument;
  children: ReactNode;
  items: OptionsItem[];
  onItemSelect: (clickedItem: { key: string; name: string; value: boolean }) => void;
  isOpen?: boolean;
} & Partial<Pick<RadixDropdownMenu.MenuContentProps, "align" | "side">>;

export function DropdownMenuSimple({
  children,
  items,
  onItemSelect,
  buttonClassName,
  isOpen,
  side,
  align = "start",
}: DropdownMenuSimpleProps) {
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
        <RadixDropdownMenu.Content
          align={align}
          side={side}
          // Prevent focus from closing menu, this fixes
          // an issue with interactive testing where a "click"
          // would fire twice, once for the mousedown and
          // again for focus on the button being clicked.
          onFocusOutside={(event) => event.preventDefault()}
          className="ctw-dropdown-action-menu ctw-bg-bg-white"
          collisionPadding={10}
        >
          {items.map((menuItem) => (
            <RadixDropdownMenu.Item
              key={menuItem.key}
              className={cx("ctw-dropdown-action-menu-item ctw-bg-bg-white")}
              onClick={() => {
                if (!menuItem.disabled) {
                  onItemSelect({
                    key: menuItem.key,
                    name: menuItem.name,
                    value: !menuItem.isSelected,
                  });
                }
              }}
            >
              <div
                className={cx("ctw-flex ctw-w-full ctw-justify-between", {
                  "ctw-text-content-lighter": menuItem.disabled,
                  "!ctw-text-content-black": !menuItem.disabled,
                })}
              >
                {menuItem.display ? menuItem.display : menuItem.name}
              </div>
            </RadixDropdownMenu.Item>
          ))}
        </RadixDropdownMenu.Content>
      </RadixDropdownMenu.Root>
    </Menu>
  );
}
