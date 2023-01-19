import { Fragment, InputHTMLAttributes, ReactNode } from "react";
import { DrawerForm, DrawerFormProps, FormErrors } from "./drawer-form";
import { FormField } from "@/components/content/forms/form-field";
import { FormFieldLabel } from "@/components/content/forms/form-field-label";
import {
  AnyZodSchema,
  InputPropType,
  useFormInputProps,
} from "@/utils/form-helper";
import { isArray } from "@/utils/nodash";

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
} & Pick<DrawerFormProps<T>, "onClose" | "isOpen" | "action" | "schema">;

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
            {data.map((entry) => {
              if (isArray(entry)) {
                return (
                  <FormFieldEntries
                    recordList={entry}
                    errors={errors}
                    submitting={submitting}
                    schema={schema}
                    key={entry[0].label}
                  />
                );
              }

              const { label, field, value, lines, readonly, hidden, render } =
                entry;

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
                    errors={errors?.[field]}
                    hidden={hidden}
                    render={render}
                  />
                );
              }

              return (
                <FormFieldEntry
                  key={entry.label}
                  entry={entry}
                  errors={errors}
                  props={props}
                  submitting={submitting}
                />
              );
            })}
          </div>
        </div>
      )}
    </DrawerForm>
  );
};

export type FormFieldEntries = {
  recordList: FormFieldType[];
  errors: FormErrors | undefined;
  submitting: boolean;
  schema: AnyZodSchema;
};

const FormFieldEntries = ({
  recordList,
  errors,
  submitting,
  schema,
}: FormFieldEntries) => {
  const inputProps = useFormInputProps(schema);

  return (
    <div className="ctw-flex ctw-space-x-3">
      {recordList.map((record) => (
        <Fragment key={record.label}>
          <FormFieldEntry
            entry={record}
            props={inputProps(record.field, schema)}
            submitting={submitting}
            errors={errors}
          />
        </Fragment>
      ))}
    </div>
  );
};

export type FormFieldEntry = {
  entry: FormFieldType;
  errors: FormErrors | undefined;
  props: InputPropType;
  submitting: boolean;
};

const FormFieldEntry = ({
  entry,
  errors,
  props,
  submitting,
}: FormFieldEntry) => {
  const { label, value, field, lines, readonly, hidden, render } = entry;
  const fieldErrors = errors?.[field];

  return (
    <div
      key={label}
      className="ctw-flex ctw-grow ctw-basis-0 ctw-flex-col ctw-space-y-1.5 ctw-text-sm ctw-font-medium ctw-text-content-black"
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
};
