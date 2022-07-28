import { getConditions } from "@/fhir/conditions";
import { ConditionModel } from "@/models/conditions";
import { useEffect, useState } from "react";
import { useCTW } from "../core/ctw-provider";
import { ConditionsTable } from "./conditions-table";

export type ConditionsTableLoaderProps = {
  patientUPID: string;
};

export function ConditionsTableLoader({
  patientUPID,
}: ConditionsTableLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [conditions, setConditions] = useState<ConditionModel[]>([]);
  const { fhirClient } = useCTW();

  useEffect(() => {
    async function load() {
      const conditionResources = await getConditions(
        fhirClient,
        patientUPID,
        {}
      );
      setConditions(conditionResources.map((c) => new ConditionModel(c)));
      setIsLoading(false);
    }
    load();
  }, [patientUPID]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return <ConditionsTable conditions={conditions} />;
}
