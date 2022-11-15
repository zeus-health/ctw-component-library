import { DataList, DataListProps } from "@/components/core/data-list";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  component: DataList,
  tags: ["docsPage"],
} as Meta<DataListProps>;

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
