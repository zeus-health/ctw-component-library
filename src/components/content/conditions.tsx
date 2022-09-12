import {
  ConditionFilters,
  getConfirmedConditions,
  getLensConditions,
} from "@/fhir/conditions";
import { ConditionModel } from "@/models/conditions";
import { conditionSchema, getConditionFormData } from "@/utils/helpers";
import cx from "classnames";
import { useEffect, useState } from "react";
import { useCTW } from "../core/ctw-provider";
import { DrawerFormWithFields } from "../core/forms/drawer-form-with-fields";
import { usePatient } from "../core/patient-provider";
import { ToggleControl } from "../core/toggle-control";
import { ConditionsTableBase } from "./conditions-table-base";

export type ConditionsProps = {
  className?: string;
};

const DEFAULT_ERR_MSG =
  "There was an error fetching conditions for this patient. Refresh the page or contact your organization's technical support if this issue persists.";

export function Conditions({ className }: ConditionsProps) {
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

  const { patientUPIDPromise } = usePatient();

  const handleFormChange = () => setIncludeInactive(!includeInactive);

  useEffect(() => {
    async function load() {
      const conditionFilter: ConditionFilters = includeInactive
        ? {
            "clinical-status": ["active", "recurrence", "relapse"],
          }
        : {};

      const fhirClient = await getCTWFhirClient();
      const patientUPID = await patientUPIDPromise;

      // use AllSettled instead of all as we want confirmed to still if lens fails
      const [confirmedConditionInfo, notReviewedConditionInfo] =
        await Promise.allSettled([
          getConfirmedConditions(fhirClient, patientUPID, conditionFilter),
          getLensConditions(fhirClient, patientUPID),
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
  }, [includeInactive, patientUPIDPromise, getCTWFhirClient]);

  const newCondition = new ConditionModel({
    resourceType: "Condition",
    subject: { reference: `Patient/`, display: "" },
  });

  return (
    <div
      className={cx(
        "ctw-border ctw-border-solid ctw-border-divider-light",
        className
      )}
    >
      <div className="ctw-flex ctw-h-11 ctw-items-center ctw-justify-between ctw-bg-bg-light ctw-p-3">
        <div className="ctw-title">Conditions</div>
        <button
          type="button"
          className="ctw-btn-clear ctw-link"
          onClick={() => setAddConditionIsOpen(true)}
        >
          + Add Condition
        </button>
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
              rowActions={[
                { name: "Edit", action: () => setAddConditionIsOpen(true) },
                {
                  name: "View History",
                  action: () => setAddConditionIsOpen(true),
                },
              ]}
            />
          </div>

          <div className="ctw-space-y-3">
            <div className="ctw-title ctw-ml-3">Not Reviewed</div>
            <ConditionsTableBase
              conditions={notReviewedConditions}
              isLoading={notReviewedConditionsIsLoading}
              showTableHead={false}
              message={notReviewedConditionsMessage}
              rowActions={[
                { name: "Add", action: () => setAddConditionIsOpen(true) },
                {
                  name: "View History",
                  action: () => setAddConditionIsOpen(true),
                },
              ]}
            />
          </div>
        </div>
      </div>

      <DrawerFormWithFields
        title="Add Condition"
        action="createCondition"
        data={getConditionFormData(newCondition)}
        schema={conditionSchema}
        isOpen={addConditionIsOpen}
        onClose={() => setAddConditionIsOpen(false)}
      />

      {/* <ConditionFormDrawer
        isOpen={addConditionIsOpen}
        onClose={() => setAddConditionIsOpen(false)}
      /> */}
    </div>
  );
}
