import { isArray } from "lodash";
import { InputHTMLAttributes, ReactNode } from "react";
import { DrawerForm, DrawerFormProps, FormErrors } from "./drawer-form";
import { FormField } from "@/components/content/forms/form-field";
import { FormFieldLabel } from "@/components/content/forms/form-field-label";
import { AnyZodSchema, useFormInputProps } from "@/utils/form-helper";

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

export type FormEntry = FormFieldType | FormContentType | FormFieldType[];

export type DrawerFormWithFieldsProps<T> = {
  title: string;
  header?: ReactNode;
  data: FormEntry[] | undefined;
  schema: AnyZodSchema;
} & Pick<DrawerFormProps<T>, "onClose" | "isOpen" | "action">;

export type FormActionTypes = "Edit" | "Add";

export const DrawerFormWithFields = <T,>({
  title,
  header,
  data = [],
  schema,
  action,
  ...drawerFormProps
}: DrawerFormWithFieldsProps<T>) => {
  const inputProps = useFormInputProps(schema);

  return (
    <DrawerForm
      title={title}
      action={action}
      schema={schema}
      {...drawerFormProps}
    >
      {(submitting, errors) => (
        <div className="ctw-space-y-4">
          {header}
          <div className="ctw-space-y-6">
            {data.map((record) => {
              if (isArray(record)) {
                return (
                  <FormFieldEntry
                    recordList={record}
                    errors={errors}
                    submitting={submitting}
                    schema={schema}
                  />
                );
              }

              const { label, field, value, lines, readonly, hidden, render } =
                record;

              if (!field) {
                return (
                  <FormField
                    key={label}
                    readonly={readonly}
                    render={render}
                    name={label}
                  />
                );
              }

              const fieldErrors = errors?.[field];
              const props = inputProps(field, schema);

              if (hidden) {
                return (
                  <FormField
                    {...props}
                    key={label}
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
                  <FormFieldLabel
                    label={label}
                    name={props.name}
                    required={props["aria-required"]}
                  />
                  <FormField
                    {...props}
                    key={label}
                    lines={lines}
                    disabled={submitting}
                    readonly={readonly}
                    defaultValue={value}
                    errors={fieldErrors}
                    hidden={hidden}
                    render={render}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </DrawerForm>
  );
};

export type FormFieldEntry = {
  recordList: FormFieldType[];
  errors: FormErrors | undefined;
  submitting: boolean;
  schema: AnyZodSchema;
};

const FormFieldEntry = ({
  recordList,
  errors,
  submitting,
  schema,
}: FormFieldEntry) => {
  const inputProps = useFormInputProps(schema);

  return (
    <div className="ctw-flex ctw-space-x-3">
      {recordList.map((record) => {
        const { label, value, field, lines, readonly, hidden, render } = record;
        const fieldErrors = errors?.[field];
        const props = inputProps(field, schema);

        return (
          <div
            className="ctw-flex ctw-grow ctw-basis-0 ctw-flex-col ctw-space-y-1"
            key={label}
          >
            <FormFieldLabel
              label={label}
              name={props.name}
              required={props["aria-required"]}
            />
            <FormField
              {...props}
              lines={lines}
              disabled={submitting}
              readonly={readonly}
              defaultValue={value}
              errors={fieldErrors}
              hidden={hidden}
              render={render}
            />
          </div>
        );
      })}
    </div>
  );
};
