import { getIncludedResources } from "@/fhir/bundle";
import { getConditionHistory } from "@/fhir/conditions";
import { useFhirClientRef } from "@/fhir/utils";
import { ConditionModel } from "@/models/conditions";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CodingList } from "../core/coding-list";
import { CollapsibleDataListProps } from "../core/collapsible-data-list";
import {
  CollapsibleDataListStack,
  CollapsibleDataListStackEntries,
} from "../core/collapsible-data-list-stack";
import { usePatient } from "../core/patient-provider";
import { Spinner } from "../core/spinner";

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
    id: condition.id,
    date: condition.recordedDate,
    title: condition.snomedDisplay || condition.icd10Display,
    subTitle: condition.patient?.organization?.name,
    data: detailData,
  };
}

export function ConditionHistory({ condition }: { condition: ConditionModel }) {
  const [conditions, setConditions] = useState<CollapsibleDataListStackEntries>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [patientUPID, setPatientUPID] = useState("");
  const [conditionForSearch, setConditionForSearch] =
    useState<ConditionModel>();
  const fhirClientRef = useFhirClientRef();
  const patientResponse = usePatient();
  const historyResponse = useQuery(
    ["conditions", patientUPID, conditionForSearch],
    getConditionHistory,
    {
      enabled: !!patientUPID && !!fhirClientRef.current,
      meta: { fhirClientRef },
    }
  );

  useEffect(() => {
    async function load() {
      setConditionForSearch(condition);

      if (patientResponse.data) {
        setPatientUPID(patientResponse.data.UPID);
      }

      if (historyResponse.data) {
        const includedResources = getIncludedResources(
          historyResponse.data.bundle
        );
        const filteredConditions = historyResponse.data.conditions.map(
          (c) => new ConditionModel(c, includedResources)
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
  }, [condition, patientResponse.data, historyResponse.data]);

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
      <div className="ctw-space-y-6">
        <div>
          <div className="ctw-text-2xl">
            {condition.display} ({condition.icd10Code || condition.snomedCode})
          </div>
          <div className="ctw-text-sm">{condition.ccsGrouping}</div>
        </div>
        <CollapsibleDataListStack
          entries={conditions}
          limit={CONDITION_HISTORY_LIMIT}
        />
      </div>
    );
  }

  return conditionHistoryDisplay();
}
