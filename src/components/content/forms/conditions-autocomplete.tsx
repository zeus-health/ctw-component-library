import { getAutoCompleteConditions } from "@/api/autocomplete-conditions";
import { useCTW } from "@/components/core/ctw-provider";
import {
  SYSTEM_CONDITION_CLINICAL,
  SYSTEM_CONDITION_VERIFICATION_STATUS,
} from "@/fhir/system-urls";
import { Condition } from "fhir/r4";
import { InputHTMLAttributes, useState } from "react";
import {
  ComboboxField,
  ComboxboxFieldOption,
} from "../../core/form/combobox-field";

// Sets any autofill values that apply when a user adds a condition, whether creating or confirming.
export function setAddConditionDefaults(condition: Condition): void {
  const addDefaults: Partial<Condition> = {
    clinicalStatus: {
      coding: [
        {
          system: SYSTEM_CONDITION_CLINICAL,
          code: "active",
          display: "Active",
        },
      ],
      text: "active",
    },
    verificationStatus: {
      coding: [
        {
          system: SYSTEM_CONDITION_VERIFICATION_STATUS,
          code: "confirmed",
          display: "Confirmed",
        },
      ],
      text: "confirmed",
    },
  };

  Object.assign(condition, addDefaults);
}

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