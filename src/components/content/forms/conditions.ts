import { getClaims } from "@/fhir/client";
import { dateToISO } from "@/fhir/formatters";
import { getPractitioner } from "@/fhir/practitioner";
import {
  SYSTEM_CONDITION_CLINICAL,
  SYSTEM_CONDITION_VERIFICATION_STATUS,
  SYSTEM_PRACTITIONER_ID,
  SYSTEM_SNOMED,
} from "@/fhir/system-urls";
import { ConditionModel } from "@/models/conditions";
import { getFormData } from "@/utils/form-helper";
import { queryClient } from "@/utils/request";
import Client from "fhir-kit-client";
import { conditionSchema } from "./condition-schema";

const setRecorderField = async (practitionerId: string, fhirClient: Client) => {
  const practitioner = await getPractitioner(practitionerId, fhirClient);
  const display = practitioner.fullName;

  return {
    reference: `Practitioner/${practitionerId}`,
    type: "Practitioner",
    display,
  };
};

export const createOrEditCondition = async (
  data: FormData,
  patientID: string,
  getCTWFhirClient: () => Promise<Client>
) => {
  const result = await getFormData(data, conditionSchema);

  console.log("result", result);

  if (!result.success) {
    return result;
  }

  console.log("result", result);

  const fhirClient = await getCTWFhirClient();
  const practitionerId = result.data.id
    ? (getClaims(fhirClient)[SYSTEM_PRACTITIONER_ID] as string)
    : "";

  // Some fields will need to be set as they are required.
  const fhirCondition: fhir4.Condition = {
    resourceType: "Condition",
    id: result.data.id,
    ...(practitionerId && {
      recorder: await setRecorderField(practitionerId, fhirClient),
    }),
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
          code: result.data.conditionCode,
          display: result.data.conditionName,
        },
      ],
      text: result.data.conditionName,
    },
    ...(result.data.abatement && {
      abatementDateTime: dateToISO(result.data.abatement),
    }),
    onsetDateTime: dateToISO(result.data.onset),
    recordedDate: dateToISO(new Date()),
    subject: { type: "Patient", reference: `Patient/${patientID}` },
    note: result.data.note ? [{ text: result.data.note }] : undefined,
  };

  const conditionModel = new ConditionModel(fhirCondition);

  // const response = await createOrEditFhirResource({
  //   resourceModel: conditionModel,
  //   fhirClient,
  // });

  // if (isFhirError(response)) {
  //   result.success = false;
  // }

  queryClient.invalidateQueries(["conditions"]);

  return result;
};
