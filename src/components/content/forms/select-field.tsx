import {
  CheckIcon,
  ChevronDownIcon,
  SelectorIcon,
} from "@heroicons/react/solid";
import { useState } from "react";

import * as RadixSelect from "@radix-ui/react-select";

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

  // TODO: add wrapper div

  return (
    <div className={className}>
      <RadixSelect.Root>
        <RadixSelect.Trigger
          aria-label={name}
          className="ctw-listbox-button ctw-flex ctw-w-full ctw-justify-between"
        >
          <span className="ctw-block ctw-truncate">
            {selected ?? noneSelected}
          </span>
          <span className="ctw-pointer-events-none ctw--mr-1">
            <SelectorIcon
              className="ctw-block ctw-h-5 ctw-w-5"
              aria-hidden="true"
            />
          </span>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content>
            <RadixSelect.Viewport>
              <RadixSelect.Value placeholder="Select a fruit…" />
              <RadixSelect.Icon>
                <ChevronDownIcon />
              </RadixSelect.Icon>
              \
              {[noneSelected, ...options].map((option) => (
                <RadixSelect.Item
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
                  <>
                    <span
                      className={`ctw-block ctw-truncate ${
                        false ? "ctw-font-medium" : "ctw-font-normal"
                      }`}
                    >
                      {option}
                    </span>
                    {false ? (
                      <span className="ctw-absolute ctw-inset-y-0 ctw-left-0 ctw-flex ctw-items-center ctw-pl-3 ctw-text-primary-main">
                        <CheckIcon
                          className="ctw-block ctw-h-5 ctw-w-5"
                          aria-hidden="true"
                        />
                      </span>
                    ) : null}
                  </>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </div>
  );
}
