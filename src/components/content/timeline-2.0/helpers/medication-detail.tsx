import { MedicationDrawer } from "../../medications/history/medication-drawer";
import { DrawerProps } from "@/components/core/drawer";
import { useDrawer } from "@/components/core/providers/drawer-provider";
import { MedicationDispenseModel } from "@/fhir/models";
import { MedicationRequestModel } from "@/fhir/models/medication-request";
import { useQueryMedicationStatement } from "@/hooks/use-medications";

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
