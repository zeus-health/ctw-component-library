import {
  SYSTEM_CONDITION_CLINICAL,
  SYSTEM_CONDITION_VERIFICATION_STATUS,
} from "@/fhir/system-urls";
import { Condition } from "fhir/r4";
import { Env } from "..";
import { getFormsConditionsUrl } from "./urls";

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

export const getAutoCompleteConditions = async (
  authToken: string,
  env: Env,
  searchTerm: string
) => {
  const response = await fetch(
    `${getFormsConditionsUrl(env)}?display=${searchTerm}`,
    {
      headers: { Authorization: `Bearer ${authToken}` },
    }
  );
  const data = await response.json();
  return data.conditionsList;
};
