import { formatDateLocalToISO } from "@/fhir/formatters";
import { ExclamationCircleIcon, LockClosedIcon } from "@heroicons/react/solid";
import cx from "classnames";
import { startCase } from "lodash";
import type { InputHTMLAttributes } from "react";

export type FormFieldProps = {
  errors?: string[];
  options?: string[];
  lines?: number;
  defaultValue?: string | string[];
  readonly?: boolean;
  render?: (
    readonly: boolean | undefined,
    props: InputHTMLAttributes<HTMLInputElement>
  ) => JSX.Element;
} & InputHTMLAttributes<HTMLInputElement>;

export const FormField = ({
  errors,
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
          className={cx(
            { "ctw-error": errors },
            "ctw-listbox-button ctw-w-full"
          )}
          name={inputProps.name || ""}
          disabled={inputProps.disabled}
          defaultValue={value}
        >
          {options.map((option) => (
            <option value={option} key={option}>
              {startCase(option)}
            </option>
          ))}
        </select>
      );
    }
    if (lines) {
      return (
        <textarea
          rows={lines}
          className={cx(
            { "ctw-error": errors },
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
        className={cx({ "ctw-error": errors }, "ctw-listbox-input ctw-w-full")}
        readOnly={readonly}
        // Only set defaultValue prop if there is a value.
        // This fixes an issue where partially filled dates
        // would get reset when saving and showing errors as the defaultValue could
        // be undefined and the input gets reset to that (empty).
        {...(value ? { defaultValue: value } : {})}
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
        {errors && (
          <div className="ctw-pointer-events-none ctw-absolute ctw-right-0 ctw-top-2 ctw-pr-4">
            <ExclamationCircleIcon
              className="ctw-h-5 ctw-w-5 ctw-text-error-main"
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      {errors && (
        <div className="ctw-text-xs ctw-italic ctw-text-error-main">
          {errors.length > 1
            ? errors.map((error) => <div key={error}>&bull; {error}</div>)
            : errors[0]}
        </div>
      )}
    </>
  );
};
