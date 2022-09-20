import {
  getAddConditionData,
  getEditingOrAddingFromLensConditionData,
} from "@/components/content/forms/condition-helpers";
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
import { usePatient } from "../core/patient-provider";
import { ToggleControl } from "../core/toggle-control";
import { ConditionHistoryDrawer } from "./conditions-history-drawer";
import { ConditionsTableBase } from "./conditions-table-base";
import { conditionSchema, createCondition } from "./forms/conditions";
import {
  DrawerFormWithFields,
  FormEntry,
} from "./forms/drawer-form-with-fields";

export type ConditionsProps = {
  className?: string;
};

const EMPTY_MESSAGE = "No conditions found";
const ERROR_MSG =
  "There was an error fetching conditions for this patient. Refresh the page or contact your organization's technical support if this issue persists.";

export function Conditions({ className }: ConditionsProps) {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [historyDrawerIsOpen, setHistoryDrawerIsOpen] = useState(false);
  const [confirmed, setConfirmed] = useState<ConditionModel[]>([]);
  const [confirmedMessage, setConfirmedMessage] = useState(EMPTY_MESSAGE);
  const [confirmedIsLoading, setConfirmedIsLoading] = useState(true);
  const [notReviewed, setNotReviewed] = useState<ConditionModel[]>([]);
  const [notReviewedIsLoading, setNotReviewedIsLoading] = useState(true);
  const [notReviewedMessage, setNotReviewedMessage] = useState(EMPTY_MESSAGE);
  const [includeInactive, setIncludeInactive] = useState(true);
  const [patient, setPatient] = useState<PatientModel>();
  const [formAction, setFormAction] = useState("");
  const [currentSelectedData, setCurrentlySelectedData] =
    useState<FormEntry[]>();
  const [currentlyClickedCondition, setcurrentlyClickedCondition] =
    useState<ConditionModel>();

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
      setPatient(patientTemp);

      if (patient) {
        // use AllSettled instead of all as we want confirmed to still if lens fails
        const [confirmedResponse, notReviewedResponse] =
          await Promise.allSettled([
            getConfirmedConditions(fhirClient, patient.UPID, conditionFilter),
            getLensConditions(fhirClient, patient.UPID),
          ]);

        setNotReviewedIsLoading(false);
        setConfirmedIsLoading(false);

        /* notReviewedConditons depends confirmedConditions so that we can correctly filter out 
         conditions that appear in confirmedConditions from notReviewedConditons */
        if (confirmedResponse.status === "fulfilled") {
          setConfirmed(
            confirmedResponse.value.map((c) => new ConditionModel(c))
          );
          const ICD10ConfirmedCodes = confirmedResponse.value.map(
            (c) => new ConditionModel(c).icd10
          );

          if (notReviewedResponse.status === "fulfilled") {
            const notReviewedConditionsFiltered =
              notReviewedResponse.value.filter(
                (c) =>
                  !ICD10ConfirmedCodes.includes(new ConditionModel(c).icd10)
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
    }
    load();
  }, [includeInactive, patientPromise, getCTWFhirClient, patient]);

  const addNewCondition = () => {
    const newCondition: fhir4.Condition = {
      resourceType: "Condition",
      subject: { type: "Patient", reference: `Patient/${patient?.id}` },
    };
    setDrawerIsOpen(true);
    setFormAction("Add");
    setCurrentlySelectedData(
      getAddConditionData({
        condition: new ConditionModel(newCondition),
      })
    );
  };

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
          onClick={addNewCondition}
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
              rowActions={(condition) => [
                {
                  name: "Edit",
                  action: () => {
                    if (patient) {
                      setDrawerIsOpen(true);
                      setFormAction("Edit");
                      setCurrentlySelectedData(
                        getEditingOrAddingFromLensConditionData({
                          condition,
                          patientID: patient.id,
                        })
                      );
                    }
                  },
                },
                {
                  name: "View History",
                  action: () => {
                    setHistoryDrawerIsOpen(true);
                    setcurrentlyClickedCondition(condition);
                  },
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
              rowActions={(condition) => [
                {
                  name: "Add",
                  action: () => {
                    if (patient) {
                      setDrawerIsOpen(true);
                      setFormAction("Add");
                      setCurrentlySelectedData(
                        getEditingOrAddingFromLensConditionData({
                          condition,
                          patientID: patient.id,
                        })
                      );
                    }
                  },
                },
                {
                  name: "View History",
                  action: () => {
                    setHistoryDrawerIsOpen(true);
                    setcurrentlyClickedCondition(condition);
                  },
                },
              ]}
            />
          </div>
        </div>
      </div>

      {patient && (
        <DrawerFormWithFields
          patientID={patient.id}
          title={`${formAction} Condition`}
          action={createCondition}
          data={currentSelectedData}
          schema={conditionSchema}
          isOpen={drawerIsOpen}
          onClose={() => setDrawerIsOpen(false)}
        />
      )}
      {currentlyClickedCondition && (
        <ConditionHistoryDrawer
          isOpen={historyDrawerIsOpen}
          onClose={() => setHistoryDrawerIsOpen(false)}
          condition={currentlyClickedCondition}
        />
      )}
    </div>
  );
}
