import { useEffect, useState } from "react";

import { useCTW } from "../core/ctw-provider";
import { ToggleControl } from "../core/toggle-control";

import { ConditionFormDrawer } from "./condition-form-drawer";
import { ConditionsTableBase } from "./conditions-table-base";

import {
  ConditionFilters,
  getConfirmedConditions,
  getLensConditions,
} from "@/fhir/conditions";
import { ConditionModel } from "@/models/conditions";

export type ConditionsProps = {
  patientUPID: string;
};

const DEFAULT_ERR_MSG =
  "There was an error fetching conditions for this patient. Refresh the page or contact your organization's technical support if this issue persists.";

export function Conditions({ patientUPID }: ConditionsProps) {
  const [addConditionIsOpen, setAddConditionIsOpen] = useState(false);

  const [confirmedConditions, setConfirmedConditions] = useState<
    ConditionModel[]
  >([]);
  const [confirmedConditionsMessage, setConfirmedConditionsMessage] = useState(
    "No conditions found"
  );
  const [confirmedConditionsIsLoading, setConfirmedConditionsIsLoading] =
    useState(true);

  const [notReviewedConditions, setNotReviewedConditions] = useState<
    ConditionModel[]
  >([]);
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

      // use AllSettled instead of all as we want confirmed to still if lens fails
      const [confirmedConditionInfo, notReviewedConditionInfo] =
        await Promise.allSettled([
          getConfirmedConditions(fhirClient, patientUPID, conditionFilter),
          getLensConditions(fhirClient, patientUPID, conditionFilter),
        ]);

      setNotConfirmedConditionsIsLoading(false);
      setConfirmedConditionsIsLoading(false);

      /* notReviewedConditons depends confirmedConditions so that we can correctly filter out 
         conditions that appear in confirmedConditions from notReviewedConditons */
      if (confirmedConditionInfo.status === "fulfilled") {
        setConfirmedConditions(
          confirmedConditionInfo.value.map((c) => new ConditionModel(c))
        );
        const ICD10ConfirmedCodes = confirmedConditionInfo.value.map(
          (c) => new ConditionModel(c).icd10
        );

        if (notReviewedConditionInfo.status === "fulfilled") {
          const notReviewedConditionsFiltered =
            notReviewedConditionInfo.value.filter(
              (c) => !ICD10ConfirmedCodes.includes(new ConditionModel(c).icd10)
            );
          setNotReviewedConditions(
            notReviewedConditionsFiltered.map((c) => new ConditionModel(c))
          );
        } else {
          setNotReviewedConditions([]);
          setNotReviewedConditionsMessage(DEFAULT_ERR_MSG);
        }
      } else {
        setConfirmedConditions([]);
        setConfirmedConditionsMessage(DEFAULT_ERR_MSG);
        setNotReviewedConditions([]);
        setNotReviewedConditionsMessage(DEFAULT_ERR_MSG);
      }
    }
    load();
    // Including getCTWFhirClient causes an infinite loop so disabling this
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientUPID, includeInactive]);

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
              conditions={notReviewedConditions}
              isLoading={notReviewedConditionsIsLoading}
              showTableHead={false}
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
