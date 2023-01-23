import type { Meta, StoryObj } from "@storybook/react";
import { Spinner, SpinnerProps } from "@/components/core/spinner";

export default {
  component: Spinner,
  tags: ["autodocs"],
} as Meta<SpinnerProps>;

export const Basic: StoryObj<SpinnerProps> = {};
