import { capitalize, isEqual, orderBy, startCase, uniqWith } from "lodash";
import { useEffect, useState } from "react";
import { CodingList } from "../core/coding-list";
import { CollapsibleDataListProps } from "../core/collapsible-data-list";
import { Details } from "../core/collapsible-data-list-details";
import {
  CollapsibleDataListStack,
  CollapsibleDataListStackEntries,
} from "../core/collapsible-data-list-stack";
import { useCTW } from "../core/ctw-provider";
import { CCDAModal } from "../core/modal-ccda";
import { NotesList } from "../core/notes-list";
import { RenderDocumentButton } from "./CCDA/render-document-button";
import { ConditionHeader } from "./condition-header";
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

const conditionData = (condition: ConditionModel) => [
  { label: "Recorder", value: condition.recorder },
  { label: "Recorded Date", value: condition.recordedDate },
  {
    label: "Provider Organization",
    value: condition.patient?.organization?.name,
  },
  { label: "Clinical Status", value: capitalize(condition.clinicalStatus) },
  {
    label: "Verification Status",
    value: capitalize(condition.verificationStatus),
  },
  { label: "Onset Date", value: condition.onset },
  { label: "Abatement Date", value: condition.abatement },
  {
    label: "Note",
    value: condition.notes.length !== 0 && (
      <NotesList notes={condition.notes} />
    ),
  },
];

function setupData(condition: ConditionModel): CollapsibleDataListProps {
  const detailData = [
    {
      label: "Recorder",
      value: condition.recorder,
    },
    {
      label: "Clinical Status",
      value: capitalize(condition.clinicalStatus),
    },
    {
      label: "Verification Status",
      value: capitalize(condition.verificationStatus),
    },
    {
      label: "Recorded Date",
      value: condition.recordedDate,
    },
    {
      label: "Category",
      value: startCase(condition.categories[0]),
    },
    {
      label: "Note",
      value: condition.notes.length !== 0 && (
        <NotesList notes={condition.notes} />
      ),
    },
    {
      label: "Code",
      value: <CodingList codings={condition.knownCodings} />,
    },
    {
      label: "Onset Date",
      value: condition.onset,
    },
    {
      label: "Abatement Date",
      value: condition.abatement,
    },
    {
      label: "Encounter",
      value: condition.encounter,
    },
  ];

  return {
    id: condition.id,
    date: condition.recordedDate,
    title: startCase(condition.categories[0]),
    subtitle: condition.patient?.organization?.name,
    data: detailData,
  };
}

export function ConditionHistory({
  condition,
  onClose,
  onEdit,
}: {
  condition: ConditionModel;
  onClose: () => void;
  onEdit?: () => void;
}) {
  const [conditionsWithDate, setConditionsWithDate] =
    useState<CollapsibleDataListStackEntries>([]);
  const [conditionsWithoutDate, setConditionsWithoutDate] =
    useState<CollapsibleDataListStackEntries>([]);
  const [loading, setLoading] = useState(true);
  const [loadingSourceDocument, setLoadingSourceDocument] = useState(true);
  const [conditionForSearch, setConditionForSearch] =
    useState<ConditionModel>();
  const historyResponse = useConditionHistory(conditionForSearch);
  const { getRequestContext } = useCTW();

  const [isBinaryDocument, setIsBinaryDocument] = useState(false);
  const [rawBinary, setRawBinary] = useState<BinaryDocumentData>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [idMap, setIDMap] = useState<SourceDocumentMap>(new Map());
  // Create a map that links conditionID and then use that ID to map to conditions without dates and conditions with Dates.
  // Then you finally need to map those into 2 separate arrays and then pass those into the functions.
  useEffect(() => {
    let conditionsDataDeduped: CollapsibleDataListProps[] = [];
    async function load() {
      setConditionForSearch(condition);

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
        setIsBinaryDocument(true);
        setRawBinary(binaryDocs.get(condition.id));
      }

      setLoadingSourceDocument(false);
    }

    void load();

    void loadDocument();

    return function cleanup() {
      setConditionsWithDate([]);
      setConditionsWithoutDate([]);
      setLoading(true);
      setLoadingSourceDocument(true);
    };
  }, [
    condition,
    getRequestContext,
    historyResponse.data,
    isBinaryDocument,
    rawBinary,
    onEdit,
  ]);

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
        {isBinaryDocument && rawBinary && (
          <CCDAModal
            isOpen={isModalOpen}
            rawBinary={rawBinary}
            onClose={() => setIsModalOpen(false)}
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
                  setIsModalOpen={setIsModalOpen}
                  setRawBinary={setRawBinary}
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
                      setIsModalOpen={setIsModalOpen}
                      setRawBinary={setRawBinary}
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
