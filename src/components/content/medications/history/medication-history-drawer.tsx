import { MedicationDrawer } from "@/components/content/medications/history/medication-drawer";
import { useDrawer } from "@/components/core/providers/drawer-provider";
import { MedicationStatementModel } from "@/fhir/models";

export function useMedicationHistory() {
  const { openDrawer } = useDrawer();
  return ({ medication }: { medication: MedicationStatementModel }) => {
    openDrawer({
      component: (props) => (
        <MedicationDrawer medication={medication} {...props} />
      ),
    });
  };
}
