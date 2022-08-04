import { getConditions } from "@/fhir/conditions";
import { ConditionModel } from "@/models/conditions";
import { errorMessage } from "@/utils/errors";
import { useEffect, useState } from "react";
import { useCTW } from "../core/ctw-provider";
import { ConditionsTableBase } from "./conditions-table-base";

export type ConditionsTableProps = {
  patientUPID: string;
};

export function ConditionsTable({ patientUPID }: ConditionsTableProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [conditions, setConditions] = useState<ConditionModel[]>([]);
  const { fhirClient } = useCTW();
  const [message, setMessage] = useState("No conditions found");

  useEffect(() => {
    async function load() {
      let conditionResources: fhir4.Condition[] = [];
      try {
        conditionResources = await getConditions(fhirClient, patientUPID, {});
      } catch (e) {
        setMessage(errorMessage(e));
      }

      setConditions(conditionResources.map((c) => new ConditionModel(c)));
      setIsLoading(false);
    }
    load();
  }, [patientUPID]);

  return (
    <ConditionsTableBase
      conditions={conditions}
      isLoading={isLoading}
      message={message}
    />
  );
}
