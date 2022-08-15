import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import type { ReactNode } from "react";
import { Fragment } from "react";

export type DrawerProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onAfterClosed?: () => void;
  title: string;
};

export function Drawer({
  children,
  isOpen,
  onClose,
  onAfterClosed,
  title,
}: DrawerProps) {
  const transitionClasses = "transform transition ease-in-out duration-300";

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          /* do not close on esc or backdrop click  */
        }}
      >
        <Transition.Child
          as={Fragment}
          enter={transitionClasses}
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave={transitionClasses}
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={onAfterClosed}
        >
          <div className="fixed inset-0 bg-content-light bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter={transitionClasses}
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave={transitionClasses}
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-xl">
                  <div className="flex h-full flex-col bg-white shadow-xl">
                    <div className="flex h-14 flex-shrink-0 items-center justify-between bg-primary-dark px-6 text-white">
                      <Dialog.Title className="text-lg font-semibold uppercase">
                        {title}
                      </Dialog.Title>
                      <div className="ml-3 flex h-7 items-center">
                        <button type="button" onClick={onClose}>
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    {children}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

Drawer.Footer = function DialogFooter({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <div className="border-t border-divider-light px-6 py-4">{children}</div>
  );
};

Drawer.Body = function DialogBody({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <div className="flex h-full flex-col overflow-y-auto p-6">{children}</div>
  );
};
