import { Dialog, Transition } from "@headlessui/react";
import cx from "classnames";
import type { ReactNode } from "react";
import { Fragment } from "react";

export type ModalProps = {
  isOpen: boolean;
  onAfterClosed?: () => void; // sometimes we want to wait for the Transition to end
  title: string;
  children: ReactNode;
  className?: string;
};

export const Modal = ({
  title,
  isOpen,
  onAfterClosed,
  children,
  className,
}: ModalProps) => (
  <Transition appear show={isOpen} as={Fragment}>
    <Dialog
      as="div"
      className="ctw-relative ctw-z-10"
      onClose={
        () => {} /* Do not close on esc or backdrop click. A method for the user to close the modal should be passed as a child.  */
      }
    >
      <Transition.Child
        as={Fragment}
        enter="ctw-ease-out ctw-duration-300"
        enterFrom="ctw-opacity-0"
        enterTo="ctw-opacity-100"
        leave="ctw-ease-in ctw-duration-200"
        leaveFrom="ctw-opacity-100"
        leaveTo="ctw-opacity-0"
        afterLeave={onAfterClosed}
      >
        <div className="ctw-fixed ctw-inset-0  ctw-transition-opacity">
          <div className="ctw-h-full ctw-w-full ctw-bg-content-light ctw-opacity-75" />
        </div>
      </Transition.Child>

      <div className="ctw-fixed ctw-inset-0 ctw-overflow-auto">
        <div className="ctw-flex ctw-min-h-full ctw-items-center ctw-justify-center ctw-p-4 ctw-text-center">
          <Transition.Child
            as={Fragment}
            enter="ctw-ease-out ctw-duration-300"
            enterFrom="ctw-opacity-0 ctw-scale-95"
            enterTo="ctw-opacity-100 ctw-scale-100"
            leave="ctw-ease-in ctw-duration-200"
            leaveFrom="ctw-opacity-100 ctw-scale-100"
            leaveTo="ctw-opacity-0 ctw-scale-95"
          >
            <Dialog.Panel
              className={cx(
                "ctw-min-w-fit ctw-max-w-lg ctw-transform ctw-rounded-lg ctw-bg-white ctw-py-14 ctw-px-8 ctw-align-middle ctw-shadow-xl",
                className
              )}
            >
              <div className="ctw-flex ctw-h-full ctw-flex-col ctw-space-y-4">
                <Dialog.Title className="ctw-m-0 ctw-text-center ctw-text-2xl ctw-text-content-black">
                  {title}
                </Dialog.Title>
                {children}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
);
