import type { Meta, StoryObj } from "@storybook/react";
import { PatientTimelineV2, PatientTimelineV2Props } from "./patient-timeline";
import { setupTimelineMocks } from "./story-helpers/mocks/requests";
import { CTWProvider } from "@/components/core/providers/ctw-provider";
import { PatientProvider } from "@/components/core/providers/patient-provider";
import { SYSTEM_ZUS_UNIVERSAL_ID } from "@/fhir/system-urls";

type Props = PatientTimelineV2Props;

export default {
  component: PatientTimelineV2,
  tags: ["autodocs"],
  argTypes: {
    className: {
      options: ["Blank", "Fixed Width"],
      control: "select",
      mapping: {
        Blank: "",
        "Fixed Width": "ctw-m-auto ctw-max-w-[600px]",
      },
    },
  },
  args: {
    className: "Blank",
    readOnly: false,
  },
  decorators: [
    (Story, { args }) => (
      <CTWProvider env="dev" authToken="dummy-token" builderId="b123">
        <PatientProvider patientID="u12345" systemURL={SYSTEM_ZUS_UNIVERSAL_ID}>
          <Story args={args} />
        </PatientProvider>
      </CTWProvider>
    ),
  ],
} as Meta<Props>;

export const Basic: StoryObj<Props> = {
  ...setupTimelineMocks(),
};