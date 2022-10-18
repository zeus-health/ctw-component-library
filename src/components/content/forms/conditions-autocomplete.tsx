import { getAutoCompleteConditions } from "@/api/conditions";
import { useCTW } from "@/components/core/ctw-provider";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ComboboxField } from "./combobox-field";

export type AutoCompleteComboboxProps = {
  name: string;
  defaultValue: string | undefined;
};

export type ConditionsAutoCompleteOption = {
  display: string;
  code: string;
  system: string;
};

export const ConditionsAutoComplete = ({
  name,
  defaultValue,
}: AutoCompleteComboboxProps) => {
  const { authToken, env } = useCTW();
  const [query, setQuery] = useState(defaultValue || "");
  const [selectedCondition, setSelectedCondition] = useState<
    ConditionsAutoCompleteOption | undefined
  >({
    display: "",
    code: "",
    system: "",
  });
  const conditions = useQuery(
    ["condition-autocomplete", authToken, env, query],
    getAutoCompleteConditions,
    { enabled: !!authToken && query.length > 1 }
  );

  const options = conditions.data?.map(
    (condition: ConditionsAutoCompleteOption) => ({
      value: condition.display,
      id: condition.code,
    })
  );

  useEffect(() => {
    /* This handles the case where a user goes to an existing condition that has already been added but doesn't exist
       in our search, so we clear the input so that the user does not try adding a condition that doesnt exist. */
    if (conditions.data && !conditions.data.length && query === defaultValue) {
      setQuery("");
    }
  }, [conditions.data, defaultValue, query]);

  const handleSelectedConditonChange = (eventValue: string) => {
    setSelectedCondition(
      conditions.data.filter(
        (condition: ConditionsAutoCompleteOption) =>
          condition.display === eventValue
      )[0]
    );
    if (conditions.data.length) {
      setQuery(eventValue);
    }
  };

  return (
    <>
      <ComboboxField
        options={options || []}
        query={query}
        setQuery={setQuery}
        handleSelectChange={handleSelectedConditonChange}
        name={name}
      />
      <input
        name={`${name}Code`}
        defaultValue={selectedCondition?.code}
        hidden
      />
      <input
        name={`${name}System`}
        value={selectedCondition?.system}
        hidden
        readOnly
      />
    </>
  );
};
