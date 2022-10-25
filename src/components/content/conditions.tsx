import {
  conditionAddSchema,
  conditionEditSchema,
  getEditingPatientConditionData,
} from "@/components/content/forms/condition-schema";
import {
  ConditionFilters,
  filterConditionsWithConfirmedCodes,
  getNewCondition,
  useOtherProviderConditions,
  usePatientConditions,
} from "@/fhir/conditions";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import { ConditionModel } from "@/models/conditions";
import cx from "classnames";
import { union } from "lodash";
import { useEffect, useRef, useState } from "react";
import { usePatient } from "../core/patient-provider";
import { ToggleControl } from "../core/toggle-control";
import { ConditionHistoryDrawer } from "./conditions-history-drawer";
import { ConditionsNoPatient } from "./conditions-no-patient";
import { ConditionsTableBase } from "./conditions-table-base";
import "./conditions.scss";
import { getAddConditionData } from "./forms/condition-schema";
import {
  createOrEditCondition,
  setAddConditionDefaults,
} from "./forms/conditions";
import {
  DrawerFormWithFields,
  FormEntry,
} from "./forms/drawer-form-with-fields";

export type ConditionsProps = {
  className?: string;
  readOnly?: boolean;
};

const EMPTY_MESSAGE_PATIENT_RECORD =
  "There are no conditions in this patient's record.";
const EMPTY_MESSAGE_PROVIDER = "There are no conditions available.";
const ERROR_MSG =
  "There was an error fetching conditions for this patient. Refresh the page or contact your organization's technical support if this issue persists.";

export function Conditions({ className, readOnly = false }: ConditionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(containerRef);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [historyDrawerIsOpen, setHistoryDrawerIsOpen] = useState(false);
  const [patientRecords, setPatientRecords] = useState<ConditionModel[]>([]);
  const [otherProviderRecords, setOtherProviderRecords] = useState<
    ConditionModel[]
  >([]);
  const [includeInactive, setIncludeInactive] = useState(true);
  const [formAction, setFormAction] = useState("");
  const [conditionFilter, setConditionFilter] = useState<ConditionFilters>({});
  const [schema, setSchema] = useState<Zod.AnyZodObject>(conditionAddSchema);
  const [currentSelectedData, setCurrentlySelectedData] =
    useState<FormEntry[]>();
  const [conditionForHistory, setConditionForHistory] =
    useState<ConditionModel>();

  const patientResponse = usePatient();
  const patientRecordsResponse = usePatientConditions(conditionFilter);
  const otherProviderRecordsResponse = useOtherProviderConditions();

  const patientRecordsMessage = patientRecordsResponse.isError
    ? ERROR_MSG
    : EMPTY_MESSAGE_PATIENT_RECORD;

  const otherProviderRecordMessage = otherProviderRecordsResponse.isError
    ? ERROR_MSG
    : EMPTY_MESSAGE_PROVIDER;

  const handleToggleChange = () => setIncludeInactive(!includeInactive);
  const handleEditCondition = (condition: ConditionModel) => {
    if (patientResponse.data) {
      setDrawerIsOpen(true);
      setFormAction("Edit");
      setSchema(conditionEditSchema);
      setCurrentlySelectedData(getEditingPatientConditionData({ condition }));
    }
  };

  const handleAddOtherProviderCondition = (condition: ConditionModel) => {
    const newCondition = condition.resource;
    setAddConditionDefaults(newCondition);

    if (patientResponse.data) {
      setDrawerIsOpen(true);
      setFormAction("Add");
      setCurrentlySelectedData(
        getAddConditionData({
          condition: new ConditionModel(newCondition),
        })
      );
    }
  };

  const handleAddNewCondition = () => {
    if (!patientResponse.data) return;

    const newCondition = getNewCondition(patientResponse.data.id);
    setDrawerIsOpen(true);
    setFormAction("Add");
    setSchema(conditionAddSchema);
    setCurrentlySelectedData(
      getAddConditionData({
        condition: new ConditionModel(newCondition),
      })
    );
  };

  const addConditionBtn = (
    <button
      className="ctw-btn-primary"
      type="button"
      onClick={handleAddNewCondition}
    >
      Add Condition
    </button>
  );

  useEffect(() => {
    async function load() {
      const tempConditionFilters: ConditionFilters = includeInactive
        ? {
            "clinical-status": ["active", "recurrence", "relapse"],
          }
        : {};

      setConditionFilter(tempConditionFilters);

      /* OtherProviderRecordsConditons depends patientRecordsConditions so that we can correctly filter out
         conditions that appear in patientRecordsConditions from OtherProviderRecordsConditons */
      if (patientRecordsResponse.data) {
        setPatientRecords(
          patientRecordsResponse.data.map((c) => new ConditionModel(c))
        );

        if (otherProviderRecordsResponse.data) {
          const confirmedCodes = union(
            ...patientRecordsResponse.data.map(
              (c) => new ConditionModel(c).knownCodings
            )
          );

          const OtherProviderRecordsFiltered =
            filterConditionsWithConfirmedCodes(
              otherProviderRecordsResponse.data,
              confirmedCodes
            );

          setOtherProviderRecords(
            OtherProviderRecordsFiltered.map((c) => new ConditionModel(c))
          );
        } else {
          setOtherProviderRecords([]);
        }
      }

      if (patientRecordsResponse.error) {
        setPatientRecords([]);
        setOtherProviderRecords([]);
      }
    }
    load();
  }, [
    includeInactive,
    patientResponse.data,
    patientRecordsResponse.data,
    otherProviderRecordsResponse.data,
    patientRecordsResponse.error,
  ]);

  if (patientResponse.isError) {
    return <ConditionsNoPatient className={className} />;
  }

  return (
    <div
      ref={containerRef}
      className={cx("ctw-conditions", className, {
        "ctw-stacked": breakpoints.sm,
      })}
    >
      {!readOnly && (
        <div className="ctw-heading-container">
          <div className="ctw-title">Conditions</div>
          <button
            type="button"
            className="ctw-btn-clear ctw-link"
            onClick={handleAddNewCondition}
          >
            + Add Condition
          </button>
        </div>
      )}
      <div className="ctw-body-container">
        <div className="ctw-space-y-3">
          <div className="ctw-title-container">
            <div className="ctw-title">Patient Record</div>
            <ToggleControl
              onFormChange={handleToggleChange}
              toggleProps={{ name: "conditions", text: "Include Inactive" }}
            />
          </div>

          <ConditionsTableBase
            stacked={breakpoints.sm}
            conditions={patientRecords}
            isLoading={patientRecordsResponse.isLoading}
            hideMenu={readOnly}
            message={
              <>
                {patientRecordsMessage}
                {!patientRecordsResponse.isError && (
                  <div className="ctw-my-5">{addConditionBtn}</div>
                )}
              </>
            }
            rowActions={(condition) => [
              {
                name: "Edit",
                action: () => {
                  handleEditCondition(condition);
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
          <div className="ctw-title-container">
            <div className="ctw-title">Other Provider Records</div>
          </div>

          <ConditionsTableBase
            className="ctw-conditions-not-reviewed"
            stacked={breakpoints.sm}
            conditions={otherProviderRecords}
            isLoading={
              otherProviderRecordsResponse.isLoading ||
              patientRecordsResponse.isLoading
            }
            hideMenu={readOnly}
            message={otherProviderRecordMessage}
            rowActions={(condition) => [
              {
                name: "Add",
                action: () => {
                  handleAddOtherProviderCondition(condition);
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

      {patientResponse.data && (
        <DrawerFormWithFields
          patientID={patientResponse.data.id}
          title={`${formAction} Condition`}
          action={createOrEditCondition}
          data={currentSelectedData}
          schema={schema}
          isOpen={drawerIsOpen}
          onClose={() => setDrawerIsOpen(false)}
        />
      )}

      <ConditionHistoryDrawer
        isOpen={historyDrawerIsOpen}
        onClose={() => setHistoryDrawerIsOpen(false)}
        condition={conditionForHistory}
      />
    </div>
  );
}
