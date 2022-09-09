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
      <form method="POST" className="flex h-full flex-col overflow-y-auto">
        <Drawer.Body>{children(isSubmitting, errors)}</Drawer.Body>
        <Drawer.Footer>
          <div className="flex h-full justify-end space-x-3">
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
