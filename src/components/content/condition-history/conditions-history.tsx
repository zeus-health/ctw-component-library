import { find, isEqual, orderBy, uniqWith } from "lodash";
import { useEffect, useReducer, useState } from "react";
import { CollapsibleDataListProps } from "../../core/collapsible-data-list";
import { Details } from "../../core/collapsible-data-list-details";
import {
  CollapsibleDataListStack,
  CollapsibleDataListStackEntries,
} from "../../core/collapsible-data-list-stack";
import { useCTW } from "../../core/ctw-provider";
import { CCDAModal } from "../../core/modal-ccda";
import { DocumentButton } from "../CCDA/document-button";
import { ConditionHeader } from "../condition-header";
import { conditionData, setupData } from "./condition-history-schema";
import { Loading } from "@/components/core/loading";
import { getIncludedResources } from "@/fhir/bundle";
import {
  getBinaryDocument,
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
  const [loading, setLoading] = useState(true);

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

        const provenanceBundles = await loadDocument();

        let binaryId: string;
        conditionsDataDeduped = conditionsDataDeduped.map(
          (dedupdedCondition) => {
            provenanceBundles.forEach((bundle) => {
              if (bundle.entry) {
                const link = find(bundle.link, { relation: "self" });
                const decodedUrl = decodeURIComponent(link.url).split("/");
                const conditionId = decodedUrl[decodedUrl.length - 1];

                bundle.entry.forEach((provenance) => {
                  // The role should be of source otherwise can't be trusted to be provide the correct and truthy binary.
                  const hasDocument =
                    provenance.resource.entity?.[0].role === "source";
                  const idMatch = conditionId === dedupdedCondition.id;

                  if (hasDocument && idMatch) {
                    binaryId = provenance.resource.entity[0].what.reference;
                  }
                });
                return conditionId === dedupdedCondition.id;
              }

              return undefined;
            });

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
        setLoading(false);
      }
    }

    async function loadDocument() {
      // Binary Document
      const requestContext = await getRequestContext();
      const binaryDocs = await getProvenanceForConditions(requestContext, [
        setupData(condition),
        ...conditionsDataDeduped,
      ]);

      return binaryDocs;
    }

    void load();

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
          <Details
            data={conditionData(condition)}
            readOnly={!onEdit}
            onEdit={() => {
              onClose();
              onEdit?.();
            }}
          />
          <CollapsibleDataListStack
            entries={conditionsWithDate.map((entry) => ({
              ...entry,
              documentButton: (
                <>
                  {entry.binaryId && (
                    <DocumentButton
                      onClick={() =>
                        handleDocumentButtonOnClick(entry.binaryId as string)
                      }
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
                            handleDocumentButtonOnClick(
                              entry.binaryId as string
                            )
                          }
                        />
                      )}
                    </>
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
