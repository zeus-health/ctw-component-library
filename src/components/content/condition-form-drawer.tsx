import { Drawer } from "../core/drawer";

import { ConditionModel } from "@/models/conditions";

export type ConditionFormDrawerProps = {
  editing?: boolean;
  condition?: ConditionModel;
  isOpen: boolean;
  onClose: () => void;
};

export function ConditionFormDrawer({
  editing,
  condition,
  isOpen,
  onClose,
}: ConditionFormDrawerProps) {
  const title = editing ? "Edit Condition" : "Add Condition";

  return (
    <Drawer title={title} isOpen={isOpen} onClose={onClose}>
      <Drawer.Body>TODO</Drawer.Body>
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
