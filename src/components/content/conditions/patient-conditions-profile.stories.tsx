import type { Meta, StoryObj } from "@storybook/react";
import {
  PatientConditionsProfile,
  PatientConditionsProfileProps,
} from "./patient-conditions-profile";
import { emptyConditions } from "./story-helpers/mocks/empty-conditions";
import { otherConditions } from "./story-helpers/mocks/other-conditions";
import { patientConditions } from "./story-helpers/mocks/patient-conditions";
import { setupConditionMocks } from "./story-helpers/mocks/requests";
import { FAKE_AUTH, FAKE_BUILDER_ID, FAKE_PATIENT_UPID } from "../story-helpers/ids";
import { CTWProvider } from "@/components/core/providers/ctw-provider";
import { PatientProvider } from "@/components/core/providers/patient-provider";
import { SYSTEM_ZUS_UNIVERSAL_ID } from "@/fhir/system-urls";

type Props = PatientConditionsProfileProps;

const meta: Meta<typeof PatientConditionsProfile> = {
  component: PatientConditionsProfile,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    readOnly: false,
    hideRequestRecords: false,
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
  ...setupConditionMocks({ otherConditions, patientConditions }),
};

export const BasicFQS: StoryObj<Props> = {
  ...setupConditionMocks({ otherConditions, patientConditions }),
};

export const Empty: StoryObj<Props> = {
  ...setupConditionMocks({
    otherConditions: emptyConditions,
    patientConditions: emptyConditions,
  }),
};
