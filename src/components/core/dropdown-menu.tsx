import { Float } from "@headlessui-float/react";
import { Menu } from "@headlessui/react";
import cx from "classnames";
import { ReactNode } from "react";

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
  return (
    <Menu>
      <Float
        arrow
        enter="ctw-transition ctw-duration-75 ctw-ease-out"
        flip
        offset={5}
        placement="bottom-start"
        portal
        shift={10}
        enterFrom="ctw-opacity-0"
        enterTo="ctw-opacity-100"
        leave="ctw-transition ctw-duration-75 ctw-ease-in"
        leaveFrom="ctw-opacity-100"
        leaveTo="ctw-opacity-0"
        tailwindcssOriginClass
      >
        <Menu.Button className="ctw-btn-clear ctw-link">{children}</Menu.Button>

        <Menu.Items
          static
          className="ctw-w-max ctw-bg-white ctw-ring-1 ctw-ring-divider-light ctw-ring-opacity-5 focus:ctw-outline-none"
        >
          <Float.Arrow className="ctw-absolute ctw-h-5 ctw-w-5 ctw-rotate-45 ctw-border ctw-border-divider-light ctw-bg-white" />
          <div className="ctw-relative ctw-bg-white">
            {menuItems.map((menuItem) => (
              <Menu.Item key={menuItem.name}>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={() => menuItem.action()}
                    className={cx(
                      "ctw-flex ctw-w-full ctw-cursor-pointer ctw-items-center ctw-border-none ctw-bg-transparent ctw-py-2 ctw-px-2 ctw-text-primary-main",
                      {
                        "ctw-bg-primary-light": active,
                      },
                      menuItem.className
                    )}
                  >
                    {menuItem.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Float>
    </Menu>
  );
}
