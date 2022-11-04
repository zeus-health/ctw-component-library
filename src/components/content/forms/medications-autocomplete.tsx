import { useCTW } from "@/components/core/ctw-provider";
import { useState } from "react";
import { getAutoCompleteMedications } from "../../../api/autocomplete-medications";
import {
  ComboboxField,
  ComboxboxFieldOption,
} from "../../core/form/combobox-field";
import { AutoCompleteComboboxProps } from "./conditions-autocomplete";

export type MedicationsAutoCompleteOption = {
  display: string;
  code: string;
  system: string;
  onValueChange?: (value: string) => void;
};

export const MedicationsAutoComplete = ({
  readonly,
  onValueChange,
  ...inputProps
}: AutoCompleteComboboxProps) => {
  const { getRequestContext } = useCTW();
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<ComboxboxFieldOption[]>();

  const handleSearchChange = async (query: string) => {
    setIsLoading(true);
    const { authToken, env } = await getRequestContext();
    const medications = await getAutoCompleteMedications(authToken, env, query);

    if (medications) {
      setOptions(
        medications.map((item: string) => ({
          value: item,
          label: item,
        })) as ComboxboxFieldOption[]
      );
    }

    setIsLoading(false);
  };

  return (
    <ComboboxField
      options={options || []}
      isLoading={isLoading}
      name={`${inputProps.name}`}
      defaultSearchTerm={inputProps.defaultValue as string}
      readonly={readonly}
      onSearchChange={handleSearchChange}
      defaultValue={undefined}
      onValueChange={onValueChange}
    />
  );
};
