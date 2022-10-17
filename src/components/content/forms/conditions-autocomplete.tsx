import { getAutoCompleteConditions } from "@/api/conditions";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ComboboxField } from "./combobox-field";

export type AutoCompleteComboboxProps = {
  authToken: string;
  name: string;
};

export type ConditionsAutoCompleteOption = {
  display: string;
  code: string;
  system: string;
};

export const ConditionsAutoComplete = ({
  authToken,
  name,
}: AutoCompleteComboboxProps) => {
  const [query, setQuery] = useState("");
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

  const handleSelectedConditonChange = (e: any) => {
    setSelectedCondition(
      conditions.data.filter(
        (condition: ConditionsAutoCompleteOption) => condition.display === e
      )[0]
    );
  };

  return (
    <>
      <ComboboxField
        options={options || []}
        query={query}
        setQuery={setQuery}
        handleSelectedConditonChange={handleSelectedConditonChange}
        name={name}
      />
      <input
        name={`${name}Code`}
        defaultValue={selectedCondition?.code}
        hidden
      />
      {/* <input
        name={`${name}System`}
        value={selectedCondition?.id}
        hidden
        readOnly
      /> */}
    </>
  );
};
