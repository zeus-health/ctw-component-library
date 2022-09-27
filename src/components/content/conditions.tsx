import {
  getAddConditionData,
  getEditingConfirmedConditionData,
} from "@/components/content/forms/condition-helpers";
import {
  ConditionFilters,
  getConfirmedConditions,
  getLensConditions,
} from "@/fhir/conditions";
import { useFhirClientRef } from "@/fhir/utils";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import { ConditionModel } from "@/models/conditions";
import { PatientModel } from "@/models/patients";
import { useQuery } from "@tanstack/react-query";
import cx from "classnames";
import { useEffect, useRef, useState } from "react";
import { useCTW } from "../core/ctw-provider";
import { usePatient } from "../core/patient-provider";
import { ToggleControl } from "../core/toggle-control";
import { ConditionHistoryDrawer } from "./conditions-history-drawer";
import { ConditionsTableBase } from "./conditions-table-base";
import "./conditions.scss";
import { conditionSchema, createOrEditCondition } from "./forms/conditions";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(containerRef);
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
  const [conditionFilter, setConditionFilter] = useState<ConditionFilters>({});
  const [patientUPID, setPatientUPID] = useState<string>("");
  const fhirClientRef = useFhirClientRef();
  const [currentSelectedData, setCurrentlySelectedData] =
    useState<FormEntry[]>();
  const [conditionForHistory, setConditionForHistory] =
    useState<ConditionModel>();
  const confirmedResponse = useQuery(
    ["conditions", patientUPID, conditionFilter],
    getConfirmedConditions,
    {
      enabled: !!patientUPID && !!fhirClientRef,
      meta: { fhirClientRef },
    }
  );

  const notReviewedResponse = useQuery(
    ["conditions", patientUPID],
    getLensConditions,
    {
      enabled: !!patientUPID && !!fhirClientRef,
      meta: { fhirClientRef },
    }
  );

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

  console.log("confirmed", confirmed);

  useEffect(() => {
    async function load() {
      const tempConditionFilters: ConditionFilters = includeInactive
        ? {
            "clinical-status": ["active", "recurrence", "relapse"],
          }
        : {};

      setConditionFilter(tempConditionFilters);
      const patientTemp = await patientPromise;

      setPatient(patientTemp);
      if (patient?.UPID) {
        setPatientUPID(patient.UPID);
      }

      /* notReviewedConditons depends confirmedConditions so that we can correctly filter out 
         conditions that appear in confirmedConditions from notReviewedConditons */
      if (confirmedResponse.data) {
        setNotReviewedIsLoading(false);
        setConfirmedIsLoading(false);
        setConfirmed(confirmedResponse.data.map((c) => new ConditionModel(c)));

        const codes = ["SNOMED", "ICD-10", "ICD-10CM", "ICD-9", "ICD-9CM"];

        const ICD10ConfirmedCodes = confirmedResponse.data.map(
          (c) => new ConditionModel(c).icd10Code
        );

        if (notReviewedResponse.data) {
          const notReviewedFiltered = notReviewedResponse.data.filter(
            (c) =>
              !ICD10ConfirmedCodes.includes(new ConditionModel(c).icd10Code)
          );

          setNotReviewed(notReviewedFiltered.map((c) => new ConditionModel(c)));
        } else {
          setNotReviewed([]);
          setNotReviewedMessage(ERROR_MSG);
        }
      }

      if (confirmedResponse.error) {
        setConfirmed([]);
        setConfirmedMessage(ERROR_MSG);
        setNotReviewed([]);
        setNotReviewedMessage(ERROR_MSG);
      }
    }
    load();
  }, [
    includeInactive,
    patientPromise,
    patient,
    confirmedResponse.data,
    notReviewedResponse.data,
    confirmedResponse.error,
    getCTWFhirClient,
  ]);

  return (
    <div
      ref={containerRef}
      className={cx("ctw-conditions", className, {
        "ctw-conditions-stacked": breakpoints.sm,
      })}
    >
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
            stacked={breakpoints.sm}
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
            stacked={breakpoints.sm}
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
          action={createOrEditCondition}
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
