import {
  PatientMedications,
  PatientMedicationsProps,
} from "@/components/content/medications/patient-medications";
import { CTWProvider } from "@/components/core/ctw-provider";
import { PatientProvider } from "@/components/core/patient-provider";
import { SYSTEM_ZUS_UNIVERSAL_ID } from "@/fhir/system-urls";
import type { Meta, StoryObj } from "@storybook/react";
import { setupMedicationMocks } from "./story-helpers/mocks/requests";

type Props = PatientMedicationsProps;

export default {
  tags: ["docsPage"],
  component: PatientMedications,
  decorators: [
    (Story, { args }) => (
      <CTWProvider env="dev" authToken="ey.12345" builderId="12345">
        <PatientProvider patientID="007" systemURL={SYSTEM_ZUS_UNIVERSAL_ID}>
          <Story args={args} />
        </PatientProvider>
      </CTWProvider>
    ),
  ],
  ...setupMedicationMocks(),
} as Meta<Props>;

export const Basic: StoryObj<Props> = {};
