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
      className="ctw-text-content-light ctw-p-6 ctw-text-center"
      colSpan={colSpan}
    >
      {children}
    </td>
  </tr>
);
