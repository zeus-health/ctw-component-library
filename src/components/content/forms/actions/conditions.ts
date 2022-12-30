import { Condition } from "fhir/r4";
import { cloneDeep, isUndefined, omitBy } from "lodash";
import { ConditionStatus } from "../types";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { createOrEditFhirResource } from "@/fhir/action-helper";
import { dateToISO } from "@/fhir/formatters";
import { ConditionModel } from "@/fhir/models/condition";
import { getUsersPractitionerReference } from "@/fhir/practitioner";
import {
  SYSTEM_CONDITION_CATEGORY,
  SYSTEM_CONDITION_CLINICAL,
  SYSTEM_CONDITION_VERIFICATION_STATUS,
} from "@/fhir/system-urls";
import {
  QUERY_KEY_OTHER_PROVIDER_CONDITIONS,
  QUERY_KEY_PATIENT_CONDITIONS,
} from "@/utils/query-keys";
import { queryClient } from "@/utils/request";

// Sets any autofill values that apply when a user adds a condition, whether creating or confirming.
export function getAddConditionWithDefaults(condition: Condition): Condition {
  const newCondition = cloneDeep(condition);

  return newCondition;
}

export const getClincalAndVerificationStatus = (status: ConditionStatus) => {
  let verificationStatus = "";
  let clinicalStatus = "";

  switch (status) {
    case "Active":
      verificationStatus = "confirmed";
      clinicalStatus = "active";
      break;
    case "Inactive":
      verificationStatus = "confirmed";
      clinicalStatus = "inactive";
      break;
    case "Pending":
      verificationStatus = "unconfirmed";
      clinicalStatus = "active";
      break;
    case "Refuted":
      verificationStatus = "refuted";
      clinicalStatus = "inactive";
      break;
    case "Entered In Error":
      verificationStatus = "entered-in-error";
      break;
    default:
      throw Error("status is should be of type ConditionStatus");
  }

  return omitBy(
    {
      verificationStatus: {
        coding: [
          {
            system: SYSTEM_CONDITION_VERIFICATION_STATUS,
            code: verificationStatus,
          },
        ],
      },
      ...(clinicalStatus && {
        clinicalStatus: {
          coding: [{ system: SYSTEM_CONDITION_CLINICAL, code: clinicalStatus }],
        },
      }),
    },
    isUndefined
  );
};

export const createOrEditCondition = async (
  condition: ConditionModel | undefined,
  patientID: string,
  data: CreateOrEditConditionFormData,
  getRequestContext: () => Promise<CTWRequestContext>
): Promise<unknown> => {
  const requestContext = await getRequestContext();

  // Defines the properties of the condition based on the form.
  // The autofill values that apply to both edits and creates are here; including Practitioner, Recorder, Patient, and Recorded date.
  const fhirCondition: fhir4.Condition = {
    resourceType: "Condition",
    id: data.id,
    recorder: await getUsersPractitionerReference(requestContext),
    ...getClincalAndVerificationStatus(data.status),
    // Set category to problem list when creating a condition.
    category:
      data.id && condition
        ? condition.resource.category
        : [
            {
              coding: [
                {
                  system: SYSTEM_CONDITION_CATEGORY,
                  code: "problem-list-item",
                  display: "Problem List Item",
                },
              ],
            },
          ],
    // Keep all existing codings when editing a condition.
    code:
      data.id && condition
        ? condition.codings
        : {
            coding: [
              {
                system: data.condition.system,
                code: data.condition.code,
                display: data.condition.display,
              },
            ],
            text: data.condition.display,
          },
    ...(data.abatement && {
      abatementDateTime: dateToISO(data.abatement),
    }),
    onsetDateTime: dateToISO(data.onset),
    recordedDate: dateToISO(new Date()),
    subject: { type: "Patient", reference: `Patient/${patientID}` },
    note: data.note ? [{ text: data.note }] : undefined,
  };

  const response = await createOrEditFhirResource(
    fhirCondition,
    requestContext
  );

  await Promise.all([
    queryClient.invalidateQueries([QUERY_KEY_PATIENT_CONDITIONS]),
    queryClient.invalidateQueries([QUERY_KEY_OTHER_PROVIDER_CONDITIONS]),
  ]);

  return response;
};

export type CreateOrEditConditionFormData = {
  id?: string;
  status: ConditionStatus;
  condition: fhir4.Coding;
  abatement?: Date;
  onset: Date;
  note?: string;
};
