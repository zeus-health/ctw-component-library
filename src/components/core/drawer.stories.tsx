import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { rest } from "msw";
import { useState } from "react";
import { patient } from "@/components/content/care-team/story-helpers/mocks/patient";
import {
  FAKE_AUTH,
  FAKE_BUILDER_ID,
  FAKE_PATIENT_UPID,
} from "@/components/content/story-helpers/ids";
import { Drawer, DrawerProps } from "@/components/core/drawer";
import { CTWProvider } from "@/components/core/providers/ctw-provider";
import { PatientProvider } from "@/components/core/providers/patient-provider";
import { SYSTEM_ZUS_UNIVERSAL_ID } from "@/fhir/system-urls";

export default {
  component: Drawer,
  tags: ["autodocs"],
  parameters: setupDrawerMocks(),
  // Setup a button to open drawer stories.
  decorators: [
    (Story, { args }) => {
      const [drawerIsOpen, setDrawerIsOpen] = useState(false);
      return (
        <CTWProvider env="dev" authToken={FAKE_AUTH} builderId={FAKE_BUILDER_ID}>
          <PatientProvider patientID={FAKE_PATIENT_UPID} systemURL={SYSTEM_ZUS_UNIVERSAL_ID}>
            <div id="headlessui-portal-root">
              <p>To open up the drawer, simply press the button below</p>
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
          </PatientProvider>
        </CTWProvider>
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

// Drawers need their own mocks for CTWProvider and PatientProvider.
export function setupDrawerMocks() {
  return {
    parameters: {
      msw: {
        handlers: {
          mocks: [
            rest.get("https://api.dev.zusapi.com/fhir/Patient", (req, res, ctx) =>
              res(ctx.status(200), ctx.json(patient))
            ),
          ],
        },
      },
    },
  };
}
