import fhir4 from "fhir/r4";
import {
  defaultZAPResources,
  ZAPResourceName,
} from "./zus-aggregated-profile/zus-aggregated-profile";
import { useUserBuilderId } from "../core/providers/user-builder-id";
import { UnreadNotificationIcon } from "../core/unread-notification-icon";
import { usePatientAllergies } from "@/fhir/allergies";
import { usePatientDiagnosticReports } from "@/fhir/diagnostic-report";
import { usePatientTopLevelDocuments } from "@/fhir/document";
import { usePatientImmunizations } from "@/fhir/immunizations";
import { FHIRModel } from "@/fhir/models/fhir-model";
import { useQueryAllPatientMedications } from "@/hooks/use-medications";
import { usePatientConditionsAll } from "@/services/conditions";

export type UnreadRecordsNotificationProps = {
  className?: string;
  resources?: ZAPResourceName[];
  text?: string;
};

export const UnreadRecordsNotification = ({
  className,
  resources = defaultZAPResources,
  text,
}: UnreadRecordsNotificationProps) => {
  const userBuilderId = useUserBuilderId();
  const allergiesQuery = usePatientAllergies();
  const conditionsQuery = usePatientConditionsAll();
  const diagnosticReportsQuery = usePatientDiagnosticReports(20);
  const documentsQuery = usePatientTopLevelDocuments();
  const immunizationsQuery = usePatientImmunizations();
  const medicationsQuery = useQueryAllPatientMedications();

  for (const resource of resources) {
    let data: FHIRModel<fhir4.Resource>[];
    switch (resource) {
      case "allergies":
        data = allergiesQuery.data;
        break;
      case "conditions-all":
        data = conditionsQuery.data;
        break;
      case "diagnostic-reports":
        data = diagnosticReportsQuery.data;
        break;
      case "documents":
        data = documentsQuery.data;
        break;
      case "immunizations":
        data = immunizationsQuery.data;
        break;
      case "medications-all":
        data = medicationsQuery.allMedications;
        break;
      default:
        data = [];
    }
    if (
      data.some(
        (record) => !record.isDismissed && !record.isRead && !record.ownedByBuilder(userBuilderId)
      )
    ) {
      return <UnreadNotificationIcon className={className} text={text} />;
    }
  }

  return null;
};
