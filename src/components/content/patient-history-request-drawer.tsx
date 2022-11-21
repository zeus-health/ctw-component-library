import { PatientModel } from "@/fhir/models";
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
}: PatientHistoryRequestDrawer<T>) => (
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
