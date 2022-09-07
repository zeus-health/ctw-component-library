import { Spinner } from "@/components/core/spinner";
import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Core/Spinner",
  component: Spinner,
} as ComponentMeta<typeof Spinner>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Story: ComponentStoryObj<typeof Spinner> = { args: {} };
