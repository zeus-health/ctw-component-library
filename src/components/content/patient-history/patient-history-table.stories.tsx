import { Meta, StoryObj } from "@storybook/react";
import { PatientHistoryTable } from "./patient-history-table";
import { setupPatientHistoryMocks } from "./story-helpers/mocks/requests";
import { PatientObservationsProps as Props } from "@/components/content/observations/patient-observations";
import { CTWProvider } from "@/components/core/providers/ctw-provider";
import { PatientProvider } from "@/components/core/providers/patient-provider";
import { SYSTEM_ZUS_UNIVERSAL_ID } from "@/fhir/system-urls";

export default {
  component: PatientHistoryTable,
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
  ...setupPatientHistoryMocks(),
};
