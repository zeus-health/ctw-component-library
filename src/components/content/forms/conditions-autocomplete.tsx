import { getAutoCompleteConditions } from "@/api/autocomplete-conditions";
import { useCTW } from "@/components/core/ctw-provider";
import { InputHTMLAttributes, useEffect, useState } from "react";
import {
  ComboboxField,
  ComboxboxFieldOption,
} from "../../core/form/combobox-field";

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
  const [conditions, setConditions] = useState<fhir4.Coding[]>();
  const [options, setOptions] = useState<ComboxboxFieldOption[]>();

  const onSearchChange = async (query: string) => {
    setConditions(await getAutoCompleteConditions(authToken, env, query));
  };

  useEffect(() => {
    if (conditions) {
      setOptions(
        conditions.map((item: fhir4.Coding) => ({
          value: item,
          label: item.display,
        })) as ComboxboxFieldOption[]
      );
    }
  }, [authToken, env, conditions]);

  return (
    <>
      <ComboboxField
        options={options || []}
        name={`${inputProps.name}`}
        defaultSearchTerm={inputProps.defaultValue as string}
        readonly={readonly}
        onSearchChange={onSearchChange}
        defaultValue={defaultCoding}
      />
    </>
  );
};
