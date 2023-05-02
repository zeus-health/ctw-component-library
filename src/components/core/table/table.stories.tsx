import type { Meta, StoryObj } from "@storybook/react";
import { Table, TableProps } from "./table";
import { TableColumn } from "./table-helpers";

type Record = {
  key: string;
  name: string;
};

type Props = TableProps<Record>;

export default {
  component: Table,
  tags: ["autodocs"],
  argTypes: {
    emptyMessage: {
      options: ["Default", "String", "ReactElement"],
      mapping: {
        Default: undefined,
        String: "Ain't no records here friend",
        ReactElement: (
          <div className="ctw-space-y-4">
            <div className="ctw-text-error-main">
              I said <b>NO RECORDS</b> found!
            </div>
            <div>I hope that is OK</div>
          </div>
        ),
      },
    },
  },
  args: {
    RowActions: undefined,
    className: undefined,
    columns: undefined,
    emptyMessage: undefined,
    getRowClassName: undefined,
    handleRowClick: undefined,
    hidePagination: undefined,
    isLoading: undefined,
    records: undefined,
    showTableHead: undefined,
    stacked: undefined,
  },
} as Meta<Props>;

const columns: TableColumn<Record>[] = [
  {
    title: "Id",
    dataIndex: "key",
    className: "ctw-w-[20%]",
  },
  {
    title: "Name",
    dataIndex: "name",
    className: "ctw-w-[20%]",
  },
  {
    title: "With Render",
    render: (row: Record) => (
      <div>
        Render function for row {row.key}: <b>{row.name.split(" ")[0]}</b>
      </div>
    ),
    className: "ctw-w-[30%]",
  },
];

const records: Record[] = [
  { key: "one", name: "First record" },
  { key: "two", name: "Second record" },
  { key: "three", name: "Third record" },
  { key: "four", name: "Fourth record" },
];

export const Basic: StoryObj<Props> = {
  args: {
    records,
    columns,
  },
};

const manyRecords = [...records];
for (let i = records.length + 1; i <= 35; i += 1) {
  manyRecords.push({ key: `${i}`, name: `${i} Record` });
}
export const Paging: StoryObj<Props> = {
  args: {
    records: manyRecords,
    columns,
  },
};

export const Empty: StoryObj<Props> = {
  args: {
    emptyMessage: "Default",
    records: [],
    columns: [],
  },
};

export const Loading: StoryObj<Props> = {
  args: {
    records: [],
    columns: [],
    isLoading: true,
  },
};

export const Stacked: StoryObj<Props> = {
  parameters: {
    docs: {
      description: {
        story: "Stacked version of table, good for sidepanels and smaller screens (responsive).",
      },
    },
  },
  args: {
    ...Basic.args,
    className: "ctw-m-auto ctw-max-w-[600px]",
    stacked: true,
  },
};