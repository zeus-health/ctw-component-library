import {
  DrawerFormWithFields,
  FormEntry,
} from "@/components/content/forms/drawer-form-with-fields";
import { ReactElement } from "react";
import { usePatient } from "@/components/core/patient-provider";
import {
  createMedicationStatement,
  getMedicationFormData,
  medicationStatementSchema,
} from "@/components/content/forms/medications";
import { MedicationStatementModel } from "@/models/medication-statement";
import { format } from "date-fns";

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
      informationSource: {
        type: "Organization",
        reference: `Organization/${patient.data?.organization?.id}`,
        display: patient.data?.organization?.name,
      },
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
