import { Menu } from "@headlessui/react";
import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import cx from "classnames";
import { ReactNode } from "react";

export type MenuItems = {
  name: string;
  action: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    data: unknown
  ) => void;
  className?: string;
};

export type DropdownMenuProps = {
  children: ReactNode;
  menuItems: MenuItems[];
  data: unknown;
};

export function DropdownMenu({ children, menuItems, data }: DropdownMenuProps) {
  return (
    <Menu>
      <RadixDropdownMenu.Root modal={false}>
        <RadixDropdownMenu.Trigger className="ctw-btn-clear ctw-link">
          {children}
        </RadixDropdownMenu.Trigger>

        <RadixDropdownMenu.Portal>
          <RadixDropdownMenu.Content
            className="ctw-dropdown-menu-container"
            collisionPadding={10}
          >
            <RadixDropdownMenu.Arrow asChild>
              <div className="ctw-dropdown-menu-arrow" />
            </RadixDropdownMenu.Arrow>

            {menuItems.map((menuItem) => (
              <RadixDropdownMenu.Item
                onClick={(e) => menuItem.action(e, data)}
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
