import { getAutoCompleteConditions } from "@/api/autocomplete-conditions";
import { Env, useCTW } from "@/components/core/ctw-provider";
import {
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
  useEffect,
  useState,
} from "react";
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

const setAutoCompleteConditions = async (
  authToken: string,
  env: Env,
  searchTerm: string,
  setConditions: Dispatch<SetStateAction<fhir4.Coding[] | undefined>>
) => {
  setConditions(await getAutoCompleteConditions(authToken, env, searchTerm));
};

export const ConditionsAutoComplete = ({
  defaultCoding,
  readonly,
  ...inputProps
}: AutoCompleteComboboxProps) => {
  const { authToken, env } = useCTW();
  const [query, setQuery] = useState((inputProps.defaultValue as string) || "");
  const [selectedCoding, setSelectedCoding] = useState<fhir4.Coding>();
  const [conditions, setConditions] = useState<fhir4.Coding[]>();
  const [options, setOptions] = useState<ComboxboxFieldOption[]>();

  useEffect(() => {
    if (query.length > 1) {
      setAutoCompleteConditions(authToken, env, query, setConditions);
    }

    if (conditions) {
      setOptions(
        conditions.map((item: fhir4.Coding) => ({
          value: item.display,
          id: item.code,
        })) as ComboxboxFieldOption[]
      );
    }
  }, [authToken, env, query, conditions]);

  const handleSelectedConditonChange = (eventValue: string) => {
    if (conditions) {
      const currentCondition = conditions.filter(
        (item: fhir4.Coding) => item.display === eventValue
      )[0];
      setSelectedCoding(currentCondition);
    }

    if (conditions?.length) {
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
