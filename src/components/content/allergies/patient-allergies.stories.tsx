import type { Meta, StoryObj } from "@storybook/react";
import { setupAllergiesMocks } from "./story-helpers/mocks/requests";
import { FAKE_AUTH, FAKE_BUILDER_ID, FAKE_PATIENT_UPID } from "../story-helpers/ids";
import {
  PatientAllergies,
  PatientAllergiesProps,
} from "@/components/content/allergies/patient-allergies";
import { allergyIntolerance } from "@/components/content/allergies/story-helpers/mocks/allergy-intolerance";
import { CTWProvider } from "@/components/core/providers/ctw-provider";
import { PatientProvider } from "@/components/core/providers/patient-provider";
import { SYSTEM_ZUS_UNIVERSAL_ID } from "@/fhir/system-urls";

type Props = PatientAllergiesProps;

const meta: Meta<typeof PatientAllergies> = {
  tags: ["autodocs"],
  component: PatientAllergies,
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

export const Basic: StoryObj<Props> = {
  ...setupAllergiesMocks({ allergyIntolerance }),
};

export const BasicFQS: StoryObj<Props> = {
  ...setupAllergiesMocks({ allergyIntolerance }),
};

export default meta;
