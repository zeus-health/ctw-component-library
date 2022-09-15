import {
  conditionSchema,
  getConditionFormData,
} from "@/components/core/forms/helpers";
import {
  ConditionFilters,
  getConfirmedConditions,
  getLensConditions,
} from "@/fhir/conditions";
import { ConditionModel } from "@/models/conditions";
import { PatientModel } from "@/models/patients";
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

const EMPTY_MESSAGE = "No conditions found";
const ERROR_MSG =
  "There was an error fetching conditions for this patient. Refresh the page or contact your organization's technical support if this issue persists.";

export function Conditions({ className }: ConditionsProps) {
  const [addConditionIsOpen, setAddConditionIsOpen] = useState(false);
  const [confirmed, setConfirmed] = useState<ConditionModel[]>([]);
  const [confirmedMessage, setConfirmedMessage] = useState(EMPTY_MESSAGE);
  const [confirmedIsLoading, setConfirmedIsLoading] = useState(true);
  const [notReviewed, setNotReviewed] = useState<ConditionModel[]>([]);
  const [notReviewedIsLoading, setNotReviewedIsLoading] = useState(true);
  const [notReviewedMessage, setNotReviewedMessage] = useState(EMPTY_MESSAGE);
  const [includeInactive, setIncludeInactive] = useState(true);
  const [patient, setPatient] = useState<PatientModel>();
  const [currentlySelected, setCurrentlySelected] = useState<ConditionModel>();

  const { getCTWFhirClient } = useCTW();
  const { patientPromise } = usePatient();

  const handleFormChange = () => setIncludeInactive(!includeInactive);

  useEffect(() => {
    async function load() {
      const conditionFilter: ConditionFilters = includeInactive
        ? {
            "clinical-status": ["active", "recurrence", "relapse"],
          }
        : {};

      const fhirClient = await getCTWFhirClient();
      const patientTemp = await patientPromise;
      const patientUPID = patientTemp.UPID;
      setPatient(patientTemp);

      // use AllSettled instead of all as we want confirmed to still if lens fails
      const [confirmedConditionInfo, notReviewedConditionInfo] =
        await Promise.allSettled([
          getConfirmedConditions(fhirClient, patientUPID, conditionFilter),
          getLensConditions(fhirClient, patientUPID),
        ]);

      setNotReviewedIsLoading(false);
      setConfirmedIsLoading(false);

      /* notReviewedConditons depends confirmedConditions so that we can correctly filter out 
         conditions that appear in confirmedConditions from notReviewedConditons */
      if (confirmedConditionInfo.status === "fulfilled") {
        setConfirmed(
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
          setNotReviewed(
            notReviewedConditionsFiltered.map((c) => new ConditionModel(c))
          );
        } else {
          setNotReviewed([]);
          setNotReviewedMessage(ERROR_MSG);
        }
      } else {
        setConfirmed([]);
        setConfirmedMessage(ERROR_MSG);
        setNotReviewed([]);
        setNotReviewedMessage(ERROR_MSG);
      }
    }
    load();
  }, [includeInactive, patientPromise, getCTWFhirClient, patient]);

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

      <div className="ctw-space-y-5 ctw-bg-bg-white ctw-py-3 ctw-px-4">
        <div className="ctw-space-y-5 ctw-py-3 ctw-px-4">
          <ToggleControl
            onFormChange={handleFormChange}
            toggleProps={{ name: "conditions", text: "Include Inactive" }}
          />
          <div className="ctw-space-y-3">
            <div className="ctw-title ctw-ml-3">Confirmed</div>

            <ConditionsTableBase
              conditions={confirmed}
              isLoading={confirmedIsLoading}
              message={confirmedMessage}
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
              conditions={notReviewed}
              isLoading={notReviewedIsLoading}
              showTableHead={false}
              message={notReviewedMessage}
              rowActions={[
                {
                  name: "Add",
                  action: (_, condition) => {
                    setAddConditionIsOpen(true);
                    setCurrentlySelected(condition);
                  },
                },
                {
                  name: "View History",
                  action: () => setAddConditionIsOpen(true),
                },
              ]}
            />
          </div>
        </div>
      </div>

      {patient && currentlySelected && (
        <DrawerFormWithFields
          patientID={patient.id}
          title="Add Condition"
          actionName="createCondition"
          data={getConditionFormData({
            condition: currentlySelected,
            patientID: patient.id,
          })}
          schema={conditionSchema}
          isOpen={addConditionIsOpen}
          onClose={() => setAddConditionIsOpen(false)}
        />
      )}
    </div>
  );
}
