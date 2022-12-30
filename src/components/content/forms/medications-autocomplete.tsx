import { InputHTMLAttributes, useState } from "react";
import {
  ComboboxField,
  ComboxboxFieldOption,
} from "../../core/form/combobox-field";
import { getAutoCompleteMedications } from "@/api/autocomplete-medications";
import { useCTW } from "@/components/core/providers/ctw-provider";

export type AutoCompleteComboboxProps = {
  defaultCoding?: fhir4.Coding;
  readonly: boolean | undefined;
} & InputHTMLAttributes<HTMLInputElement>;

export const MedicationsAutoComplete = ({
  defaultCoding,
  readonly,
  ...inputProps
}: AutoCompleteComboboxProps) => {
  const { getRequestContext } = useCTW();
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<ComboxboxFieldOption[]>();

  const handleSearchChange = async (query: string) => {
    setIsLoading(true);
    const requestContext = await getRequestContext();
    const medications = await getAutoCompleteMedications(requestContext, query);

    if (medications) {
      setOptions(
        medications.map((item: fhir4.Coding) => ({
          value: item,
          label: item.display,
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
      defaultValue={defaultCoding}
    />
  );
};
