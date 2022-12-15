import { format } from "date-fns";
import { ReactElement } from "react";
import { createMedicationStatement } from "@/components/content/forms/actions/medications";
import { DrawerFormWithFields } from "@/components/core/form/drawer-form-with-fields";
import { usePatient } from "@/components/core/patient-provider";
import { MedicationStatementModel } from "@/fhir/models/medication-statement";
import {
  getMedicationFormData,
  medicationStatementSchema,
} from "../forms/schemas/medication-schema";

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
        action={createMedicationStatement}
        data={createMedData}
        schema={medicationStatementSchema}
        isOpen={isOpen}
        onClose={() => handleOnClose()}
      />
    </>
  );
};
