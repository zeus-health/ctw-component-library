import type { Meta, StoryObj } from "@storybook/react";
import { PatientSearch } from "./patients-search";
import { setupPatientsTableMocks } from "./story-helpers/mocks/requests";
import { FAKE_AUTH, FAKE_BUILDER_ID } from "../story-helpers/ids";
import { PatientsTableProps } from "@/components/content/patients/patients-table";
import { CTWProvider } from "@/components/core/providers/ctw-provider";

type Props = PatientsTableProps;

const MOCKED_PATIENT_COUNT = 17;

export default {
  tags: ["autodocs"],
  component: PatientSearch,
  decorators: [
    (Story, { args }) => (
      <CTWProvider env="dev" authToken={FAKE_AUTH} builderId={FAKE_BUILDER_ID}>
        <Story args={args} />
      </CTWProvider>
    ),
  ],
  ...setupPatientsTableMocks(MOCKED_PATIENT_COUNT),
} as Meta<Props>;

export const Basic: StoryObj<Props> = {};
