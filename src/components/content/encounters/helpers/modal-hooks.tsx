import { differenceInDays } from "date-fns";
import { Notes } from "../../resource/helpers/notes";
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
    renderChild: (m) => m.clinicalNotes.length > 0 && <Notes entries={m.clinicalNotes} />,
  });
}

export const encounterData = (encounter: EncounterModel) => [
  { label: "Start", value: encounter.periodStart },
  { label: "End", value: encounter.periodEnd },
  { label: "Status", value: capitalize(encounter.status) },
  { label: "Class", value: encounter.class },
  { label: "Location", value: encounter.location },
  {
    label: "Providers",
    value: encounter.participants && encounter.participants.length > 0 && (
      <ul className="ctw-m-0 ctw-list-disc ctw-pl-4">
        {encounter.participants.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    ),
  },
  { label: "Reason", value: encounter.reason },
  {
    label: "Diagnoses",
    value: encounter.diagnoses && encounter.diagnoses.length > 0 && (
      <ul className="ctw-m-0 ctw-list-disc ctw-pl-4">
        {encounter.diagnoses.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>
    ),
  },
  { label: "Discharge Disposition", value: encounter.dischargeDisposition },
];
