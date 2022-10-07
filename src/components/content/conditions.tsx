import {
  getAddConditionData,
  getEditingPatientConditionData,
} from "@/components/content/forms/condition-helpers";
import {
  ConditionFilters,
  filterConditionsWithConfirmedCodes,
  getOtherProviderConditions,
  getPatientConditions,
} from "@/fhir/conditions";
import { dateToISO } from "@/fhir/formatters";
import { useFhirClientRef } from "@/fhir/utils";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import { ConditionModel } from "@/models/conditions";
import { PatientModel } from "@/models/patients";
import { useQuery } from "@tanstack/react-query";
import cx from "classnames";
import { union } from "lodash";
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
  const [patientRecord, setPatientRecord] = useState<ConditionModel[]>([]);
  const [patientRecordMessage, setPatientRecordMessage] =
    useState(EMPTY_MESSAGE);
  const [patientRecordIsLoading, setPatientRecordIsLoading] = useState(true);
  const [OtherProviderRecords, setOtherProviderRecords] = useState<
    ConditionModel[]
  >([]);
  const [OtherProviderRecordsIsLoading, setOtherProviderRecordsIsLoading] =
    useState(true);
  const [OtherProviderRecordsMessage, setOtherProviderRecordsMessage] =
    useState(EMPTY_MESSAGE);
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
  const patientRecordResponse = useQuery(
    ["conditions", patientUPID, conditionFilter],
    getPatientConditions,
    {
      enabled: !!patientUPID && !!fhirClientRef,
      meta: { fhirClientRef },
    }
  );

  const OtherProviderRecordsResponse = useQuery(
    ["conditions", patientUPID],
    getOtherProviderConditions,
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
      setCurrentlySelectedData(getEditingPatientConditionData({ condition }));
    }
  };

  const handleOtherProviderRecordsCondition = (condition: ConditionModel) => {
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
      clinicalStatus: {
        coding: [
          {
            system: "http://hl7.org/CodeSystem/condition-clinical",
            code: "active",
            display: "Active",
          },
        ],
        text: "active",
      },
      verificationStatus: {
        coding: [
          {
            system: "http://hl7.org/fhir/ValueSet/condition-ver-status",
            code: "confirmed",
            display: "Confirmed",
          },
        ],
        text: "confirmed",
      },
      recordedDate: dateToISO(new Date()),
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
      const patientTemp = await patientPromise;

      setPatient(patientTemp);
      if (patient?.UPID) {
        setPatientUPID(patient.UPID);
      }

      /* OtherProviderRecordsConditons depends patientRecordConditions so that we can correctly filter out 
         conditions that appear in patientRecordConditions from OtherProviderRecordsConditons */
      if (patientRecordResponse.data) {
        setOtherProviderRecordsIsLoading(false);
        setPatientRecordIsLoading(false);
        setPatientRecord(
          patientRecordResponse.data.map((c) => new ConditionModel(c))
        );

        if (OtherProviderRecordsResponse.data) {
          const confirmedCodes = union(
            ...patientRecordResponse.data.map(
              (c) => new ConditionModel(c).knownCodings
            )
          );

          const OtherProviderRecordsFiltered =
            filterConditionsWithConfirmedCodes(
              OtherProviderRecordsResponse.data,
              confirmedCodes
            );

          setOtherProviderRecords(
            OtherProviderRecordsFiltered.map((c) => new ConditionModel(c))
          );
        } else {
          setOtherProviderRecords([]);
          setOtherProviderRecordsMessage(ERROR_MSG);
        }
      }

      if (patientRecordResponse.error) {
        setPatientRecord([]);
        setPatientRecordMessage(ERROR_MSG);
        setOtherProviderRecords([]);
        setOtherProviderRecordsMessage(ERROR_MSG);
      }
    }
    load();
  }, [
    includeInactive,
    patientPromise,
    patient,
    patientRecordResponse.data,
    OtherProviderRecordsResponse.data,
    patientRecordResponse.error,
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
            <div className="ctw-title">Patient Record</div>
            <ToggleControl
              onFormChange={handleFormChange}
              toggleProps={{ name: "conditions", text: "Include Inactive" }}
            />
          </div>

          <ConditionsTableBase
            className="ctw-conditions-table"
            stacked={breakpoints.sm}
            conditions={patientRecord}
            isLoading={patientRecordIsLoading}
            message={patientRecordMessage}
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
            <div className="ctw-title">Other Provider Records</div>
          </div>
          <ConditionsTableBase
            className="ctw-conditions-not-reviewed"
            stacked={breakpoints.sm}
            conditions={OtherProviderRecords}
            isLoading={OtherProviderRecordsIsLoading}
            message={OtherProviderRecordsMessage}
            rowActions={(condition) => [
              {
                name: "Add",
                action: () => {
                  handleOtherProviderRecordsCondition(condition);
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
