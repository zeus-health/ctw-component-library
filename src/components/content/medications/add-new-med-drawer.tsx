import { format } from "date-fns";
import type { MedicationStatement } from "fhir/r4";
import { ReactElement } from "react";
import {
  createMedicationStatement,
  getMedicationFormData,
  medicationStatementSchema,
} from "@/components/content/forms/medications";
import { DrawerFormWithFields } from "@/components/core/form/drawer-form-with-fields";
import { usePatient } from "@/components/core/patient-provider";
import { MedicationStatementModel } from "@/fhir/models/medication-statement";

type Props = {
  isOpen: boolean;
  handleOnClose: () => void;
  children?: ReactElement;
  medication?: MedicationStatement;
};

export const AddNewMedDrawer = ({
  isOpen,
  handleOnClose,
  medication,
  children,
}: Props) => {
  const patient = usePatient();

  const createMedData = getMedicationFormData(
    new MedicationStatementModel(
      medication ?? {
        resourceType: "MedicationStatement",
        status: "active",
        subject: {
          reference: `Patient/${patient.data?.id}`,
          display: patient.data?.display,
        },
        dateAsserted: format(new Date(), "yyyy-MM-dd"),
      }
    )
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
