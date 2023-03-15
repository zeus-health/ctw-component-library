import { TableColumn } from "@/components/core/table/table-helpers";
import { MedicationStatementModel } from "@/fhir/models";

export const patientMedicationColumns: TableColumn<MedicationStatementModel>[] =
  [
    {
      title: "Medication Name",
      render: (medication) => (
        <>
          <div className="ctw-font-medium group-hover:ctw-underline">
            {medication.display}
          </div>
          <div className="ctw-font-light">{medication.dosage}</div>
        </>
      ),
      widthPercent: 35,
      minWidth: 270,
    },
    {
      title: "Dispensed",
      render: (medication) => (
        <>
          {medication.quantity && <div>{medication.quantity}</div>}
          {medication.refills && <div>{medication.refills} refills</div>}
        </>
      ),
      widthPercent: 14,
    },
    {
      title: "Last Filled",
      dataIndex: "lastFillDate",
      widthPercent: 18,
    },
    {
      title: "Last Prescribed",
      render: (medication) => (
        <>
          {medication.lastPrescribedDate && (
            <div>{medication.lastPrescribedDate}</div>
          )}
          {medication.lastPrescriber && <div>{medication.lastPrescriber}</div>}
        </>
      ),
      widthPercent: 18,
      minWidth: "90px",
    },
  ];
