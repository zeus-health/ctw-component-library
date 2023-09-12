import parse from "html-react-parser";
import React, { ReactElement, ReactNode } from "react";
import { cloneDeep } from "@/utils/nodash";

export type DetailEntry = {
  label?: string;
  value: ReactNode;
};

export type DetailsProps = {
  hideEmpty?: boolean;
  details: DetailEntry[];
  documentButton?: ReactNode;
};

const MIN_SOURCE_COLUMNS_IN_NOTE = 2;
const MAX_DEPTH_FIND_TABLE_TO_TRANSPOSE = 6;

const WHITESPACE_REGEX = /^\[\\n\\r\\s\\+$/;

export const recursivelyTransposeTables = (node: ReactNode, curDepth: number): ReactNode => {
  if (!node || curDepth >= MAX_DEPTH_FIND_TABLE_TO_TRANSPOSE) {
    return node;
  }

  // if this doesn't have a props then skip it
  if (node instanceof Boolean) {
    return node;
  }

  if (node instanceof String) {
    if ((node as string).match(WHITESPACE_REGEX)) {
      return undefined;
    }
    return node;
  }

  // is this node a table?
  if ((node as ReactElement).type === "table") {
    const tbl = node as ReactElement;
    const newTable = transposeTable(tbl);
    return newTable;
  }

  const props = Object.hasOwn(node as object, "props")
    ? (node as { props: Record<string, unknown> }).props
    : {};

  // if there are contents, then it's a big 'ol string of html we need to parse
  if (props.content) {
    // try to render it
    const el = parse(props.content as string, {});
    const newChildren = recursivelyTransposeTables(el, curDepth + 1);
    const retval = cloneDeep(node);
    (retval as ReactElement).props.content = undefined;

    // react doesn't want arrays of one; rather, it wants either an object or
    // an array of 2 or more children
    if (!Array.isArray(newChildren)) {
      (retval as ReactElement).props.children = newChildren;
    } else if (newChildren.length === 1 && newChildren[0]) {
      // eslint-disable-next-line prefer-destructuring
      (retval as ReactElement).props.children = newChildren[0];
    } else {
      (retval as ReactElement).props.children = newChildren;
    }
    return retval;
  }

  if (!props.children) {
    return node;
  }

  const children = Array.isArray(props.children)
    ? (props.children as ReactElement[])
    : ([props.children] as ReactElement[]);

  const newChildren = (children as ReactElement[]).map((child) =>
    recursivelyTransposeTables(child, curDepth + 1)
  );
  const newNode = cloneDeep(node);

  if (!(newNode as ReactElement).props) {
    return node;
  }

  // react doesn't want arrays of one; rather, it wants either an object or
  // an array of 2 or more children
  if (newChildren.length === 1 && newChildren[0]) {
    // eslint-disable-next-line prefer-destructuring
    (newNode as ReactElement).props.children = newChildren[0];
  } else {
    (newNode as ReactElement).props.children = newChildren;
  }
  return newNode;
};

const transposeTable = (tbl: ReactElement): ReactElement => {
  // find the thead, otherwise skip
  const theads = (tbl.props.children as ReactElement[]).filter((child) => child.type === "thead");
  if (theads.length !== 1) {
    return tbl;
  }
  const thead = theads[0];

  // find the tbody, otherwise skip
  const tbodies = (tbl.props.children as ReactElement[]).filter((child) => child.type === "tbody");
  if (tbodies.length !== 1) {
    return tbl;
  }
  const tbody = tbodies[0];

  // if there's less than the max number of cols, return the original table
  let headerRows = [] as ReactElement[];
  if (Array.isArray(thead.props.children)) {
    headerRows = thead.props.children as ReactElement[];
  } else if (
    thead.props.children.type === "tr" &&
    Array.isArray(thead.props.children.props.children)
  ) {
    headerRows = thead.props.children.props.children as ReactElement[];
  } else {
    headerRows = [thead.props.children.props.children] as ReactElement[];
  }

  if (headerRows.length <= MIN_SOURCE_COLUMNS_IN_NOTE) {
    return tbl;
  }

  // header values as the first column in the rows
  const newRows = [] as JSX.Element[];

  const dataRows = Array.isArray(tbody.props.children)
    ? (tbody.props.children as ReactElement[])
    : ([tbody.props.children] as ReactElement[]);
  if (!dataRows.length) {
    return tbl;
  }

  let transposeIdx = 0;
  dataRows.forEach((dataRow) => {
    // each data row should equate to N new tranpose rows, one for
    // each column in the original data table
    newRows.push(
      ...headerRows.map((col, colIdx) => (
        // the child should be just one text value
        <tr key={`transposed-${transposeIdx}`}>
          <td
            key={
              // eslint-disable-next-line react/no-array-index-key
              `col-${colIdx}`
            }
          >
            {col.props.children}
          </td>
        </tr>
      ))
    );

    // TODO: add a classname to denote where to create a stronger line between
    //       rows

    // now for each cell in the data row
    const dataCells = Array.isArray(dataRow.props.children)
      ? (dataRow.props.children as ReactElement[])
      : ([dataRow.props.children] as ReactElement[]);

    dataCells.forEach((dataCell, cellIdx) => {
      const tr = newRows[transposeIdx];
      const currentCells = Array.isArray(tr.props.children)
        ? (tr.props.children as ReactElement[])
        : ([tr.props.children] as ReactElement[]);
      const updatedCells = [
        ...currentCells,
        // eslint-disable-next-line react/no-array-index-key
        <td key={`data-${transposeIdx}-${cellIdx}`}>{dataCell.props.children}</td>,
      ];

      newRows[transposeIdx] = <tr key={`transposed-${transposeIdx}`}>{updatedCells}</tr>;

      transposeIdx += 1;
    });
  });

  return (
    <table>
      <tbody>{newRows}</tbody>
    </table>
  );
};

export const DetailsCard = ({ details, hideEmpty = true, documentButton }: DetailsProps) => (
  <div className="ctw-rounded-lg ctw-bg-bg-lighter">
    <dl className="ctw-m-0 ctw-space-y-2 ctw-px-4 ctw-py-6">
      <div className="ctw-flex ctw-justify-between ctw-space-x-2 ctw-text-sm ctw-uppercase ctw-text-content-light">
        <div className="ctw-title-container">Details</div>
        <div className="ctw-flex">{documentButton}</div>
      </div>
      {details
        .filter((d) => !hideEmpty || d.value || d.value === 0)
        .map(({ label, value }, idx) => {
          const valueWithTransposedTables = recursivelyTransposeTables(value, 0);
          if (!label) {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <div key={idx} className="ctw-text-gray-900 ctw-flex ctw-items-baseline">
                <div className="ctw-m-0 ctw-w-full">{valueWithTransposedTables}</div>
              </div>
            );
          }
          return (
            <div key={label} className="ctw-text-gray-900 ctw-flex ctw-items-baseline">
              <dt className="ctw-w-1/3 ctw-flex-shrink-0 ctw-font-medium">{label}</dt>
              <dd className="ctw-m-0 ctw-w-full">{valueWithTransposedTables}</dd>
            </div>
          );
        })}
    </dl>
  </div>
);
