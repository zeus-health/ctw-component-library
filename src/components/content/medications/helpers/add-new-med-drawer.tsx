import { format } from "date-fns";
import type { MedicationStatement } from "fhir/r4";
import { ReactElement } from "react";
import {
  getMedicationFormData,
  medicationStatementSchema,
} from "../../forms/schemas/medication-schema";
import { createMedicationStatement } from "@/components/content/forms/actions/medications";
import { DrawerFormWithFields } from "@/components/core/form/drawer-form-with-fields";
import { useDrawer } from "@/components/core/providers/drawer-provider";
import { usePatient } from "@/components/core/providers/patient-provider";
import { MedicationStatementModel } from "@/fhir/models/medication-statement";

export function useAddMedicationForm() {
  const { openDrawer } = useDrawer();

  return (medication: MedicationStatementModel) => {
    openDrawer({
      component: (props) => <AddNewMedDrawer medication={medication.resource} {...props} />,
    });
  };
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactElement;
  medication?: MedicationStatement;
};

const AddNewMedDrawer = ({ isOpen, onClose, medication }: Props) => {
  const patient = usePatient();

  const patientSubjectRef = {
    reference: `Patient/${patient.data?.id}`,
    display: patient.data?.display,
  };

  // Create a MedicationStatementModel that can be used to pre-populate the form appropriately.
  let medStatementModelForFormPopulation: MedicationStatementModel;
  // If we're starting from an existing medication, make sure the subject is set correctly
  if (medication) {
    medStatementModelForFormPopulation = new MedicationStatementModel({
      ...medication,
      subject: patientSubjectRef,
      dateAsserted: format(new Date(), "yyyy-MM-dd"),
    });
  } else {
    medStatementModelForFormPopulation = new MedicationStatementModel({
      resourceType: "MedicationStatement",
      status: "active",
      subject: patientSubjectRef,
      dateAsserted: format(new Date(), "yyyy-MM-dd"),
    });
  }

  const createMedData = getMedicationFormData(medStatementModelForFormPopulation);

  return (
    <DrawerFormWithFields
      title="Add Medication"
      action={createMedicationStatement}
      data={createMedData}
      schema={medicationStatementSchema}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};
