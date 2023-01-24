import type { Meta, StoryObj } from "@storybook/react";
import { setupMedicationMocks } from "./story-helpers/mocks/requests";
import {
  ProviderMedsTable,
  ProviderMedsTableProps,
} from "@/components/content/medications/provider-meds-table";
import { otherProviderMedications } from "@/components/content/medications/story-helpers/mocks/other-provider-medications";
import { providerMedications } from "@/components/content/medications/story-helpers/mocks/provider-medications";
import { CTWProvider } from "@/components/core/providers/ctw-provider";
import { PatientProvider } from "@/components/core/providers/patient-provider";
import { SYSTEM_ZUS_UNIVERSAL_ID } from "@/fhir/system-urls";

type Props = ProviderMedsTableProps;

export default {
  tags: ["docsPage"],
  component: ProviderMedsTable,
  args: {
    sortColumn: "display",
    sortOrder: "asc",
  },
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
  ...setupMedicationMocks({ providerMedications, otherProviderMedications }),
};
