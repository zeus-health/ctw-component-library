import { useFormInputProps } from "@/utils/form-helper";
import { InputHTMLAttributes, ReactNode } from "react";
import type { DrawerFormProps } from "./drawer-form";
import { DrawerForm } from "./drawer-form";
import { FormField } from "./form-field";

export type FormEntry = {
  label: string;
  field: string;
  value?: string;
  lines?: number;
  readonly?: boolean;
  hidden?: boolean;
  render?: (
    readOnly: boolean | undefined,
    inputProps: InputHTMLAttributes<HTMLInputElement>
  ) => JSX.Element;
};

export type DrawerFormWithFieldsProps<T> = {
  title: string;
  header?: ReactNode;
  formType: FormActionTypes;
  data: FormEntry[] | undefined;
  schema: Zod.AnyZodObject;
  patientID: string;
} & Pick<DrawerFormProps<T>, "onClose" | "isOpen" | "action">;

export type FormActionTypes = "Edit" | "Add";

export const DrawerFormWithFields = <T,>({
  title,
  header,
  formType,
  data = [],
  schema,
  patientID,
  action,
  ...drawerFormProps
}: DrawerFormWithFieldsProps<T>) => {
  const inputProps = useFormInputProps(schema);

  return (
    <DrawerForm
      patientID={patientID}
      title={title}
      action={action}
      schema={schema}
      {...drawerFormProps}
    >
      {(submitting, errors) => (
        <div>
          {formType === "Edit" && <div>{header}</div>}
          <div className="ctw-space-y-6 ctw-py-4">
            {data.map(
              ({ label, field, value, lines, readonly, hidden, render }) => {
                const error = errors?.[field];

                if (hidden) {
                  return (
                    <FormField
                      key={label}
                      {...inputProps(field, schema)}
                      lines={lines}
                      disabled={submitting}
                      readonly={readonly}
                      defaultValue={value}
                      error={error}
                      hidden={hidden}
                      render={render}
                    />
                  );
                }

                return (
                  <div
                    key={label}
                    className="ctw-space-y-1.5 ctw-text-sm ctw-font-medium ctw-text-content-black"
                  >
                    <div className="ctw-flex ctw-justify-between">
                      <label>{label}</label>
                      {inputProps(field)["aria-required"] && (
                        <div className="ctw-flex-grow ctw-text-error-main">
                          *
                        </div>
                      )}
                      {inputProps(field)["aria-required"] && (
                        <span className="ctw-right-0 ctw-inline-block ctw-text-xs ctw-text-content-black">
                          Required
                        </span>
                      )}
                    </div>

                    <FormField
                      {...inputProps(field, schema)}
                      lines={lines}
                      key={label}
                      disabled={submitting}
                      readonly={readonly}
                      defaultValue={value}
                      error={error}
                      hidden={hidden}
                      render={render}
                    />
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}
    </DrawerForm>
  );
};
