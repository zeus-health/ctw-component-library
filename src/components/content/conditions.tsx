import {
  getAddConditionData,
  getEditingPatientConditionData,
} from "@/components/content/forms/condition-helpers";
import {
  ConditionFilters,
  filterConditionsWithConfirmedCodes,
  getNewCondition,
  getOtherProviderConditions,
  getPatientConditions,
} from "@/fhir/conditions";
import { useFhirClientRef } from "@/fhir/utils";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import { ConditionModel } from "@/models/condition";
import { queryClient } from "@/utils/request";
import { useQuery } from "@tanstack/react-query";
import cx from "classnames";
import { union } from "lodash";
import { useEffect, useRef, useState } from "react";
import { usePatient } from "../core/patient-provider";
import { ToggleControl } from "../core/toggle-control";
import { ConditionHistoryDrawer } from "./conditions-history-drawer";
import { ConditionsNoPatient } from "./conditions-no-patient";
import { ConditionsTableBase } from "./conditions-table-base";
import "./conditions.scss";
import { conditionSchema, createOrEditCondition } from "./forms/conditions";
import {
  DrawerFormWithFields,
  FormEntry,
} from "./forms/drawer-form-with-fields";
import { ModalConfirmDelete } from "./modal-confirm-delete";

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
  const [showModal, setShowModal] = useState(false);
  const [historyDrawerIsOpen, setHistoryDrawerIsOpen] = useState(false);
  const [patientRecords, setPatientRecords] = useState<ConditionModel[]>([]);
  const [OtherProviderRecords, setOtherProviderRecords] = useState<
    ConditionModel[]
  >([]);
  const [includeInactive, setIncludeInactive] = useState(true);
  const [formAction, setFormAction] = useState("");
  const [conditionFilter, setConditionFilter] = useState<ConditionFilters>({});
  const fhirClientRef = useFhirClientRef();
  const [currentSelectedData, setCurrentlySelectedData] =
    useState<FormEntry[]>();
  const [selectedCondition, setSelectedCondition] = useState<ConditionModel>();
  const patientResponse = usePatient();

  const patientRecordsResponse = useQuery(
    ["conditions", patientResponse.data?.UPID, conditionFilter],
    getPatientConditions,
    {
      enabled: !!patientResponse.data && !!fhirClientRef.current,
      meta: { fhirClientRef },
    }
  );

  const OtherProviderRecordsResponse = useQuery(
    ["conditions", patientResponse.data?.UPID],
    getOtherProviderConditions,
    {
      enabled: !!patientResponse.data && !!fhirClientRef.current,
      meta: { fhirClientRef },
    }
  );

  const patientRecordsMessage = patientRecordsResponse.isError
    ? ERROR_MSG
    : EMPTY_MESSAGE;

  const otherProviderRecordMessage = OtherProviderRecordsResponse.isError
    ? ERROR_MSG
    : EMPTY_MESSAGE;

  const handleToggleChange = () => setIncludeInactive(!includeInactive);
  const handleConditionEdit = (condition: ConditionModel) => {
    if (patientResponse.data) {
      setDrawerIsOpen(true);
      setFormAction("Edit");
      setCurrentlySelectedData(getEditingPatientConditionData({ condition }));
    }
  };

  const handleConditionDelete = (condition: ConditionModel) => {
    setShowModal(true);
    setSelectedCondition(condition);
  };

  const handleOtherProviderRecordsCondition = (condition: ConditionModel) => {
    if (patientResponse.data) {
      setDrawerIsOpen(true);
      setFormAction("Add");
      setCurrentlySelectedData(getAddConditionData({ condition }));
    }
  };

  const handleAddNewCondition = () => {
    if (!patientResponse.data) return;

    const newCondition = getNewCondition(patientResponse.data.id);
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

      /* OtherProviderRecordsConditons depends patientRecordsConditions so that we can correctly filter out 
         conditions that appear in patientRecordsConditions from OtherProviderRecordsConditons */
      if (patientRecordsResponse.data) {
        setPatientRecords(
          patientRecordsResponse.data.map((c) => new ConditionModel(c))
        );

        if (OtherProviderRecordsResponse.data) {
          const confirmedCodes = union(
            ...patientRecordsResponse.data.map(
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
    OtherProviderRecordsResponse.data,
    patientRecordsResponse.error,
  ]);

  if (patientResponse.isError) {
    return <ConditionsNoPatient className={className} />;
  }

  return (
    <div
      ref={containerRef}
      className={cx("conditionFoconditions", className, {
        "conditionFoconditions-stacked": breakpoints.sm,
      })}
    >
      <div className="conditionFoconditions-heading-container">
        <div className="conditionFotitle">Conditions</div>
        <button
          type="button"
          className="conditionFobtn-clear conditionFolink"
          onClick={handleAddNewCondition}
        >
          + Add Condition
        </button>
      </div>
      <div className="conditionFoconditions-body">
        <div className="conditionFospace-y-3">
          <div className="conditionFoconditions-title-container">
            <div className="conditionFotitle">Patient Record</div>
            <ToggleControl
              onFormChange={handleToggleChange}
              toggleProps={{ name: "conditions", text: "Include Inactive" }}
            />
          </div>

          <ConditionsTableBase
            className="conditionFoconditions-table"
            stacked={breakpoints.sm}
            conditions={patientRecords}
            isLoading={patientRecordsResponse.isLoading}
            message={patientRecordsMessage}
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

        <div className="conditionFospace-y-3">
          <div className="conditionFoconditions-title-container">
            <div className="conditionFotitle">Other Provider Records</div>
          </div>
          <ConditionsTableBase
            className="conditionFoconditions-not-reviewed"
            stacked={breakpoints.sm}
            conditions={OtherProviderRecords}
            isLoading={
              OtherProviderRecordsResponse.isLoading ||
              patientRecordsResponse.isLoading
            }
            message={otherProviderRecordMessage}
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
      </div>

      {patientResponse.data && (
        <DrawerFormWithFields
          patientID={patientResponse.data.id}
          title={`${formAction} Condition`}
          action={createOrEditCondition}
          data={currentSelectedData}
          schema={conditionSchema}
          isOpen={drawerIsOpen}
          onClose={() => setDrawerIsOpen(false)}
        />
      )}

      <ConditionHistoryDrawer
        isOpen={historyDrawerIsOpen}
        onClose={() => setHistoryDrawerIsOpen(false)}
        condition={selectedCondition}
      />

      {selectedCondition && (
        <ModalConfirmDelete
          resource={selectedCondition}
          message={`Please confirm that you want to remove the condition 
          "${selectedCondition.display}" from this client's profile.`}
          onClose={() => setShowModal(false)}
          isOpen={showModal}
          onDelete={() => queryClient.invalidateQueries(["conditions"])}
        />
      )}
    </div>
  );
}
