import { useConditionHistory } from "./history";
import { useResourceDetailsDrawer } from "../../resource/resource-details-drawer";
import { NotesList } from "@/components/core/notes-list";
import { RowActionsProp } from "@/components/core/table/table-rows";
import { ConditionModel } from "@/fhir/models";
import { capitalize } from "@/utils/nodash";

export const useConditionDetailsDrawer = ({
  RowActions,
  enableDismissAndReadActions,
}: {
  RowActions?: RowActionsProp<ConditionModel>;
  enableDismissAndReadActions?: boolean;
}) =>
  useResourceDetailsDrawer({
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
    renderChild: useConditionHistory,
    RowActions,
    enableDismissAndReadActions,
  });
