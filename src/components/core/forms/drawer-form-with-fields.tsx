import cx from "classnames";
import type { DrawerFormProps } from "./drawer-form";
import { DrawerForm } from "./drawer-form";
import { FormField } from "./form-field";
import { getOptions, isOptional, useFormInputProps } from "./form-utils";

export type FormEntry = {
  label: string;
  field: string;
  value?: string;
  lines?: number;
  readonly?: boolean;
};

export type DrawerFormWithFieldsProps = {
  title: string;
  action: string;
  data: FormEntry[];
  schema: Zod.AnyZodObject;
} & Pick<DrawerFormProps, "onClose" | "isOpen">;

export const DrawerFormWithFields = ({
  title,
  action,
  data,
  schema,
  ...drawerFormProps
}: DrawerFormWithFieldsProps) => {
  const inputProps = useFormInputProps(schema);
  return (
    <DrawerForm title={title} action={action} {...drawerFormProps}>
      {(submitting, errors) => (
        <div className="space-y-6">
          {data.map(({ label, field, value, lines, readonly }) => {
            const error = errors?.[field];
            // Parse out options if there are any.
            // See https://github.com/kiliman/remix-params-helper/issues/26
            const options = getOptions(schema, field);
            return (
              <div
                key={label}
                className="space-y-1.5 text-sm font-medium text-gray-700"
              >
                <div className="flex justify-between">
                  <label className={cx({ error }, "leading-tight")}>
                    {label}
                  </label>
                  {isOptional(schema, field) && (
                    <p className="right-0 inline-block text-xs text-gray-600">
                      Optional
                    </p>
                  )}
                </div>
                <FormField
                  {...inputProps(field)}
                  options={options}
                  lines={lines}
                  disabled={submitting}
                  readonly={readonly}
                  required={false} // Work around bug -- https://github.com/kiliman/remix-params-helper/issues/22
                  defaultValue={value}
                  error={error}
                />
              </div>
            );
          })}
        </div>
      )}
    </DrawerForm>
  );
};
