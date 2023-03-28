import { useResourceDetailsDrawer } from "../../resource/resource-details-drawer";
import { useConditionHistory } from "./history";
import { useConfirmDeleteCondition, useEditConditionForm } from "./modal-hooks";
import { NotesList } from "@/components/core/notes-list";
import { ConditionModel } from "@/fhir/models";
import { capitalize } from "@/utils/nodash";

export const useConditionDetailsDrawer = ({
  canEdit,
  canRemove,
}: {
  canEdit: boolean;
  canRemove: boolean;
}) => {
  const showEditConditionForm = useEditConditionForm();
  const confirmDelete = useConfirmDeleteCondition();

  return useResourceDetailsDrawer({
    header: (condition: ConditionModel) => condition.display,
    subHeader: (condition: ConditionModel) => condition.ccsChapter,
    getSourceDocument: true,
    readOnly: !canEdit,
    onEdit: showEditConditionForm,
    onRemove: confirmDelete,
    details: (condition: ConditionModel) => [
      { label: "Recorder", value: condition.recorder },
      { label: "Recorded Date", value: condition.recordedDate },
      {
        label: "Provider Organization",
        value: condition.patient?.organization?.name,
      },
      { label: "Status", value: capitalize(condition.displayStatus) },
      { label: "Onset Date", value: condition.onset },
      { label: "Abatement Date", value: condition.abatement },
      {
        label: "Note",
        value: condition.notes.length !== 0 && (
          <NotesList notes={condition.notes} />
        ),
      },
    ],
    getHistory: useConditionHistory,
  });
};
