import type { Meta, StoryObj } from "@storybook/react";
import { DataList, DataListProps } from "@/components/core/data-list";

const meta: Meta<typeof DataList> = {
  component: DataList,
  tags: ["autodocs"],
};

export default meta;

export const Basic: StoryObj<DataListProps> = {
  args: {
    title: "data list title",
    data: [
      { label: "String value", value: "hello world" },
      { label: "Array value", value: ["One", "two", "3"] },
      { label: "Undefined value", value: undefined },
    ],
  },
};
