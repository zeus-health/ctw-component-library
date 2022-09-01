import { Menu, Transition } from "@headlessui/react";
import cx from "classnames";
import { Fragment } from "react";

export type DropdownMenuProps = {
  children: JSX.Element;
  menuItems: string[];
};

export function DropdownMenu({
  children,
  menuItems = ["Edit", "View History"],
}: DropdownMenuProps) {
  return (
    <Menu as="div" className="ctw-relative ctw-inline-block ctw-text-left">
      <div>
        <Menu.Button className="ctw-focus-visible:ring-2 ctw-focus-visible:ring-white ctw-inline-flex ctw-w-min ctw-justify-center ctw-border-none ctw-bg-transparent">
          {children}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="text-right ctw-fixed">
          <Menu.Items className="ctw-absolute ctw-left-0 ctw-z-10 ctw-mt-2 ctw-w-56 ctw-origin-top-right ctw-divide-y ctw-bg-white ctw-shadow-lg ctw-ring-1 ctw-ring-black ctw-ring-opacity-5">
            <div>
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
        </div>
      </Transition>
    </Menu>
  );
}
