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
import { getIncludedResources } from "@/fhir/bundle";
import {
  getBinaryDocument,
  getBinaryId,
  getProvenanceForConditions,
  useConditionHistory,
} from "@/fhir/conditions";
import { ConditionModel } from "@/fhir/models/condition";

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
  const onClick = async (
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
        const provenanceBundles = await getProvenanceForConditions(
          requestContext,
          [condition, ...conditionsDataDeduped]
        );

        let binaryId;
        const conditionsToDisplay = conditionsDataDeduped.map(
          (dedupdedCondition) => {
            binaryId = getBinaryId(provenanceBundles, dedupdedCondition.id);

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
        isOpen={!!binaryDocument}
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
          onClick={onClick}
        />
      </div>
    </>
  );
}

type HistoryRecordsProps = {
  conditionsWithDate: CollapsibleDataListStackEntries;
  conditionsWithoutDate: CollapsibleDataListStackEntries;
  historyIsLoading: boolean;
  onClick: (binaryId: string) => Promise<void>;
};

const HistoryRecords = ({
  conditionsWithDate,
  conditionsWithoutDate,
  historyIsLoading,
  onClick,
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
          documentButton: renderDocumentButton(
            entry.binaryId,
            onClick,
            entry.title
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
              documentButton: renderDocumentButton(
                entry.binaryId,
                onClick,
                entry.title
              ),
            }))}
            limit={CONDITION_HISTORY_LIMIT}
          />
        </div>
      )}
    </>
  );
};

const renderDocumentButton = (
  binaryId: string | undefined,
  onClick: (
    binaryId: string,
    conditionDisplayName: string | undefined
  ) => Promise<void>,
  conditionDisplayName: string | undefined
) => (
  <>
    {binaryId && (
      <DocumentButton
        onClick={() => onClick(binaryId, conditionDisplayName)}
        text="Source Document"
      />
    )}
  </>
);
