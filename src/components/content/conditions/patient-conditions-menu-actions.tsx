import type { ConditionFormData } from "./patient-conditions";
import React, { Dispatch, SetStateAction } from "react";
import {
  conditionEditSchema,
  getEditingPatientConditionData,
} from "../forms/schemas/condition-schema";
import { ConditionModel } from "@/fhir/models";

const handleEditCondition = (
  condition: ConditionModel,
  setSelectedCondition: React.Dispatch<
    React.SetStateAction<ConditionModel | undefined>
  >,
  updateFormProps: React.Dispatch<Partial<ConditionFormData>>
) => {
  updateFormProps({
    drawerIsOpen: true,
    actionType: "Edit",
    schema: conditionEditSchema,
    data: getEditingPatientConditionData({ condition }),
  });
  setSelectedCondition(condition);
};

const handleConditionDelete = (
  condition: ConditionModel,
  setSelectedCondition: React.Dispatch<
    React.SetStateAction<ConditionModel | undefined>
  >,
  setShowConfirmDelete: Dispatch<SetStateAction<boolean>>
) => {
  setShowConfirmDelete(true);
  setSelectedCondition(condition);
};

export const EditDeleteConditionHoverActions = (
  condition: ConditionModel,
  setSelectedCondition: React.Dispatch<
    React.SetStateAction<ConditionModel | undefined>
  >,
  updateFormProps: React.Dispatch<Partial<ConditionFormData>>,
  setShowConfirmDelete: Dispatch<SetStateAction<boolean>>
) => (
  <div className="ctw-flex ctw-space-x-2">
    <button
      type="button"
      className="ctw-btn-default"
      onClick={(event) => {
        event.stopPropagation();
        handleConditionDelete(
          condition,
          setSelectedCondition,
          setShowConfirmDelete
        );
      }}
    >
      Remove
    </button>
    <button
      type="button"
      className="ctw-btn-primary"
      onClick={(event) => {
        event.stopPropagation();
        handleEditCondition(condition, setSelectedCondition, updateFormProps);
      }}
    >
      Edit
    </button>
  </div>
);
