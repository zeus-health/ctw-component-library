import "./drawer.scss";

import { Dialog, Transition } from "@headlessui/react";
import { ArrowLeftIcon, XIcon } from "@heroicons/react/outline";
import cx from "classnames";
import type { ReactNode } from "react";
import { Fragment, useRef } from "react";
import { ToastProvider } from "./providers/toast-provider";
import { APP_TOAST_CONTAINER_DRAWER_ID } from "./toast";
import {
  TrackingMetadata,
  useAnalytics,
} from "@/components/core/providers/analytics/use-analytics";
import { useTheme } from "@/components/core/providers/theme/use-theme";
import { useBreakpoints } from "@/hooks/use-breakpoints";

export type DrawerProps = {
  className?: string;
  children: ReactNode;
  isOpen: boolean;
  onOpen?: () => void;
  onAfterOpen?: () => void;
  onClose: () => void;
  /** Called after drawer closing animation has ended. Use this for
   * any cleanup that would affect the content displayed in the drawer.
   */
  onAfterClosed?: () => void;
  /** Shows a simple footer with a single "Close" button. */
  showCloseFooter?: boolean;
  /** Prevent drawer from closing on ESC or background click. */
  disableCloseOnBlur?: boolean;
  title: string;
  trackingMetadata?: TrackingMetadata;
};

const transitionClasses = "ctw-transform ctw-transition ctw-ease-in-out ctw-duration-300";

/**
 * Drawer is a side-panel that slides in/out from the right.
 * It has a title section at top and displays children below.
 *
 * `Drawer.Body` & `Drawer.Footer` can be used as children to create
 * a scrollable body section with a fixed footer.
 */
export function Drawer({
  isOpen,
  onClose,
  onAfterClosed,
  onOpen,
  onAfterOpen,
  children,
  className,
  showCloseFooter,
  title,
  disableCloseOnBlur = false,
}: DrawerProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className={cx("ctw-drawer ctw-relative ctw-z-[10000]", className)}
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
          beforeEnter={onOpen}
          afterEnter={onAfterOpen}
        >
          <div className="ctw-fixed ctw-inset-0  ctw-transition-opacity">
            <div className="ctw-h-full ctw-w-full ctw-bg-content-light ctw-opacity-75" />
          </div>
        </Transition.Child>
        <DrawerContent onClose={onClose} showCloseFooter={showCloseFooter} title={title}>
          <ToastProvider containerId={APP_TOAST_CONTAINER_DRAWER_ID}>{children}</ToastProvider>
        </DrawerContent>
      </Dialog>
    </Transition.Root>
  );
}

// DrawerContent is the actual content of the drawer. It is separated out from the
// Drawer component itself because the `ref` doesn't work properly when it is created
// in the same component as the Transition.Root.
function DrawerContent({
  children,
  onClose,
  showCloseFooter,
  title,
}: Pick<DrawerProps, "children" | "onClose" | "showCloseFooter" | "title">) {
  const { trackInteraction } = useAnalytics();
  const ref = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(ref);
  // We want to show the back button if we are in an iframe because the drawer and iframe use the same
  // real estate which makes it seem like closing the drawer feel like "going back" to the zap.
  const showBackButton = !!useTheme().iframeTheme;

  return (
    <div ref={ref} className="ctw-fixed ctw-inset-0 ctw-overflow-hidden">
      <div className="ctw-absolute ctw-inset-0 ctw-overflow-hidden">
        <div
          className={cx(
            "ctw-pointer-events-none ctw-fixed ctw-inset-y-0 ctw-right-0 ctw-flex ctw-max-w-full",
            {
              "ctw-pl-10": !breakpoints.sm,
            }
          )}
        >
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
                <div
                  className={cx(
                    {
                      "ctw-flex-row-reverse": showBackButton,
                    },
                    "ctw-flex ctw-h-14 ctw-flex-shrink-0 ctw-items-center ctw-justify-between ctw-border-0 ctw-border-b ctw-border-solid ctw-border-content-lighter",
                    breakpoints.sm ? "ctw-px-3" : "ctw-px-6"
                  )}
                >
                  <Dialog.Title
                    className={cx(
                      {
                        "ctw-ml-1 ctw-mr-auto": showBackButton,
                      },
                      "ctw-pl-2 ctw-text-lg ctw-font-semibold ctw-text-content-black"
                    )}
                  >
                    {title}
                  </Dialog.Title>
                  <div className="ctw-ml-3 ctw-flex ctw-h-7 ctw-items-center">
                    <button
                      type="button"
                      aria-label="close"
                      onClick={() => {
                        onClose();
                        trackInteraction("close_drawer", {
                          target: "header_close_icon",
                        });
                      }}
                      className="ctw-btn-clear"
                    >
                      <span className="ctw-sr-only">Close panel</span>
                      {!showBackButton && <XIcon className="ctw-h-6 ctw-w-6" aria-hidden="true" />}
                      {showBackButton && (
                        <ArrowLeftIcon className="ctw-h-6 ctw-w-6" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>

                {children}
                {showCloseFooter && (
                  <Drawer.Footer>
                    <Drawer.CloseButton
                      label={showBackButton ? "Back" : "Close"}
                      onClose={() => {
                        onClose();
                        trackInteraction("close_drawer", {
                          target: "footer_close_icon",
                        });
                      }}
                    />
                  </Drawer.Footer>
                )}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </div>
  );
}
const DrawerFooter = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(ref);
  return (
    <div
      ref={ref}
      className={cx("ctw-footer ctw-border-default ctw-border-t", {
        "ctw-p-6": !breakpoints.sm,
        "ctw-p-3": breakpoints.sm,
      })}
    >
      {children}
    </div>
  );
};

const DrawerCloseButton = ({ label, onClose }: { label: string; onClose: () => void }) => (
  <button type="button" className="ctw-btn-clear !ctw-px-4 !ctw-py-2" onClick={onClose}>
    {label}
  </button>
);

const DrawerBody = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(ref);

  return (
    <div
      ref={ref}
      className={cx("ctw-flex ctw-h-full ctw-flex-col ctw-overflow-y-auto", {
        "ctw-p-6": !breakpoints.sm,
        "ctw-p-3": breakpoints.sm,
      })}
    >
      {children}
    </div>
  );
};

Drawer.Body = DrawerBody;
Drawer.Footer = DrawerFooter;
Drawer.CloseButton = DrawerCloseButton;
