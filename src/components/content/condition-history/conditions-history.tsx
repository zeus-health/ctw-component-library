import { useEffect, useState } from "react";
import { Details } from "../../core/collapsible-data-list-details";
import {
  CollapsibleDataListStack,
  CollapsibleDataListStackEntries,
} from "../../core/collapsible-data-list-stack";
import { useCTW } from "../../core/providers/ctw-provider";
import { DocumentButton } from "../CCDA/document-button";
import { useCCDAModal } from "../CCDA/modal-ccda";
import { ConditionHeader } from "../condition-header";
import { applyConditionHistoryFilters } from "./condition-history-filters";
import { conditionData, setupData } from "./condition-history-schema";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { Loading } from "@/components/core/loading";
import { getBinaryId } from "@/fhir/binaries";
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

export const ConditionHistory = withErrorBoundary(
  ({ condition, onClose, onEdit }: ConditionHistoryProps) => {
    // State
    const [conditionsWithDate, setConditionsWithDate] =
      useState<CollapsibleDataListStackEntries>([]);
    const [conditionsWithoutDate, setConditionsWithoutDate] =
      useState<CollapsibleDataListStackEntries>([]);
    const [isHistoryLoading, setIsHistoryLoading] = useState(true);

    // Fetching
    const { getRequestContext } = useCTW();
    const historyResponse = useConditionHistory(condition);

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

          const conditionsToDisplay = conditionsDataDeduped.map(
            (dedupdedCondition) => {
              const binaryId = getBinaryId(provenances, dedupdedCondition.id);

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
        />
      </div>
    );
  },
  "ConditionsHistory"
);

type HistoryRecordsProps = {
  conditionsWithDate: CollapsibleDataListStackEntries;
  conditionsWithoutDate: CollapsibleDataListStackEntries;
  historyIsLoading: boolean;
};

const HistoryRecords = ({
  conditionsWithDate,
  conditionsWithoutDate,
  historyIsLoading,
}: HistoryRecordsProps) => {
  const openCCDAModal = useCCDAModal();

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

  function maybeAddDocumentButtons(entries: CollapsibleDataListStackEntries) {
    return entries.map((entry) => {
      if (!entry.binaryId) {
        return entry;
      }

      return {
        ...entry,
        documentButton: (
          <DocumentButton
            onClick={() =>
              openCCDAModal(
                entry.binaryId as string,
                entry.title ?? "Condition"
              )
            }
            text="Source Document"
          />
        ),
      };
    });
  }

  return (
    <>
      <CollapsibleDataListStack
        entries={maybeAddDocumentButtons(conditionsWithDate)}
        limit={CONDITION_HISTORY_LIMIT}
      />

      {conditionsWithoutDate.length !== 0 && (
        <div className="ctw-space-y-2">
          <div className="ctw-font-medium">Records with no date:</div>
          <CollapsibleDataListStack
            entries={maybeAddDocumentButtons(conditionsWithoutDate)}
            limit={CONDITION_HISTORY_LIMIT}
          />
        </div>
      )}
    </>
  );
};
