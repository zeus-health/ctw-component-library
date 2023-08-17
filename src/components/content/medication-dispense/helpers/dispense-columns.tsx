import { TableColumn } from "@/components/core/table/table-helpers";
import { MedicationDispenseModel } from "@/fhir/models";

export const patientMedicationDispenseColumns = () => {
  const dispenseColumns: TableColumn<MedicationDispenseModel>[] = [
    {
      title: "TimeStamp",
      render: (m) => m.alertTimeStamp,
    },
    {
      title: "Medication",
      render: (m) => m.medicationDisplayName,
    },
    {
      title: "Performer Details",
      render: (m) => m.performerDetails.name,
    },
    {
      title: "Last Known Fill",
      render: (m) => (m.whenHandedOver ? m.whenHandedOver : m.whenPrepared),
    },
  ];

  return dispenseColumns;
};
