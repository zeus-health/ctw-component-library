import type { PatientRecordSearchResult } from "@/services/patient-record-search/patient-record-search";
import { SearchResult } from "./search-result";
import { useAllergiesHistory } from "../../allergies/helpers/history";
import { allergyData } from "../../allergies/patient-allergies";
import { useConditionDetailsDrawer } from "../../conditions/helpers/details";
import { documentData } from "../../document/patient-documents";
import { useMedicationDetailsDrawer } from "../../medications/helpers/details";
import { useResourceDetailsDrawer } from "../../resource/resource-details-drawer";
import {
  AllergyModel,
  ConditionModel,
  DocumentModel,
  MedicationStatementModel,
} from "@/fhir/models";
import { capitalize } from "@/utils/nodash";

type ResourceRowProps = {
  document: PatientRecordSearchResult["document"];
};

export function SearchResultRow(props: ResourceRowProps) {
  const { resource, ...result } = props.document;
  const resourceType = result.metadata.resource_type;

  const openConditionDetails = useConditionDetailsDrawer({});
  const openAllergyDetails = useResourceDetailsDrawer({
    header: (m) => capitalize(m.display),
    details: allergyData,
    getHistory: useAllergiesHistory,
    getSourceDocument: true,
  });
  const openDocumentDetails = useResourceDetailsDrawer({
    header: (m) => m.title,
    subHeader: (m) => m.encounterDate,
    details: documentData,
  });
  const openMedicationDetails = useMedicationDetailsDrawer({});

  switch (resourceType) {
    case "AllergyIntolerance": {
      const allergy = resource as AllergyModel;
      return (
        <SearchResult
          heading={allergy.display}
          label="Allergy"
          resource={allergy}
          openDetails={openAllergyDetails}
          details={[
            { label: "Last Updated", value: allergy.recordedDate },
            { label: "Reaction", value: allergy.manifestations },
          ]}
        />
      );
    }
    case "Condition": {
      const condition = resource as ConditionModel;
      return (
        <SearchResult
          heading={condition.display}
          label="Condition"
          resource={condition}
          openDetails={openConditionDetails}
          details={[
            {
              label: "Last Updated",
              value: condition.recordedDate
                ? `${condition.recordedDate} ${condition.recorder ?? ""}`
                : "Unknown",
            },
            {
              label: "Earliest Known Onset",
              value: condition.onset,
            },
          ]}
        />
      );
    }

    case "DocumentReference": {
      const document = resource as DocumentModel;
      return (
        <SearchResult
          heading={document.title}
          label="Document"
          resource={document}
          openDetails={openDocumentDetails}
          text={getRelevantContentFromDocumentSearchResult(result.page_content, result.reason.span)}
          details={[
            {
              label: "Encounter",
              value: document.encounterDate,
            },
            {
              label: "Retrieved",
              value: document.dateCreated,
            },
            {
              label: "Author",
              value: document.custodian,
            },
          ]}
        />
      );
    }

    case "MedicationStatement": {
      const medication = resource as MedicationStatementModel;
      return (
        <SearchResult
          heading={medication.display}
          label="Medication"
          resource={medication}
          openDetails={openMedicationDetails}
          details={[
            {
              label: "Dosage",
              value: medication.dosage,
            },
            {
              label: "Last Filled",
              value: medication.lastFillDate,
            },
            {
              label: "Last Prescribed",
              value: medication.lastPrescribedDate
                ? `${medication.lastPrescribedDate} ${medication.lastPrescriber}`
                : undefined,
            },
          ]}
        />
      );
    }

    default:
      // Unknown resource type
      return null;
  }
}

const getRelevantContentFromDocumentSearchResult = (
  content: string,
  spans: { begin: number; end: number }[]
) => {
  let relevantContent: JSX.Element;
  if (spans.length === 0) {
    relevantContent = <>{content}</>;
  } else {
    // TODO - this could be improved to highlight all of the spans and not just the first one
    relevantContent = (
      <>
        <span>{content.substring(spans[0].begin - 100, spans[0].begin)}</span>
        <span className="ctw-font-semibold">{content.substring(spans[0].begin, spans[0].end)}</span>
        <span>{content.substring(spans[0].end, spans[0].end + 300)}</span>
      </>
    );
  }
  return relevantContent;
};
