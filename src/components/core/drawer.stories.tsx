import { Drawer, DrawerProps } from "@/components/core/drawer";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

export default {
  component: Drawer,
  // Setup a button to open drawer stories.
  decorators: [
    (Story, { args }) => {
      const [drawerIsOpen, setDrawerIsOpen] = useState(false);
      return (
        <div>
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
            <p key={i}>scrollable content {i}</p>
          ))}
        </Drawer.Body>
        <Drawer.Footer>My Footer</Drawer.Footer>
      </>
    ),
  },
};
