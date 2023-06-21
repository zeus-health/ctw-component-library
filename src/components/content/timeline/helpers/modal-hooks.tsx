import { useResourceDetailsDrawer } from "../../resource/resource-details-drawer";
import { CodingList } from "@/components/core/coding-list";
import { EncounterModel } from "@/fhir/models/encounter";
import { useFQSFeatureToggle } from "@/hooks/use-fqs-feature-toggle";
import { capitalize } from "@/utils/nodash/fp";

export function usePatientEncounterDetailsDrawer() {
  const { enabled } = useFQSFeatureToggle("encounters");

  return useResourceDetailsDrawer({
    header: (m) => `${m.periodStart} - ${m.periodEnd}`,
    subHeader: (m) => m.typeDisplay,
    getSourceDocument: true,
    details: encounterData,
    enableFQS: enabled,
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
