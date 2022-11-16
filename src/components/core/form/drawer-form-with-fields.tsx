import { FormField } from "@/components/content/forms/form-field";
import { AnyZodSchema, useFormInputProps } from "@/utils/form-helper";
import { InputHTMLAttributes, ReactNode } from "react";
import { DrawerForm, DrawerFormProps } from "./drawer-form";

export type FormEntry = {
  label: string;
  field: string;
  value?: string | string[];
  lines?: number;
  readonly?: boolean;
  hidden?: boolean;
  presentational?: boolean;
  render?: (
    readOnly: boolean | undefined,
    inputProps: InputHTMLAttributes<HTMLInputElement>
  ) => JSX.Element;
};

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
  console.log("schema", schema);
  console.log("data", data);
  const inputProps = useFormInputProps(schema);
  console.log("inputProps", data);

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
              ({
                label,
                field,
                value,
                lines,
                readonly,
                hidden,
                render,
                presentational,
              }) => {
                const fieldErrors = errors?.[field];

                if (presentational) {
                  return (
                    <FormField
                      key={label}
                      readonly={readonly}
                      render={render}
                    />
                  );
                }

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

                return (
                  <div
                    key={label}
                    className="ctw-space-y-1.5 ctw-text-sm ctw-font-medium ctw-text-content-black"
                  >
                    <div className="ctw-flex ctw-justify-between">
                      <label>{label}</label>
                      {inputProps(field)["aria-required"] && (
                        <div className="ctw-flex-grow ctw-text-icon-default">
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
