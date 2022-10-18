import Client from "fhir-kit-client";
import { ReactNode, useState } from "react";
import type { DrawerProps } from "../../core/drawer";
import { Drawer } from "../../core/drawer";
import { SaveButton } from "./save-button";
import { ActionReturn } from "./types";

export type FormErrors = Record<string, string>;

export type DrawerFormProps<T> = {
  action: (
    data: FormData,
    patientID: string,
    getCTWFhirClient: () => Promise<Client>,
    schema: Zod.AnyZodObject
  ) => Promise<ActionReturn<T>>;
  patientID: string;
  getCTWFhirClient: () => Promise<Client>;
  children: (submitting: boolean, errors?: FormErrors) => ReactNode;
  schema: Zod.AnyZodObject;
} & Omit<DrawerProps, "children">;

export const DrawerForm = <T,>({
  action,
  onClose,
  children,
  patientID,
  getCTWFhirClient,
  schema,
  ...drawerProps
}: DrawerFormProps<T>) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>();

  const reset = () => {
    setErrors({});
    setIsSubmitting(false);
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    const form = event.target;
    const data = new FormData(form as HTMLFormElement);
    const response = await action(data, patientID, getCTWFhirClient, schema);

    if (!response.success) {
      setErrors(response.errors);
      setIsSubmitting(false);
    } else {
      setIsSubmitting(false);
      onClose();
    }
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
            <SaveButton submitting={isSubmitting} />
          </div>
        </Drawer.Footer>
      </form>
    </Drawer>
  );
};
