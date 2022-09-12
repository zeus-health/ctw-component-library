import { ReactNode, useState } from "react";
import type { DrawerProps } from "../drawer";
import { Drawer } from "../drawer";
import { SaveButton } from "./save-button";

export type DrawerFormProps = {
  action: string;
  children: (
    submitting: boolean,
    errors?: { [key: string]: string }
  ) => ReactNode;
} & DrawerProps;

export const DrawerForm = ({
  action,
  onClose,
  children,
  ...drawerProps
}: DrawerFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // TODO: update reset and errors
  const reset = () => null;
  const errors = { key: "" };

  return (
    <Drawer {...drawerProps} onClose={onClose} onAfterClosed={reset}>
      <form
        className="ctw-flex ctw-h-full ctw-flex-col ctw-overflow-y-auto"
        onSubmit={(event) => {
          event.preventDefault();
          const form = event.target;
          const data = Object.fromEntries(
            new FormData(form as HTMLFormElement)
          );
          console.log("data", data);
        }}
      >
        <Drawer.Body>{children(isSubmitting, errors)}</Drawer.Body>
        <Drawer.Footer>
          <div className="ctw-flex ctw-h-full ctw-justify-end ctw-space-x-3">
            <button type="button" className="btn-default" onClick={onClose}>
              Cancel
            </button>
            <SaveButton submitting={isSubmitting} action={action} />
          </div>
        </Drawer.Footer>
      </form>
    </Drawer>
  );
};
