import cx from "classnames";
import { useCTW } from "../ctw-provider";
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
  actionName: string;
  data: FormEntry[];
  schema: Zod.AnyZodObject;
  patientID: string;
} & Pick<DrawerFormProps, "onClose" | "isOpen">;

export const DrawerFormWithFields = ({
  title,
  actionName,
  data,
  schema,
  patientID,
  ...drawerFormProps
}: DrawerFormWithFieldsProps) => {
  const inputProps = useFormInputProps(schema);
  const { getCTWFhirClient } = useCTW();

  return (
    <DrawerForm
      patientID={patientID}
      title={title}
      actionName={actionName}
      getCTWFhirClient={getCTWFhirClient}
      {...drawerFormProps}
    >
      {(submitting, errors) => (
        <div className="ctw-space-y-6">
          {data.map(({ label, field, value, lines, readonly }) => {
            const error = errors?.[field];
            // Parse out options if there are any.
            // See https://github.com/kiliman/remix-params-helper/issues/26
            const options = getOptions(schema, field);
            return (
              <div
                key={label}
                className="ctw-space-y-1.5 ctw-text-sm ctw-font-medium ctw-text-content-black"
              >
                <div className="ctw-flex ctw-justify-between">
                  <label className={cx({ error }, "leading-tight")}>
                    {label}
                  </label>
                  {isOptional(schema, field) && (
                    <p className="ctw-right-0 ctw-inline-block ctw-text-xs ctw-text-content-black">
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
