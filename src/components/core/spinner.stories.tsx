import type { Meta, StoryObj } from "@storybook/react";
import { Spinner, SpinnerProps } from "@/components/core/spinner";

const meta: Meta<typeof Spinner> = {
  component: Spinner,
  tags: ["autodocs"],
};

export default meta;

export const Basic: StoryObj<SpinnerProps> = {};
