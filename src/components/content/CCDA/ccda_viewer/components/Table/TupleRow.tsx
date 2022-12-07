/* eslint-disable react/no-array-index-key */
import React from "react";
import { TableInfo } from "../../types";
import { useCommonStyles } from "../../helpers/commonStyles";

type TdProps = {
  tuple: [TableInfo, TableInfo];
  indexKey: number;
};
export const TupleRow = ({ tuple, indexKey }: TdProps): JSX.Element | null => {
  const commonClasses = useCommonStyles();

  if (!tuple[0].value && !tuple[1].value) return null;

  return (
    <tr>
      {tuple.map((singleData, index) => {
        if (!singleData.value) return null;
        let colSpan = 1;
        if (
          (index === 0 && !tuple[1].value) ||
          (index === 1 && !tuple[0].value)
        )
          colSpan = 3;

        return (
          <React.Fragment
            key={`${tuple[0].label}-${tuple[0].value}-${index}-${indexKey}-${
              tuple?.[1]?.label || ""
            }-${tuple?.[1]?.value}`}
          >
            <td className={commonClasses.td1}>
              {singleData.label.replace(/:/g, "")}
            </td>
            <td className={commonClasses.td2} colSpan={colSpan}>
              {singleData.value}
            </td>
          </React.Fragment>
        );
      })}
    </tr>
  );
};
