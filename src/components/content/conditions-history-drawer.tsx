import { ConditionModel } from "../../models/conditions";
import { Drawer } from "../core/drawer";
import { ConditionHistory } from "./conditions-history";

export type ConditionHistoryDrawerProps = {
  className?: string;
  condition?: ConditionModel;
  isOpen: boolean;
  onClose: () => void;
};

export function ConditionHistoryDrawer({
  className,
  condition,
  isOpen,
  onClose,
}: ConditionHistoryDrawerProps) {
  const conditionElements = ConditionHistory({
    icd10Code: condition?.icd10Code,
    snomedCode: condition?.snomedCode,
  });
  const title = "Condition History";

  return (
    <Drawer
      className={className}
      title={title}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="ctw-flex ctw-p-6 ctw-text-2xl ctw-text-black">
        {condition?.display} ({condition?.snomedCode})
      </div>
      <div className="ctw-flex ctw-p-6 ctw-text-sm ctw-text-black">
        {condition?.ccsGrouping}
      </div>

      <Drawer.Body>{conditionElements}</Drawer.Body>
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
