import fhir4 from "fhir/r4";
import {
  defaultZAPTabs,
  ZAP_TAB_NAMES,
  ZAPTabName,
} from "./zus-aggregated-profile/zus-aggregated-profile";
import { useUserBuilderId } from "../core/providers/user-builder-id";
import { UnreadNotificationIcon } from "../core/unread-notification-icon";
import { usePatientAllergies } from "@/fhir/allergies";
import { usePatientDiagnosticReports } from "@/fhir/diagnostic-report";
import { usePatientTopLevelDocuments } from "@/fhir/document";
import { usePatientEncounters } from "@/fhir/encounters";
import { usePatientImmunizations } from "@/fhir/immunizations";
import { FHIRModel } from "@/fhir/models/fhir-model";
import { useQueryAllPatientMedications } from "@/hooks/use-medications";
import { usePatientConditionsAll } from "@/services/conditions";

export const numRecordsToLookbackForUnread = 20;

export type UnreadRecordsNotificationProps = {
  className?: string;
  resources?: ZAPTabName[];
  text?: string;
};

export const UnreadRecordsNotification = ({
  className,
  resources = defaultZAPTabs,
  text,
}: UnreadRecordsNotificationProps) => {
  const unreadRecordsMap = useUnreadRecordsByResource(resources);

  console.log(unreadRecordsMap);

  for (const isUnread of unreadRecordsMap.values()) {
    if (isUnread) {
      return <UnreadNotificationIcon className={className} text={text} />;
    }
  }

  return null;
};

// Provides the number of ZAP resources with unread notifications
export function useUnreadZAPTabsCount(resources = defaultZAPTabs): number {
  const unreadRecordsMap = useUnreadRecordsByResource(resources);
  let count = 0;
  unreadRecordsMap.forEach((value) => {
    if (value) {
      count += 1;
    }
  });
  return count;
}

// Maps whether each ZAP resource has any unread notifications
function useUnreadRecordsByResource(resources = defaultZAPTabs): Map<ZAPTabName, boolean> {
  const userBuilderId = useUserBuilderId();
  const allergiesQuery = usePatientAllergies(resources.includes("allergies"));
  const conditionsQuery = usePatientConditionsAll(resources.includes("conditions-all"));
  const diagnosticReportsQuery = usePatientDiagnosticReports(
    numRecordsToLookbackForUnread,
    undefined,
    resources.includes("diagnostic-reports")
  );
  const documentsQuery = usePatientTopLevelDocuments(
    numRecordsToLookbackForUnread,
    resources.includes("documents")
  );
  const encountersQuery = usePatientEncounters(
    numRecordsToLookbackForUnread,
    resources.includes("encounters")
  );
  const immunizationsQuery = usePatientImmunizations(resources.includes("immunizations"));
  const medicationsQuery = useQueryAllPatientMedications(resources.includes("medications"));

  const map = new Map<ZAPTabName, boolean>();
  for (const zapTabName of ZAP_TAB_NAMES) {
    map.set(zapTabName, false);
  }

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
      case "encounters":
        data = encountersQuery.data;
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
      map.set(resource, true);
    }
  }
  return map;
}
