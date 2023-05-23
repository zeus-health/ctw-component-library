import { Meta, StoryObj } from "@storybook/react";
import { PatientHistoryTable } from "./patient-history-table";
import { setupPatientHistoryMocks } from "./story-helpers/mocks/requests";
import { FAKE_AUTH, FAKE_BUILDER_ID, FAKE_PATIENT_UPID } from "../story-helpers/ids";
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
      <CTWProvider env="dev" authToken={FAKE_AUTH} builderId={FAKE_BUILDER_ID}>
        <PatientProvider patientID={FAKE_PATIENT_UPID} systemURL={SYSTEM_ZUS_UNIVERSAL_ID}>
          <Story args={args} />
        </PatientProvider>
      </CTWProvider>
    ),
  ],
} as Meta<Props>;

export const Basic: StoryObj<Props> = {
  ...setupPatientHistoryMocks(),
};
