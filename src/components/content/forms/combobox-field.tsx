import { Combobox } from "@headlessui/react";
import { debounce } from "lodash";
import React, { useEffect, useMemo } from "react";

export type ComboxboxFieldOption = { value: string; id: string };

export type ComboboxFieldProps = {
  options: ComboxboxFieldOption[];
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSelectChange: (eventValue: string) => void;
  readonly: boolean | undefined;
};

export const ComboboxField = ({
  options,
  query,
  setQuery,
  handleSelectChange,
  readonly,
}: ComboboxFieldProps) => {
  // Delay handle search input so that we don't fire a bunch of events until the user has had time to type.
  const debouncedSearchInputChange = useMemo(() => {
    const handleSearchInputChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => setQuery(event.target.value);

    return debounce(handleSearchInputChange, 300);
  }, [setQuery]);

  useEffect(
    () => () => {
      debouncedSearchInputChange.cancel();
    },
    [query, debouncedSearchInputChange]
  );

  return (
    <Combobox onChange={handleSelectChange} value={query} disabled={readonly}>
      <Combobox.Input
        className="ctw-listbox-input ctw-w-full"
        onChange={debouncedSearchInputChange}
        placeholder="Type to search"
      />
      <Combobox.Options className="ctw-listbox ctw-max-h-60 ctw-overflow-auto ctw-rounded-md ctw-bg-white ctw-py-1 ctw-text-base ctw-shadow-lg ctw-ring-1 ctw-ring-black ctw-ring-opacity-5 focus:ctw-outline-none sm:ctw-text-sm">
        <RenderCorrectOptions options={options} query={query} />
      </Combobox.Options>
    </Combobox>
  );
};

type RenderCorrectOptionsProps = {
  options: ComboxboxFieldOption[];
  query: string;
};

const RenderCorrectOptions = ({
  options,
  query,
}: RenderCorrectOptionsProps) => {
  if (query.length === 0) {
    return <ComboboxOption option={{ value: "Type to search", id: "empty" }} />;
  }

  if (query.length < 2) {
    return (
      <ComboboxOption
        option={{ value: "No choices to choose from", id: "empty" }}
      />
    );
  }

  if (options.length === 0) {
    return (
      <ComboboxOption
        option={{
          value: `No results found for search term '${query}'`,
          id: "empty",
        }}
      />
    );
  }

  return (
    <>
      {options.map((option) => (
        <ComboboxOption option={option} key={option.id} />
      ))}
    </>
  );
};

const ComboboxOption = ({ option }: { option: ComboxboxFieldOption }) => (
  <Combobox.Option
    value={option.value}
    className={({ active }) =>
      `ctw-relative ctw-cursor-default ctw-select-none ctw-py-2 ctw-pr-4 ctw-pl-10 ${
        active
          ? "ctw-bg-primary-light ctw-text-primary-dark"
          : "ctw-text-content-black"
      }`
    }
  >
    {option.value}
  </Combobox.Option>
);
