import { getAutoCompleteConditions } from "@/api/conditions";
import { useCTW } from "@/components/core/ctw-provider";
import { useQuery } from "@tanstack/react-query";
import { InputHTMLAttributes, useState } from "react";
import { ComboboxField } from "./combobox-field";

export type AutoCompleteComboboxProps = {
  readonly: boolean | undefined;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
} & InputHTMLAttributes<HTMLInputElement>;

export type ConditionsAutoCompleteOption = {
  display: string;
  code: string;
  system: string;
};

export const ConditionsAutoComplete = ({
  readonly,
  ...inputProps
}: AutoCompleteComboboxProps) => {
  const { authToken, env } = useCTW();
  const [query, setQuery] = useState((inputProps.defaultValue as string) || "");
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

  const handleSelectedConditonChange = (eventValue: string) => {
    const currentCondition = conditions.data.filter(
      (condition: ConditionsAutoCompleteOption) =>
        condition.display === eventValue
    )[0];
    setSelectedCondition(currentCondition);

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
        name={`${inputProps.name}` as string}
        readonly={readonly}
      />
      <input
        hidden
        name={`${inputProps.name}`}
        value={JSON.stringify(selectedCondition)}
      />

      {/* <input
        name={`${inputProps.name}`}
        value={selectedCondition?.code}
        hidden
        readOnly
      />
      <input
        name={`${inputProps.name}`}
        value={selectedCondition?.system}
        hidden
        readOnly
      /> */}
    </>
  );
};
