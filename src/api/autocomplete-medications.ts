import { Env } from "..";
import { getFormsMedicationsUrl } from "./urls";

export const getAutoCompleteMedications = async (
  authToken: string,
  env: Env,
  searchTerm: string
) => {
  const response = await fetch(
    `${getFormsMedicationsUrl(env)}?terms=${searchTerm}`,
    {
      headers: { Authorization: `Bearer ${authToken}` },
    }
  );
  const data = await response.json();
  return data.medicationList;
};

export type DosageItem = {
  text: string;
  rxNormCode: string;
};

export const getAutoCompleteMedicationsDosage = async (
  authToken: string,
  env: Env,
  searchTerm: string
): Promise<DosageItem[]> => {
  const response = await fetch(
    `${getFormsMedicationsUrl(env)}/${searchTerm}/dosages`,
    {
      headers: { Authorization: `Bearer ${authToken}` },
    }
  );
  const data = await response.json();
  return data;
};
