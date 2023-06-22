import { useConditionHistory } from "./history";
import { useConfirmDeleteCondition, useEditConditionForm } from "./modal-hooks";
import { useResourceDetailsDrawer } from "../../resource/resource-details-drawer";
import { NotesList } from "@/components/core/notes-list";
import { ConditionModel } from "@/fhir/models";
import { useFQSFeatureToggle } from "@/hooks/use-fqs-feature-toggle";
import { capitalize } from "@/utils/nodash";

export const useConditionDetailsDrawer = ({
  canEdit,
}: {
  canEdit: boolean;
  canRemove: boolean;
}) => {
  const { enabled } = useFQSFeatureToggle("conditions");
  const showEditConditionForm = useEditConditionForm();
  const confirmDelete = useConfirmDeleteCondition();

  return useResourceDetailsDrawer({
    header: (condition: ConditionModel) => condition.display,
    subHeader: (condition: ConditionModel) => condition.ccsChapter,
    getSourceDocument: true,
    readOnly: !canEdit,
    enableFQS: enabled,
    onEdit: showEditConditionForm,
    onRemove: confirmDelete,
    details: (condition: ConditionModel) => [
      { label: "Recorder", value: condition.recorder },
      { label: "Recorded Date", value: condition.recordedDate },
      {
        label: "Provider Organization",
        value: condition.patientOrganizationName,
      },
      { label: "Status", value: capitalize(condition.displayStatus) },
      { label: "Onset Date", value: condition.onset },
      { label: "Abatement Date", value: condition.abatement },
      {
        label: "Note",
        value: condition.notes.length !== 0 && <NotesList notes={condition.notes} />,
      },
    ],
    getHistory: useConditionHistory,
  });
};
