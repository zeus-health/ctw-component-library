import { Loading } from "@/components/core/loading";
import { getIncludedResources } from "@/fhir/bundle";
import { useConditionHistory } from "@/fhir/conditions";
import { ConditionModel } from "@/models/condition";
import _, { capitalize, orderBy, startCase } from "lodash";
import { useEffect, useState } from "react";
import { CodingList } from "../core/coding-list";
import { CollapsibleDataListProps } from "../core/collapsible-data-list";
import {
  CollapsibleDataListStack,
  CollapsibleDataListStackEntries,
} from "../core/collapsible-data-list-stack";
import { NotesList } from "../core/notes-list";
import { ConditionHeader } from "./condition-header";

const CONDITION_HISTORY_LIMIT = 10;

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
    subTitle: condition.patient?.organization?.name,
    data: detailData,
  };
}

export function ConditionHistory({ condition }: { condition: ConditionModel }) {
  const [conditionsWithDate, setConditionsWithDate] =
    useState<CollapsibleDataListStackEntries>([]);
  const [conditionsWithoutDate, setConditionsWithoutDate] =
    useState<CollapsibleDataListStackEntries>([]);
  const [loading, setLoading] = useState(true);
  const [conditionForSearch, setConditionForSearch] =
    useState<ConditionModel>();
  const historyResponse = useConditionHistory(conditionForSearch);

  useEffect(() => {
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

        const conditionsFilteredWithDate =
          filterEnteredinErrorConditions.filter((c) => c.recordedDate);
        const conditionsFilteredWithoutDate =
          filterEnteredinErrorConditions.filter((c) => !c.recordedDate);

        const conditionsWithDateDedupedData = _.uniqBy(
          conditionsFilteredWithDate.map((model) => setupData(model)),
          (record) => record.data.map((data) => data.value?.toString()).join()
        );
        const conditionsWithoutDedupedDateData = _.uniqBy(
          conditionsFilteredWithoutDate.map((model) => setupData(model)),
          (record) => record.data.map((data) => data.value?.toString()).join()
        );

        setConditionsWithDate(conditionsWithDateDedupedData);
        setConditionsWithoutDate(conditionsWithoutDedupedDateData);

        setLoading(false);
      }
    }

    load();

    return function cleanup() {
      setConditionsWithDate([]);
      setConditionsWithoutDate([]);
      setLoading(true);
    };
  }, [condition, historyResponse.data]);

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
        <div className="ctw-space-y-6">
          <ConditionHeader condition={condition} />
          <CollapsibleDataListStack
            entries={conditionsWithDate}
            limit={CONDITION_HISTORY_LIMIT}
          />
          {conditionsWithoutDate.length !== 0 && (
            <div className="ctw-space-y-2">
              <div className="ctw-font-medium">Records with no date:</div>
              <CollapsibleDataListStack
                entries={conditionsWithoutDate}
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
