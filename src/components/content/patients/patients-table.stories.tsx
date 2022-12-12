import type { Meta, StoryObj } from "@storybook/react";
import { setupPatientsTableMocks } from "./story-helpers/mocks/requests";
import {
  PatientsTable,
  PatientsTableProps,
} from "@/components/content/patients/patients-table";
import { CTWProvider } from "@/components/core/ctw-provider";
import { PatientProvider } from "@/components/core/patient-provider";
import { SYSTEM_ZUS_UNIVERSAL_ID } from "@/fhir/system-urls";

type Props = PatientsTableProps;

export default {
  tags: ["docsPage"],
  component: PatientsTable,
  decorators: [
    (Story, { args }) => (
      <CTWProvider env="dev" authToken="ey.12345" builderId="12345">
        <PatientProvider patientID="007" systemURL={SYSTEM_ZUS_UNIVERSAL_ID}>
          <Story args={args} />
        </PatientProvider>
      </CTWProvider>
    ),
  ],
  ...setupPatientsTableMocks(83),
} as Meta<Props>;

export const Basic: StoryObj<Props> = {};
