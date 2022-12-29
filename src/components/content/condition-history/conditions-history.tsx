import { isEqual, orderBy, uniqWith } from "lodash";
import { useEffect, useReducer, useState } from "react";
import { CollapsibleDataListProps } from "../../core/collapsible-data-list";
import { Details } from "../../core/collapsible-data-list-details";
import {
  CollapsibleDataListStack,
  CollapsibleDataListStackEntries,
} from "../../core/collapsible-data-list-stack";
import { useCTW } from "../../core/ctw-provider";
import { CCDAModal } from "../../core/modal-ccda";
import { RenderDocumentButton } from "../CCDA/render-document-button";
import { ConditionHeader } from "../condition-header";
import { conditionData, setupData } from "./condition-history-schema";
import { Loading } from "@/components/core/loading";
import { getIncludedResources } from "@/fhir/bundle";
import {
  BinaryDocumentData,
  getBinary,
  SourceDocumentMap,
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
  rawBinary: BinaryDocumentData | undefined;
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
  const [loading, setLoading] = useState(true);

  // Reducers
  const [binaryDocumentState, updateBinaryDocumentState] = useReducer(
    (data: BinaryDocument, partialData: Partial<BinaryDocument>) => ({
      ...data,
      ...partialData,
    }),
    DEFAULT_BINARY_DATA
  );

  const [idMap, setIDMap] = useState<SourceDocumentMap>(new Map());

  // Fetching
  const { getRequestContext } = useCTW();
  const historyResponse = useConditionHistory(condition);

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

        console.log("conditionsDataDeduped", conditionsDataDeduped);

        conditionsDataDeduped = uniqWith(
          filterEnteredinErrorConditions.map((model) => setupData(model)),
          (a, b) => isEqual(a.data, b.data)
        );

        setConditionsWithDate(conditionsDataDeduped.filter((d) => d.date));
        setConditionsWithoutDate(conditionsDataDeduped.filter((d) => !d.date));
        setLoading(false);
      }
    }

    async function loadDocument() {
      // Binary Document
      const requestContext = await getRequestContext();
      const currentCondition = setupData(condition);
      const allConditions = [currentCondition, ...conditionsDataDeduped];
      const binaryDocs = await getBinary(requestContext, allConditions);

      setIDMap(binaryDocs);

      if (binaryDocs.get(condition.id)?.isBinary) {
        updateBinaryDocumentState({
          rawBinary: binaryDocs.get(condition.id),
        });
      }
    }

    void load();
    void loadDocument();

    return function cleanup() {
      setConditionsWithDate([]);
      setConditionsWithoutDate([]);
      setLoading(true);
    };
  }, [condition, getRequestContext, historyResponse.data, onEdit]);

  function conditionHistoryDisplay() {
    if (
      conditionsWithDate.length === 0 &&
      conditionsWithoutDate.length === 0 &&
      !loading
    ) {
      return <div>No history found.</div>;
    }
    if (loading) {
      return <Loading message="Loading condition history..." />;
    }

    return (
      <>
        {binaryDocumentState.rawBinary && (
          <CCDAModal
            isOpen={binaryDocumentState.isModalOpen}
            rawBinary={binaryDocumentState.rawBinary}
            onClose={() => updateBinaryDocumentState({ isModalOpen: false })}
          />
        )}
        <div className="ctw-space-y-6">
          <ConditionHeader condition={condition} />
          {onEdit && (
            <Details
              data={conditionData(condition)}
              readOnly={!onEdit}
              onEdit={() => {
                onClose();
                // TODO: Clean this up when headless ui supports multiple drawers  https://github.com/tailwindlabs/headlessui/discussions/1564.
                // We setTimeout here because we need to wait till condition history drawer closes.
                // This fixes a bug where having multiple drawers causes headless ui useScrollLock to become out of sync, which causes overlay: hidden incorrectly persist on the html element.
                setTimeout(onEdit, 400);
              }}
            />
          )}
          <CollapsibleDataListStack
            entries={conditionsWithDate.map((entry) => ({
              ...entry,
              documentButton: (
                <RenderDocumentButton
                  idMap={idMap}
                  entry={entry}
                  updateBinaryDocumentState={updateBinaryDocumentState}
                />
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
                    <RenderDocumentButton
                      idMap={idMap}
                      entry={entry}
                      updateBinaryDocumentState={updateBinaryDocumentState}
                    />
                  ),
                }))}
                limit={CONDITION_HISTORY_LIMIT}
              />
            </div>
          )}
        </div>
      </>
    );
  }

  return conditionHistoryDisplay();
}
