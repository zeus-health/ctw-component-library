import { orderBy } from "lodash";
import { useContext, useEffect, useState } from "react";

import { useCTW } from "../core/ctw-provider";

import { ConditionsTableBase } from "./conditions-table-base";

import {
  ConditionFilters,
  getConfirmedConditions,
  getLensConditions,
} from "@/fhir/conditions";
import { ConditionModel } from "@/models/conditions";
import { CTWIDContext } from "../core/id-provider";

const DEFAULT_ERR_MSG =
  "There was an error fetching conditions for this patient. Refresh the page or contact your organization's technical support if this issue persists.";

export type ConditionsTableProps = {
  className?: string;
  errorMessage?: string;
  showTableHead?: boolean;
  isConfirmed?: boolean;
  includeInactive?: boolean;
};

export function ConditionsTable({
  className,
  errorMessage = DEFAULT_ERR_MSG,
  showTableHead = true,
  isConfirmed = true,
  includeInactive = false,
}: ConditionsTableProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [conditions, setConditions] = useState<ConditionModel[]>([]);
  const { getCTWFhirClient } = useCTW();
  const [message, setMessage] = useState("No conditions found");
  const { patientID, systemURL } = useContext(CTWIDContext);

  console.log("patientID is: ", patientID);
  console.log("System url is: ", systemURL);

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
            conditionFilter
          );
        } else {
          conditionResources = await getLensConditions(
            fhirClient,
            conditionFilter
          );
        }
      } catch (e) {
        console.log(e);
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
