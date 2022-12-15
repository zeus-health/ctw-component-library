import { Env } from "..";
import { getFormsMedicationsUrl } from "./urls";

export const getAutoCompleteMedications = async (
  authToken: string,
  env: Env,
  searchTerm: string
) => {
  const response = await fetch(
    `${getFormsMedicationsUrl(env)}?display=${searchTerm}`,
    {
      headers: { Authorization: `Bearer ${authToken}` },
    }
  );
  const data = await response.json();
  return data.data;
};
