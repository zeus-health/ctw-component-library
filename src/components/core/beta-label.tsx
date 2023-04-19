import cx from "classnames";

export type BetaLabelProps = {
  className?: string;
};

export const BetaLabel = ({ className }: BetaLabelProps) => (
  <span className={cx(
    className,
    "ctw-inline-flex ctw-text-[10px] ctw-text-content-light ctw-relative ctw-bottom-1 ctw-uppercase"
  )}>
    beta
  </span>
);
