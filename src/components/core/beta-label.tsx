import cx from "classnames";

export type BetaLabelProps = {
  className?: string;
};

export const BetaLabel = ({ className }: BetaLabelProps) => (
  <span
    className={cx(
      className,
      "ctw-relative ctw-bottom-1 ctw-inline-flex ctw-text-[10px] ctw-uppercase ctw-text-content-light"
    )}
  >
    beta
  </span>
);
