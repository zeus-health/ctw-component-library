import { PatientHistoryRequestDrawer } from "../patient-history-request-drawer";
import { PatientHistoryStatus } from "./patient-history-message-status";
import { useCTW } from "@/components/core/providers/ctw-provider";
import { useDrawer } from "@/components/core/providers/drawer-provider";
import { usePatientPromise } from "@/components/core/providers/patient-provider";
import { getPatientHistoryDetails } from "@/services/patient-history/patient-history";

export function usePatientHistory() {
  const { getRequestContext } = useCTW();
  const { openDrawer } = useDrawer();
  const patientPromise = usePatientPromise();
  // const patientHistoryInfo = usePatientHistoryDetails();

  return {
    openHistoryRequestDrawer: async () => {
      const patient = await patientPromise;
      const requestContext = await getRequestContext();

      const patientHistoryDetails = await getPatientHistoryDetails(
        requestContext,
        patient.id
      );
      openDrawer({
        component: (props) => (
          <PatientHistoryRequestDrawer
            setClinicalHistoryExists={() => {}}
            header={
              <>
                <PatientHistoryStatus
                  status={patientHistoryDetails?.status}
                  date={patientHistoryDetails?.dateCreated}
                />
                <div className="ctw-pt-0 ctw-text-base">
                  Request patient clinical history from 70K+ providers across
                  the nation. No changes will be made to your patient record.
                </div>
              </>
            }
            patient={patient}
            {...props}
          />
        ),
      });
    },
    lastRetrieved: patientHistoryDetails?.lastRetrievedAt,
    latestStatus: patientHistoryDetails?.status,
  };
}
