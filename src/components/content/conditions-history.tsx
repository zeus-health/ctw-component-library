import { getIncludedResources } from "@/fhir/bundle";
import { useConditionHistory } from "@/fhir/conditions";
import { ConditionModel } from "@/models/condition";
import { orderBy } from "lodash";
import { useEffect, useState } from "react";
import { CodingList } from "../core/coding-list";
import { CollapsibleDataListProps } from "../core/collapsible-data-list";
import {
  CollapsibleDataListStack,
  CollapsibleDataListStackEntries
} from "../core/collapsible-data-list-stack";
import { Spinner } from "../core/spinner";
import { ConditionHeader } from "./condition-header";

const CONDITION_HISTORY_LIMIT = 10;

function setupData(condition: ConditionModel): CollapsibleDataListProps {
  const detailData = [
    {
      label: "Clinical Status",
      value: condition.clinicalStatus,
    },
    {
      label: "Verification Status",
      value: condition.verificationStatus,
    },
    {
      label: "Recorded Date",
      value: condition.recordedDate,
    },
    {
      label: "Category",
      value: condition.categories[0],
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
    title: condition.snomedDisplay || condition.icd10Display,
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

        const conditionsFilteredWithDate = sortedConditions.filter(
          (c) => c.recordedDate
        );
        const conditionsFilteredWithoutDate = sortedConditions.filter(
          (c) => !c.recordedDate
        );

        setConditionsWithDate(
          conditionsFilteredWithDate.map((model) => setupData(model))
        );

        setConditionsWithoutDate(
          conditionsFilteredWithoutDate.map((model) => setupData(model))
        );
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
      return (
        <div className="ctw-space-x-2">
          <span className="ctw-text-sm ctw-italic">
            Loading condition history...
          </span>
          <Spinner />
        </div>
      );
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
