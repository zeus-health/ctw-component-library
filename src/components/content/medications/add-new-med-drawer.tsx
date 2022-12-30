import { format } from "date-fns";
import type { MedicationStatement } from "fhir/r4";
import { ReactElement } from "react";
import {
  getMedicationFormData,
  medicationStatementSchema,
} from "../forms/schemas/medication-schema";
import { createMedicationStatement } from "@/components/content/forms/actions/medications";
import { DrawerFormWithFields } from "@/components/core/form/drawer-form-with-fields";
import { usePatient } from "@/components/core/providers/patient-provider";
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
