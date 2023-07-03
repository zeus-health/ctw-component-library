import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TableColumn } from "@/components/core/table/table-helpers";
import { ViewFHIR } from "@/components/core/view-fhir";
import { MedicationStatementModel } from "@/fhir/models";

export const patientMedicationsColumns = (builderId: string, includeViewFhirResource = false) => {
  const medColumns: TableColumn<MedicationStatementModel>[] = [
    {
      title: "Name",
      widthPercent: 35,
      minWidth: 400,
      render: (medication) => (
        <div>
          <div className="ctw-flow-root">
            <span className="group-hover:ctw-underline">{medication.display}</span>
            <span className="ctw-float-right">
              {medication.ownedByBuilder(builderId) ? (
                <FontAwesomeIcon className="ctw-text-content-light" icon={faCircleCheck} />
              ) : (
                <></>
              )}
            </span>
          </div>
          <div>{medication.dosage}</div>
        </div>
      ),
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
  if (includeViewFhirResource) {
    medColumns.push({
      widthPercent: 10,
      minWidth: 200,
      render: (med) => <ViewFHIR name="Medication Resource" resource={med.resource} />,
    });
  }

  return medColumns;
};
