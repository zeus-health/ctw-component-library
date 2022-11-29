import {
  DrawerFormWithFields,
  DrawerFormWithFieldsProps,
} from "../core/form/drawer-form-with-fields";
import {
  getRequestData,
  requestHistorySchema,
} from "./forms/request-history-schema";
import { PatientModel } from "@/fhir/models";

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
}: PatientHistoryRequestDrawer<T>) => (
  <DrawerFormWithFields
    patientID={patient.id}
    header={header}
    title="Request Records"
    action={action}
    data={getRequestData(patient)}
    schema={requestHistorySchema}
    isOpen={isOpen}
    onClose={onClose}
  />
);
