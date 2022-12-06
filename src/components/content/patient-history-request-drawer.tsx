import { Dispatch, SetStateAction } from "react";
import { CTWRequestContext } from "../core/ctw-context";
import {
  DrawerFormWithFields,
  DrawerFormWithFieldsProps,
} from "../core/form/drawer-form-with-fields";
import { useHandlePatientSave } from "../core/patient-provider";
import { PatientFormData } from "./forms/patients";
import {
  getRequestData,
  requestHistorySchema,
} from "./forms/request-history-schema";
import {
  PatientHistoryResponseError,
  schedulePatientHistory,
} from "@/api/patient-history";
import { PatientModel } from "@/fhir/models";
import { getFormResponseErrors } from "@/utils/errors";

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
  consent: string;
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
