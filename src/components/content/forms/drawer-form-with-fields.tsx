import { useFormInputProps } from "@/utils/form-helper";
import cx from "classnames";
import { InputHTMLAttributes } from "react";
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
  data: FormEntry[] | undefined;
  schema: Zod.AnyZodObject;
  patientID: string;
} & Pick<DrawerFormProps<T>, "onClose" | "isOpen" | "action">;

export const DrawerFormWithFields = <T,>({
  title,
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
        <div className="ctw-space-y-6">
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
                    <label
                      className={cx({ "ctw-error": error }, "leading-tight")}
                    >
                      {label}
                    </label>
                    {!inputProps(field)["aria-required"] && (
                      <span className="ctw-right-0 ctw-inline-block ctw-text-xs ctw-text-content-black">
                        Optional
                      </span>
                    )}
                  </div>

                  <FormField
                    {...inputProps(field, schema)}
                    lines={lines}
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
      )}
    </DrawerForm>
  );
};
