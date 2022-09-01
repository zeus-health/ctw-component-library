import cx from "classnames";
import { useState } from "react";

import { ToggleControl } from "../core/toggle-control";

import { ConditionFormDrawer } from "./condition-form-drawer";
import { ConditionsTable } from "./conditions-table";

import { CssVarsArray, Style } from "@/styles/styles-type";

export type ConditionsProps = {
  style?: Style;
  className?: string;
  patientUPID: string;
};

export function Conditions({ style, className, patientUPID }: ConditionsProps) {
  const [addConditionIsOpen, setAddConditionIsOpen] = useState(false);
  const [includeInactive, setIncludeInactive] = useState(true);

  const handleFormChange = () => setIncludeInactive(!includeInactive);

  console.dir(style);
  console.dir(CssVarsArray);
  // setStyle(style, document.documentElement.style);
  // if (style) {
  //   for (const cssVar in style) {
  //     console.log(cssVar);
  //     document.documentElement.style.setProperty(cssVar, style[cssVar] || "");
  //   }
  // }

  return (
    <div
      className={cx(
        "ctw-border ctw-border-solid ctw-border-divider-light",
        className
      )}
    >
      <div className="ctw-flex ctw-h-11 ctw-items-center ctw-justify-between ctw-bg-bg-light ctw-p-3">
        <div className="ctw-title">Conditions</div>
        <div className="ctw-link" onClick={() => setAddConditionIsOpen(true)}>
          + Add Condition
        </div>
      </div>

      <div className="ctw-space-y-5 ctw-py-3 ctw-px-4 ">
        <div className="ctw-space-y-5 ctw-py-3 ctw-px-4">
          <ToggleControl
            onFormChange={handleFormChange}
            toggleProps={{ name: "conditions", text: "Include Inactive" }}
          />
          <div className="ctw-space-y-3">
            <div className="ctw-title ctw-ml-3">Confirmed</div>
            <ConditionsTable
              patientUPID={patientUPID}
              isConfirmed
              includeInactive={includeInactive}
            />
          </div>

          <div className="ctw-space-y-3">
            <div className="ctw-title ctw-ml-3">Not Reviewed</div>
            <ConditionsTable
              patientUPID={patientUPID}
              showTableHead={false}
              isConfirmed={false}
            />
          </div>
        </div>
      </div>

      <ConditionFormDrawer
        isOpen={addConditionIsOpen}
        onClose={() => setAddConditionIsOpen(false)}
      />
    </div>
  );
}
