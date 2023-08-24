import type { Meta, StoryObj } from "@storybook/react";
import { CareTeamDetailsDrawerProps, PatientCareTeam } from "./patient-careteam";
import { setupCareTeamMocks } from "./story-helpers/mocks/requests";
import { FAKE_AUTH, FAKE_BUILDER_ID, FAKE_PATIENT_UPID } from "../story-helpers/ids";
import { CTWProvider } from "@/components/core/providers/ctw-provider";
import { PatientProvider } from "@/components/core/providers/patient-provider";
import { SYSTEM_ZUS_UNIVERSAL_ID } from "@/fhir/system-urls";

type Props = CareTeamDetailsDrawerProps;

const meta: Meta<typeof PatientCareTeam> = {
  component: PatientCareTeam,
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
  },
  decorators: [
    (Story, { args }) => (
      <CTWProvider env="dev" authToken={FAKE_AUTH} builderId={FAKE_BUILDER_ID}>
        <PatientProvider patientID={FAKE_PATIENT_UPID} systemURL={SYSTEM_ZUS_UNIVERSAL_ID}>
          <Story args={args} />
        </PatientProvider>
      </CTWProvider>
    ),
  ],
};

export default meta;

export const Basic: StoryObj<Props> = {
  ...setupCareTeamMocks(),
};

export const BasicFQS: StoryObj<Props> = {
  ...setupCareTeamMocks(),
};
