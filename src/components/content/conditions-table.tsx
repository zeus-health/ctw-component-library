import {
  ConditionFilters,
  getConfirmedConditions,
  getLensConditions,
} from "@/fhir/conditions";
import { ConditionModel } from "@/models/conditions";
import cx from "classnames";
import { orderBy } from "lodash";
import { useEffect, useState } from "react";
import { useCTW } from "../core/ctw-provider";
import { ConditionsTableBase } from "./conditions-table-base";

const DEFAULT_ERR_MSG =
  "There was an error fetching conditions for this patient. Refresh the page or contact your organization's technical support if this issue persists.";

export type ConditionsTableProps = {
  className?: string;
  patientUPID: string;
  errorMessage?: string;
  showTableHead?: boolean;
  isConfirmed?: boolean;
  includeInactive?: boolean;
};

export function ConditionsTable({
  className,
  patientUPID,
  errorMessage = DEFAULT_ERR_MSG,
  showTableHead = true,
  isConfirmed = true,
  includeInactive = false,
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
            patientUPID,
            conditionFilter
          );
        } else {
          conditionResources = await getLensConditions(
            fhirClient,
            patientUPID,
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
  }, [patientUPID, isConfirmed, includeInactive]);

  return (
    <div className={cx(className)}>
      <ConditionsTableBase
        conditions={conditions}
        isLoading={isLoading}
        message={message}
        showTableHead={showTableHead}
      />
    </div>
  );
}
