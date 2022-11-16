import { ReactNode } from "react";

export const TableFullLengthRow = ({
  children,
  colSpan,
}: {
  children: ReactNode;
  colSpan: number;
}) => (
  <tr>
    <td className="ctw-table-full-length-row" colSpan={colSpan}>
      {children}
    </td>
  </tr>
);
