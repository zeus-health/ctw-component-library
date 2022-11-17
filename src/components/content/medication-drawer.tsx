import { MedicationStatementModel } from "@/fhir/models/medication-statement";
import { capitalize } from "lodash";
import type { DataListEntry } from "../core/data-list";
import { DataList, entryFromArray } from "../core/data-list";
import type { DrawerProps } from "../core/drawer";
import { Drawer } from "../core/drawer";
import { MedicationHistory } from "./medication-history";
import { useEffect, useState } from "react";
import { useMedicationHistory } from "@/fhir/medications";
import { map, get, set, filter, last, pipe, sortBy, propEq } from "lodash/fp";
import { MedicationModel } from "@/fhir/models";

export type MedicationDrawerProps = {
  medication: MedicationStatementModel;
} & Pick<DrawerProps, "isOpen" | "onClose">;

function getDataEntriesFromMedicationStatement(
  medication: MedicationStatementModel
): DataListEntry[] {
  return [
    { label: "Status", value: capitalize(medication.status) },
    { label: "Last Fill Date", value: medication.lastFillDate },
    { label: "Quantity", value: medication.quantity },
    { label: "Days Supply", value: medication.daysSupply },
    { label: "Refills", value: medication.refills },
    { label: "Instructions", value: medication.dosage },
    { label: "Prescriber", value: medication.lastPrescriber },
    { label: "Last Prescribed Date", value: medication.lastPrescribedDate },
    ...entryFromArray("Note", medication.notesDisplay),
  ];
}

export const MedicationDrawer = ({
  medication,
  ...drawerProps
}: MedicationDrawerProps) => {
  const [data, setData] = useState(
    getDataEntriesFromMedicationStatement(medication)
  );
  const medHistoryQuery = useMedicationHistory(medication.resource);

  useEffect(() => {
    const hasPrescriber = data.some(
      (entry) => entry.label === "Prescriber" && !!entry.value
    );
    if (medHistoryQuery.data && !hasPrescriber) {
      const { includedResources, medications } = medHistoryQuery.data;

      const medRequest = pipe(
        // 1. get underlying resources from the medication models
        map(get("resource")),
        // 2. throw away any resources that are not MedicationRequests
        filter(propEq("resourceType", "MedicationRequest")),
        // 3. sort by the authored on date
        sortBy(m => Date.parse(m.authoredOn)),
        // 4. take the last item from the list
        last
      )(medications);

      const { prescriber } = new MedicationModel(medRequest, includedResources);

      if (prescriber) {
        // Only rebuild the data entries if we have found the prescriber
        setData(
          data.map((entry) => {
            if (entry.label === "Prescriber") {
              return set("value", prescriber, entry);
            }
            return entry;
          })
        );
      }
    }
  }, [medHistoryQuery.data, medication, setData, data]);

  return (
    <Drawer title="Medication Details" {...drawerProps}>
      <Drawer.Body>
        <div className="ctw-space-y-5">
          <div className="ctw-flex ctw-justify-between ctw-space-x-8">
            <h3 className="ctw-m-0 ctw-text-3xl ctw-font-light">
              {medication.display || ""}
            </h3>
          </div>
          <DataList title="Summary" data={data} />
          <MedicationHistory medication={medication} />
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
