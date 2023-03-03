import { Combobox } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/outline";
import cx from "classnames";
import { ChangeEvent, Fragment, useMemo, useState } from "react";
import { debounce, isEmpty, isObject } from "@/utils/nodash";
import { isMouseEvent } from "@/utils/types";

export type ComboxboxFieldOption = {
  value: unknown;
  label: string;
  key?: string;
};

export type ComboboxFieldProps<T> = {
  options: ComboxboxFieldOption[];
  isLoading: boolean;
  name: string;
  defaultValue: T;
  defaultSearchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  readonly: boolean | undefined;
  enableSearchIcon?: boolean;
  onCustomSelectChange?: (e: unknown) => void;
  renderCustomOption?: (e: unknown) => JSX.Element;
  placeholder?: string;
};

export const ComboboxField = <T,>({
  options,
  isLoading,
  name,
  defaultSearchTerm,
  defaultValue,
  onSearchChange,
  readonly,
  enableSearchIcon = false,
  onCustomSelectChange,
  renderCustomOption,
  placeholder = "Type to search",
}: ComboboxFieldProps<T>) => {
  const [searchTerm, setSearchTerm] = useState(defaultSearchTerm || "");
  const [inputValue, setInputValue] = useState<unknown>({});
  const inputState = isEmpty(inputValue) ? defaultValue : inputValue;

  // Check if inputState is an object to determine if we should JSON.stringify.
  const inputValueParsed = isObject(inputState)
    ? JSON.stringify(inputState)
    : inputState;

  // Delay handle search input so that we don't fire a bunch of events until the user has had time to type.
  const debouncedSearchInputChange = useMemo(() => {
    const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newSearchTerm = e.target.value;
      if (newSearchTerm.length > 1) {
        onSearchChange(newSearchTerm);
      }

      // Skip if search term has not changed.
      if (newSearchTerm !== searchTerm) {
        setSearchTerm(newSearchTerm);
      }
      if (options.filter((item) => item.label === newSearchTerm).length === 0) {
        setInputValue({});
      }
    };

    return debounce(handleSearchInputChange, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSearchChange]);

  const onSelectChange = (eventValue: string) => {
    const currentItem = options.filter((item) => item.label === eventValue)[0];
    setInputValue(currentItem.value);
    setSearchTerm(eventValue);
    onCustomSelectChange?.(currentItem);
  };

  return (
    <Combobox onChange={onSelectChange} value={searchTerm} disabled={readonly}>
      {({ open }) => (
        <div className="ctw-relative ctw-text-left">
          <Combobox.Button
            as="div"
            onClick={(e: unknown) => {
              if (open || searchTerm.length === 0) {
                if (isMouseEvent(e)) {
                  e.preventDefault();
                }
              }
            }}
          >
            <div className="ctw-relative">
              {enableSearchIcon && (
                <div className="ctw-search-icon-wrapper">
                  <SearchIcon className="ctw-search-icon" />
                </div>
              )}
              <Combobox.Input
                className={cx(`ctw-listbox-input ctw-w-full`, {
                  "ctw-pl-10": enableSearchIcon,
                })}
                onChange={(e) => {
                  // Due to debounce, we have to persist the event.
                  // https://reactjs.org/docs/legacy-event-pooling.html
                  e.persist();
                  debouncedSearchInputChange(e);
                }}
                placeholder={placeholder}
              />
            </div>
          </Combobox.Button>

          <input
            hidden
            name={name}
            value={inputValueParsed as string}
            readOnly
          />
          <Combobox.Options className="ctw-listbox ctw-absolute ctw-z-10 ctw-m-0 ctw-mt-1 ctw-max-h-60 ctw-w-full ctw-list-none ctw-overflow-auto ctw-rounded-md ctw-bg-white ctw-p-0 ctw-py-1 ctw-text-base ctw-shadow-lg ctw-ring-1 ctw-ring-opacity-5 focus:ctw-outline-none sm:ctw-text-sm">
            <ComboboxOptions
              options={options}
              query={searchTerm}
              isLoading={isLoading}
              renderCustomOption={renderCustomOption}
            />
          </Combobox.Options>
        </div>
      )}
    </Combobox>
  );
};

type RenderCorrectOptionsProps = {
  isLoading: boolean;
  options: ComboxboxFieldOption[];
  query: string;
  renderCustomOption?: (e: unknown) => JSX.Element;
};

const ComboboxOptions = ({
  options,
  query,
  isLoading,
  renderCustomOption,
}: RenderCorrectOptionsProps) => {
  if (query.length === 0) {
    return <ComboboxOption option={{ value: "", label: "Type to search" }} />;
  }

  if (isLoading) {
    return <ComboboxOption option={{ value: "", label: "Loading..." }} />;
  }

  if (query.length < 2) {
    return (
      <ComboboxOption
        option={{ value: "", label: "Pleae type at least two characters" }}
      />
    );
  }

  if (options.length === 0) {
    return (
      <ComboboxOption
        option={{
          value: ``,
          label: `No results found for search term '${query}'`,
        }}
      />
    );
  }

  return (
    <>
      {options.map((option) =>
        renderCustomOption ? (
          <Fragment key={option.key}>{renderCustomOption(option)} </Fragment>
        ) : (
          <ComboboxOption option={option} key={option.key} />
        )
      )}
    </>
  );
};

const ComboboxOption = ({ option }: { option: ComboxboxFieldOption }) => (
  <Combobox.Option
    value={option.label}
    className={({ active }) =>
      `ctw-relative ctw-cursor-default ctw-select-none ctw-py-2 ctw-pr-4 ctw-pl-4 ${
        active
          ? "ctw-bg-primary-light ctw-text-primary-dark"
          : "ctw-text-content-black"
      }`
    }
  >
    {option.label}
  </Combobox.Option>
);
