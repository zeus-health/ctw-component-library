import { useMedicationHistoryEntries } from "./history";
import { useResourceDetailsDrawer } from "../../resource/resource-details-drawer";
import { entryFromArray } from "@/components/core/data-list";
import { Loading } from "@/components/core/loading";
import { useLastPrescriber } from "@/fhir/medications";
import { MedicationStatementModel } from "@/fhir/models";

export const useMedicationDetailsDrawer = () =>
  useResourceDetailsDrawer({
    header: (medication: MedicationStatementModel) => medication.display,
    getHistory: useMedicationHistoryEntries,
    details: (medication: MedicationStatementModel) => [
      { label: "Status", value: medication.displayStatus },
      { label: "Last Fill Date", value: medication.lastFillDate },
      { label: "Quantity", value: medication.quantity },
      { label: "Days Supply", value: medication.daysSupply },
      { label: "Refills", value: medication.refills },
      { label: "Instructions", value: medication.dosage },
      {
        label: "Prescriber",
        value: <LastPrescriber medication={medication} />,
      },
      { label: "Last Prescribed Date", value: medication.lastPrescribedDate },
      ...entryFromArray("Note", medication.notesDisplay),
    ],
  });

function LastPrescriber({
  medication,
}: {
  medication: MedicationStatementModel;
}) {
  const { lastPrescriber, isLoading } = useLastPrescriber(medication.resource);

  if (isLoading) {
    return (
      <Loading className="ctw-h-3" iconClass="!ctw-w-3 !ctw-h-3" message="" />
    );
  }
  return <span>{lastPrescriber || "n/a"}</span>;
}
