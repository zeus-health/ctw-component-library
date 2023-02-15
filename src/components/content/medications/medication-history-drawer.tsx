import { MedicationDrawer } from "@/components/content/medication-drawer";
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
