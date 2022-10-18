import { getAutoCompleteConditions } from "@/api/conditions";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ComboboxField } from "./combobox-field";

export type AutoCompleteComboboxProps = {
  authToken: string;
  name: string;
  value: string | undefined;
};

export type ConditionsAutoCompleteOption = {
  display: string;
  code: string;
  system: string;
};

export const ConditionsAutoComplete = ({
  authToken,
  name,
  value,
}: AutoCompleteComboboxProps) => {
  const [query, setQuery] = useState(value || "");
  const [selectedCondition, setSelectedCondition] = useState<
    ConditionsAutoCompleteOption | undefined
  >({
    display: "",
    code: "",
    system: "",
  });
  const conditions = useQuery(
    ["condition-autocomplete", authToken, query],
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
    if (conditions.data && !conditions.data.length) {
      setQuery("");
    }
  }, [conditions.data]);

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
