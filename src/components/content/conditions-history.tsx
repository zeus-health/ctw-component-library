import {
  getConditionFilterTokens,
  getConditionHistory,
} from "@/fhir/conditions";
import { useFhirClientRef } from "@/fhir/utils";
import { ConditionModel } from "@/models/conditions";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  DataListStack,
  DataListStackEntries,
  DataListStackEntry,
} from "../core/data-stack-list";
import { usePatient } from "../core/patient-provider";
import { Spinner } from "../core/spinner";

const CONDITION_HISTORY_LIMIT = 10;

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

  if (condition.icd10Code) {
    data = data.concat(ICD10Fields);
  }

  if (condition.snomedCode) {
    data = data.concat(SNOMEDFields);
  }

  return {
    id: condition.id,
    data: [...data],
  };
}

export function ConditionHistory({ condition }: { condition: ConditionModel }) {
  const [conditions, setConditions] = useState<DataListStackEntries>([]);
  const [loading, setLoading] = useState(true);
  const [patientUPID, setPatientUPID] = useState("");
  const [conditionTokens, setConditionTokens] = useState<string[]>([]);
  const fhirClientRef = useFhirClientRef();
  const { patientPromise } = usePatient();
  const historyResponse = useQuery(
    ["conditions", patientUPID, conditionTokens],
    getConditionHistory,
    {
      enabled: !!patientUPID && !!fhirClientRef,
      meta: { fhirClientRef },
    }
  );

  useEffect(() => {
    async function load() {
      setConditionTokens(getConditionFilterTokens(condition));
      const patientTemp = await patientPromise;
      if (patientTemp.UPID) {
        setPatientUPID(patientTemp.UPID);
      }

      if (historyResponse.data) {
        const filteredConditions = historyResponse.data.map(
          (c) => new ConditionModel(c)
        );

        setConditions(filteredConditions.map((model) => setupData(model)));
        setLoading(false);
      }
    }

    load();

    return function cleanup() {
      setConditions([]);
      setLoading(true);
    };
  }, [condition, patientPromise, historyResponse.data]);

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

  return <DataListStack entries={conditions} limit={CONDITION_HISTORY_LIMIT} />;
}
