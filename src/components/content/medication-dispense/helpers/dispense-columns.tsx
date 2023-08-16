import { TableColumn } from "@/components/core/table/table-helpers";
import { MedicationDispenseModel } from "@/fhir/models";

export const patientMedicationDispenseColumns = () => {
  const dispenseColumns: TableColumn<MedicationDispenseModel>[] = [
    {
      title: "TimeStamp",
      render: (m) => <div>{m.alertTimeStamp}</div>,
    },
    {
      title: "Medication",
      render: (m) => <div>{m.medicationDisplayName}</div>,
    },
    {
      title: "Performer Details",
      render: (m) => <div>{m.performerDetails.name}</div>,
    },
    {
      title: "Last Known Fill",
      render: (m) => <div>{m.whenHandedOver ? m.whenHandedOver : m.whenPrepared}</div>,
    },
  ];

  return dispenseColumns;
};
