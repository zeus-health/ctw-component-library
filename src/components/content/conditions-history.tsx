import { getIncludedResources } from "@/fhir/bundle";
import { getConditionHistory } from "@/fhir/conditions";
import { ConditionModel } from "@/models/conditions";
import { useEffect, useState } from "react";
import {
  ConditionHistoryList,
  DataListStackEntries,
  DataListStackEntry,
} from "../core/condition-history-list";
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
  const [conditions, setConditions] = useState<DataListStackEntries>([]);
  const [loading, setLoading] = useState(true);
  const { getCTWFhirClient } = useCTW();
  const { patientPromise } = usePatient();

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

    function setupData(condition: ConditionModel): DataListStackEntry {
      const previewData = [
        {
          label: "Recorded Date",
          value: condition.recordedDate,
        },
        {
          label: "SNOMED Display",
          value: condition.snomedDisplay,
        },
        {
          label: "Managing Organization",
          value: condition.patient?.organization?.name,
        },
      ];
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
          value: getAllCodes(condition),
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
        detailData: [...detailData],
        previewData: [...previewData],
      };
    }

    function getAllCodes(condition: ConditionModel): string[] {
      return [
        condition.icd10Display || "",
        condition.icd10Code || "",
        condition.icd10System || "",
        condition.snomedDisplay || "",
        condition.snomedCode || "",
        condition.snomedSystem || "",
      ];
    }

    return function cleanup() {
      setConditions([]);
      setLoading(true);
    };
  }, [getCTWFhirClient, icd10Code, snomedCode, patientPromise]);

  if (conditions.length === 0 && !loading) {
    return <div>No history found.</div>;
  }
  // move from here to drawer
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
    <ConditionHistoryList
      entries={conditions}
      limit={CONDITION_HISTORY_LIMIT}
    />
  );
}
