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
          <p>To open up the drawer, simply press the button below</p>
          <button type="button" className="ctw-btn-primary" onClick={() => setDrawerIsOpen(true)}>
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
  args: {
    children: undefined,
    className: undefined,
    disableCloseOnBlur: undefined,
    isOpen: undefined,
    onAfterClosed: undefined,
    onAfterOpen: undefined,
    onClose: undefined,
    onOpen: undefined,
    showCloseFooter: undefined,
    title: undefined,
  },
} as Meta<DrawerProps>;

export const Basic: StoryObj<DrawerProps> = {
  args: {
    title: "Drawer Title",
    children: (
      <>
        <Drawer.Body>
          <h4>Drawer Body</h4>
          <ol>
            {[...Array(10)].map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={i} data-testid={`scrollable-content-${i}`}>
                Lorem ipsum dolor sit amet, his te vulputate cotidieque concludaturque, no nulla
                dicit vocibus ius. Eos ne recusabo scriptorem, admodum ullamcorper te mei. Eros
                mundi eos te, mea at errem graecis. Ex cum delicata intellegam, mea at duis
                patrioque conclusionemque, pri te brute ceteros eloquentiam. Veri placerat persecuti
                ut vix, sint esse iriure ei sit
              </li>
            ))}
          </ol>
        </Drawer.Body>
        <Drawer.Footer>Drawer Footer</Drawer.Footer>
      </>
    ),
  },
};

export const Test: StoryObj<DrawerProps> = {
  ...Basic,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify drawer doesn't show right away.
    expect(canvas.queryByText(/drawer title/i)).toBeNull();

    // Open drawer and verify our three areas appear.
    userEvent.click(canvas.getByRole("button"));
    expect(canvas.getByText(/drawer title/i)).toBeInTheDocument();
    expect(canvas.getByTestId("scrollable-content-0")).toBeInTheDocument();
    expect(canvas.getByText(/drawer footer/i)).toBeInTheDocument();
    userEvent.click(canvas.getByLabelText("close"));
  },
};
