import cx from "classnames";
import { Spinner } from "../../core/spinner";

export type SaveButtonProps = {
  submitting: boolean;
};

export const SaveButton = ({ submitting }: SaveButtonProps) => (
  <button
    type="submit"
    disabled={submitting}
    className={cx(
      "ctw-btn-primary ctw-save-button ctw-w-28 ctw-whitespace-nowrap"
    )}
  >
    {submitting ? "Saving..." : "Save"}
    {submitting && <Spinner className="ctw-ml-2 ctw-text-white" />}
  </button>
);
