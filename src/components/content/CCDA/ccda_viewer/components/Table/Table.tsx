/* eslint-disable react/no-array-index-key */
import { BasicRow } from "./BasicRow";
import { TupleRow } from "./TupleRow";
import { TableInfo } from "../../types";
import { chunk, isArray, partition } from "@/utils/nodash";
import "../../../styles.scss";

type TableProps = {
  data: (TableInfo | [TableInfo, TableInfo])[];
  chunkSize?: 2 | 3;
};

export const Table = ({ data, chunkSize = 2 }: TableProps): JSX.Element => {
  const [normalEntries, tupleEntries] = partition(data, (d) => !isArray(d)) as [
    TableInfo[],
    [TableInfo, TableInfo][]
  ];

  const entries = chunk(normalEntries, chunkSize);

  return (
    <table className="ctw-ccda-common-table">
      <tbody>
        {entries.map((dataChunk: TableInfo[], index) => (
          <BasicRow
            key={`${dataChunk[0].label}-${index}`}
            dataChunk={dataChunk}
            chunkSize={chunkSize}
            indexKey={index}
          />
        ))}
        {tupleEntries.map((tuple: [TableInfo, TableInfo], index) => (
          <TupleRow
            key={`${tuple[0].label}-${tuple[1].label}-${index}`}
            tuple={tuple}
            indexKey={index}
          />
        ))}
      </tbody>
    </table>
  );
};
