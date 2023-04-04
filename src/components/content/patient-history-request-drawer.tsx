import { Dispatch, SetStateAction } from "react";
import { PatientFormData } from "./forms/actions/patients";
import {
  getRequestData,
  requestHistorySchema,
} from "./forms/schemas/request-history-schema";
import {
  DrawerFormWithFields,
  DrawerFormWithFieldsProps,
} from "../core/form/drawer-form-with-fields";
import { CTWRequestContext } from "../core/providers/ctw-context";
import { useHandlePatientSave } from "../core/providers/patient-provider";
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
  patient: PatientModel;
  setClinicalHistoryExists: Dispatch<SetStateAction<boolean | undefined>>;
};

export type ScheduleHistoryFormData = {
  npi: string;
  role: string;
  name: string;
};

export const PatientHistoryRequestDrawer = <T,>({
  patient,
  header,
  isOpen,
  onClose,
  setClinicalHistoryExists,
}: PatientHistoryRequestDrawer<T>) => {
  const onPatientSave = useHandlePatientSave(patient);

  const onPatientSaveAndScheduleHistory = async (
    data: PatientFormData & ScheduleHistoryFormData,
    getRequestContext: () => Promise<CTWRequestContext>
  ) => {
    try {
      await onPatientSave(data);
    } catch (e) {
      const { requestErrors, responseIsSuccess } = getFormResponseErrors(e);
      if (!responseIsSuccess) {
        return new Error(requestErrors.join(","));
      }

      Telemetry.logError(e as Error, "Failed to save patient data.");
      return new Error("Failed to save patient data.");
    }

    const requestContext = await getRequestContext();
    const patientHistoryResponse = await schedulePatientHistory(
      requestContext,
      patient.id,
      data
    );

    if ("errors" in patientHistoryResponse) {
      const requestErrors = [
        patientHistoryResponse.errors.map(
          (err: PatientHistoryResponseError) => err.details
        ),
      ];
      return new Error(requestErrors.join(","));
    }

    await queryClient.invalidateQueries([QUERY_KEY_PATIENT_HISTORY_DETAILS]);

    // patientHistoryResponse has succeeded at this point and should remove empty request history state.
    setClinicalHistoryExists(true);

    return patientHistoryResponse;
  };
  return (
    <DrawerFormWithFields
      header={header}
      title="Request Records"
      action={onPatientSaveAndScheduleHistory}
      data={getRequestData(patient)}
      schema={requestHistorySchema}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};
