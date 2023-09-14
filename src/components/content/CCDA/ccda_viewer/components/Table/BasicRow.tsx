/* eslint-disable react/no-array-index-key */
import React from "react";
import { TableInfo } from "../../types";
import "../../../styles.scss";

type TdProps = {
  dataChunk: TableInfo[];
  indexKey: number;
  chunkSize?: 2 | 3;
};
export const BasicRow = ({ dataChunk, indexKey, chunkSize }: TdProps): JSX.Element | null => {
  if (!dataChunk[0].value && !dataChunk[1]?.value && !dataChunk[2]?.value) {
    return null;
  }

  let last: TableInfo | null = null;
  let newDataChunk = dataChunk;
  if (chunkSize === 3) {
    newDataChunk = dataChunk.slice(0, 2);
    [last] = dataChunk.slice(2);
  }

  return (
    <>
      <tr>
        {newDataChunk.map((singleData, index) => {
          if (!singleData.value) return null;
          let colSpan = 1;
          if (
            (index === 0 && (!newDataChunk[index + 1] || !newDataChunk[index + 1].value)) ||
            (index === 1 && (!newDataChunk[index - 1] || !newDataChunk[index - 1].value))
          ) {
            colSpan = 3;
          }

          return (
            <React.Fragment
              key={`${newDataChunk[0].label}-${String(
                newDataChunk[0].value
              )}-${index}-${indexKey}-${newDataChunk[1]?.label || ""}-${
                newDataChunk[1]?.value || ""
              }`}
            >
              <td
                className="ctw-ccda-common-td1"
                rowSpan={last && last.value && index === 0 ? 2 : 1}
              >
                {singleData.label.replace(/:/g, "")}
              </td>
              <td
                className="ctw-ccda-common-td2"
                colSpan={colSpan}
                rowSpan={last && last.value && index === 0 ? 2 : 1}
              >
                {singleData.value}
              </td>
            </React.Fragment>
          );
        })}
      </tr>
      {last && last.value && (
        <tr>
          <td className="ctw-ccda-common-td1">{last.label.replace(/:/g, "")}</td>
          <td className="ctw-ccda-common-td2">{last.value}</td>
        </tr>
      )}
    </>
  );
};
