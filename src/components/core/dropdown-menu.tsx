import { Menu } from "@headlessui/react";
import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import cx from "classnames";
import { ReactNode } from "react";
import { useCTW } from "./ctw-provider";
import "./dropdown-menu.scss";

export type MenuItems = {
  name: string;
  action: () => void;
  className?: string;
};

export type DropdownMenuProps = {
  children: ReactNode;
  menuItems: MenuItems[];
};

export function DropdownMenu({ children, menuItems }: DropdownMenuProps) {
  const { ctwProviderRef } = useCTW();

  return (
    <Menu>
      <RadixDropdownMenu.Root modal={false}>
        <RadixDropdownMenu.Trigger className="ctw-btn-clear ctw-link">
          {children}
        </RadixDropdownMenu.Trigger>

        <RadixDropdownMenu.Portal container={ctwProviderRef.current}>
          <RadixDropdownMenu.Content
            className="ctw-dropdown-menu-container"
            collisionPadding={10}
          >
            <RadixDropdownMenu.Arrow asChild>
              <div className="ctw-dropdown-menu-arrow" />
            </RadixDropdownMenu.Arrow>

            {menuItems.map((menuItem) => (
              <RadixDropdownMenu.Item
                onClick={menuItem.action}
                key={menuItem.name}
                className={cx(menuItem.className, "ctw-dropdown-menu-item")}
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
