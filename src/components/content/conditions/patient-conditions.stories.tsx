import type { Meta, StoryObj } from "@storybook/react";
import {
  PatientConditions,
  PatientConditionsProps,
} from "./patient-conditions";
import { otherConditions } from "./story-helpers/mocks/other-conditions";
import { patientConditions } from "./story-helpers/mocks/patient-conditions";
import { setupConditionMocks } from "./story-helpers/mocks/requests";
import { CTWProvider } from "@/components/core/ctw-provider";
import { PatientProvider } from "@/components/core/patient-provider";
import { SYSTEM_ZUS_UNIVERSAL_ID } from "@/fhir/system-urls";

type Props = PatientConditionsProps;

export default {
  component: PatientConditions,
  tags: ["docsPage"],
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
  ...setupConditionMocks({ otherConditions, patientConditions }),
};
