import { Combobox } from "@headlessui/react";
import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";

export type AutoCompleteSelectProps = {
  authToken: string;
};

export const AutoCompleteSelect = ({ authToken }: AutoCompleteSelectProps) => {
  const [options, setOptions] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState();

  const [query, setQuery] = useState("");

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setQuery(event.target.value);

  const debouncedSearchInputChange = useMemo(
    () => debounce(handleSearchInputChange, 300),
    []
  );

  useEffect(() => {
    async function load() {
      const response = await fetch(
        `https://api.dev.zusapi.com/forms-data/terminology/conditions?display=${query}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      const data = await response.json();
      console.log("data", data);
      setOptions(data.conditionsList);
    }
    if (query.length > 1) {
      load();
    }

    return () => {
      debouncedSearchInputChange.cancel();
    };
  }, [query, authToken, debouncedSearchInputChange]);

  return (
    <Combobox value={selectedPerson} onChange={setSelectedPerson}>
      <Combobox.Input
        className="ctw-listbox-input ctw-w-full"
        onChange={debouncedSearchInputChange}
      />
      <Combobox.Options className="ctw-listbox ctw-max-h-60 ctw-overflow-auto ctw-rounded-md ctw-bg-white ctw-py-1 ctw-text-base ctw-shadow-lg ctw-ring-1 ctw-ring-black ctw-ring-opacity-5 focus:ctw-outline-none sm:ctw-text-sm">
        {options.length !== 0 && (
          <>
            {options.map((option) => (
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
            ))}
          </>
        )}
      </Combobox.Options>
    </Combobox>
  );
};
