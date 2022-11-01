import { Combobox } from "@headlessui/react";
import { debounce, isEmpty, isObject } from "lodash";
import { ChangeEvent, useMemo, useState } from "react";

export type ComboxboxFieldOption = { value: unknown; label: string };

export type ComboboxFieldProps<T> = {
  options: ComboxboxFieldOption[];
  isLoading: boolean;
  name: string;
  defaultValue: T;
  defaultSearchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  readonly: boolean | undefined;
};

export const ComboboxField = <T,>({
  options,
  isLoading,
  name,
  defaultSearchTerm,
  defaultValue,
  onSearchChange,
  readonly,
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
      if (e.target.value.length > 1) {
        onSearchChange(e.target.value);
      }
      setInputValue({});
      setSearchTerm(e.target.value);
    };

    return debounce(handleSearchInputChange, 300);
  }, [onSearchChange]);

  const onSelectChange = (eventValue: string) => {
    const currentItem = options.filter((item) => item.label === eventValue)[0];
    setInputValue(currentItem.value);
    setSearchTerm(eventValue);
  };

  return (
    <Combobox onChange={onSelectChange} value={searchTerm} disabled={readonly}>
      <Combobox.Input
        className="ctw-listbox-input ctw-w-full"
        onChange={(e) => {
          // Due to debounce, we have to persist the event.
          // https://reactjs.org/docs/legacy-event-pooling.html
          e.persist();
          debouncedSearchInputChange(e);
        }}
        placeholder="Type to search"
      />

      <input hidden name={name} value={inputValueParsed as string} readOnly />
      <Combobox.Options className="ctw-listbox ctw-max-h-60 ctw-overflow-auto ctw-rounded-md ctw-bg-white ctw-py-1 ctw-text-base ctw-shadow-lg ctw-ring-1 ctw-ring-opacity-5 focus:ctw-outline-none sm:ctw-text-sm">
        <ComboboxOptions
          options={options}
          query={searchTerm}
          isLoading={isLoading}
        />
      </Combobox.Options>
    </Combobox>
  );
};

type RenderCorrectOptionsProps = {
  isLoading: boolean;
  options: ComboxboxFieldOption[];
  query: string;
};

const ComboboxOptions = ({
  options,
  query,
  isLoading,
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
      {options.map((option) => (
        <ComboboxOption option={option} key={option.label} />
      ))}
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
