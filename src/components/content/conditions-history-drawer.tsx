import { ConditionModel } from "../../fhir/models/condition";
import { CTWRequestContext } from "../core/ctw-context";
import { Drawer } from "../core/drawer";
import { ConditionHistory } from "./conditions-history";

export type ConditionHistoryDrawerProps = {
  className?: string;
  condition?: ConditionModel;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: () => void;
  patientID: string;
};

export function ConditionHistoryDrawer({
  className,
  condition,
  isOpen,
  onClose,
  onEdit,
  patientID,
}: ConditionHistoryDrawerProps) {
  const title = "Condition History";

  return (
    <Drawer
      className={className}
      title={title}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Drawer.Body>
        {condition && (
          <ConditionHistory
            condition={condition}
            onClose={onClose}
            onEdit={onEdit}
            patientID={patientID}
          />
        )}
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
    </Drawer>
  );
}
