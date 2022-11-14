import type { MedicationStatementModel } from "@/models/medication-statement";
import { capitalize } from "lodash";
import type { DataListEntry } from "../core/data-list";
import { DataList, entryFromArray } from "../core/data-list";
import type { DrawerProps } from "../core/drawer";
import { Drawer } from "../core/drawer";
import { MedicationHistory } from "./medication-history";

export type MedicationDrawerProps = {
  medication?: MedicationStatementModel;
  title?: string;
} & Pick<DrawerProps, "isOpen" | "onClose">;

function getDataEntriesFromMedicationStatement(
  medication?: MedicationStatementModel
): DataListEntry[] {
  return medication
    ? [
        { label: "Status", value: capitalize(medication.status) },
        { label: "Last Fill Date", value: medication.lastFillDate },
        { label: "Quantity", value: medication.quantity },
        { label: "Days Supply", value: medication.daysSupply },
        { label: "Refills", value: medication.refills },
        { label: "Instructions", value: medication.dosage },
        { label: "Prescriber", value: medication.lastPrescriber },
        { label: "Last Prescribed Date", value: medication.lastPrescribedDate },
        ...entryFromArray("Note", medication.notesDisplay),
      ]
    : [];
}

export const MedicationDrawer = ({
  medication,
  title = "Medication Details",
  ...drawerProps
}: MedicationDrawerProps) => {
  const data = getDataEntriesFromMedicationStatement(medication);
  return (
    <Drawer title={title} {...drawerProps}>
      <Drawer.Body>
        <div className="ctw-space-y-7">
          <div className="ctw-flex ctw-justify-between ctw-space-x-8">
            <span className="ctw-text-3xl">{medication?.display || ""}</span>
          </div>
          <DataList title="Summary" data={data} />
          {medication?.rxNorm && <MedicationHistory medication={medication} />}
        </div>
      </Drawer.Body>
      <Drawer.Footer>
        <div className="ctw-flex ctw-justify-end">
          <button
            type="button"
            className="ctw-btn-primary"
            onClick={drawerProps.onClose}
          >
            Close
          </button>
        </div>
      </Drawer.Footer>
    </Drawer>
  );
};
