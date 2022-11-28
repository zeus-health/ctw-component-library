import { FormField } from "@/components/content/forms/form-field";
import { AnyZodSchema, useFormInputProps } from "@/utils/form-helper";
import { InputHTMLAttributes, ReactNode } from "react";
import { DrawerForm, DrawerFormProps } from "./drawer-form";

export type FormFieldType = {
  label: string;
  field: string;
  value?: string | string[];
  lines?: number;
  readonly?: boolean;
  hidden?: boolean;
  render?: (
    readOnly: boolean | undefined,
    inputProps: InputHTMLAttributes<HTMLInputElement>
  ) => JSX.Element;
};

export type FormContentType = {
  field?: never;
  value?: never;
  lines?: never;
  readonly?: never;
  hidden?: never;
  render: () => JSX.Element;
  label: string;
};

export type FormEntry = FormFieldType | FormContentType;

export type DrawerFormWithFieldsProps<T> = {
  title: string;
  header?: ReactNode;
  data: FormEntry[] | undefined;
  schema: AnyZodSchema;
  patientID: string;
} & Pick<DrawerFormProps<T>, "onClose" | "isOpen" | "action">;

export type FormActionTypes = "Edit" | "Add";

export const DrawerFormWithFields = <T,>({
  title,
  header,
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
        <div className="ctw-space-y-4">
          {header}
          <div className="ctw-space-y-6">
            {data.map(
              ({ label, field, value, lines, readonly, hidden, render }) => {
                if (!field) {
                  return (
                    <FormField
                      key={label}
                      readonly={readonly}
                      render={render}
                    />
                  );
                }

                const fieldErrors = errors?.[field];

                if (hidden) {
                  return (
                    <FormField
                      key={label}
                      {...inputProps(field, schema)}
                      lines={lines}
                      disabled={submitting}
                      readonly={readonly}
                      defaultValue={value}
                      errors={fieldErrors}
                      hidden={hidden}
                      render={render}
                    />
                  );
                }

                const props = inputProps(field, schema);
                const required = props["aria-required"];

                return (
                  <div
                    key={label}
                    className="ctw-space-y-1.5 ctw-text-sm ctw-font-medium ctw-text-content-black"
                  >
                    <div className="ctw-flex ctw-justify-between">
                      <label htmlFor={props.name}>{label}</label>
                      {required && (
                        <>
                          <div className="ctw-flex-grow ctw-text-icon-default">
                            *
                          </div>
                          <span className="ctw-right-0 ctw-inline-block ctw-text-xs ctw-text-content-black">
                            Required
                          </span>
                        </>
                      )}
                    </div>

                    <FormField
                      {...props}
                      lines={lines}
                      key={label}
                      disabled={submitting}
                      readonly={readonly}
                      defaultValue={value}
                      errors={fieldErrors}
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
