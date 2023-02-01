import cx from "classnames";
import { useEffect, useRef, useState } from "react";
import {
  DrawerFormWithFields,
  FormActionTypes,
  FormEntry,
} from "../core/form/drawer-form-with-fields";
import { ModalConfirmDelete } from "../core/modal-confirm-delete";
import { useCTW } from "../core/providers/ctw-provider";
import { usePatient } from "../core/providers/patient-provider";
import { TableSort } from "../core/table/table-helpers";
import { ToggleControl } from "../core/toggle-control";
import { ConditionHeader } from "./condition-header";
import { useConditionHistory } from "./condition-history/conditions-history-drawer";
import { onConditionDelete, toggleArchive } from "./conditions-helper";
import { ConditionsNoPatient } from "./conditions-no-patient";
import { ConditionsTableBase } from "./conditions-table-base";
import "./conditions.scss";
import { filterOtherConditions } from "./conditions/helpers";
import {
  createOrEditCondition,
  getAddConditionWithDefaults,
} from "./forms/actions/conditions";
import { getAddConditionData } from "./forms/schemas/condition-schema";
import { PatientHistoryRequestDrawer } from "./patient-history-request-drawer";
import { PatientHistoryMessage } from "./patient-history/patient-history-message";
import { PatientHistoryStatus } from "./patient-history/patient-history-message-status";
import {
  conditionAddSchema,
  conditionEditSchema,
  getEditingPatientConditionData,
} from "@/components/content/forms/schemas/condition-schema";
import { withErrorBoundary } from "@/components/core/error-boundary";
import {
  getNewCondition,
  useOtherProviderConditions,
  usePatientConditions,
} from "@/fhir/conditions";
import { ConditionModel } from "@/fhir/models/condition";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import {
  getPatientHistoryDetails,
  PatientHistoryDetails,
} from "@/services/patient-history/patient-history";
import { AnyZodSchema } from "@/utils/form-helper";
import { curry } from "@/utils/nodash";

export type ConditionsProps = {
  className?: string;
  readOnly?: boolean;
  hideRequestRecords?: boolean;
};

const EMPTY_MESSAGE_PATIENT_RECORD =
  "There are no conditions in this patient's record.";
const EMPTY_MESSAGE_PROVIDER = "There are no conditions available.";
const ERROR_MSG =
  "There was an error fetching conditions for this patient. Refresh the page or contact your organization's technical support if this issue persists.";

export const Conditions = withErrorBoundary(
  ({
    className,
    readOnly = false,
    hideRequestRecords = false,
  }: ConditionsProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const breakpoints = useBreakpoints(containerRef);
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    const showConditionHistory = useConditionHistory();
    const [requestRecordsDrawerIsOpen, setRequestDrawerIsOpen] =
      useState(false);
    const [patientRecords, setPatientRecords] = useState<ConditionModel[]>([]);
    const [otherProviderRecords, setOtherProviderRecords] = useState<
      ConditionModel[]
    >([]);
    const [includeInactive, setIncludeInactive] = useState(false);
    const [formAction, setFormAction] = useState<FormActionTypes>("Add");
    const [schema, setSchema] = useState<AnyZodSchema>(conditionAddSchema);
    const [currentSelectedData, setCurrentlySelectedData] =
      useState<FormEntry[]>();
    const [selectedCondition, setSelectedCondition] =
      useState<ConditionModel>();
    const patientResponse = usePatient();
    const patientRecordsResponse = usePatientConditions();
    const otherProviderRecordsResponse = useOtherProviderConditions();
    const { getRequestContext } = useCTW();
    const [sort, setSort] = useState<TableSort>();

    const [clinicalHistoryExists, setClinicalHistoryExists] =
      useState<boolean>();
    const [patientHistoryInfo, setPatientHistoryInfo] =
      useState<PatientHistoryDetails>();

    const patientRecordsMessage = patientRecordsResponse.isError
      ? ERROR_MSG
      : EMPTY_MESSAGE_PATIENT_RECORD;

    const otherProviderRecordMessage = otherProviderRecordsResponse.isError
      ? ERROR_MSG
      : EMPTY_MESSAGE_PROVIDER;

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
      const newCondition = getAddConditionWithDefaults(condition.resource);

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
        data-zus-telemetry-click="Add new condition (Empty table)"
      >
        Add Condition
      </button>
    );

    const shouldShowClinicalHistoryArea =
      clinicalHistoryExists ||
      (otherProviderRecordsResponse.data &&
        otherProviderRecordsResponse.data.length > 0);

    const checkClinicalHistory = async (patientID: string) => {
      const requestContext = await getRequestContext();

      const patientHistoryMessage = await getPatientHistoryDetails(
        requestContext,
        patientID
      );

      setClinicalHistoryExists(!!patientHistoryMessage?.lastRetrievedAt);
      setPatientHistoryInfo(patientHistoryMessage);
    };

    useEffect(() => {
      async function load() {
        const patientConditions = patientRecordsResponse.data;
        const otherConditions = otherProviderRecordsResponse.data;

        if (patientConditions) {
          setPatientRecords(
            patientConditions.filter((c) => c.active || includeInactive)
          );

          if (otherConditions) {
            setOtherProviderRecords(
              filterOtherConditions(
                otherConditions,
                patientConditions,
                includeInactive
              )
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
      void load();
      if (patientResponse.data?.id && clinicalHistoryExists === undefined) {
        void checkClinicalHistory(patientResponse.data.id);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      includeInactive,
      patientResponse.data,
      patientRecordsResponse.data,
      otherProviderRecordsResponse.data,
      clinicalHistoryExists,
      patientRecordsResponse.error,
    ]);

    if (patientResponse.isError) {
      return <ConditionsNoPatient className={className} />;
    }

    return (
      <div
        ref={containerRef}
        data-zus-telemetry-namespace="Conditions"
        className={cx("ctw-conditions", className, {
          "ctw-conditions-stacked": breakpoints.sm,
        })}
      >
        {!readOnly && (
          <div className="ctw-conditions-heading-container">
            <div className="ctw-title">Conditions</div>
            <button
              type="button"
              className="ctw-btn-clear ctw-link"
              data-zus-telemetry-click="Add new condition"
              onClick={handleAddNewCondition}
            >
              + Add Condition
            </button>
          </div>
        )}

        <div className="ctw-conditions-body-container">
          <div className="ctw-space-y-3">
            <div className="ctw-conditions-title-container">
              <div className="ctw-title">Patient Record</div>
              <ToggleControl
                onFormChange={() => setIncludeInactive(!includeInactive)}
                toggleProps={{ name: "conditions", text: "Include Inactive" }}
              />
            </div>

            <ConditionsTableBase
              stacked={breakpoints.sm}
              conditions={patientRecords}
              isLoading={patientRecordsResponse.isLoading}
              hideMenu={readOnly}
              sort={sort}
              onSort={(newSort) => setSort(newSort)}
              emptyMessage={
                <>
                  <div>{patientRecordsMessage}</div>
                  {!patientRecordsResponse.isError && !readOnly && (
                    <div className="ctw-mt-5">{addConditionBtn}</div>
                  )}
                </>
              }
              rowMenuActions={(condition) => [
                {
                  name: "Edit",
                  action: async () => {
                    handleEditCondition(condition);
                  },
                },
                {
                  name: "View History",
                  action: async () => {
                    showConditionHistory({
                      condition,
                      readOnly,
                    });
                  },
                },
                {
                  name: "Delete",
                  className: "dangerous",
                  action: async () => {
                    handleConditionDelete(condition);
                  },
                },
              ]}
            />
          </div>
          <div className="ctw-space-y-3">
            <PatientHistoryStatus
              status={patientHistoryInfo?.status}
              date={patientHistoryInfo?.dateCreated}
            />
            <div className="ctw-conditions-title-container">
              <div className="ctw-title">Other Provider Records</div>
              {shouldShowClinicalHistoryArea &&
                !readOnly &&
                !hideRequestRecords && (
                  <div className="ctw-flex ctw-items-baseline ctw-space-x-2">
                    {patientHistoryInfo?.lastRetrievedAt && (
                      <div className="ctw-text-sm ctw-italic ctw-text-black">
                        Last Retrieved {patientHistoryInfo.lastRetrievedAt}
                      </div>
                    )}

                    <button
                      type="button"
                      className="ctw-btn-clear ctw-link"
                      onClick={() => setRequestDrawerIsOpen(true)}
                      data-zus-telemetry-click="Request records"
                    >
                      Request Records
                    </button>
                  </div>
                )}
            </div>
            {shouldShowClinicalHistoryArea ? (
              <ConditionsTableBase
                className="ctw-conditions-not-reviewed"
                stacked={breakpoints.sm}
                conditions={otherProviderRecords}
                sort={sort}
                onSort={(newSort) => setSort(newSort)}
                isLoading={
                  otherProviderRecordsResponse.isLoading ||
                  patientRecordsResponse.isLoading
                }
                hideMenu={readOnly}
                emptyMessage={otherProviderRecordMessage}
                rowMenuActions={(condition) => [
                  {
                    name: "Add",
                    action: async () => {
                      handleAddOtherProviderCondition(condition);
                    },
                  },
                  {
                    name: "View History",
                    action: async () => {
                      showConditionHistory({ condition, readOnly: true });
                    },
                  },
                  {
                    name: condition.isArchived ? "Un-Archive" : "Archive",
                    action: async () => {
                      const requestContext = await getRequestContext();
                      await toggleArchive(condition, requestContext);
                    },
                  },
                ]}
              />
            ) : (
              <PatientHistoryMessage
                readOnly={readOnly || hideRequestRecords}
                onClick={() => setRequestDrawerIsOpen(true)}
              />
            )}
          </div>
        </div>

        {patientResponse.data && (
          <DrawerFormWithFields
            title={`${formAction} Condition`}
            header={
              formAction === "Edit" &&
              selectedCondition && (
                <ConditionHeader condition={selectedCondition} />
              )
            }
            action={curry(createOrEditCondition)(
              selectedCondition,
              patientResponse.data.id
            )}
            data={currentSelectedData}
            schema={schema}
            isOpen={drawerIsOpen}
            onClose={() => setDrawerIsOpen(false)}
          />
        )}

        {patientResponse.data && (
          <PatientHistoryRequestDrawer
            header={
              <>
                <PatientHistoryStatus
                  status={patientHistoryInfo?.status}
                  date={patientHistoryInfo?.dateCreated}
                />
                <div className="ctw-pt-0 ctw-text-base">
                  Request patient clinical history from 70K+ providers across
                  the nation. No changes will be made to your patient record.
                </div>
              </>
            }
            patient={patientResponse.data}
            isOpen={requestRecordsDrawerIsOpen}
            onClose={() => setRequestDrawerIsOpen(false)}
            setClinicalHistoryExists={setClinicalHistoryExists}
          />
        )}

        {selectedCondition && patientResponse.data && (
          <ModalConfirmDelete
            resource={selectedCondition}
            resourceName={selectedCondition.display || "unnamed condition"}
            onClose={() => setShowConfirmDelete(false)}
            isOpen={showConfirmDelete}
            onDelete={async () => {
              const requestContext = await getRequestContext();
              await onConditionDelete(
                selectedCondition.resource,
                requestContext
              );
            }}
          />
        )}
      </div>
    );
  },
  "Conditions"
);
