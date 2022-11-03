import {
  DrawerFormWithFields,
  FormEntry,
} from "@/components/content/forms/drawer-form-with-fields";
import {
  createMedicationStatement,
  getAddMedicationData,
  medicationStatementSchema,
} from "@/components/content/forms/medications";
import { usePatient } from "@/components/core/patient-provider";
import { MedicationStatementModel } from "@/models/medication-statement";
import { format } from "date-fns";
import { ReactElement, useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  handleOnClose: () => void;
  children: ReactElement;
};

export const AddNewMedDrawer = ({ isOpen, handleOnClose, children }: Props) => {
  const patient = usePatient();
  const [currentSelectedData, setCurrentlySelectedData] =
    useState<FormEntry[]>();

  useEffect(() => {
    const createMedData = getAddMedicationData({
      medication: new MedicationStatementModel({
        resourceType: "MedicationStatement",
        status: "active",
        subject: {
          reference: `Patient/${patient.data?.id}`,
          display: patient.data?.display,
        },
        dateAsserted: format(new Date(), "yyyy-MM-dd"),
      }),
    });

    setCurrentlySelectedData(createMedData);
  }, [patient.data?.display, patient.data?.id]);

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
        data={currentSelectedData}
        schema={medicationStatementSchema}
        isOpen={isOpen}
        onClose={() => handleOnClose()}
      />
    </>
  );
};
