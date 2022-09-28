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

      const allConditions = await getConditionHistory(
        fhirClient,
        patientTemp.UPID
      );
      const models = allConditions.map(
        (condition) => new ConditionModel(condition)
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
      let data = [
        {
          label: "Verification Status",
          value: condition.verificationStatus,
        },
        {
          label: "Clinical Status",
          value: condition.clinicalStatus,
        },
        {
          label: "Recorded Date",
          value: condition.recordedDate,
        },
        // {
        //   label: "Managing Organization",
        //   value: condition.patient?.organization,
        // },
      ];
      const ICD10Fields = [
        {
          label: "ICD10 Display",
          value: condition.icd10Display,
        },
        {
          label: "ICD10 Code",
          value: condition.icd10Code,
        },
        {
          label: "ICD10 System",
          value: condition.icd10System,
        },
      ];
      const SNOMEDFields = [
        {
          label: "SNOMED Display",
          value: condition.snomedDisplay,
        },
        {
          label: "SNOMED Code",
          value: condition.snomedCode,
        },
        {
          label: "SNOMED System",
          value: condition.snomedSystem,
        },
      ];

      if (icd10Code) {
        data = data.concat(ICD10Fields);
      }

      if (snomedCode) {
        data = data.concat(SNOMEDFields);
      }

      return {
        id: condition.id,
        data: [...data],
      };
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
