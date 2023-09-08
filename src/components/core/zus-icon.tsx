import cx from "classnames";
import ZusSVG from "@/assets/zus.svg";

export type ZusIconProps = {
  className?: cx.Argument;
};

export const ZusIcon = ({ className }: ZusIconProps) => (
  <img src={ZusSVG} alt="Zus" className={cx(className, "ctw-zus-icon")} />
);
