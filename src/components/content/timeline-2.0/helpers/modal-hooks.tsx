import { MedicationDrawer } from "../../medications/history/medication-drawer";
import { useResourceDetailsDrawer } from "../../resource/resource-details-drawer";
import { CodingList } from "@/components/core/coding-list";
import { DrawerProps } from "@/components/core/drawer";
import { useDrawer } from "@/components/core/providers/drawer-provider";
import { MedicationDispenseModel } from "@/fhir/models";
import { EncounterModel } from "@/fhir/models/encounter";
import { MedicationRequestModel } from "@/fhir/models/medication-request";
import { useQueryMedicationStatement } from "@/hooks/use-medications";
import { capitalize } from "@/utils/nodash/fp";

export function usePatientEncounterDetailsDrawer() {
  return useResourceDetailsDrawer({
    header: (m) => `${m.periodStart} - ${m.periodEnd}`,
    subHeader: (m) => m.typeDisplay,
    getSourceDocument: true,
    details: encounterData,
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

export function useMedicationStatementDetailsDrawer() {
  const { openDrawer } = useDrawer();

  return (
    medicationModel: MedicationDispenseModel | MedicationRequestModel
  ) => {
    openDrawer({
      component: (props) => (
        <MedicationDrawerComponent
          medicationEventModel={medicationModel}
          {...props}
        />
      ),
    });
  };
}

type MedicationDrawerComponentProps = {
  medicationEventModel: MedicationDispenseModel | MedicationRequestModel;
} & Pick<DrawerProps, "isOpen" | "onClose" | "onOpen" | "onAfterOpen">;

const MedicationDrawerComponent = (props: MedicationDrawerComponentProps) => {
  const { medicationEventModel } = props;
  const medStatement = useQueryMedicationStatement(medicationEventModel.rxNorm);
  if (medStatement.data?.length) {
    return <MedicationDrawer medication={medStatement.data[0]} {...props} />;
  }
  return <></>;
};
