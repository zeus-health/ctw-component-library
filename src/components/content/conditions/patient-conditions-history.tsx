import { Dispatch, SetStateAction } from "react";
import { ConditionModel } from "@/fhir/models";

type HistoryDrawerReadOnlyCheck = {
  data?: ConditionModel;
  patientRecords: ConditionModel[];
  handleEditCondition: (data: ConditionModel) => void;
};

export const createHandleEditCondition = ({
  data,
  patientRecords,
  handleEditCondition,
}: HistoryDrawerReadOnlyCheck) => {
  if (data && patientRecords.some((record) => record.id === data.id)) {
    return () => handleEditCondition(data);
  }
  return undefined;
};

export const handleOpeningHistoryDrawer = (
  setHistoryDrawerIsOpen: Dispatch<SetStateAction<boolean>>,
  setSelectedCondition: Dispatch<SetStateAction<ConditionModel | undefined>>,
  data: ConditionModel
) => {
  setHistoryDrawerIsOpen(true);
  setSelectedCondition(data);
};
