import { useFormInputProps } from "@/utils/form-helper";
import Client from "fhir-kit-client";
import { useCTW } from "../../core/ctw-provider";
import type { DrawerFormProps } from "./drawer-form";
import { DrawerForm } from "./drawer-form";
import { FormField } from "./form-field";
import { ActionReturn } from "./types";

export type FormEntry = {
  label: string;
  field: string;
  value?: string;
  lines?: number;
  readonly?: boolean;
  hidden?: boolean;
};

export type DrawerFormWithFieldsProps<T> = {
  title: string;
  action: (
    data: FormData,
    patientID: string,
    getCTWFhirClient: () => Promise<Client>
  ) => Promise<ActionReturn<T>>;
  data: FormEntry[] | undefined;
  schema: Zod.AnyZodObject;
  patientID: string;
} & Pick<DrawerFormProps<T>, "onClose" | "isOpen">;

export const DrawerFormWithFields = <T,>({
  title,
  data = [],
  schema,
  patientID,
  action,
  ...drawerFormProps
}: DrawerFormWithFieldsProps<T>) => {
  const inputProps = useFormInputProps(schema);
  const { getCTWFhirClient } = useCTW();

  return (
    <DrawerForm
      patientID={patientID}
      title={title}
      action={action}
      getCTWFhirClient={getCTWFhirClient}
      {...drawerFormProps}
    >
      {(submitting, errors) => (
        <div className="ctw-space-y-6">
          {data.map(({ label, field, value, lines, readonly, hidden }) => {
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
                />
              </div>
            );
          })}
        </div>
      )}
    </DrawerForm>
  );
};
