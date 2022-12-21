import cx from "classnames";
import "./patient-conditions.scss";
import { curry } from "lodash";
import { useReducer, useRef, useState } from "react";
import { ConditionHeader } from "../condition-header";
import { onConditionDelete } from "../conditions-helper";
import { ConditionHistoryDrawer } from "../conditions-history-drawer";
import { createOrEditCondition } from "../forms/actions/conditions";
import {
  conditionAddSchema,
  conditionEditSchema,
  getEditingPatientConditionData,
} from "../forms/schemas/condition-schema";
import { filterOtherConditions } from "./helpers";
import { PatientConditionsActions } from "./patient-conditions-actions";
import { patientConditionsColumns } from "./patient-conditions-columns";
import { useConditionFilters } from "./patient-conditions-filters";
import { PatientConditionsHeader } from "./patient-conditions-header";
import {
  createHandleEditCondition,
  handleOpeningHistoryDrawer,
} from "./patient-conditions-history";
import { EditDeleteConditionHoverActions } from "./patient-conditions-menu-actions";
import { useCTW } from "@/components/core/ctw-provider";
import {
  DrawerFormWithFields,
  FormEntry,
} from "@/components/core/form/drawer-form-with-fields";
import { ModalConfirmDelete } from "@/components/core/modal-confirm-delete";
import { usePatient } from "@/components/core/patient-provider";
import { Table } from "@/components/core/table/table";
import {
  useOtherProviderConditions,
  usePatientConditions,
} from "@/fhir/conditions";
import { ConditionModel } from "@/fhir/models";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import { AnyZodSchema } from "@/utils/form-helper";

export type PatientConditionsProps = {
  className?: string;
  readOnly?: boolean;
};

export type ConditionFormData = {
  schema: AnyZodSchema;
  actionType: string;
  data: FormEntry[] | undefined;
  drawerIsOpen: boolean;
};

export function PatientConditions({
  className,
  readOnly = false,
}: PatientConditionsProps) {
  // State.
  const { filters, updateFilters, applyFilters } = useConditionFilters();
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(containerRef);
  const [historyDrawerIsOpen, setHistoryDrawerIsOpen] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState<ConditionModel>();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  // Reducers
  const [formProps, updateFormProps] = useReducer(
    (data: ConditionFormData, partialData: Partial<ConditionFormData>) => ({
      ...data,
      ...partialData,
    }),
    {
      schema: conditionAddSchema,
      actionType: "Add",
      data: undefined,
      drawerIsOpen: false,
    }
  );

  // Data fetching.
  const patientConditionsQuery = usePatientConditions();
  const otherConditionsQuery = useOtherProviderConditions();
  const patientQuery = usePatient();
  const { getRequestContext } = useCTW();

  function isLoading() {
    const isLoadingPatient = patientConditionsQuery.isLoading;
    const isLoadingOther = isLoadingPatient || otherConditionsQuery.isLoading;
    return filters.collection === "patient" ? isLoadingPatient : isLoadingOther;
  }

  // Get our conditions.
  const patientConditions = patientConditionsQuery.data ?? [];
  const otherConditions = filterOtherConditions(
    otherConditionsQuery.data ?? [],
    patientConditions,
    true
  );
  const conditions = applyFilters(patientConditions, otherConditions);

  // Handlers
  const handleEditCondition = (condition: ConditionModel) => {
    if (patientQuery.data) {
      updateFormProps({
        actionType: "Edit",
        schema: conditionEditSchema,
        data: getEditingPatientConditionData({ condition }),
        drawerIsOpen: true,
      });
      setSelectedCondition(condition);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cx("ctw-patient-conditions", className, {
        "ctw-patient-conditions-stacked": breakpoints.sm,
      })}
    >
      <PatientConditionsHeader
        otherConditions={otherConditions}
        collection={filters.collection}
        onCollectionChange={(collection) => updateFilters({ collection })}
      />
      <PatientConditionsActions
        hideAdd={readOnly || filters.collection === "other"}
        onToggleShowHistoric={() =>
          updateFilters({ showHistoric: !filters.showHistoric })
        }
      />
      <Table
        stacked={breakpoints.sm}
        className="-ctw-mx-px !ctw-rounded-none"
        showTableHead={false}
        isLoading={isLoading()}
        records={conditions}
        rowActions={(record: ConditionModel) =>
          EditDeleteConditionHoverActions(
            record,
            setSelectedCondition,
            updateFormProps,
            setShowConfirmDelete
          )
        }
        columns={patientConditionsColumns}
        handleRowClick={(data: ConditionModel) =>
          handleOpeningHistoryDrawer(
            setHistoryDrawerIsOpen,
            setSelectedCondition,
            data
          )
        }
      />
      <ConditionHistoryDrawer
        isOpen={historyDrawerIsOpen}
        onClose={() => setHistoryDrawerIsOpen(false)}
        condition={selectedCondition}
        onEdit={createHandleEditCondition({
          data: selectedCondition,
          patientRecords: patientConditions,
          handleEditCondition,
        })}
      />
      {patientQuery.data && (
        <DrawerFormWithFields
          title={`${formProps.actionType} Condition`}
          header={
            formProps.actionType === "Edit" &&
            selectedCondition && (
              <ConditionHeader condition={selectedCondition} />
            )
          }
          action={curry(createOrEditCondition)(
            selectedCondition,
            patientQuery.data.id
          )}
          data={formProps.data}
          schema={formProps.schema}
          isOpen={formProps.drawerIsOpen}
          onClose={() => updateFormProps({ drawerIsOpen: false })}
        />
      )}

      {selectedCondition && patientQuery.data && (
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
