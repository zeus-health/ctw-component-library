import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { useState } from "react";
import { Drawer, DrawerProps } from "@/components/core/drawer";

export default {
  component: Drawer,
  tags: ["autodocs"],
  // Setup a button to open drawer stories.
  decorators: [
    (Story, { args }) => {
      const [drawerIsOpen, setDrawerIsOpen] = useState(false);
      return (
        <div id="headlessui-portal-root">
          <button
            type="button"
            className="ctw-btn-primary"
            onClick={() => setDrawerIsOpen(true)}
          >
            Open
          </button>
          <Story
            args={{
              ...args,
              isOpen: drawerIsOpen,
              onClose: () => setDrawerIsOpen(false),
            }}
          />
        </div>
      );
    },
  ],
} as Meta<DrawerProps>;

export const Basic: StoryObj<DrawerProps> = {
  args: {
    title: "My Title",
    children: (
      <>
        <Drawer.Body>
          My Body
          {[...Array(20)].map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <p key={i}>scrollable content {i}</p>
          ))}
        </Drawer.Body>
        <Drawer.Footer>My Footer</Drawer.Footer>
      </>
    ),
  },
};

export const Test: StoryObj<DrawerProps> = {
  ...Basic,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify drawer doesn't show right away.
    expect(canvas.queryByText(/my title/i)).toBeNull();

    // Open drawer and verify our three areas appear.
    userEvent.click(canvas.getByRole("button"));
    expect(canvas.getByText(/my title/i)).toBeInTheDocument();
    expect(canvas.getByText(/scrollable content 0/i)).toBeInTheDocument();
    expect(canvas.getByText(/my footer/i)).toBeInTheDocument();
    userEvent.click(canvas.getByLabelText("close"));
  },
};
