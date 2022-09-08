import { ComponentMeta, ComponentStoryFn } from "@storybook/react";

import { DataList } from "@/components/core/data-list";

import "@/styles/tailwind-gen.css";

export default {
  title: "Core/DataList",
  component: DataList,
} as ComponentMeta<typeof DataList>;

const Template: ComponentStoryFn<typeof DataList> = (args) => (
  <DataList {...args} />
);

export const Example = Template.bind({});
Example.args = {
  title: "Title",
  data: [
    { label: "One", value: "One" },
    { label: "Two", value: "2" },
    { label: "Three", value: "three" },
  ],
};

export const Empty = Template.bind({});
Empty.args = { title: "", data: [] };
