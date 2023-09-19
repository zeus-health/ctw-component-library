import { differenceInDays } from "date-fns";
import { useResourceDetailsDrawer } from "../../resource/resource-details-drawer";
import { EncounterModel } from "@/fhir/models/encounter";
import { parseWithoutFormat } from "@/utils/dates";
import { capitalize } from "@/utils/nodash/fp";

export function usePatientEncounterDetailsDrawer() {
  return useResourceDetailsDrawer({
    header: (m) => {
      if (m.periodStart && m.periodEnd) {
        const parsedStartDate = parseWithoutFormat(m.periodStart);
        const parsedEndDate = parseWithoutFormat(m.periodEnd);

        if (
          parsedStartDate &&
          parsedEndDate &&
          differenceInDays(parsedStartDate, parsedEndDate) === 0
        ) {
          return `${m.periodStart}`;
        }

        return `${m.periodStart} - ${m.periodEnd}`;
      }
      if (m.periodStart) {
        return m.periodStart;
      }
      if (m.periodEnd) {
        return m.periodEnd;
      }
      return undefined;
    },
    subHeader: (m) => m.typeDisplay,
    getSourceDocument: true,
    details: encounterData,
    enableDismissAndReadActions: true,
  });
}

export const encounterData = (encounter: EncounterModel) => [
  { label: "Period Start", value: encounter.periodStart },
  { label: "Period End", value: encounter.periodEnd },
  { label: "Status", value: capitalize(encounter.status) },
  { label: "Class", value: encounter.class },
  { label: "Location", value: encounter.location },
  { label: "Participants", value: encounter.participants },
  { label: "Reason", value: encounter.reason },
  { label: "Diagnoses", value: encounter.diagnoses?.join(", ") },
  { label: "Discharge Disposition", value: encounter.dischargeDisposition },
];
