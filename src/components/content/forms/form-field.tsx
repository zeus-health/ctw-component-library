import { useCTW } from "@/components/core/ctw-provider";
import { formatDateLocalToISO } from "@/fhir/formatters";
import { ExclamationCircleIcon, LockClosedIcon } from "@heroicons/react/solid";
import cx from "classnames";
import type { InputHTMLAttributes } from "react";
import { AutoCompleteSelect } from "./autocomplete-select-field";
import SelectField from "./select-field";

export type FormFieldProps = {
  error?: string;
  options?: string[];
  lines?: number;
  defaultValue?: string;
  readonly?: boolean;
  autocomplete?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const FormField = ({
  error,
  options,
  lines,
  defaultValue,
  readonly,
  hidden,
  autocomplete,
  ...inputProps
}: FormFieldProps) => {
  const { authToken } = useCTW();
  // We display dates in MM/DD/YYYY format, but date input fields
  // expect it to be in YYYY-MM-DD format.

  const value =
    inputProps.type === "date"
      ? formatDateLocalToISO(defaultValue as string)
      : defaultValue;

  const getFieldComponent = () => {
    if (autocomplete) {
      return (
        <AutoCompleteSelect
          className={cx({ "ctw-error": error }, "ctw-w-full")}
          name={inputProps.name || ""}
          authToken={authToken}
        />
      );
    }
    if (options) {
      return (
        <SelectField
          className={cx({ "ctw-error": error }, "ctw-w-full")}
          options={options}
          name={inputProps.name || ""}
          disabled={inputProps.disabled}
          defaultValue={value as string | undefined}
        />
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
