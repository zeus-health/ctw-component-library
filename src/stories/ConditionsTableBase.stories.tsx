import { ComponentMeta, ComponentStoryFn } from "@storybook/react";

import { ConditionsTableBase } from "@/components/content/conditions-table-base";

import "@/styles/tailwind-gen.css";
import { ConditionRecords } from "./resources/conditions";

export default {
  title: "Content/ConditionsTableBase",
  component: ConditionsTableBase,
  argTypes: {
    className: { name: "className", type: { name: "string", required: false } },
    conditions: {
      name: "conditions",
      type: { name: "array", required: true },
    },
  },
} as ComponentMeta<typeof ConditionsTableBase>;

const Template: ComponentStoryFn<typeof ConditionsTableBase> = (args) => (
  <ConditionsTableBase {...args} />
);

export const Filled = Template.bind({});
Filled.args = {
  conditions: ConditionRecords,
};

export const Empty = Template.bind({});
Empty.args = {
  conditions: [],
};
