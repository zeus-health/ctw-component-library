import { Meta, StoryObj } from "@storybook/react";
import {
  PatientObservations,
  PatientObservationsProps as Props,
} from "@/components/content/observations/patient-observations";
import { setupObservationMocks } from "@/components/content/observations/story-helpers/mocks/requests";
import { CTWProvider } from "@/components/core/providers/ctw-provider";
import { PatientProvider } from "@/components/core/providers/patient-provider";
import { SYSTEM_ZUS_UNIVERSAL_ID } from "@/fhir/system-urls";

export default {
  component: PatientObservations,
  tags: ["autodocs"],
  args: {},
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
  ...setupObservationMocks(),
};
