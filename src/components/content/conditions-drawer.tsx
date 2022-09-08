import { Tab } from "@headlessui/react";

import { ConditionModel } from "@/models/conditions";
import { ButtonTabs } from "../core/button-tabs";
import { DataList, entryFromArray } from "../core/data-list";
import { Drawer } from "../core/drawer";

export type ConditionDrawerProps = {
  className?: string;
  condition?: ConditionModel;
  isOpen: boolean;
  onClose: () => void;
};

export function ConditionDrawer({
  className,
  condition,
  isOpen,
  onClose,
}: ConditionDrawerProps) {
  const data = condition
    ? [
        { label: "Asserter", value: condition.asserter },
        { label: "Clinical Status", value: condition.clinicalStatus },
        { label: "Verification Status", value: condition.verificationStatus },
        ...entryFromArray("Category", condition.categories),
        { label: "Severity", value: condition.severity },
        ...entryFromArray("Body Site", condition.bodySites),
        { label: "Encounter", value: condition.encounter },
        { label: "On Set", value: condition.onset },
        { label: "Abatement", value: condition.abatement },
        { label: "Recorded Date", value: condition.recorded },
        { label: "Recorder", value: condition.recorder },
        ...entryFromArray("Stage", condition.stages),
        ...entryFromArray("Evidence", condition.evidences),
        ...entryFromArray("Note", condition.notes),
      ]
    : [];

  return (
    <Drawer
      className={className}
      title="Condition"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Drawer.Body>
        {condition ? (
          <div className="ctw-space-y-7 ctw-text-black">
            <div className="ctw-flex ctw-justify-between ctw-space-x-8">
              <span className="ctw-text-3xl ctw-font-bold ctw-text-black">
                {condition.display}
              </span>
            </div>

            <ButtonTabs tabs={["Overview", "Comments (6)", "History"]}>
              <Tab.Panels>
                <Tab.Panel>
                  <DataList title="Details" data={data} />
                </Tab.Panel>
                <Tab.Panel>TODO comments</Tab.Panel>
                <Tab.Panel>TODO history</Tab.Panel>
              </Tab.Panels>
            </ButtonTabs>
          </div>
        ) : null}
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
