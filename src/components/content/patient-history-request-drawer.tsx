import { Dispatch, SetStateAction } from "react";
import {
  DrawerFormWithFields,
  DrawerFormWithFieldsProps,
} from "../core/form/drawer-form-with-fields";
import { CTWRequestContext } from "../core/providers/ctw-context";
import {
  useHandlePatientSave,
  usePatientContext,
} from "../core/providers/patient-provider";
import { PatientFormData } from "./forms/actions/patients";
import {
  getRequestData,
  requestHistorySchema,
  savePatientAndRequestHistorySchema,
} from "./forms/schemas/request-history-schema";
import {
  PatientHistoryResponseError,
  schedulePatientHistory,
} from "@/api/patient-history";
import { PatientModel } from "@/fhir/models";
import { getFormResponseErrors } from "@/utils/errors";
import { QUERY_KEY_PATIENT_HISTORY_DETAILS } from "@/utils/query-keys";
import { queryClient } from "@/utils/request";
import { Telemetry } from "@/utils/telemetry";

type PatientHistoryRequestDrawer<T> = Pick<
  DrawerFormWithFieldsProps<T>,
  "isOpen" | "onClose" | "header"
> & {
  includePatientDemographicsForm?: boolean;
  patient?: PatientModel;
  setClinicalHistoryExists: Dispatch<SetStateAction<boolean | undefined>>;
};

export type ScheduleHistoryFormData = {
  npi: string;
  name: string;
  role: string;
  id?: string;
};

export const PatientHistoryRequestDrawer = <T,>({
  patient,
  header,
  isOpen,
  onClose,
  setClinicalHistoryExists,
  includePatientDemographicsForm = false,
}: PatientHistoryRequestDrawer<T>) => {
  const onPatientSave = useHandlePatientSave(patient);
  const { patientID, systemURL } = usePatientContext();

  const onScheduleHistory = async (
    data: ScheduleHistoryFormData,
    getRequestContext: () => Promise<CTWRequestContext>
  ) => {
    const requestContext = await getRequestContext();
    // Patient Identifiers are required for the pt hx proxy (ehr-data-hooks)
    const patientIdentifiers = { id: patient?.id, systemURL, patientID };
    const patientHistoryResponse = await schedulePatientHistory(
      requestContext,
      patientIdentifiers,
      data
    );

    if ("errors" in patientHistoryResponse) {
      const requestErrors = [
        patientHistoryResponse.errors.map(
          (err: PatientHistoryResponseError) => err.details
        ),
      ];
      return new Error(requestErrors.join(", "));
    }

    await queryClient.invalidateQueries([QUERY_KEY_PATIENT_HISTORY_DETAILS]);

    // patientHistoryResponse has succeeded at this point and should remove empty request history state.
    setClinicalHistoryExists(true);

    return patientHistoryResponse;
  };

  const onPatientSaveAndScheduleHistory = async (
    data: PatientFormData & ScheduleHistoryFormData,
    getRequestContext: () => Promise<CTWRequestContext>
  ) => {
    try {
      await onPatientSave(data);
      return onScheduleHistory(data, getRequestContext);
    } catch (e) {
      const { requestErrors, responseIsSuccess } = getFormResponseErrors(e);
      if (!responseIsSuccess) {
        return new Error(requestErrors.join(", "));
      }

      Telemetry.logError(e as Error, "Failed to save patient data");
      return new Error("Failed to save patient data");
    }
  };

  const action = includePatientDemographicsForm
    ? onPatientSaveAndScheduleHistory
    : onScheduleHistory;
  const schema = includePatientDemographicsForm
    ? savePatientAndRequestHistorySchema
    : requestHistorySchema;

  return (
    <DrawerFormWithFields
      header={header}
      title="Request Records"
      action={action}
      data={getRequestData(patient, includePatientDemographicsForm)}
      schema={schema}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};
