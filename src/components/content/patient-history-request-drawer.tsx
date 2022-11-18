import { getPatientHistoryMessages } from "@/api/patient-history";
import { PatientModel } from "@/fhir/models";
import { useEffect } from "react";
import { useCTW } from "../core/ctw-provider";
import {
  DrawerFormWithFields,
  DrawerFormWithFieldsProps,
} from "../core/form/drawer-form-with-fields";
import {
  getRequestData,
  requestHistorySchema,
} from "./forms/request-history-schema";

type PatientHistoryRequestDrawer<T> = Pick<
  DrawerFormWithFieldsProps<T>,
  "isOpen" | "action" | "onClose" | "header"
> & { patient: PatientModel };

export const PatientHistoryRequestDrawer = <T,>({
  patient,
  action,
  header,
  isOpen,
  onClose,
}: PatientHistoryRequestDrawer<T>) => {
  const { getRequestContext } = useCTW();

  useEffect(() => {
    async function fetchHistory() {
      const requestContext = await getRequestContext();
      const response = await getPatientHistoryMessages(
        requestContext,
        patient.id
      );
    }

    // fetchHistory();
  }, []);

  return (
    <DrawerFormWithFields
      patientID={patient.id}
      header={header}
      title="Request Drawer"
      action={action}
      data={getRequestData(patient)}
      schema={requestHistorySchema}
      isOpen={isOpen}
      onClose={() => onClose()}
    />
  );
};
