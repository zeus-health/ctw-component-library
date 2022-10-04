import { useEffect } from "react";
import SelectField from "./select-field";

export const AutoCompleteSelect = () => {
  useEffect(() => {
    async function load() {
      const response = await fetch(
        "https://api.dev.zusapi.com/forms-data/terminology/conditions?display=b",
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      const data = await response.json();
      console.log("data", data);
    }
    load();
  });

  return <SelectField options={[]} />;
};
