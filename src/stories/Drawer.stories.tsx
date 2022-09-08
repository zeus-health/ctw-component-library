import { ComponentMeta, ComponentStoryFn } from "@storybook/react";

import { Drawer } from "@/components/core/drawer";

import "@/styles/tailwind-gen.css";

export default {
  title: "Core/Drawer",
  component: Drawer,
  argTypes: {
    className: { name: "className", type: { name: "string", required: false } },
    title: { name: "Title", type: { name: "string", required: true } },
    isOpen: {
      name: "Open",
      type: { name: "boolean", required: true },
      defaultValue: true,
    },
  },
} as ComponentMeta<typeof Drawer>;

const Template: ComponentStoryFn<typeof Drawer> = (args) => (
  <Drawer {...args} />
);

export const TextDrawer = Template.bind({});
TextDrawer.args = {
  title: "Title",
  children: (
    <>
      <Drawer.Body>Body</Drawer.Body>
      <Drawer.Footer>Footer</Drawer.Footer>
    </>
  ),
};

export const EmptyDrawer = Template.bind({});
EmptyDrawer.args = {};
