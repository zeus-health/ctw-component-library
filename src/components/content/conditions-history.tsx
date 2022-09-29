import { ACCEPTABLE_CODES, getConditionHistory } from "@/fhir/conditions";
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

export function ConditionHistory({ condition }: { condition: ConditionModel }) {
  const [conditions, setConditions] = useState<DataListStackEntries>([]);
  const [loading, setLoading] = useState(true);
  const [patientUPID, setPatientUPID] = useState("");
  const [searchParams, setSearchParams] = useState({});
  const fhirClientRef = useFhirClientRef();
  const { patientPromise } = usePatient();
  const historyResponse = useQuery(
    ["conditions", patientUPID, searchParams],
    getConditionHistory,
    {
      enabled: !!patientUPID && !!fhirClientRef,
      meta: { fhirClientRef },
    }
  );

  useEffect(() => {
    async function load() {
      const patientTemp = await patientPromise;
      if (patientTemp.UPID) {
        setPatientUPID(patientTemp.UPID);
      }
      console.log("history", historyResponse);

      if (historyResponse.data) {
        const filteredConditions = historyResponse.data.map(
          (c) => new ConditionModel(c)
        );

        const TagFilter = [];
        ACCEPTABLE_CODES.forEach((code) => {
          if (condition[code]) {
            TagFilter.push(`${condition}|${condition[code]}`);
          }
        });

        // const filteredConditions = models.filter(
        //   (condition) =>
        //     (condition.icd10Code === icd10Code &&
        //       typeof icd10Code !== "undefined") ||
        //     (condition.snomedCode === snomedCode &&
        //       typeof snomedCode !== "undefined")
        // );

        setConditions(filteredConditions.map((model) => setupData(model)));
        setLoading(false);
      }
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
