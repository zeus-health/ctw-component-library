import cx from "classnames";
import { AlertDialog } from "../core/alert";

export function ConditionsNoPatient({ className }: { className?: string }) {
  return (
    <div className={cx("ctw-conditions", className)}>
      <div className="ctw-heading-container">
        <div className="ctw-title">Conditions</div>
      </div>
      <div className="ctw-p-5">
        <AlertDialog header="Conditions Unavailable">
          <div>
            We are unable to access Condition information for this patient.
          </div>
          <div>
            Contact your system administrator or customer service for
            assistance.
          </div>
        </AlertDialog>
      </div>
    </div>
  );
}
