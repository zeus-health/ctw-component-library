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
      className="ctw-flex ctw-items-center ctw-justify-center ctw-p-6 ctw-text-content-light"
      colSpan={colSpan}
    >
      {children}
    </td>
  </tr>
);
