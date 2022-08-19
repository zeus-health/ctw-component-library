import { getConditions } from "@/fhir/conditions";
import { ConditionModel } from "@/models/conditions";
import { useEffect, useState } from "react";
import { useCTW } from "../core/ctw-provider";
import { ConditionsTableBase } from "./conditions-table-base";

const DEFAULT_ERR_MSG =
  "There was an error fetching conditions for this patient. Refresh the page or contact your organization's technical support if this issue persists.";

export type ConditionsTableProps = {
  patientUPID: string;
  errorMessage?: string;
};

export function ConditionsTable({
  patientUPID,
  errorMessage = DEFAULT_ERR_MSG,
}: ConditionsTableProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [conditions, setConditions] = useState<ConditionModel[]>([]);
  const { getCTWFhirClient } = useCTW();
  const [message, setMessage] = useState("No conditions found");

  useEffect(() => {
    async function load() {
      let conditionResources: fhir4.Condition[] = [];
      try {
        const fhirClient = await getCTWFhirClient();
        conditionResources = await getConditions(fhirClient, patientUPID, {});
      } catch (e) {
        setMessage(errorMessage);
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
