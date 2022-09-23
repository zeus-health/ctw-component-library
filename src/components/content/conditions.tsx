import {
  getAddConditionData,
  getEditingConfirmedConditionData,
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
import "./conditions.scss";
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
  const [conditionForHistory, setConditionForHistory] =
    useState<ConditionModel>();

  const { getCTWFhirClient } = useCTW();
  const { patientPromise } = usePatient();

  const handleFormChange = () => setIncludeInactive(!includeInactive);

  const handleConditionEdit = (condition: ConditionModel) => {
    if (patient) {
      setDrawerIsOpen(true);
      setFormAction("Edit");
      setCurrentlySelectedData(getEditingConfirmedConditionData({ condition }));
    }
  };

  const handleNotReviewedCondition = (condition: ConditionModel) => {
    if (patient) {
      setDrawerIsOpen(true);
      setFormAction("Add");
      setCurrentlySelectedData(getAddConditionData({ condition }));
    }
  };

  const handleAddNewCondition = () => {
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
            (c) => new ConditionModel(c).icd10Code
          );

          if (notReviewedResponse.status === "fulfilled") {
            const notReviewedConditionsFiltered =
              notReviewedResponse.value.filter(
                (c) =>
                  !ICD10ConfirmedCodes.includes(new ConditionModel(c).icd10Code)
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

  return (
    <div className={cx("ctw-conditions", className)}>
      <div className="ctw-flex ctw-h-11 ctw-items-center ctw-justify-between ctw-bg-bg-light ctw-p-3">
        <div className="ctw-title">Conditions</div>
        <button
          type="button"
          className="ctw-btn-clear ctw-link"
          onClick={handleAddNewCondition}
        >
          + Add Condition
        </button>
      </div>

      <div className="ctw-conditions-body">
        <div className="ctw-space-y-3">
          <div className="ctw-conditions-title-container">
            <div className="ctw-title">Confirmed</div>
            <ToggleControl
              onFormChange={handleFormChange}
              toggleProps={{ name: "conditions", text: "Include Inactive" }}
            />
          </div>

          <ConditionsTableBase
            className="ctw-conditions-table"
            conditions={confirmed}
            isLoading={confirmedIsLoading}
            message={confirmedMessage}
            rowActions={(condition) => [
              {
                name: "Edit",
                action: () => {
                  handleConditionEdit(condition);
                },
              },
              {
                name: "View History",
                action: () => {
                  setHistoryDrawerIsOpen(true);
                  setConditionForHistory(condition);
                },
              },
            ]}
          />
        </div>

        <div className="ctw-space-y-3">
          <div className="ctw-conditions-title-container">
            <div className="ctw-title">Not Reviewed</div>
          </div>
          <ConditionsTableBase
            className="ctw-conditions-not-reviewed"
            conditions={notReviewed}
            isLoading={notReviewedIsLoading}
            message={notReviewedMessage}
            rowActions={(condition) => [
              {
                name: "Add",
                action: () => {
                  handleNotReviewedCondition(condition);
                },
              },
              {
                name: "View History",
                action: () => {
                  setHistoryDrawerIsOpen(true);
                  setConditionForHistory(condition);
                },
              },
            ]}
          />
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
      {conditionForHistory && (
        <ConditionHistoryDrawer
          isOpen={historyDrawerIsOpen}
          onClose={() => setHistoryDrawerIsOpen(false)}
          condition={conditionForHistory}
        />
      )}
    </div>
  );
}
