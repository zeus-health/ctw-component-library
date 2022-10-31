import type { MedicationStatementModel } from "@/models/medication-statement";
import type { DataListEntry } from "../core/data-list";
import { DataList, entryFromArray } from "../core/data-list";
import type { DrawerProps } from "../core/drawer";
import { Drawer } from "../core/drawer";
import { MedicationHistory } from "./medication-history";

export type MedicationDrawerProps = {
  medication?: MedicationStatementModel;
} & Pick<DrawerProps, "isOpen" | "onClose">;

function getDataEntriesFromMedicationStatement(
  medication?: MedicationStatementModel
): DataListEntry[] {
  return medication
    ? [
        { label: "Status", value: medication.status },
        { label: "Dosage", value: medication.dosage },
        ...entryFromArray("Note", medication.notesDisplay),
      ]
    : [];
}

export const MedicationDrawer = ({
  medication,
  ...drawerProps
}: MedicationDrawerProps) => {
  const data = getDataEntriesFromMedicationStatement(medication);
  return (
    <Drawer title="Medication Details" {...drawerProps}>
      <Drawer.Body>
        <div className="ctw-space-y-7">
          <div className="ctw-flex ctw-justify-between ctw-space-x-8">
            <span className="ctw-text-3xl">{medication?.display || ""}</span>
          </div>
          <DataList title="Details" data={data} />
          {medication?.rxNorm && (
            <MedicationHistory rxNorm={medication.rxNorm} />
          )}
        </div>
      </Drawer.Body>
      <Drawer.Footer>
        <div className="ctw-flex ctw-justify-end">
          <button
            type="button"
            className="btn-primary"
            onClick={drawerProps.onClose}
          >
            Close
          </button>
        </div>
      </Drawer.Footer>
    </Drawer>
  );
};
