import { orderBy } from "lodash";
import { useEffect, useState } from "react";

import { useCTW } from "../core/ctw-provider";

import { ConditionsTableBase } from "./conditions-table-base";

import {
  ConditionFilters,
  getConfirmedConditions,
  getLensConditions,
} from "@/fhir/conditions";
import { getUPIDfromPatientID } from "@/fhir/search-helpers";
import { ConditionModel } from "@/models/conditions";
import { usePatientContext } from "../core/patient-provider";

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
  const { patientID, systemURL } = usePatientContext();

  useEffect(() => {
    async function load() {
      const conditionFilter: ConditionFilters = includeInactive
        ? {
            "clinical-status": "active",
          }
        : {};
      const patientFilter = {};

      let conditionResources: fhir4.Condition[] = [];
      try {
        const fhirClient = await getCTWFhirClient();

        const { patientUPID, system } = await getUPIDfromPatientID(
          fhirClient,
          patientID,
          systemURL,
          patientFilter
        );

        console.log("UPID is yooo", patientUPID);
        console.log("System is ", system);

        if (isConfirmed) {
          conditionResources = await getConfirmedConditions(
            fhirClient,
            patientUPID,
            system,
            conditionFilter
          );
        } else {
          conditionResources = await getLensConditions(
            fhirClient,
            patientUPID,
            system,
            conditionFilter
          );
        }
      } catch (e) {
        console.log("e", e);
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
