import { ConditionModel } from "@/models/conditions";
import { Tab } from "@headlessui/react";
import { ButtonTabs } from "../core/button-tabs";
import { DataList, entryFromArray } from "../core/data-list";
import { Drawer } from "../core/drawer";

export type ConditionDrawerProps = {
  condition?: ConditionModel;
  isOpen: boolean;
  onClose: () => void;
};

export function ConditionDrawer({
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
    <Drawer title="Condition" isOpen={isOpen} onClose={onClose}>
      <Drawer.Body>
        {condition ? (
          <div className="space-y-7 text-black">
            <div className="flex justify-between space-x-8">
              <span className="text-3xl text-black font-bold">
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
        <div className="flex justify-end space-x-3 text-black ">
          <button
            type="button"
            className="btn-default font-semibold outline-bg-100"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </Drawer.Footer>
    </Drawer>
  );
}
