import cx from "classnames";
import { ReactNode } from "react";

export const TableFullLengthRow = ({
  children,
  colSpan,
  className,
}: {
  children: ReactNode;
  colSpan: number;
  className?: cx.Argument;
}) => (
  <tr className={cx(className)}>
    <td className="ctw-table-full-length-row" colSpan={colSpan}>
      {children}
    </td>
  </tr>
);
