import { TableColumn } from "@/components/core/table/table-helpers";
import { MedicationDispenseModel } from "@/fhir/models";

export const patientMedicationDispenseColumns = () => {
  const dispenseColumns: TableColumn<MedicationDispenseModel>[] = [
    {
      title: "TimeStamp",
      render: (m) => (
        <div>
          <div>{m.alertTimeStamp}</div>
        </div>
      ),
    },
    {
      title: "Medication",
      render: (m) => (
        <div>
          <div>{m.medicationDisplayName}</div>
        </div>
      ),
    },
    {
      title: "Performer Details",
      render: (m) => (
        <div>
          <div>{m.performerDetails.name}</div>
        </div>
      ),
    },
    {
      title: "Last Known Fill",
      render: (m) => (
        <div>
          <div>{m.whenHandedOver ? m.whenHandedOver : m.whenPrepared}</div>
        </div>
      ),
    },
  ];

  return dispenseColumns;
};
