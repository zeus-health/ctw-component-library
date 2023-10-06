import { useConditionHistory } from "./history";
import { History } from "../../resource/helpers/history";
import { useResourceDetailsDrawer } from "../../resource/resource-details-drawer";
import { NotesList } from "@/components/core/notes-list";
import { RowActionsConfigProp } from "@/components/core/table/table-rows";
import { ConditionModel } from "@/fhir/models";
import { capitalize } from "@/utils/nodash";

const conditionHistory = (m: ConditionModel) => (
  <History getHistory={useConditionHistory} model={m} />
);

export const useConditionDetailsDrawer = ({
  rowActions,
  enableDismissAndReadActions,
}: {
  rowActions?: (c: ConditionModel) => RowActionsConfigProp<ConditionModel>;
  enableDismissAndReadActions?: boolean;
}) =>
  useResourceDetailsDrawer({
    isOpen: true,
    header: (condition: ConditionModel) => condition.display,
    subHeader: (condition: ConditionModel) => condition.ccsChapter,
    getSourceDocument: true,
    details: (condition: ConditionModel) => [
      { label: "Recorder", value: condition.recorder },
      { label: "Recorded Date", value: condition.recordedDate },
      {
        label: "Provider Organization",
        value: condition.patientOrganizationName,
      },
      { label: "Type", value: capitalize(condition.type) },
      { label: "Status", value: capitalize(condition.displayStatus) },
      { label: "Onset Date", value: condition.onset },
      { label: "Abatement Date", value: condition.abatement },
      {
        label: "Note",
        value: condition.notes.length !== 0 && <NotesList notes={condition.notes} />,
      },
    ],
    rowActions,
    renderChild: conditionHistory,
    enableDismissAndReadActions,
  });
