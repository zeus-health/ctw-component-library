import { Env } from "..";
import { getFormsConditionsUrl } from "./urls";

export const setAutoCompleteConditions = async (
  authToken: string,
  env: Env,
  searchTerm: string,
  setConditions: React.Dispatch<
    React.SetStateAction<fhir4.Coding[] | undefined>
  >
) => {
  const response = await fetch(
    `${getFormsConditionsUrl(env)}?display=${searchTerm}`,
    {
      headers: { Authorization: `Bearer ${authToken}` },
    }
  );
  const data = await response.json();
  setConditions(data.conditionsList);
};
