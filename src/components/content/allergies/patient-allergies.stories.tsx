import type { Meta, StoryObj } from "@storybook/react";
import { setupAllergiesMocks } from "./story-helpers/mocks/requests";
import {
  PatientAllergies,
  PatientAllergiesProps,
} from "@/components/content/allergies/patient-allergies";
import { allergyIntolerance } from "@/components/content/allergies/story-helpers/mocks/allergy-intolerance";
import { CTWProvider } from "@/components/core/providers/ctw-provider";
import { PatientProvider } from "@/components/core/providers/patient-provider";
import { SYSTEM_ZUS_UNIVERSAL_ID } from "@/fhir/system-urls";

type Props = PatientAllergiesProps;

export default {
  tags: ["autodocs"],
  component: PatientAllergies,
  decorators: [
    (Story, { args }) => (
      <CTWProvider env="dev" authToken="ey.12345" builderId="12345">
        <PatientProvider patientID="007" systemURL={SYSTEM_ZUS_UNIVERSAL_ID}>
          <Story args={args} />
        </PatientProvider>
      </CTWProvider>
    ),
  ],
} as Meta<Props>;

export const Basic: StoryObj<Props> = {
  ...setupAllergiesMocks({ allergyIntolerance }),
};
