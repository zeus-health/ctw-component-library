import { PatientHistoryRequestDrawer } from "../patient-history-request-drawer";
import { useDrawer } from "@/components/core/providers/drawer-provider";
import { usePatient } from "@/components/core/providers/patient-provider";

export function usePatientHistory() {
  const { openDrawer } = useDrawer();
  const patientResponse = usePatient();

  return {
    openHistoryRequestDrawer: () => {
      openDrawer({
        component: (props) => {
          if (patientResponse.data) {
            return (
              <PatientHistoryRequestDrawer
                setClinicalHistoryExists={() => {}}
                header={
                  <div className="ctw-pt-0 ctw-text-base">
                    Request patient clinical history from 70K+ providers across
                    the nation. No changes will be made to your patient record.
                  </div>
                }
                patient={patientResponse.data}
                {...props}
              />
            );
          }
          return undefined;
        },
      });
    },
  };
}
