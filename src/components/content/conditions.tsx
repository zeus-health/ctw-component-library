import {
  conditionAddSchema,
  conditionEditSchema,
  getEditingPatientConditionData,
} from "@/components/content/forms/condition-schema";
import {
  getNewCondition,
  useOtherProviderConditions,
  usePatientConditions,
} from "@/fhir/conditions";
import { ConditionModel } from "@/fhir/models/condition";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import { getLatestPatientRefreshHistoryMessage } from "@/services/patient-history/patient-history";
import { AnyZodSchema } from "@/utils/form-helper";
import cx from "classnames";
import { curry } from "lodash";
import { useEffect, useRef, useState } from "react";
import { useCTW } from "../core/ctw-provider";
import { ModalConfirmDelete } from "../core/modal-confirm-delete";
import { usePatient } from "../core/patient-provider";
import { ToggleControl } from "../core/toggle-control";
import { ConditionHeader } from "./condition-header";
import { onConditionDelete } from "./conditions-helper";
import { ConditionHistoryDrawer } from "./conditions-history-drawer";
import { ConditionsNoPatient } from "./conditions-no-patient";
import { ConditionsTableBase } from "./conditions-table-base";
import "./conditions.scss";
import { filterOtherConditions } from "./conditions/helpers";
import { getAddConditionData } from "./forms/condition-schema";
import {
  createOrEditCondition,
  setAddConditionDefaults,
} from "./forms/conditions";
import {
  DrawerFormWithFields,
  FormActionTypes,
  FormEntry,
} from "./forms/drawer-form-with-fields";
import { PatientHistoryMessage } from "./patient-history/patient-history-message";

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
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [historyDrawerIsOpen, setHistoryDrawerIsOpen] = useState(false);
  const [patientRecords, setPatientRecords] = useState<ConditionModel[]>([]);
  const [otherProviderRecords, setOtherProviderRecords] = useState<
    ConditionModel[]
  >([]);
  const [includeInactive, setIncludeInactive] = useState(false);
  const [formAction, setFormAction] = useState<FormActionTypes>("Add");
  const [schema, setSchema] = useState<AnyZodSchema>(conditionAddSchema);
  const [currentSelectedData, setCurrentlySelectedData] =
    useState<FormEntry[]>();
  const [selectedCondition, setSelectedCondition] = useState<ConditionModel>();
  const patientResponse = usePatient();
  const patientRecordsResponse = usePatientConditions();
  const otherProviderRecordsResponse = useOtherProviderConditions();
  const { getRequestContext } = useCTW();

  const [requestRecordsClinicalHistory, setRequestRecordsClinicalHistory] =
    useState(false);

  const [clinicalHistoryExists, setClinicalHistoryExists] = useState(false);

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
      setSelectedCondition(condition);
    }
  };

  const handleConditionDelete = (condition: ConditionModel) => {
    setShowConfirmDelete(true);
    setSelectedCondition(condition);
  };

  const handleAddOtherProviderCondition = (condition: ConditionModel) => {
    const newCondition = condition.resource;
    setAddConditionDefaults(newCondition);

    if (patientResponse.data) {
      setSchema(conditionAddSchema);
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

  const handleClinicalHistory = async () => {
    const requestContext = await getRequestContext();

    const message = await getLatestPatientRefreshHistoryMessage(
      requestContext,
      patientResponse.data?.id as string,
      ["done"]
    );
    if (message?.status === "done") {
      setClinicalHistoryExists(true);
    } else {
      setClinicalHistoryExists(false);
      setRequestRecordsClinicalHistory(true);
    }
  };

  useEffect(() => {
    async function load() {
      const patientConditions = patientRecordsResponse.data?.map(
        (c) => new ConditionModel(c)
      );
      const otherConditions = otherProviderRecordsResponse.data?.map(
        (c) => new ConditionModel(c)
      );

      if (patientConditions) {
        setPatientRecords(
          patientConditions.filter((c) => c.active || includeInactive)
        );

        if (otherConditions) {
          setOtherProviderRecords(
            filterOtherConditions(otherConditions, patientConditions)
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
    handleClinicalHistory();
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
                <div>{patientRecordsMessage}</div>
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
                  setSelectedCondition(condition);
                },
              },
              {
                name: "Delete",
                className: "dangerous",
                action: () => {
                  handleConditionDelete(condition);
                },
              },
            ]}
          />
        </div>
        <div className="ctw-space-y-3">
          <div className="ctw-title-container">
            <div className="ctw-title">Other Provider Records</div>
          </div>
          {clinicalHistoryExists ? (
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
                    setSelectedCondition(condition);
                  },
                },
                {
                  name: "Delete",
                  className: "dangerous",
                  action: () => {
                    handleConditionDelete(condition);
                  },
                },
              ]}
            />
          ) : (
            <PatientHistoryMessage message="Retrieve patient clinical history." />
          )}
        </div>
      </div>

      {patientResponse.data && (
        <DrawerFormWithFields
          patientID={patientResponse.data.id}
          title={`${formAction} Condition`}
          header={
            formAction === "Edit" &&
            selectedCondition && (
              <ConditionHeader condition={selectedCondition} />
            )
          }
          action={curry(createOrEditCondition)(selectedCondition)}
          data={currentSelectedData}
          schema={schema}
          isOpen={drawerIsOpen}
          onClose={() => setDrawerIsOpen(false)}
        />
      )}

      <ConditionHistoryDrawer
        isOpen={historyDrawerIsOpen}
        onClose={() => setHistoryDrawerIsOpen(false)}
        condition={selectedCondition}
      />

      {selectedCondition && patientResponse.data && (
        <ModalConfirmDelete
          resource={selectedCondition}
          resourceName={selectedCondition.display || "unnamed condition"}
          onClose={() => setShowConfirmDelete(false)}
          isOpen={showConfirmDelete}
          onDelete={async () => {
            const requestContext = await getRequestContext();
            await onConditionDelete(selectedCondition.resource, requestContext);
          }}
        />
      )}
    </div>
  );
}
