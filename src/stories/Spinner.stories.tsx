import { ComponentMeta, ComponentStoryFn } from "@storybook/react";

import { Spinner } from "@/components/core/spinner";

import "@/styles/tailwind-gen.css";

export default {
  title: "Core/Spinner",
  component: Spinner,
  argTypes: {
    className: { name: "className", type: { name: "string", required: false } },
  },
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStoryFn<typeof Spinner> = (args) => (
  <Spinner {...args} />
);

export const Primary = Template.bind({});
