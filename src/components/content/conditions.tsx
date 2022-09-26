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
import { useQuery } from "@tanstack/react-query";
import cx from "classnames";
import Client from "fhir-kit-client";
import { useEffect, useRef, useState } from "react";
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
  // We use a ref here because if we pass FHIR Client to meta normally it will use whatever
  // you passed as meta when the query was created which means it can be come stale
  const fhirClientRef = useRef<Client>();
  const [conditionFilter, setConditionFilter] = useState<ConditionFilters>({});
  const [patientUPID, setPatientUPID] = useState<string>("");
  const [currentSelectedData, setCurrentlySelectedData] =
    useState<FormEntry[]>();
  const [conditionForHistory, setConditionForHistory] =
    useState<ConditionModel>();
  const confirmedResponse = useQuery(
    ["conditions", patientUPID, conditionFilter],
    getConfirmedConditions,
    {
      enabled: !!patientUPID,
      meta: { fhirClientRef },
    }
  );

  const notReviewedResponse = useQuery(
    ["conditions", patientUPID],
    getLensConditions,
    {
      enabled: !!patientUPID,
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

  useEffect(() => {
    async function load() {
      const tempConditionFilters: ConditionFilters = includeInactive
        ? {
            "clinical-status": ["active", "recurrence", "relapse"],
          }
        : {};

      setConditionFilter(tempConditionFilters);

      const tempClient = await getCTWFhirClient();
      fhirClientRef.current = tempClient;
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
          onClick={handleAddNewCondition}
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
