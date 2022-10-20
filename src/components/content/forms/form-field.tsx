import { formatDateLocalToISO } from "@/fhir/formatters";
import { ExclamationCircleIcon, LockClosedIcon } from "@heroicons/react/solid";
import cx from "classnames";
import { capitalize } from "lodash";
import type { InputHTMLAttributes, ReactNode } from "react";

export type FormFieldProps = {
  error?: string;
  options?: string[];
  lines?: number;
  defaultValue?: string;
  readonly?: boolean;
  render?: (
    readonly: boolean | undefined,
    props: InputHTMLAttributes<HTMLInputElement>
  ) => ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export const FormField = ({
  error,
  options,
  lines,
  defaultValue,
  readonly,
  hidden,
  render,
  ...inputProps
}: FormFieldProps) => {
  // We display dates in MM/DD/YYYY format, but date input fields
  // expect it to be in YYYY-MM-DD format.

  const value =
    inputProps.type === "date"
      ? formatDateLocalToISO(defaultValue as string)
      : defaultValue;

  const getFieldComponent = () => {
    if (render) {
      return render(readonly, { ...inputProps, defaultValue, hidden });
    }

    if (options) {
      return (
        <select
          className="ctw-listbox-button ctw-w-full"
          name={inputProps.name || ""}
          disabled={inputProps.disabled}
          defaultValue={value as string | undefined}
        >
          {options.map((option) => (
            <option value={option}>{capitalize(option)}</option>
          ))}
        </select>
      );
    }
    if (lines) {
      return (
        <textarea
          rows={lines}
          className={cx(
            { "ctw-error": error },
            "ctw-listbox-textarea ctw-w-full ctw-whitespace-pre-wrap"
          )}
          defaultValue={value}
          disabled={inputProps.disabled}
          readOnly={readonly}
          name={inputProps.name || ""}
        />
      );
    }
    return (
      <input
        {...inputProps}
        type={inputProps.type}
        className={cx({ "ctw-error": error }, "ctw-listbox-input ctw-w-full")}
        readOnly={readonly}
        defaultValue={value}
      />
    );
  };

  if (render && hidden) {
    return render(readonly, {
      ...inputProps,
      defaultValue,
      hidden,
    });
  }

  if (hidden) {
    return <input {...inputProps} defaultValue={value} hidden={hidden} />;
  }

  return (
    <>
      <div className="ctw-relative">
        {getFieldComponent()}
        {readonly && (
          <LockClosedIcon className="ctw-absolute ctw-right-3 ctw-top-1/2 ctw-h-4 ctw-w-4 ctw--translate-y-1/2 ctw-transform ctw-fill-content-lighter" />
        )}
        {error && (
          <div className="ctw-pointer-events-none ctw-absolute ctw-inset-y-0 ctw-right-0 ctw-flex ctw-items-center ctw-pr-3">
            <ExclamationCircleIcon
              className="ctw-h-5 ctw-w-5 ctw-text-error-main"
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      {error && (
        <div className="ctw-text-xs ctw-italic ctw-text-error-main">
          {error}
        </div>
      )}
    </>
  );
};
