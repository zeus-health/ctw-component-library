import { Menu } from "@headlessui/react";
import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import cx from "classnames";
import { ReactNode, useState } from "react";
import { useCTW } from "./ctw-provider";
import "./dropdown-menu.scss";
import { Loading } from "./loading";

export type MenuItem = {
  name: string;
  action: () => Promise<void>;
  className?: string;
};

export type DropdownMenuProps = {
  children: ReactNode;
  menuItems: MenuItem[];
};

export function DropdownMenu({ children, menuItems }: DropdownMenuProps) {
  const { ctwProviderRef } = useCTW();
  const [isLoading, setIsLoading] = useState(false);

  // Wrap our menuItem's action so that we set loading
  async function handleClick(menuItem: MenuItem) {
    setIsLoading(true);
    await menuItem.action();
    setIsLoading(false);
  }

  return (
    <Menu>
      <RadixDropdownMenu.Root modal={false}>
        <RadixDropdownMenu.Trigger
          className="ctw-btn-clear ctw-link"
          aria-label="dropdown"
        >
          {isLoading && <Loading message="" />}
          {!isLoading && children}
        </RadixDropdownMenu.Trigger>

        <RadixDropdownMenu.Portal container={ctwProviderRef.current}>
          <RadixDropdownMenu.Content
            // Prevent focus from closing menu, this fixes
            // an issue with interactive testing where a "click"
            // would fire twice, once for the mousedown and
            // again for focus on the button being clicked.
            onFocusOutside={(event) => event.preventDefault()}
            className="ctw-dropdown-menu-container"
            collisionPadding={10}
          >
            <RadixDropdownMenu.Arrow asChild>
              <div className="ctw-dropdown-menu-arrow" />
            </RadixDropdownMenu.Arrow>

            {menuItems.map((menuItem) => (
              <RadixDropdownMenu.Item
                onClick={() => handleClick(menuItem)}
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
