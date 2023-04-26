import { TableColumn } from "@/components/core/table/table-helpers";
import { MedicationStatementModel } from "@/fhir/models";

export const patientMedicationColumns: TableColumn<MedicationStatementModel>[] = [
  {
    title: "Medication Name",
    render: (medication) => (
      <>
        <div className="ctw-font-medium group-hover:ctw-underline">{medication.display}</div>
        <div className="ctw-font-light">{medication.dosage}</div>
      </>
    ),
    widthPercent: 35,
    minWidth: 270,
  },
  {
    title: "Dispensed",
    render: (medication) => (
      <div className="ctw-stacked-concat">
        {medication.quantity && <div>{medication.quantity}</div>}
        {medication.refills && <div>{medication.refills} refills</div>}
      </div>
    ),
    widthPercent: 14,
  },
  {
    title: "Last Filled",
    render: (medication) =>
      medication.lastFillDate && (
        <div>
          <span className="ctw-stacked-only">Last Filled: </span>
          {medication.lastFillDate}
        </div>
      ),
    widthPercent: 18,
  },
  {
    title: "Last Prescribed",
    render: (medication) => {
      const { lastPrescribedDate, lastPrescriber } = medication;

      if (!lastPrescribedDate && !lastPrescriber) return null;

      return (
        <div className="ctw-stacked-concat">
          <span className="ctw-stacked-only">Last Prescribed: </span>
          {lastPrescribedDate && <div>{lastPrescribedDate}</div>}
          {lastPrescriber && <div>{lastPrescriber}</div>}
        </div>
      );
    },
    widthPercent: 18,
    minWidth: "90px",
  },
];
