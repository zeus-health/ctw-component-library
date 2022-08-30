import {
  ConditionFilters,
  getConfirmedConditions,
  getLensConditions
} from "@/fhir/conditions";
import { ConditionModel } from "@/models/conditions";
import { orderBy } from "lodash";
import { useEffect, useState } from "react";
import { useCTW } from "../core/ctw-provider";
import { ConditionsTableBase } from "./conditions-table-base";

const DEFAULT_ERR_MSG =
  "There was an error fetching conditions for this patient. Refresh the page or contact your organization's technical support if this issue persists.";

export type ConditionsTableProps = {
  patientID: string;
  className?: string;
  errorMessage?: string;
  showTableHead?: boolean;
  isConfirmed?: boolean;
  includeInactive?: boolean;
  system: string;
};

export function ConditionsTable({
  patientID,
  className,
  errorMessage = DEFAULT_ERR_MSG,
  showTableHead = true,
  isConfirmed = true,
  includeInactive = false,
  system,
}: ConditionsTableProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [conditions, setConditions] = useState<ConditionModel[]>([]);
  const { getCTWFhirClient } = useCTW();
  const [message, setMessage] = useState("No conditions found");

  useEffect(() => {
    async function load() {
      const conditionFilter: ConditionFilters = includeInactive
        ? {
            "clinical-status": "active",
          }
        : {};

      let conditionResources: fhir4.Condition[] = [];
      try {
        const fhirClient = await getCTWFhirClient();
        if (isConfirmed) {
          conditionResources = await getConfirmedConditions(
            fhirClient,
            patientID,
            conditionFilter
          );
        } else {
          conditionResources = await getLensConditions(
            fhirClient,
            patientID,
            conditionFilter
          );
        }
      } catch (e) {
        setMessage(errorMessage);
      }

      const conditionModels = conditionResources.map(
        (c) => new ConditionModel(c)
      );

      const sortedConditionModels = orderBy(conditionModels, "display", "asc");

      setConditions(sortedConditionModels);
      setIsLoading(false);
    }
    load();
  }, [patientID, isConfirmed, includeInactive]);

  return (
    <ConditionsTableBase
      className={className}
      conditions={conditions}
      isLoading={isLoading}
      message={message}
      showTableHead={showTableHead}
    />
  );
}
