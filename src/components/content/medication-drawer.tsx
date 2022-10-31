import type { MedicationStatementModel } from "@/models/medication-statement";
import type { DataListEntry } from "../core/data-list";
import { DataList, entryFromArray } from "../core/data-list";
import type { DrawerProps } from "../core/drawer";
import { Drawer } from "../core/drawer";

export type MedicationDrawerProps = {
  medication?: MedicationStatementModel;
} & Pick<DrawerProps, "isOpen" | "onClose">;

function getDataEntriesFromMedicationStatement(
  medication?: MedicationStatementModel
): DataListEntry[] {
  return medication
    ? [
        { label: "Status", value: medication.status },
        { label: "Last Fill Date", value: medication.lastFillDate },
        { label: "Quantity", value: medication.quantity },
        { label: "Days Supply", value: medication.daysSupply },
        { label: "Refills", value: medication.refills },
        { label: "Instructions", value: medication.dosage },
        { label: "Prescriber", value: undefined }, // TODO
        { label: "Last Prescribed Date", value: medication.lastPrescribedDate },
        ...entryFromArray("Note", medication.notesDisplay),
      ]
    : [];
}

export const MedicationDrawer = ({
  medication,
  ...drawerProps
}: MedicationDrawerProps) => {
  const data = getDataEntriesFromMedicationStatement(medication);
  function renderDrawerContentTop() {
    return (
      <div className="ctw-flex ctw-justify-between ctw-space-x-8">
        <span className="ctw-text-3xl">{medication?.display}</span>
      </div>
    );
  }

  return (
    <Drawer title="Medication History" {...drawerProps}>
      <Drawer.Body>
        <div className="ctw-space-y-7">
          {medication && renderDrawerContentTop()}
          <DataList title="Details" data={data} />
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
