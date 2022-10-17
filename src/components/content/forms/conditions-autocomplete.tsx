import { getAutoCompleteConditions } from "@/api/conditions";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ComboboxField } from "./combobox-field";

export type AutoCompleteComboboxProps = {
  authToken: string;
  name: string;
};

export const ConditionsAutoComplete = ({
  authToken,
  name,
}: AutoCompleteComboboxProps) => {
  const [query, setQuery] = useState("");
  const conditions = useQuery(
    ["condition-autocomplete", authToken, query],
    getAutoCompleteConditions,
    { enabled: !!authToken && query.length > 1 }
  );

  return (
    <ComboboxField
      options={conditions.data}
      query={query}
      setQuery={setQuery}
      name={name}
    />
  );
};
