import type { Meta, StoryObj } from "@storybook/react";
import { setupPatientsTableMocks } from "./story-helpers/mocks/requests";
import {
  PatientsTable,
  PatientsTableProps,
} from "@/components/content/patients/patients-table";
import { CTWProvider } from "@/components/core/ctw-provider";

type Props = PatientsTableProps;

const MOCKED_PATIENT_COUNT = 82;

export default {
  tags: ["docsPage"],
  component: PatientsTable,
  decorators: [
    (Story, { args }) => (
      <CTWProvider env="dev" authToken="ey.12345" builderId="12345">
        <Story args={args} />
      </CTWProvider>
    ),
  ],
  ...setupPatientsTableMocks(MOCKED_PATIENT_COUNT),
} as Meta<Props>;

export const Basic: StoryObj<Props> = {};
