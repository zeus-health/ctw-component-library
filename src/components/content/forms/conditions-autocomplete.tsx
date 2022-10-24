import { getAutoCompleteConditions } from "@/api/autocomplete-conditions";
import { useCTW } from "@/components/core/ctw-provider";
import { InputHTMLAttributes, useState } from "react";
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
  const [options, setOptions] = useState<ComboxboxFieldOption[]>();

  const handleSearchChange = async (query: string) => {
    const conditions = await getAutoCompleteConditions(authToken, env, query);

    if (conditions) {
      setOptions(
        conditions.map((item: fhir4.Coding) => ({
          value: item,
          label: item.display,
        })) as ComboxboxFieldOption[]
      );
    }
  };

  return (
    <>
      <ComboboxField
        options={options || []}
        name={`${inputProps.name}`}
        defaultSearchTerm={inputProps.defaultValue as string}
        readonly={readonly}
        onSearchChange={handleSearchChange}
        defaultValue={defaultCoding}
      />
    </>
  );
};