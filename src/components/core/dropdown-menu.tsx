import { Float } from "@headlessui-float/react";
import { Menu, Transition } from "@headlessui/react";
import cx from "classnames";
import { Fragment, ReactNode } from "react";

export type MenuItems = {
  name: string;
  action: () => void;
};

export type DropdownMenuProps = {
  children: ReactNode;
  menuItems: MenuItems[];
};

export function DropdownMenu({ children, menuItems }: DropdownMenuProps) {
  return (
    <Menu as="div">
      <Float portal placement="bottom-start" offset={10} flip arrow>
        <Menu.Button className="ctw-border-none ctw-bg-transparent">
          {children}
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="ctw-w-max ctw-bg-white ctw-ring-1 ctw-ring-black ctw-ring-opacity-5">
            <Float.Arrow className="ctw-absolute ctw-h-5 ctw-w-5 ctw-rotate-45 ctw-border ctw-border-black ctw-bg-white" />
            <div className="ctw-relative ctw-overflow-hidden ctw-bg-white">
              {menuItems.map((menuItem) => (
                <Menu.Item key={menuItem}>
                  {({ active }) => (
                    <button
                      type="button"
                      className={cx(
                        "group ctw-flex ctw-w-full ctw-items-center ctw-border-none ctw-bg-transparent ctw-py-2 ctw-px-2 ctw-text-content-black",
                        {
                          "hover:ctw-bg-icon-active": active,
                        }
                      )}
                    >
                      {menuItem}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Float>
    </Menu>
  );
}
