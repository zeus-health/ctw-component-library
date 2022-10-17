import { Dialog, Transition } from "@headlessui/react";
import cx from "classnames";
import type { ReactNode } from "react";
import { Fragment } from "react";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAfterClosed?: () => void; // sometimes we want to wait for the Transition to end
  title: string;
  children: ReactNode;
  className?: string;
};

export const Modal = ({
  title,
  isOpen,
  onClose,
  onAfterClosed,
  children,
  className,
}: ModalProps) => (
  <Transition appear show={isOpen} as={Fragment}>
    <Dialog
      as="div"
      className="ctw-relative ctw-z-10"
      onClose={() => {
        /* do not close on esc or backdrop click  */
      }}
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
                "ctw-w-full ctw-min-w-fit ctw-max-w-lg ctw-transform ctw-rounded-lg ctw-bg-white ctw-p-6 ctw-align-middle ctw-shadow-xl ctw-transition-all",
                className
              )}
            >
              <div className="ctw-flex ctw-h-full ctw-flex-col">
                <Dialog.Title className="ctw-text-center ctw-text-2xl">
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

Modal.Body = function DialogBody({ children }: { children: ReactNode }) {
  return (
    <div className="ctw-flex ctw-h-full ctw-flex-col ctw-overflow-y-auto">
      {children}
    </div>
  );
};

Modal.Footer = function DialogFooter({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <div className="ctw-flex ctw-flex-col ctw-items-center ctw-space-y-4 ctw-py-4">
      {children}
    </div>
  );
};
