import { ConditionModel } from "../../../fhir/models/condition";
import { Drawer } from "../../core/drawer";
import { useEditConditionForm } from "../conditions/condition-drawers";
import { ConditionHistory } from "./conditions-history";
import { useDrawer } from "@/components/core/providers/drawer-provider";

type Props = {
  condition: ConditionModel;
  readOnly: boolean;
};

export function useConditionHistory() {
  const { openDrawer } = useDrawer();
  const showEditConditionForm = useEditConditionForm();

  return ({ condition, readOnly }: Props) => {
    openDrawer({
      title: "Condition History",
      drawerChild: (props) =>
        ConditionHistoryDrawer({
          condition,
          onEdit: readOnly ? undefined : () => showEditConditionForm(condition),
          ...props,
        }),
    });
  };
}

type ConditionHistoryDrawerProps = {
  condition: ConditionModel;
  onClose: () => void;
  onEdit?: () => void;
};

function ConditionHistoryDrawer({
  condition,
  onClose,
  onEdit,
}: ConditionHistoryDrawerProps) {
  return (
    <>
      <Drawer.Body>
        <ConditionHistory
          condition={condition}
          onClose={onClose}
          onEdit={onEdit}
        />
      </Drawer.Body>
      <Drawer.Footer>
        <div className="ctw-flex ctw-justify-end ctw-space-x-3 ctw-text-black ">
          <button
            type="button"
            className="ctw-btn-default ctw-font-semibold ctw-outline-bg-light"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </Drawer.Footer>
    </>
  );
}
