import { getAutoCompleteConditions } from "@/api/conditions";
import { useCTW } from "@/components/core/ctw-provider";
import { useQuery } from "@tanstack/react-query";
import { InputHTMLAttributes, useState } from "react";
import { ComboboxField } from "./combobox-field";

export type AutoCompleteComboboxProps = {
  defaultCoding?: fhir4.Coding;
  readonly: boolean | undefined;
} & InputHTMLAttributes<HTMLInputElement>;

export type ConditionsAutoCompleteOption = {
  display: string;
  code: string;
  system: string;
};

export const ConditionsAutoComplete = ({
  defaultCoding,
  readonly,
  ...inputProps
}: AutoCompleteComboboxProps) => {
  const { authToken, env } = useCTW();
  const [query, setQuery] = useState((inputProps.defaultValue as string) || "");
  const [selectedCoding, setSelectedCoding] = useState();

  const conditions = useQuery(
    ["condition-autocomplete", authToken, env, query],
    getAutoCompleteConditions,
    { enabled: !!authToken && query.length > 1 }
  );

  const options = conditions.data?.map(
    (item: ConditionsAutoCompleteOption) => ({
      value: item.display,
      id: item.code,
    })
  );

  const handleSelectedConditonChange = (eventValue: string) => {
    const currentCondition = conditions.data.filter(
      (item: fhir4.Coding) => item.display === eventValue
    )[0];
    setSelectedCoding(currentCondition);

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
        readonly={readonly}
      />
      <input
        hidden
        name={`${inputProps.name}`}
        defaultValue={JSON.stringify(defaultCoding || selectedCoding)}
      />
    </>
  );
};
