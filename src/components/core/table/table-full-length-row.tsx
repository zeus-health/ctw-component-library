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
      className="ctw-flex ctw-flex-col ctw-items-center ctw-p-6 ctw-text-content-light"
      colSpan={colSpan}
    >
      {children}
    </td>
  </tr>
);
