import { Combobox } from "@headlessui/react";
import { debounce } from "lodash";
import React, { useEffect, useMemo } from "react";

export type ComboboxFieldProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  options: any; // TODO: update this
  name: string;
};

export const ComboboxField = ({
  options,
  query,
  setQuery,
  name,
}: ComboboxFieldProps) => {
  console.log("options", options);
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
    <Combobox>
      <Combobox.Input
        className="ctw-listbox-input ctw-w-full"
        onChange={debouncedSearchInputChange}
        placeholder="Type to search"
        name={name}
      />
      <input name={`${name}-code`} value="" hidden />
      <Combobox.Options className="ctw-listbox ctw-max-h-60 ctw-overflow-auto ctw-rounded-md ctw-bg-white ctw-py-1 ctw-text-base ctw-shadow-lg ctw-ring-1 ctw-ring-black ctw-ring-opacity-5 focus:ctw-outline-none sm:ctw-text-sm">
        <RenderCorrectOptions options={options || []} query={query} />
      </Combobox.Options>
    </Combobox>
  );
};

const RenderCorrectOptions = ({ options, query }) => {
  if (query.length === 0) {
    return (
      <ComboboxOption option={{ display: "Type to search", code: "empty" }} />
    );
  }

  if (query.length < 2) {
    return (
      <ComboboxOption
        option={{ display: "No choices to choose from", code: "empty" }}
      />
    );
  }

  if (options.length === 0) {
    return (
      <ComboboxOption
        option={{
          display: `No results found for search term '${query}'`,
          code: "empty",
        }}
      />
    );
  }

  return (
    <>
      {options.map((option) => (
        <ComboboxOption option={option} />
      ))}
    </>
  );
};

const ComboboxOption = ({ option }) => (
  <Combobox.Option
    key={option.code}
    value={option.display}
    className={({ active }) =>
      `ctw-relative ctw-cursor-default ctw-select-none ctw-py-2 ctw-pr-4 ctw-pl-10 ${
        active
          ? "ctw-bg-primary-light ctw-text-primary-dark"
          : "ctw-text-content-black"
      }`
    }
  >
    {option.display}
  </Combobox.Option>
);
