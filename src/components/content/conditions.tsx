import { useEffect, useState } from "react";

import { ToggleControl } from "../core/toggle-control";

import {
  ConditionFilters,
  getConfirmedConditions,
  getLensConditions,
} from "@/fhir/conditions";
import { ConditionModel } from "@/models/conditions";
import { useCTW } from "../core/ctw-provider";
import { ConditionFormDrawer } from "./condition-form-drawer";
import { ConditionsTableBase } from "./conditions-table-base";

export type ConditionsProps = {
  patientUPID: string;
};

const DEFAULT_ERR_MSG =
  "There was an error fetching conditions for this patient. Refresh the page or contact your organization's technical support if this issue persists.";

export function Conditions({ patientUPID }: ConditionsProps) {
  const [addConditionIsOpen, setAddConditionIsOpen] = useState(false);

  const [confirmedConditions, setConfirmedConditions] =
    useState<ConditionModel[]>();
  const [confirmedConditionsMessage, setConfirmedConditionsMessage] = useState(
    "No conditions found"
  );
  const [confirmedConditionsIsLoading, setConfirmedConditionsIsLoading] =
    useState(true);

  const [notReviewedConditions, setNotReviewedConditions] =
    useState<ConditionModel[]>();
  const [notReviewedConditionsIsLoading, setNotConfirmedConditionsIsLoading] =
    useState(true);
  const [notReviewedConditionsMessage, setNotReviewedConditionsMessage] =
    useState("No conditions found");

  const [includeInactive, setIncludeInactive] = useState(true);
  const { getCTWFhirClient } = useCTW();

  const handleFormChange = () => setIncludeInactive(!includeInactive);

  useEffect(() => {
    async function load() {
      const conditionFilter: ConditionFilters = includeInactive
        ? {
            "clinical-status": "active",
          }
        : {};

      const fhirClient = await getCTWFhirClient();

      const [confirmedConditionInfo, notReviewedConditionInfo] =
        await Promise.allSettled([
          getConfirmedConditions(fhirClient, patientUPID, conditionFilter),
          getLensConditions(fhirClient, patientUPID, conditionFilter),
        ]);

      setNotConfirmedConditionsIsLoading(false);
      setConfirmedConditionsIsLoading(false);

      if (confirmedConditionInfo.status === "fulfilled") {
        setConfirmedConditions(
          confirmedConditionInfo.value.map((c) => new ConditionModel(c))
        );
      } else {
        setConfirmedConditions([]);
        setConfirmedConditionsMessage(DEFAULT_ERR_MSG);
      }
      if (notReviewedConditionInfo.status === "fulfilled") {
        setNotReviewedConditions(
          notReviewedConditionInfo.value.map((c) => new ConditionModel(c))
        );
      } else {
        setNotReviewedConditions([]);
        setNotReviewedConditionsMessage(DEFAULT_ERR_MSG);
      }
    }
    load();
  }, [patientUPID]);

  return (
    <div className="ctw-border ctw-border-solid ctw-border-divider-light">
      <div className="ctw-flex ctw-h-11 ctw-items-center ctw-justify-between ctw-bg-bg-light ctw-p-3">
        <div className="ctw-title">Conditions</div>
        <div className="ctw-link" onClick={() => setAddConditionIsOpen(true)}>
          + Add Condition
        </div>
      </div>

      <div className="ctw-space-y-5 ctw-py-3 ctw-px-4 ">
        <div className="ctw-space-y-5 ctw-py-3 ctw-px-4">
          <ToggleControl
            onFormChange={handleFormChange}
            toggleProps={{ name: "conditions", text: "Include Inactive" }}
          />
          <div className="ctw-space-y-3">
            <div className="ctw-title ctw-ml-3">Confirmed</div>
            <ConditionsTableBase
              conditions={confirmedConditions}
              isLoading={confirmedConditionsIsLoading}
              message={confirmedConditionsMessage}
            />
          </div>

          <div className="ctw-space-y-3">
            <div className="ctw-title ctw-ml-3">Not Reviewed</div>
            <ConditionsTableBase
              showTableHead={false}
              isLoading={notReviewedConditionsIsLoading}
              conditions={notReviewedConditions}
              message={notReviewedConditionsMessage}
            />
          </div>
        </div>
      </div>

      <ConditionFormDrawer
        isOpen={addConditionIsOpen}
        onClose={() => setAddConditionIsOpen(false)}
      />
    </div>
  );
}
