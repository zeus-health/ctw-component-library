import { CTWIDContext } from "@/components/core/id-provider";
import Client from "fhir-kit-client";
import { useContext } from "react";

import { searchBuilderRecords, searchLensRecords } from "./search-helpers";

export type ClinicalStatus =
  | "active"
  | "recurrence"
  | "relapse"
  | "inactive"
  | "remission"
  | "resolved";

export type ConditionFilters = {
  "clinical-status"?: ClinicalStatus;
};

export async function getConfirmedConditions(
  fhirClient: Client,
  conditionFilters: ConditionFilters = {}
) {
  const { patientID, systemURL } = useContext(CTWIDContext);
  // console.log("inside getConfirmedMedication");
  try {
    const { resources: conditions } = await searchBuilderRecords(
      "Condition",
      fhirClient,
      {
        patientID,
        ...conditionFilters,
      }
    );
    return conditions.filter(
      (condition) => condition.asserter?.type !== "Patient"
    );
  } catch (e) {
    throw new Error(`Failed fetching condition information for patient: ${e}`);
  }
}

export async function getLensConditions(
  fhirClient: Client,
  conditionFilters: ConditionFilters = {}
) {
  const { patientID, systemURL } = useContext(CTWIDContext);
  // console.log("inside getLensConditions");

  try {
    const { resources: conditions } = await searchLensRecords(
      "Condition",
      fhirClient,
      {
        patientID,
        ...conditionFilters,
      }
    );

    return conditions.filter(
      (condition) => condition.asserter?.type !== "Patient"
    );
  } catch (e) {
    throw new Error(`Failed fetching condition information for patient: ${e}`);
  }
}
