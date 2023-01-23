import { useEffect, useState } from "react";
import { Details } from "../../core/collapsible-data-list-details";
import {
  CollapsibleDataListStack,
  CollapsibleDataListStackEntries,
} from "../../core/collapsible-data-list-stack";
import { CCDAModal } from "../../core/modal-ccda";
import { useCTW } from "../../core/providers/ctw-provider";
import { DocumentButton } from "../CCDA/document-button";
import { ConditionHeader } from "../condition-header";
import { applyConditionHistoryFilters } from "./condition-history-filters";
import { conditionData, setupData } from "./condition-history-schema";
import { Loading } from "@/components/core/loading";
import { getBinaryDocument, getBinaryId } from "@/fhir/binaries";
import { getIncludedResources } from "@/fhir/bundle";
import { useConditionHistory } from "@/fhir/conditions";
import { ConditionModel } from "@/fhir/models/condition";
import { searchProvenances } from "@/fhir/provenance";

const CONDITION_HISTORY_LIMIT = 10;

export type ConditionHistoryProps = {
  condition: ConditionModel;
  onClose: () => void;
  onEdit?: () => void;
};

export function ConditionHistory({
  condition,
  onClose,
  onEdit,
}: ConditionHistoryProps) {
  // State
  const [conditionsWithDate, setConditionsWithDate] =
    useState<CollapsibleDataListStackEntries>([]);
  const [conditionsWithoutDate, setConditionsWithoutDate] =
    useState<CollapsibleDataListStackEntries>([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const [binaryDocument, setBinaryDocument] = useState<fhir4.Binary>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ccdaViewerTitle, setCCDAViewerTitle] = useState<string>();

  // Fetching
  const { getRequestContext } = useCTW();
  const historyResponse = useConditionHistory(condition);

  // Handlers
  const openCCDAModal = async (
    binaryId: string,
    conditionDisplayName?: string | undefined
  ) => {
    const requestContext = await getRequestContext();
    const binaryDocumentResponse = await getBinaryDocument(
      requestContext,
      binaryId
    );
    setBinaryDocument(binaryDocumentResponse);
    setIsModalOpen(true);
    if (conditionDisplayName) {
      setCCDAViewerTitle(conditionDisplayName);
    }
  };

  useEffect(() => {
    async function load() {
      if (historyResponse.data) {
        const includedResources = getIncludedResources(
          historyResponse.data.bundle
        );

        const conditionsDataDeduped = applyConditionHistoryFilters(
          historyResponse.data.conditions,
          includedResources
        );

        const requestContext = await getRequestContext();
        const provenances = await searchProvenances(requestContext, [
          condition,
          ...conditionsDataDeduped,
        ]);

        let binaryId;
        const conditionsToDisplay = conditionsDataDeduped.map(
          (dedupdedCondition) => {
            binaryId = getBinaryId(provenances, dedupdedCondition.id);

            return {
              ...setupData(dedupdedCondition),
              ...(binaryId && {
                binaryId,
              }),
            };
          }
        );

        setConditionsWithDate(conditionsToDisplay.filter((d) => d.date));
        setConditionsWithoutDate(conditionsToDisplay.filter((d) => !d.date));
        setIsHistoryLoading(false);
      }
    }

    void load();

    return function cleanup() {
      setConditionsWithDate([]);
      setConditionsWithoutDate([]);
      setIsHistoryLoading(true);
    };
  }, [condition, getRequestContext, historyResponse.data, onEdit]);

  return (
    <>
      <CCDAModal
        isOpen={isModalOpen}
        fileName={ccdaViewerTitle}
        rawBinary={binaryDocument}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="ctw-space-y-6">
        <ConditionHeader condition={condition} />
        <Details
          data={conditionData(condition)}
          readOnly={!onEdit}
          onEdit={() => {
            onClose();
            onEdit?.();
          }}
        />
        <HistoryRecords
          conditionsWithDate={conditionsWithDate}
          conditionsWithoutDate={conditionsWithoutDate}
          historyIsLoading={isHistoryLoading}
          openCCDAModal={openCCDAModal}
        />
      </div>
    </>
  );
}

type HistoryRecordsProps = {
  conditionsWithDate: CollapsibleDataListStackEntries;
  conditionsWithoutDate: CollapsibleDataListStackEntries;
  historyIsLoading: boolean;
  openCCDAModal: (
    binaryId: string,
    conditionTitle: string | undefined
  ) => Promise<void>;
};

const HistoryRecords = ({
  conditionsWithDate,
  conditionsWithoutDate,
  historyIsLoading,
  openCCDAModal,
}: HistoryRecordsProps) => {
  if (
    conditionsWithDate.length === 0 &&
    conditionsWithoutDate.length === 0 &&
    !historyIsLoading
  ) {
    return <div>No history found.</div>;
  }
  if (historyIsLoading) {
    return <Loading message="Loading condition history..." />;
  }

  return (
    <>
      <CollapsibleDataListStack
        entries={conditionsWithDate.map((entry) => ({
          ...entry,
          documentButton: (
            <>
              {entry.binaryId && (
                <DocumentButton
                  onClick={() =>
                    openCCDAModal(entry.binaryId as string, entry.title)
                  }
                  text="Source Document"
                />
              )}
            </>
          ),
        }))}
        limit={CONDITION_HISTORY_LIMIT}
      />
      {conditionsWithoutDate.length !== 0 && (
        <div className="ctw-space-y-2">
          <div className="ctw-font-medium">Records with no date:</div>
          <CollapsibleDataListStack
            entries={conditionsWithoutDate.map((entry) => ({
              ...entry,
              documentButton: (
                <>
                  {entry.binaryId && (
                    <DocumentButton
                      onClick={() =>
                        openCCDAModal(entry.binaryId as string, entry.title)
                      }
                      text="Source Document"
                    />
                  )}
                </>
              ),
            }))}
            limit={CONDITION_HISTORY_LIMIT}
          />
        </div>
      )}
    </>
  );
};
