import { isEmpty } from "lodash";
import { ReactNode, useState } from "react";
import { Drawer, DrawerProps } from "../drawer";
import { SaveButton } from "@/components/content/forms/save-button";
import { ActionReturn } from "@/components/content/forms/types";
import { ErrorAlert } from "@/components/core/alert";
import { CTWRequestContext } from "@/components/core/ctw-context";
import { useCTW } from "@/components/core/ctw-provider";
import { AnyZodSchema } from "@/utils/form-helper";

export type FormErrors = Record<string, string[]>;
type InputError = Record<string, string[]>;

export type DrawerFormProps<T> = {
  action: (
    data: FormData,
    patientID: string,
    getRequestContext: () => Promise<CTWRequestContext>,
    schema: AnyZodSchema
  ) => Promise<{
    formResult: ActionReturn<T>;
    requestErrors: string[] | undefined;
  }>;
  patientID: string;
  schema: AnyZodSchema;

  children: (submitting: boolean, errors?: FormErrors) => ReactNode;
} & Omit<DrawerProps, "children">;

export const DrawerForm = <T,>({
  action,
  onClose,
  children,
  patientID,
  schema,
  ...drawerProps
}: DrawerFormProps<T>) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    formErrors?: FormErrors;
    requestErrors?: string[];
  }>();
  const { getRequestContext } = useCTW();

  const reset = () => {
    setErrors({});
    setIsSubmitting(false);
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    const form = event.target;

    const inputs = Array.from(
      (event.target as HTMLElement).querySelectorAll("input")
    );

    const inputErrors: InputError = {};

    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        inputErrors[input.name] = [`The value is not valid for ${input.name}`];
      }
    });

    if (!isEmpty(inputErrors)) {
      setErrors({ formErrors: inputErrors });
      setIsSubmitting(false);
      return;
    }

    const data = new FormData(form as HTMLFormElement);

    const response = await action(data, patientID, getRequestContext, schema);

    if (!response.formResult.success) {
      setErrors({
        formErrors: response.formResult.errors,
        requestErrors: response.requestErrors,
      });
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
        noValidate // Removes the browser tooltip functionality.
      >
        <Drawer.Body>
          <div className="ctw-space-y-4">
            {errors?.requestErrors && (
              <ErrorAlert header="There was an error with your submission">
                {errors.requestErrors.length === 1 ? (
                  errors.requestErrors[0]
                ) : (
                  <ul className="ctw-m-0 ctw-list-disc ctw-px-4">
                    {errors.requestErrors.map((error) => (
                      <li>{error}</li>
                    ))}
                  </ul>
                )}
              </ErrorAlert>
            )}
            {children(isSubmitting, errors?.formErrors)}
          </div>
        </Drawer.Body>
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
