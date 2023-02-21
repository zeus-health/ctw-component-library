import type { Meta, StoryObj } from "@storybook/react";
import { setupMocks } from "./story-helpers/mocks/requests";
import { allergyIntolerance } from "@/components/content/allergies/story-helpers/mocks/allergy-intolerance";
import { otherConditions } from "@/components/content/conditions/story-helpers/mocks/other-conditions";
import { patientConditions } from "@/components/content/conditions/story-helpers/mocks/patient-conditions";
import { otherProviderMedications } from "@/components/content/medications/story-helpers/mocks/other-provider-medications";
import { providerMedications } from "@/components/content/medications/story-helpers/mocks/provider-medications";
import {
  ZusAggregatedProfileProps as Props,
  ZusAggregatedProfile,
} from "@/components/content/zus-aggregated-profile/zus-aggregated-profile";
import { CTWProvider } from "@/components/core/providers/ctw-provider";
import { PatientProvider } from "@/components/core/providers/patient-provider";
import { SYSTEM_ZUS_UNIVERSAL_ID } from "@/fhir/system-urls";

export default {
  tags: ["autodocs"],
  component: ZusAggregatedProfile,
  decorators: [
    (Story, { args }) => (
      <CTWProvider env="dev" authToken="ey.12345" builderId="12345">
        <PatientProvider patientID="007" systemURL={SYSTEM_ZUS_UNIVERSAL_ID}>
          <Story args={args} />
        </PatientProvider>
      </CTWProvider>
    ),
  ],
  args: {
    allergies: undefined,
    conditions: undefined,
    medications: undefined,
    outsideConditions: undefined,
    outsideMedications: undefined,
    tabs: undefined,
  },
} as Meta<Props>;

export const Basic: StoryObj<Props> = {
  ...setupMocks({
    allergyIntolerance,
    otherConditions,
    otherProviderMedications,
    patientConditions,
    providerMedications,
  }),
  args: {
    tabs: [
      "allergies",
      "conditions",
      "outside-conditions",
      "medications",
      "outside-medications",
    ],
  },
};
