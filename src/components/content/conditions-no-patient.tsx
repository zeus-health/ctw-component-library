import cx from "classnames";
import { Alert } from "../core/alert";

export function ConditionsNoPatient({ className }: { className?: string }) {
  return (
    <div className={cx("ctw-conditions", className)}>
      <div className="ctw-conditions-heading-container">
        <div className="ctw-title">Conditions</div>
      </div>
      <div className="ctw-p-5">
        <Alert header="Conditions Unavailable" type="caution">
          <div>
            We are unable to access Condition information for this patient.
          </div>
          <div>
            Contact your system administrator or customer service for
            assistance.
          </div>
        </Alert>
      </div>
    </div>
  );
}
