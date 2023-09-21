import { useMedicationHistoryEntries } from "./history";
import { History } from "../../resource/helpers/history";
import { useResourceDetailsDrawer } from "../../resource/resource-details-drawer";
import { entryFromArray } from "@/components/core/data-list";
import { Loading } from "@/components/core/loading";
import { RowActionsProp } from "@/components/core/table/table-rows";
import { useLastPrescriber } from "@/fhir/medications";
import { MedicationStatementModel } from "@/fhir/models";

const medicationHistory = (m: MedicationStatementModel) => (
  <History getHistory={useMedicationHistoryEntries} model={m} />
);

export const useMedicationDetailsDrawer = ({
  RowActions,
  enableDismissAndReadActions,
}: {
  RowActions?: RowActionsProp<MedicationStatementModel>;
  enableDismissAndReadActions?: boolean;
}) =>
  useResourceDetailsDrawer({
    header: (medication: MedicationStatementModel) => medication.display,
    children: medicationHistory,
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
    RowActions,
    enableDismissAndReadActions,
  });

function LastPrescriber({ medication }: { medication: MedicationStatementModel }) {
  const { lastPrescriber, isLoading } = useLastPrescriber(medication.resource);

  if (isLoading) {
    return <Loading className="ctw-h-3" iconClass="!ctw-w-3 !ctw-h-3" message="" />;
  }
  return <span>{lastPrescriber || "n/a"}</span>;
}
