import { useEffect, useState } from "react";
import { DocumentButton } from "../../CCDA/document-button";
import { useCCDAModal } from "../../CCDA/modal-ccda";
import { ObservationsTable } from "@/components/content/observations/helpers/observations-table";
import { DetailsCard } from "@/components/content/resource/helpers/details-card";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { Loading } from "@/components/core/loading";
import { useCTW } from "@/components/core/providers/use-ctw";
import { getBinaryId } from "@/fhir/binaries";
import { DiagnosticReportModel, ObservationModel } from "@/fhir/models";
import { searchProvenances } from "@/fhir/provenance";
import { findReference } from "@/fhir/resource-helper";
import { useFQSFeatureToggle } from "@/hooks/use-feature-toggle";
import { compact } from "@/utils/nodash";

export type ObservationDetailsProps = {
  diagnosticReport: DiagnosticReportModel;
};

export const diagnosticReportData = (diagnosticReport: DiagnosticReportModel) => [
  {
    label: "Effective Date",
    value: diagnosticReport.effectiveStart,
  },
  { label: "Organization", value: diagnosticReport.performer },
];

export const Component = ({ diagnosticReport }: ObservationDetailsProps) => {
  const [observationEntries, setObservationsEntries] = useState<ObservationModel[]>([]);
  const openCCDAModal = useCCDAModal();
  const [isLoading, setIsLoading] = useState(false);
  const [binaryId, setBinaryId] = useState<string>();
  const { getRequestContext } = useCTW();
  const fqsObservations = useFQSFeatureToggle("observations");
  const fqsProvenances = useFQSFeatureToggle("provenances");

  // We optionally look for any associated binary CCDAs
  // if getSourceDocument is true.
  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const requestContext = await getRequestContext();
      const provenances = await searchProvenances(
        requestContext,
        [diagnosticReport],
        fqsProvenances.enabled
      );
      setBinaryId(getBinaryId(provenances, diagnosticReport.id));
      setIsLoading(false);
    }

    if (fqsProvenances.ready) {
      void load();
    }
  }, [diagnosticReport, getRequestContext, fqsProvenances.enabled, fqsProvenances.ready]);

  useEffect(() => {
    if (fqsObservations.ready) {
      setObservationsEntries(
        fqsObservations.enabled
          ? compact(diagnosticReport.observations)
          : compact(
              diagnosticReport.results.map((result) => {
                const observation = findReference(
                  "Observation",
                  undefined,
                  diagnosticReport.includedResources,
                  result
                );
                if (!observation) {
                  return undefined;
                }
                return diagnosticReport.observations.find((o) => o.id === observation.id);
              })
            )
      );
    }
  }, [diagnosticReport, fqsObservations.ready, fqsObservations.enabled]);

  return (
    <div className="ctw-space-y-6">
      <div className="ctw-text-2xl">{diagnosticReport.displayName}</div>

      {isLoading ? (
        <Loading message="Loading data..." />
      ) : (
        <>
          <DetailsCard
            details={diagnosticReportData(diagnosticReport)}
            documentButton={
              binaryId && (
                <DocumentButton
                  onClick={() => openCCDAModal(binaryId, diagnosticReport.resourceTypeTitle)}
                  text="Source Document"
                />
              )
            }
          />
          <ObservationsTable data={observationEntries} />
        </>
      )}
    </div>
  );
};

export const ObservationDetails = withErrorBoundary(Component, "Observations");
