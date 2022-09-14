import { action } from "@/components/core/forms/actions";
import { ReactNode, useState } from "react";
import type { DrawerProps } from "../drawer";
import { Drawer } from "../drawer";
import { SaveButton } from "./save-button";

export type DrawerFormProps = {
  actionName: string;
  children: (
    submitting: boolean,
    errors?: { [key: string]: string }
  ) => ReactNode;
} & DrawerProps;

export const DrawerForm = ({
  actionName,
  onClose,
  children,
  ...drawerProps
}: DrawerFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // TODO: update reset and errors
  const reset = () => null;

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const form = event.target;
    const actionButton = form.action;
    const data = new FormData(form as HTMLFormElement);
    const response = await action(data, actionButton.value);
    setIsSubmitting(false);
    if (!response.success) {
      setErrors(response.errors);
    }

    console.log("response", response);
  };

  return (
    <Drawer {...drawerProps} onClose={onClose} onAfterClosed={reset}>
      <form
        className="ctw-flex ctw-h-full ctw-flex-col ctw-overflow-y-auto"
        onSubmit={onFormSubmit}
      >
        <Drawer.Body>{children(isSubmitting, errors)}</Drawer.Body>
        <Drawer.Footer>
          <div className="ctw-flex ctw-h-full ctw-justify-end ctw-space-x-3">
            <button type="button" className="ctw-btn-default" onClick={onClose}>
              Cancel
            </button>
            <SaveButton submitting={isSubmitting} actionName={actionName} />
          </div>
        </Drawer.Footer>
      </form>
    </Drawer>
  );
};
