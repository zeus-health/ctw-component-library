import { isEqual, orderBy, uniqWith } from "lodash";
import { useEffect, useReducer, useState } from "react";
import { CollapsibleDataListProps } from "../../core/collapsible-data-list";
import { Details } from "../../core/collapsible-data-list-details";
import {
  CollapsibleDataListStack,
  CollapsibleDataListStackEntries,
} from "../../core/collapsible-data-list-stack";
import { CCDAModal } from "../../core/modal-ccda";
import { useCTW } from "../../core/providers/ctw-provider";
import { DocumentButton } from "../CCDA/document-button";
import { ConditionHeader } from "../condition-header";
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

export type BinaryDocument = {
  isModalOpen: boolean;
  rawBinary: fhir4.Binary | undefined;
};

const DEFAULT_BINARY_DATA = {
  isModalOpen: false,
  rawBinary: undefined,
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

  // Reducers
  const [binaryDocumentState, updateBinaryDocumentState] = useReducer(
    (data: BinaryDocument, partialData: Partial<BinaryDocument>) => ({
      ...data,
      ...partialData,
    }),
    DEFAULT_BINARY_DATA
  );

  // Fetching
  const { getRequestContext } = useCTW();
  const historyResponse = useConditionHistory(condition);

  // Handlers
  const handleDocumentButtonOnClick = async (binaryId: string) => {
    const requestContext = await getRequestContext();
    const binaryDocument = await getBinaryDocument(requestContext, binaryId);
    updateBinaryDocumentState({
      isModalOpen: true,
      rawBinary: binaryDocument,
    });
  };

  useEffect(() => {
    let conditionsDataDeduped: CollapsibleDataListProps[] = [];
    async function load() {
      if (historyResponse.data) {
        const includedResources = getIncludedResources(
          historyResponse.data.bundle
        );

        const conditionModels = historyResponse.data.conditions.map(
          (c) => new ConditionModel(c, includedResources)
        );

        const sortedConditions = orderBy(
          conditionModels,
          (c) => c.resource.recordedDate ?? "",
          "desc"
        );

        const filterEnteredinErrorConditions = sortedConditions.filter(
          (c) => c.verificationStatus !== "entered-in-error"
        );

        conditionsDataDeduped = uniqWith(
          filterEnteredinErrorConditions.map((model) => setupData(model)),
          (a, b) => isEqual(a.data, b.data)
        );

        const requestContext = await getRequestContext();
        const provenanceBundles = await getProvenanceForConditions(
          requestContext,
          [setupData(condition), ...conditionsDataDeduped]
        );

        let binaryId;
        conditionsDataDeduped = conditionsDataDeduped.map(
          (dedupdedCondition) => {
            binaryId = getBinaryId(provenanceBundles, dedupdedCondition.id);

            return {
              ...dedupdedCondition,
              ...(binaryId && {
                binaryId,
              }),
            };
          }
        );

        setConditionsWithDate(conditionsDataDeduped.filter((d) => d.date));
        setConditionsWithoutDate(conditionsDataDeduped.filter((d) => !d.date));
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
        isOpen={binaryDocumentState.isModalOpen}
        rawBinary={binaryDocumentState.rawBinary}
        onClose={() => updateBinaryDocumentState({ isModalOpen: false })}
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
          handleDocumentButtonOnClick={handleDocumentButtonOnClick}
        />
      </div>
    </>
  );
}

type HistoryRecordsProps = {
  conditionsWithDate: CollapsibleDataListStackEntries;
  conditionsWithoutDate: CollapsibleDataListStackEntries;
  historyIsLoading: boolean;
  handleDocumentButtonOnClick: (binaryId: string) => Promise<void>;
};

const HistoryRecords = ({
  conditionsWithDate,
  conditionsWithoutDate,
  historyIsLoading,
  handleDocumentButtonOnClick,
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
            handleDocumentButtonOnClick
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
                handleDocumentButtonOnClick
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
  handleDocumentButtonOnClick: (binaryId: string) => Promise<void>
) => (
  <>
    {binaryId && (
      <DocumentButton onClick={() => handleDocumentButtonOnClick(binaryId)} />
    )}
  </>
);
