import { isEmpty } from "lodash";
import { ReactNode, useState } from "react";
import { Drawer, DrawerProps } from "../drawer";
import { SaveButton } from "@/components/content/forms/save-button";
import { ErrorAlert } from "@/components/core/alert";
import { CTWRequestContext } from "@/components/core/ctw-context";
import { useCTW } from "@/components/core/ctw-provider";
import { getFormResponseErrors } from "@/utils/errors";
import { AnyZodSchema, getFormData } from "@/utils/form-helper";

export type FormErrors = Record<string, string[]>;
type InputError = Record<string, string[]>;

export type DrawerFormProps<T> = {
  action: (
    data: T,
    getRequestContext: () => Promise<CTWRequestContext>
  ) => Promise<unknown>;
  schema: AnyZodSchema;

  children: (submitting: boolean, errors?: FormErrors) => ReactNode;
} & Omit<DrawerProps, "children">;

export const DrawerForm = <T,>({
  action,
  onClose,
  children,
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

    // Validation that occurs before the request.
    const formResult = await getFormData(data, schema);
    if (!formResult.success) {
      setErrors({
        formErrors: formResult.errors,
        requestErrors: undefined,
      });
      setIsSubmitting(false);
      return;
    }

    let response;
    let responseIsSuccess;
    let requestErrors;
    try {
      response = await action(formResult.data, getRequestContext);
    } catch (e) {
      responseIsSuccess = false;
      requestErrors = [];
    }

    if (response) {
      const formResponseErrors = getFormResponseErrors(response);
      responseIsSuccess = formResponseErrors.responseIsSuccess;
      requestErrors = formResponseErrors.requestErrors;
    }

    // Setting any errors from the response to the form.
    if (!responseIsSuccess) {
      setErrors({
        formErrors: undefined,
        requestErrors,
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
          <div className="ctw-flex ctw-items-center ctw-justify-between">
            <>
              {errors?.requestErrors && (
                <div className="ctw-text-sm ctw-font-medium ctw-text-error-heading">
                  There was an error with your submission
                </div>
              )}
            </>

            <div className="ctw-ml-auto ctw-flex ctw-h-full ctw-space-x-3 ctw-justify-self-end">
              <button
                type="button"
                className="ctw-btn-default"
                onClick={onClose}
              >
                Cancel
              </button>
              <SaveButton submitting={isSubmitting} />
            </div>
          </div>
        </Drawer.Footer>
      </form>
    </Drawer>
  );
};
