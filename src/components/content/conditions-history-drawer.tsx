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
  console.log("icd10", condition?.icd10);
  const data = ConditionHistory({ icd10: condition?.icd10 });
  const conditionName = condition?.display;
  const title = "Condition History";

  return (
    <Drawer
      className={className}
      title={title}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="ctw-flex ctw-p-6 ctw-text-2xl ctw-text-black">
        {conditionName}
      </div>
      <Drawer.Body>{data}</Drawer.Body>
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
