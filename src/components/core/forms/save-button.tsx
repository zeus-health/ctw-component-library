import cx from "classnames";
import { Spinner } from "../spinner";

export type SaveButtonProps = {
  submitting: boolean;
  actionName: string;
};

export const SaveButton = ({ submitting, actionName }: SaveButtonProps) => (
  <button
    type="submit"
    disabled={submitting}
    className={cx(
      "ctw-btn-primary ctw-save-button ctw-w-28 ctw-whitespace-nowrap"
    )}
    name="action"
    value={actionName}
  >
    {submitting ? "Saving..." : "Save"}
    {submitting && <Spinner className="ctw-ml-2 ctw-text-white" />}
  </button>
);
