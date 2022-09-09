import { Float } from "@headlessui-float/react";
import { Listbox } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useState } from "react";

export type SelectFieldProps = {
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  name: string;
  options: string[];
};

export default function SelectField({
  className,
  defaultValue,
  disabled,
  name,
  options,
}: SelectFieldProps) {
  const [selected, setSelected] = useState(defaultValue);

  // Selecting this option will result in us setting
  // the value to undefined.
  const noneSelected = "None Selected";

  return (
    <div className={className}>
      <Listbox
        value={selected}
        onChange={setSelected}
        name={name}
        disabled={disabled}
      >
        <Float placement="bottom-start" offset={4} flip={10}>
          <Listbox.Button className="ctw-listbox-button ctw-flex ctw-w-full ctw-justify-between">
            <span className="ctw-block ctw-truncate">
              {selected ?? noneSelected}
            </span>
            <span className="ctw-pointer-events-none ctw-mr-1">
              <SelectorIcon className="ctw-h-5 ctw-w-5" aria-hidden="true" />
            </span>
          </Listbox.Button>

          <Listbox.Options className="ctw-listbox ctw-max-h-60 ctw-overflow-auto ctw-rounded-md ctw-bg-white ctw-py-1 ctw-text-base ctw-shadow-lg ctw-ring-1 ctw-ring-black ctw-ring-opacity-5 focus:ctw-outline-none sm:ctw-text-sm">
            {[noneSelected, ...options].map((option) => (
              <Listbox.Option
                key={option}
                className={({ active }) =>
                  `ctw-relative ctw-cursor-default ctw-select-none ctw-py-2 ctw-pr-4 ctw-pl-10 ${
                    active
                      ? "ctw-bg-primary-light ctw-text-primary-dark"
                      : "ctw-text-content-black"
                  }`
                }
                value={option === noneSelected ? undefined : option}
              >
                {({ selected: isSelected }) => (
                  <>
                    <span
                      className={`ctw-block ctw-truncate ${
                        isSelected ? "ctw-font-medium" : "ctw-font-normal"
                      }`}
                    >
                      {option}
                    </span>
                    {isSelected ? (
                      <span className="ctw-absolute ctw-inset-y-0 ctw-left-0 ctw-flex ctw-items-center ctw-pl-3 ctw-text-primary-main">
                        <CheckIcon
                          className="ctw-h-5 ctw-w-5"
                          aria-hidden="true"
                        />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Float>
      </Listbox>
    </div>
  );
}
