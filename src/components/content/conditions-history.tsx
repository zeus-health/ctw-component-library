import { getIncludedResources } from "@/fhir/bundle";
import { getConditionHistory } from "@/fhir/conditions";
import { ConditionModel } from "@/models/conditions";
import { useEffect, useState } from "react";
import { CodingList } from "../core/coding-list";
import { CollapsibleDataListProps } from "../core/collapsible-data-list";
import {
  CollapsibleDataListStack,
  CollapsibleDataListStackEntries,
} from "../core/collapsible-data-list-stack";
import { useCTW } from "../core/ctw-provider";
import { usePatient } from "../core/patient-provider";
import { Spinner } from "../core/spinner";

const CONDITION_HISTORY_LIMIT = 10;

export type ConditionHistoryProps = {
  icd10Code?: string | undefined;
  snomedCode?: string | undefined;
};

export function ConditionHistory({
  icd10Code,
  snomedCode,
}: ConditionHistoryProps) {
  const [conditions, setConditions] = useState<CollapsibleDataListStackEntries>(
    []
  );
  const [loading, setLoading] = useState(true);
  const { getCTWFhirClient } = useCTW();
  const { patientPromise } = usePatient();
  const [singleCondition, setSingleCondition] = useState<ConditionModel>();

  useEffect(() => {
    async function load() {
      const fhirClient = await getCTWFhirClient();
      const patientTemp = await patientPromise;

      const { conditions: allConditions, bundle: bundleResources } =
        await getConditionHistory(fhirClient, patientTemp.UPID);

      const includedResources = getIncludedResources(bundleResources);

      const models = allConditions.map(
        (condition) => new ConditionModel(condition, includedResources)
      );

      setSingleCondition(models[0]);

      const filteredConditions = models.filter(
        (condition) =>
          (condition.icd10Code === icd10Code &&
            typeof icd10Code !== "undefined") ||
          (condition.snomedCode === snomedCode &&
            typeof snomedCode !== "undefined")
      );

      setConditions(filteredConditions.map((model) => setupData(model)));
      setLoading(false);
    }

    load();

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
          label: "Categories",
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
        date: condition.recordedDate,
        title: condition.snomedDisplay || condition.icd10Display,
        subTitle: condition.patient?.organization?.name,
        data: detailData,
      };
    }

    return function cleanup() {
      setConditions([]);
      setLoading(true);
    };
  }, [getCTWFhirClient, icd10Code, snomedCode, patientPromise]);

  function conditionHistoryDisplay() {
    if (conditions.length === 0 && !loading) {
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
        <div className="ctw-pad-0 ctw-flex ctw-space-x-10 ctw-space-y-10 ctw-text-2xl ctw-text-black">
          {singleCondition?.display} (
          {singleCondition?.icd10Code || singleCondition?.snomedCode})
        </div>
        <div className="ctw-flex ctw-p-2 ctw-text-sm ctw-text-black">
          {singleCondition?.ccsGrouping}
        </div>
        <CollapsibleDataListStack
          entries={conditions}
          limit={CONDITION_HISTORY_LIMIT}
        />
      </>
    );
  }

  return conditionHistoryDisplay();
}
