import type { Meta, StoryObj } from "@storybook/react";
import { setupMedicationMocks } from "./story-helpers/mocks/requests";
import {
  OtherProviderMedsTable,
  OtherProviderMedsTableProps,
} from "@/components/content/medications/other-provider-meds-table";
import { otherProviderMedications } from "@/components/content/medications/story-helpers/mocks/other-provider-medications";
import { providerMedications } from "@/components/content/medications/story-helpers/mocks/provider-medications";
import { CTWProvider } from "@/components/core/providers/ctw-provider";
import { PatientProvider } from "@/components/core/providers/patient-provider";
import { SYSTEM_ZUS_UNIVERSAL_ID } from "@/fhir/system-urls";

type Props = OtherProviderMedsTableProps;

export default {
  tags: ["autodocs"],
  component: OtherProviderMedsTable,
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
  args: {
    sortColumn: "display",
    sortOrder: "asc",
  },
  ...setupMedicationMocks({ providerMedications, otherProviderMedications }),
};
