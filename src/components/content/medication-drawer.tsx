// noinspection JSXNamespaceValidation

import { Tab } from "@headlessui/react";
import type { MedicationStatementModel } from "@/models/medication-statement";
import { ButtonTabs } from "../core/button-tabs";
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
        // { label: "Status Reason", value: medication.statusReason },
        // { label: "Category", value: medication.category },
        // {
        //   label: "Medication Reference",
        //   value: medication.medicationReference,
        // },
        // { label: "Context", value: medication.context },
        // { label: "Effective Start", value: medication.effectiveStart },
        // { label: "Date Asserted", value: medication.dateAsserted },
        // {
        //   label: "Information Source",
        //   value: medication.informationSourceDisplay,
        // },
        // { label: "Reason", value: medication.reason },
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
  function renderDrawerContentTop() {
    return (
      <div className="ctw-flex ctw-justify-between ctw-space-x-8">
        <span className="ctw-text-3xl">{medication?.display}</span>
      </div>
    );
  }

  return (
    <Drawer title="Medication" {...drawerProps}>
      <Drawer.Body>
        <div className="ctw-space-y-7">
          {medication && renderDrawerContentTop()}

          {/* @todo: Refactor this to not use tabs (only show Overview) */}
          <ButtonTabs tabs={["Overview", "History"]}>
            <Tab.Panels>
              <Tab.Panel>
                <DataList title="Details" data={data} />
              </Tab.Panel>
              <Tab.Panel>
                <MedicationHistory rxNorm={medication?.rxNorm} />
              </Tab.Panel>
            </Tab.Panels>
          </ButtonTabs>
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
