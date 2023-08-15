import { TableColumn } from "@/components/core/table/table-helpers";
import { MedicationDispenseModel } from "@/fhir/models";

export const patientMedicationDispenseColumns = () => {
  const immunizationColumns: TableColumn<MedicationDispenseModel>[] = [
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
      title: "Handed Over",
      render: (m) => (
        <div>
          <div>{m.whenHandedOver ? m.whenHandedOver : m.whenPrepared}</div>
        </div>
      ),
    },
    {
      title: "PMARefillNotPickedUp",
      render: (m) => (
        <div>
          <div>{m.PMARefillNotPickedUp}</div>
        </div>
      ),
    },
  ];

  return immunizationColumns;
};
