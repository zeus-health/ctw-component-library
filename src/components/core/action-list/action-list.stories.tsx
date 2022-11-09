import type { Meta, StoryObj } from "@storybook/react";
import {
  ActionList,
  ActionListProps,
  MinActionItem,
} from "@/components/core/action-list/action-list";

type Props = ActionListProps<MinActionItem>;

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

export const WithUndo: StoryObj<Props> = {
  args: {
    items,
    onUndoAction: () => {},
  },
};

export const Empty: StoryObj<Props> = {
  args: {
    items: [],
  },
};

export default {
  component: ActionList,
  parameters: {
    docs: {
      description: {
        component: `
        \nDisplays a list of action items which reflect whether they are completed or not. List items marked "active" will show a (primary) colored border to the left and when hovered will present a button to take action. Use the "onAction" handler to mark items as "complete".
        \nOptionally the opposite can be done for inactive items if an "onUndoAction" handler is passed in, but that is not a requirement.`,
      },
    },
  },
  argTypes: {
    message: {
      defaultValue: "Default",
      options: ["Default"],
      mapping: {
        Default: (
          <div className="ctw-space-y-4">
            <ActionList
              items={items}
              onAction={() => {}}
              actionText="Take Action"
              undoActionText="Undo Action"
            />
          </div>
        ),
      },
    },
  },
} as Meta<Props>;
