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
  "patientID" | "isOpen" | "action" | "onClose" | "header"
>;

export class RequestData {
  get name(): string {
    return "";
  }

  get dateOfBirth(): string {
    return "";
  }

  get npi(): string | undefined {
    return "";
  }

  get role(): string {
    return "";
  }

  get gender(): string {
    return "";
  }

  get zipCode(): string {
    return "";
  }
}

export const PatientHistoryRequestDrawer = <T,>({
  patientID,
  action,
  header,
  isOpen,
  onClose,
}: PatientHistoryRequestDrawer<T>) => {
  console.log("placeholder");
  return (
    <DrawerFormWithFields
      patientID={patientID}
      header={header}
      title="Request Drawer"
      action={action}
      data={getRequestData(new RequestData())}
      schema={requestHistorySchema}
      isOpen={isOpen}
      onClose={() => onClose(false)}
    />
  );
};
