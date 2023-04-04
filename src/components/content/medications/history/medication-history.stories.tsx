import type { Meta, StoryObj } from "@storybook/react";
import {
  MedicationHistory,
  MedicationHistoryProps,
} from "./medication-history";
import { otherProviderMedications } from "../story-helpers/mocks/other-provider-medications";
import { providerMedications } from "../story-helpers/mocks/provider-medications";
import { setupMedicationMocks } from "../story-helpers/mocks/requests";
import { aggregatedFromMedStatement } from "@/components/content/medications/story-helpers/mocks/aggregated-from-med-statement";
import { CTWProvider } from "@/components/core/providers/ctw-provider";
import { PatientProvider } from "@/components/core/providers/patient-provider";
import { MedicationStatementModel } from "@/fhir/models";
import { SYSTEM_ZUS_UNIVERSAL_ID } from "@/fhir/system-urls";

type Props = MedicationHistoryProps;

const medicationStatementModel = new MedicationStatementModel(
  aggregatedFromMedStatement
);

export default {
  component: MedicationHistory,
  tags: ["autodocs"],
  decorators: [
    (Story, { args }) => (
      <CTWProvider env="dev" authToken="12345" builderId="12345">
        <PatientProvider patientID="007" systemURL={SYSTEM_ZUS_UNIVERSAL_ID}>
          <Story args={args} />
        </PatientProvider>
      </CTWProvider>
    ),
  ],
} as Meta<Props>;

export const Basic: StoryObj<Props> = {
  args: {
    medication: medicationStatementModel,
  },
  ...setupMedicationMocks({ providerMedications, otherProviderMedications }),
};
