import { useResourceDetailsDrawer } from "../../resource/resource-details-drawer";
import { CodingList } from "@/components/core/coding-list";
import { RowActionsProp } from "@/components/core/table/table-rows";
import { EncounterModel } from "@/fhir/models/encounter";
import { capitalize } from "@/utils/nodash/fp";

export function usePatientEncounterDetailsDrawer({
  RowActions,
  enableDismissAndReadActions,
}: {
  RowActions?: RowActionsProp<EncounterModel>;
  enableDismissAndReadActions?: boolean;
}) {
  return useResourceDetailsDrawer({
    header: (m) => `${m.periodStart} - ${m.periodEnd}`,
    subHeader: (m) => m.typeDisplay,
    getSourceDocument: true,
    details: encounterData,
    RowActions,
    enableDismissAndReadActions,
  });
}

export const encounterData = (encounter: EncounterModel) => [
  { label: "Period Start", value: encounter.periodStart },
  { label: "Period End", value: encounter.periodEnd },
  { label: "Status", value: capitalize(encounter.status) },
  { label: "Class", value: encounter.class },
  {
    label: "Type",
    value: encounter.typeCodings.length ? (
      <CodingList codings={encounter.typeCodings} />
    ) : undefined,
  },
  { label: "Location", value: encounter.location },
  { label: "Participants", value: encounter.participants },
  { label: "Reason", value: encounter.reason },
  { label: "Diagnosis", value: encounter.diagnoses?.join(", ") },
  { label: "Discharge Disposition", value: encounter.dischargeDisposition },
];
