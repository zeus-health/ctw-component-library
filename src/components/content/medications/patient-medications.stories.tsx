import type { Meta, StoryObj } from "@storybook/react";
import {
  PatientMedications,
  PatientMedicationsProps,
} from "@/components/content/medications/patient-medications";
import { SYSTEM_ZUS_UNIVERSAL_ID } from "@/fhir/system-urls";
import { CTWProvider } from "@/components/core/ctw-provider";
import { PatientProvider } from "@/components/core/patient-provider";
import otherProviderMedicationsTableStories from "@/components/content/medications/other-provider-meds-table.stories";

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
  parameters: otherProviderMedicationsTableStories.parameters,
} as Meta<Props>;

export const Basic: StoryObj<Props> = {
  args: {},
};
