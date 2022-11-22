import type { Meta, StoryObj } from "@storybook/react";
import {
  ProviderMedsTable,
  ProviderMedsTableProps,
} from "@/components/content/medications/provider-meds-table";
import { SYSTEM_ZUS_UNIVERSAL_ID } from "@/fhir/system-urls";
import { CTWProvider } from "@/components/core/ctw-provider";
import { PatientProvider } from "@/components/core/patient-provider";
import otherProviderMedsTableStories from "./other-provider-meds-table.stories";

type Props = ProviderMedsTableProps;

export default {
  tags: ["docsPage"],
  component: ProviderMedsTable,
  decorators: [
    (Story, { args }) => (
      <CTWProvider env="dev" authToken="eyh.12345" builderId="12345">
        <PatientProvider patientID="007" systemURL={SYSTEM_ZUS_UNIVERSAL_ID}>
          <Story args={args} />
        </PatientProvider>
      </CTWProvider>
    ),
  ],
  parameters: otherProviderMedsTableStories.parameters,
} as Meta<Props>;

export const Basic: StoryObj<Props> = {
  args: {
    sortColumn: "display",
    sortOrder: "asc",
  },
};
