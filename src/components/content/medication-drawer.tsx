import { MedicationStatementModel } from "@/fhir/models/medication-statement";
import { capitalize } from "lodash";
import type { DataListEntry } from "../core/data-list";
import { DataList, entryFromArray } from "../core/data-list";
import type { DrawerProps } from "../core/drawer";
import { Drawer } from "../core/drawer";
import { MedicationHistory } from "./medication-history";
import { useEffect, useState } from "react";
import { useMedicationHistory } from "@/fhir/medications";
import { map, get, filter, last, pipe, sortBy, propEq } from "lodash/fp";
import { MedicationModel } from "@/fhir/models";

export type MedicationDrawerProps = {
  medication?: MedicationStatementModel;
} & Pick<DrawerProps, "isOpen" | "onClose">;

function getDataEntriesFromMedicationStatement(
  medication?: MedicationStatementModel,
  lastPrescriber?: string
): DataListEntry[] {
  return medication
    ? [
        { label: "Status", value: capitalize(medication.status) },
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
  const [lastPrescriber, setLastPrescriber] = useState<string | undefined>();
  const data = getDataEntriesFromMedicationStatement(
    medication,
    lastPrescriber
  );
  const historyQuery = useMedicationHistory(medication?.resource);

  useEffect(() => {
    const { includedResources = {}, medications = [] } =
      historyQuery.data || {};

    if (lastPrescriber === undefined && medications.length) {
      const prescriber = pipe(
        // 1. Get underlying resources from the medication models.
        map(get("resource")),
        // 2. Throw away any resources that are not MedicationRequests.
        filter(propEq("resourceType", "MedicationRequest")),
        // 3. Sort by the authored on date.
        sortBy((m) => Date.parse(m.authoredOn)),
        // 4. If there are med dispense records, make them models.
        map((mr) => new MedicationModel(mr, includedResources)),
        // 5. Take the last (latest) from our filtered list.
        last,
        // 6. Get the prescriber from the medication model.
        get("prescriber")
      )(medications);

      // Fall back to a string, so we don't try to find prescriber again.
      setLastPrescriber(prescriber || "");
    }
  }, [lastPrescriber, historyQuery.data, setLastPrescriber]);

  return (
    <Drawer title="Medication Details" {...drawerProps}>
      <Drawer.Body>
        <div className="ctw-space-y-5">
          <div className="ctw-flex ctw-justify-between ctw-space-x-8">
            <h3 className="ctw-m-0 ctw-text-3xl ctw-font-light">
              {medication?.display || ""}
            </h3>
          </div>
          <DataList title="Summary" data={data} />
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
