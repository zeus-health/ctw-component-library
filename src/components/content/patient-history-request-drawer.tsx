import { useContext } from "react";
import { CTWRequestContext } from "../core/ctw-context";
import {
  DrawerFormWithFields,
  DrawerFormWithFieldsProps,
} from "../core/form/drawer-form-with-fields";
import { CTWPatientContext } from "../core/patient-provider";
import { editPatient, EditPatientFormData } from "./forms/patients";
import {
  getRequestData,
  requestHistorySchema,
} from "./forms/request-history-schema";
import { ActionReturn } from "./forms/types";
import {
  PatientHistoryResponseError,
  schedulePatientHistory,
} from "@/api/patient-history";
import { isFhirError } from "@/fhir/errors";
import { PatientModel } from "@/fhir/models";

type PatientHistoryRequestDrawer<T> = Pick<
  DrawerFormWithFieldsProps<T>,
  "isOpen" | "onClose" | "header"
> & { patient: PatientModel };

export type ScheduleHistoryFormData = {
  npi: string;
  role: string;
  name: string;
};

type OmitMatch<T extends { data: unknown }> = Omit<T, "data"> &
  EditPatientFormData &
  ScheduleHistoryFormData;

export const PatientHistoryRequestDrawer = <T,>({
  patient,
  header,
  isOpen,
  onClose,
}: PatientHistoryRequestDrawer<T>) => {
  const { onPatientSave } = useContext(CTWPatientContext);

  const onPatientSaveAndScheduleHistory = async (
    formResult: {
      success: boolean;
      data: OmitMatch<ActionReturn<unknown>>;
      errors: undefined;
    },
    getRequestContext: () => Promise<CTWRequestContext>
  ) => {
    let onPatientSaveResponse;
    if (onPatientSave) {
      onPatientSaveResponse = await onPatientSave(formResult.data);
    } else {
      onPatientSaveResponse = await editPatient(
        patient,
        formResult,
        getRequestContext
      );
    }

    // TODO: How do we want to handle errors from responses that arent defined by us?
    if (isFhirError(onPatientSaveResponse)) {
      // Return early to show the form errors of failed patient save
      return onPatientSaveResponse;
    }

    const requestContext = await getRequestContext();
    const patientHistoryResponse = await schedulePatientHistory(
      requestContext,
      patient.id,
      formResult.data
    );

    if ("errors" in patientHistoryResponse) {
      const requestErrors = [
        patientHistoryResponse.errors.map(
          (err: PatientHistoryResponseError) => err.details
        ),
      ];
      return new Error(requestErrors.join(","));
    }

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
