import { DrawerFormWithFields } from "@/components/content/forms/drawer-form-with-fields";
import {
  createMedicationStatement,
  getMedicationFormData,
  medicationStatementSchema,
} from "@/components/content/forms/medications";
import { usePatient } from "@/components/core/patient-provider";
import { MedicationStatementModel } from "@/models/medication-statement";
import { format } from "date-fns";
import { ReactElement } from "react";

type Props = {
  isOpen: boolean;
  handleOnClose: () => void;
  children: ReactElement;
};

export const AddNewMedDrawer = ({ isOpen, handleOnClose, children }: Props) => {
  const patient = usePatient();

  const createMedData = getMedicationFormData(
    new MedicationStatementModel({
      resourceType: "MedicationStatement",
      status: "active",
      subject: {
        reference: `Patient/${patient.data?.id}`,
        display: patient.data?.display,
      },
      dateAsserted: format(new Date(), "yyyy-MM-dd"),
    })
  );

  if (!patient.data?.UPID) {
    return null;
  }

  return (
    <>
      {children}
      <DrawerFormWithFields
        title="Add Medication"
        patientID={patient.data.UPID}
        action={createMedicationStatement}
        data={createMedData}
        schema={medicationStatementSchema}
        isOpen={isOpen}
        onClose={() => handleOnClose()}
      />
    </>
  );
};
