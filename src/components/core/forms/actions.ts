import { isFhirError } from "@/fhir/errors";
import { dateToISO } from "@/fhir/formatters";
import {
  SYSTEM_CONDITION_CLINICAL,
  SYSTEM_CONDITION_VERIFICATION_STATUS,
  SYSTEM_SNOMED,
} from "@/fhir/system-urls";
import { ConditionModel } from "@/models/conditions";
import { getFormData } from "@/utils/form-helper";
import Client from "fhir-kit-client";
import { conditionSchema } from "./schemas";

export const action = async (
  formData: FormData,
  formAction: string,
  patientID: string,
  getCTWFhirClient: () => Promise<Client>
) => {
  switch (formAction) {
    case "createCondition":
      return createCondition(formData, patientID, getCTWFhirClient);
    default: {
      throw new Error(`Unexpected action: ${formAction}`);
    }
  }
};

export const createCondition = async (
  data: FormData,
  patientID: string,
  getCTWFhirClient: () => Promise<Client>
) => {
  const result = await getFormData(data, conditionSchema);
  if (!result.success) {
    return result;
  }

  // Some fields will need to be set as they are required.
  const fhirCondition: fhir4.Condition = {
    resourceType: "Condition",
    clinicalStatus: {
      coding: [
        {
          system: SYSTEM_CONDITION_CLINICAL,
          code: result.data.clinicalStatus,
        },
      ],
    },
    verificationStatus: {
      coding: [
        {
          system: SYSTEM_CONDITION_VERIFICATION_STATUS,
          code: result.data.verificationStatus,
        },
      ],
    },
    code: {
      coding: [
        {
          system: SYSTEM_SNOMED,
          code: result.data.snomedCode,
          display: result.data.display,
        },
      ],
      text: result.data.display,
    },
    ...(result.data.abatement && {
      abatementDateTime: dateToISO(result.data.abatement),
    }),
    onsetDateTime: dateToISO(result.data.onset),
    recordedDate: dateToISO(result.data.recordedDate),
    subject: { type: "Patient", reference: `Patient/${patientID}` },
    note: result.data.note ? [{ text: result.data.note }] : undefined,
  };

  const conditionModel = new ConditionModel(fhirCondition);
  const response = await conditionModel.save(getCTWFhirClient);

  if (isFhirError(response)) {
    result.success = false;
  }

  return result;
};
