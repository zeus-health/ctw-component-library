import {
  ActionList,
  ActionListProps,
  MinActionItem,
} from "@/components/core/action-list/action-list";
import type { Meta, StoryObj } from "@storybook/react";

type Props = ActionListProps<MinActionItem>;

export default {
  component: ActionList,
  title: "ActionList",
  tags: ["docsPage"],
} as Meta<Props>;

const item = (id = "", title = "", subtitle = "", complete = false) => ({
  id,
  title,
  subtitle,
  complete,
});
const items: MinActionItem[] = [
  item(
    "007",
    "Miralax Oral Product",
    "Dissolve 17g in 4–8oz liquid and drink once daily for up to 7 days."
  ),
  item(
    "123",
    "3 ML insulin glargine 100 UNT/ML Pen Injector [Lantus]",
    "Inject 3 ML with enclosed pen injector every morning."
  ),
  item(
    "insulin",
    "3 ML insulin aspart protamine, human 70 UNT/ML / insulin aspart, human 30 UNT/ML Pen Injector [NovoLog Mix] ",
    "Inject 3 ML before meals. Quantity: 90 days"
  ),
  item(
    "next",
    "triamcinolone acetonide 0.147 MG/ML Topical Spray",
    "Apply to affected area as needed for eczema exacerbation.",
    true
  ),
];

export const Basic: StoryObj<Props> = {
  args: {
    items,
  },
};

export const WithoutUndo: StoryObj<Props> = {
  args: {
    items,
    // Storybook will automatically add action callbacks so we have
    // to explictily set it to undefined.
    onUndoAction: undefined,
  },
};

export const Empty: StoryObj<Props> = {
  args: {
    items: [],
  },
};
