import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { Spinner as SpinnerComponent } from "@/components/core/spinner";

import "@/styles/tailwind-gen.css";

export default {
  title: "Core/Spinner",
  component: SpinnerComponent,
  argTypes: {
    className: {
      name: "className",
      type: { name: "string", required: false },
      control: { type: "text" },
    },
  },
} as ComponentMeta<typeof SpinnerComponent>;

export const Spinner: ComponentStoryObj<typeof SpinnerComponent> = {
  args: {
    className: "",
  },
};
