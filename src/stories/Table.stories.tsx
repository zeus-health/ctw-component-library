import { ComponentMeta, ComponentStoryFn } from "@storybook/react";

import { Table } from "@/components/core/table/table";

import { ConditionModel } from "@/models/conditions";
import "@/styles/tailwind-gen.css";
import { ConditionRecords, CONDITION_COLUMNS } from "./resources/conditions";

export default {
  title: "Core/Table",
  component: Table,
  argTypes: {
    className: { name: "className", type: { name: "string", required: false } },
    message: {
      name: "No records message",
      type: { name: "string", required: false },
    },
    showTableHead: {
      name: "Show table head",
      type: { name: "boolean", required: false },
    },
  },
} as ComponentMeta<typeof Table>;

const Template: ComponentStoryFn<typeof Table<ConditionModel>> = (args) => (
  <Table {...args} />
);

export const Conditions = Template.bind({});
Conditions.args = {
  records: ConditionRecords,
  columns: CONDITION_COLUMNS,
};

export const Empty = Template.bind({});
Empty.args = { records: [], columns: CONDITION_COLUMNS };
