import { MedicationModel } from "../../../fhir/models/medication";
import { Drawer } from "../../core/drawer";
import { useEditMedicationForm } from "../medications/medication-hooks";
import { MedicationHistory } from "./medication-history";
import { useDrawer } from "@/components/core/providers/drawer-provider";

export function useMedicationHistory() {
  const { openDrawer } = useDrawer();
  const showEditMedicationForm = useEditMedicationForm();

  return ({
    medication,
    readOnly,
  }: {
    medication: MedicationModel;
    readOnly: boolean;
  }) => {
    openDrawer({
      component: (props) => (
        <MedicationHistoryDrawer
          medication={medication}
          onEdit={
            readOnly ? undefined : () => showEditMedicationForm(medication)
          }
          {...props}
        />
      ),
    });
  };
}

export type MedicationHistoryDrawerProps = {
  className?: string;
  medication: MedicationModel;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: () => void;
};

export function MedicationHistoryDrawer({
  className,
  medication,
  isOpen,
  onClose,
  onEdit,
}: MedicationHistoryDrawerProps) {
  return (
    <Drawer
      className={className}
      title="Medication History"
      isOpen={isOpen}
      onClose={onClose}
      showCloseFooter
    >
      <Drawer.Body>
        <MedicationHistory
          medication={medication}
          onClose={onClose}
          onEdit={onEdit}
        />
      </Drawer.Body>
    </Drawer>
  );
}
