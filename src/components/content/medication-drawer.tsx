import type { DataListEntry } from "../core/data-list";
import type { DrawerProps } from "../core/drawer";
import type { MedicationStatementModel } from "@/fhir/models/medication-statement";
import { DataList, entryFromArray } from "../core/data-list";
import { Drawer } from "../core/drawer";
import { MedicationHistory } from "./medications/medication-history";
import { Loading } from "@/components/core/loading";
import { useLastPrescriber } from "@/fhir/medications";

export type MedicationDrawerProps = {
  medication?: MedicationStatementModel;
} & Pick<DrawerProps, "isOpen" | "onClose">;

function getDataEntriesFromMedicationStatement(
  medication?: MedicationStatementModel,
  lastPrescriber?: string
): DataListEntry[] {
  return medication
    ? [
        { label: "Status", value: medication.status },
        { label: "Last Fill Date", value: medication.lastFillDate },
        { label: "Quantity", value: medication.quantity },
        { label: "Days Supply", value: medication.daysSupply },
        { label: "Refills", value: medication.refills },
        { label: "Instructions", value: medication.dosage },
        { label: "Prescriber", value: lastPrescriber },
        { label: "Last Prescribed Date", value: medication.lastPrescribedDate },
        ...entryFromArray("Note", medication.notesDisplay),
      ]
    : [];
}

export const MedicationDrawer = ({
  medication,
  ...drawerProps
}: MedicationDrawerProps) => {
  const { lastPrescriber, isLoading } = useLastPrescriber(medication?.resource);
  const data = getDataEntriesFromMedicationStatement(
    medication,
    lastPrescriber
  );
  return (
    <Drawer title="Medication Details" {...drawerProps}>
      <Drawer.Body>
        <div className="ctw-space-y-5">
          <div className="ctw-flex ctw-justify-between ctw-space-x-8">
            <h3 className="ctw-m-0 ctw-text-3xl ctw-font-light">
              {medication?.display}
            </h3>
          </div>
          {isLoading && <Loading />}
          {!isLoading && <DataList title="Summary" data={data} />}
          {medication && <MedicationHistory medication={medication} />}
        </div>
      </Drawer.Body>
      <Drawer.Footer>
        <div className="ctw-flex ctw-justify-end">
          <button
            type="button"
            className="ctw-btn-default"
            onClick={drawerProps.onClose}
          >
            Close
          </button>
        </div>
      </Drawer.Footer>
    </Drawer>
  );
};
