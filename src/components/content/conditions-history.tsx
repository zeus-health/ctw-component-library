import { getConditionHistory } from "@/fhir/conditions";
import { ConditionModel } from "@/models/conditions";
import { useEffect, useState } from "react";
import { useCTW } from "../core/ctw-provider";
import {
  DataListStack,
  DataListStackEntries,
  DataListStackEntry,
} from "../core/data-stack-list";
import { usePatient } from "../core/patient-provider";
import { Spinner } from "../core/spinner";

const CONDITION_HISTORY_LIMIT = 2;

export type ConditionHistoryProps = {
  icd10?: string | undefined;
};

export function ConditionHistory({ icd10 }: ConditionHistoryProps) {
  const [conditions, setConditions] = useState<DataListStackEntries>([]);
  const [loading, setLoading] = useState(true);
  const { getCTWFhirClient } = useCTW();
  const { patientUPIDPromise } = usePatient();

  useEffect(() => {
    async function load() {
      const fhirClient = await getCTWFhirClient();
      const patientUPID = await patientUPIDPromise;

      const allConditions = await getConditionHistory(fhirClient, patientUPID);
      const models = allConditions.map(
        (condition) => new ConditionModel(condition)
      );
      const filteredConditions = models.filter(
        (condition) => condition.icd10 === icd10
      );
      setConditions(filteredConditions.map((model) => setupData(model)));
      setLoading(false);
    }

    load();
  }, [getCTWFhirClient, icd10, patientUPIDPromise]);

  function setupData(condition: ConditionModel): DataListStackEntry {
    return {
      id: condition.id,
      data: [
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
        {
          label: "Display",
          value: condition.snomedDisplay,
        },
        {
          label: "Code",
          value: condition.snomedCode,
        },
        {
          label: "System",
          value: condition.snomedSystem,
        },
      ],
    };
  }

  if (!icd10) {
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
