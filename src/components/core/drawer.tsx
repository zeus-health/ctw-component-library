import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import cx from "classnames";
import type { ReactNode } from "react";
import { Fragment } from "react";

export type DrawerProps = {
  className?: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  /** Called after drawer closing animation has ended. Use this for
   * any cleanup that would affect the content displayed in the drawer.
   */
  onAfterClosed?: () => void;
  disableCloseOnBlur?: boolean;
  title: string;
};

/**
 * Drawer is a side-panel that slides in/out from the right.
 * It has a title section at top and displays children below.
 *
 * `Drawer.Body` & `Drawer.Footer` can be used as children to create
 * a scrollable body section with a fixed footer.
 */
export function Drawer({
  className,
  children,
  isOpen,
  onClose,
  onAfterClosed,
  title,
  disableCloseOnBlur = false,
}: DrawerProps) {
  const transitionClasses =
    "ctw-transform ctw-transition ctw-ease-in-out ctw-duration-300";

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className={cx("ctw-relative ctw-z-[10000]", className)}
        onClose={() => {
          if (!disableCloseOnBlur) {
            onClose();
          }
          /* otherwise do not close on esc or backdrop click  */
        }}
      >
        <Transition.Child
          as={Fragment}
          enter={transitionClasses}
          enterFrom="ctw-opacity-0"
          enterTo="ctw-opacity-100"
          leave={transitionClasses}
          leaveFrom="ctw-opacity-100"
          leaveTo="ctw-opacity-0"
          afterLeave={onAfterClosed}
        >
          <div className="ctw-fixed ctw-inset-0  ctw-transition-opacity">
            <div className="ctw-h-full ctw-w-full ctw-bg-content-light ctw-opacity-75" />
          </div>
        </Transition.Child>

        <div className="ctw-fixed ctw-inset-0 ctw-overflow-hidden">
          <div className="ctw-absolute ctw-inset-0 ctw-overflow-hidden">
            <div className="ctw-pointer-events-none ctw-fixed ctw-inset-y-0 ctw-right-0 ctw-flex ctw-max-w-full ctw-pl-10">
              <Transition.Child
                as={Fragment}
                enter={transitionClasses}
                enterFrom="ctw-translate-x-full"
                enterTo="ctw-translate-x-0"
                leave={transitionClasses}
                leaveFrom="ctw-translate-x-0"
                leaveTo="ctw-translate-x-full"
              >
                <Dialog.Panel className="ctw-pointer-events-auto ctw-w-screen ctw-max-w-xl">
                  <div className="ctw-flex ctw-h-full ctw-flex-col ctw-bg-white ctw-shadow-xl">
                    <div className="ctw-mx-6 ctw-flex ctw-h-14 ctw-flex-shrink-0 ctw-items-center ctw-justify-between ctw-border-0 ctw-border-b ctw-border-solid ctw-border-content-lighter">
                      <Dialog.Title className="ctw-text-lg ctw-font-semibold ctw-uppercase ctw-text-content-black">
                        {title}
                      </Dialog.Title>
                      <div className="ctw-ml-3 ctw-flex ctw-h-7 ctw-items-center">
                        <button
                          type="button"
                          aria-label="close"
                          onClick={onClose}
                          className="ctw-btn-clear"
                        >
                          <span className="ctw-sr-only">Close panel</span>
                          <XIcon
                            className="ctw-h-6 ctw-w-6"
                            aria-hidden="true"
                          />
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

Drawer.Footer = ({ children }: { children: ReactNode }) => (
  <div className="ctw-border-default ctw-border-t ctw-px-6 ctw-py-4">
    {children}
  </div>
);

Drawer.Body = ({ children }: { children: ReactNode }) => (
  <div className="ctw-flex ctw-h-full ctw-flex-col ctw-overflow-y-auto ctw-p-6">
    {children}
  </div>
);
