import type { ConditionFormData } from "./patient-conditions";
import React, { Dispatch, SetStateAction } from "react";
import {
  handleAddOtherProviderCondition,
  handleConditionDelete,
  handleEditCondition,
  handleToggleArchive,
} from "./patient-conditions-actions";
import { FilterCollection } from "./patient-conditions-filters";
import { CTWRequestContext } from "@/components/core/ctw-context";
import { ConditionModel } from "@/fhir/models";

export const handleActionForRecordType = (
  filterCollection: FilterCollection,
  record: ConditionModel,
  setSelectedCondition: React.Dispatch<
    React.SetStateAction<ConditionModel | undefined>
  >,
  updateFormProps: React.Dispatch<Partial<ConditionFormData>>,
  setShowConfirmDelete: Dispatch<SetStateAction<boolean>>,
  getRequestContext: () => Promise<CTWRequestContext>
) => {
  switch (filterCollection) {
    case "patient":
      return EditDeleteConditionHoverActions(
        record,
        setSelectedCondition,
        updateFormProps,
        setShowConfirmDelete
      );
    case "other":
      return ArchiveAddConditionHoverActions(
        record,
        updateFormProps,
        getRequestContext
      );
    default:
      throw Error(`${filterCollection} is not in the FilterCollection type`);
  }
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

export const ArchiveAddConditionHoverActions = (
  condition: ConditionModel,
  updateFormProps: React.Dispatch<Partial<ConditionFormData>>,
  getRequestContext: () => Promise<CTWRequestContext>
) => {
  const { isArchived } = condition;
  const profileAction = isArchived ? "Un-Archive" : "Archive";
  return (
    <div className="ctw-flex ctw-space-x-2">
      <button
        type="button"
        className="ctw-btn-default"
        onClick={async (event) => {
          event.stopPropagation();
          await handleToggleArchive(condition, getRequestContext);
        }}
      >
        {profileAction}
      </button>
      <button
        type="button"
        className="ctw-btn-primary"
        onClick={(event) => {
          event.stopPropagation();
          handleAddOtherProviderCondition(condition, updateFormProps);
        }}
      >
        Add
      </button>
    </div>
  );
};
