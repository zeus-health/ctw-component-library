import { PatientHistoryRequestDrawer } from "../patient-history-request-drawer";
import { PatientHistoryStatus } from "./patient-history-message-status";
import { useDrawer } from "@/components/core/providers/drawer-provider";
import { usePatient } from "@/components/core/providers/patient-provider";
import { usePatientHistoryDetails } from "@/fhir/conditions";

export function usePatientHistory() {
  const { openDrawer } = useDrawer();
  const patientResponse = usePatient();
  const patientHistoryInfo = usePatientHistoryDetails();

  return {
    openHistoryRequestDrawer: () => {
      openDrawer({
        component: (props) => {
          if (patientResponse.data) {
            return (
              <PatientHistoryRequestDrawer
                setClinicalHistoryExists={() => {}}
                header={
                  <>
                    {!patientHistoryInfo.isLoading && (
                      <PatientHistoryStatus
                        status={patientHistoryInfo.data?.status}
                        date={patientHistoryInfo.data?.dateCreated}
                      />
                    )}
                    <div className="ctw-pt-0 ctw-text-base">
                      Request patient clinical history from 70K+ providers
                      across the nation. No changes will be made to your patient
                      record.
                    </div>
                  </>
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
    lastRetrieved: patientHistoryInfo.data?.lastRetrievedAt,
    latestStatus: patientHistoryInfo.data?.status,
  };
}
