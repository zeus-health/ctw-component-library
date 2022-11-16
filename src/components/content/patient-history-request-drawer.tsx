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
  "patientID" | "isOpen" | "action" | "onClose"
>;

const requestData = { name: "", npi: "", role: "" };

export const PatientHistoryRequestDrawer = <T,>({
  patientID,
  action,
  isOpen,
  onClose,
}: PatientHistoryRequestDrawer<T>) => {
  console.log("placeholder");
  return (
    <DrawerFormWithFields
      patientID={patientID}
      title="Request Drawer"
      action={action}
      data={getRequestData(requestData)}
      schema={requestHistorySchema}
      isOpen={isOpen}
      onClose={() => onClose(false)}
    />
  );
};
