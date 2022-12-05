import cx from "classnames";
import { curry } from "lodash";
import { useEffect, useRef, useState } from "react";
import { useCTW } from "../core/ctw-provider";
import {
  DrawerFormWithFields,
  FormActionTypes,
  FormEntry,
} from "../core/form/drawer-form-with-fields";
import { ModalConfirmDelete } from "../core/modal-confirm-delete";
import { usePatient } from "../core/patient-provider";
import { TableSort } from "../core/table/table-helpers";
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
  getAddConditionWithDefaults,
} from "./forms/conditions";
import { PatientHistoryRequestDrawer } from "./patient-history-request-drawer";
import { PatientHistoryMessage } from "./patient-history/patient-history-message";
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
import { hasFetchedPatientHistory } from "@/services/patient-history/patient-history";
import { AnyZodSchema } from "@/utils/form-helper";

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
  const [requestRecordsDrawerIsOpen, setRequestDrawerIsOpen] = useState(false);
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
  const [sort, setSort] = useState<TableSort>();

  const [clinicalHistoryExists, setClinicalHistoryExists] = useState<boolean>();

  const patientRecordsMessage = patientRecordsResponse.isError
    ? ERROR_MSG
    : EMPTY_MESSAGE_PATIENT_RECORD;

  const otherProviderRecordMessage = otherProviderRecordsResponse.isError
    ? ERROR_MSG
    : EMPTY_MESSAGE_PROVIDER;

  const shouldHistoryDrawerBeReadOnly = () => {
    if (
      selectedCondition &&
      patientRecords.some((record) => record.id === selectedCondition.id)
    ) {
      return () => handleEditCondition(selectedCondition);
    }
    return undefined;
  };

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
    >
      Add Condition
    </button>
  );

  const shouldShowClinicalHistoryArea =
    clinicalHistoryExists || otherProviderRecordsResponse.data?.length;

  const checkClinicalHistory = async (patientID: string) => {
    const requestContext = await getRequestContext();

    const patientHistoryFetched = await hasFetchedPatientHistory(
      requestContext,
      patientID
    );

    setClinicalHistoryExists(patientHistoryFetched);
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
            message={
              <>
                <div>{patientRecordsMessage}</div>
                {!patientRecordsResponse.isError && !readOnly && (
                  <div className="ctw-mt-5">{addConditionBtn}</div>
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
          <div className="ctw-conditions-title-container">
            <div className="ctw-title">Other Provider Records</div>
            {shouldShowClinicalHistoryArea && (
              <button
                type="button"
                className="ctw-btn-clear ctw-link"
                onClick={() => setRequestDrawerIsOpen(true)}
              >
                Request Records
              </button>
            )}
          </div>
          {shouldShowClinicalHistoryArea ? (
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
            <PatientHistoryMessage
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
            <div className="ctw-pt-0 ctw-text-base">
              Request patient clinical history from 70K+ providers across the
              nation. No changes will be made to your patient record.
            </div>
          }
          patient={patientResponse.data}
          isOpen={requestRecordsDrawerIsOpen}
          onClose={() => setRequestDrawerIsOpen(false)}
          setClinicalHistoryExists={setClinicalHistoryExists}
        />
      )}

      <ConditionHistoryDrawer
        isOpen={historyDrawerIsOpen}
        onClose={() => setHistoryDrawerIsOpen(false)}
        condition={selectedCondition}
        onEdit={shouldHistoryDrawerBeReadOnly()}
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
