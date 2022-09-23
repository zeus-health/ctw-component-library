import { ReactNode } from "react";

export const TableFullLengthRow = ({
  children,
  colSpan,
}: {
  children: ReactNode;
  colSpan: number;
}) => (
  <tr>
    <td
      className="ctw-p-6 ctw-text-center ctw-text-content-light"
      colSpan={colSpan}
    >
      {children}
    </td>
  </tr>
);
