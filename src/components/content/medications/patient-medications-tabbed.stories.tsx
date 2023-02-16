import type { Meta, StoryObj } from "@storybook/react";
import { setupMedicationMocks } from "./story-helpers/mocks/requests";
import {
  PatientMedicationsTabbed,
  PatientMedicationsTabbedProps,
} from "@/components/content/medications/patient-medications-tabbed";
import { otherProviderMedications } from "@/components/content/medications/story-helpers/mocks/other-provider-medications";
import { providerMedications } from "@/components/content/medications/story-helpers/mocks/provider-medications";
import { CTWProvider } from "@/components/core/providers/ctw-provider";
import { PatientProvider } from "@/components/core/providers/patient-provider";
import { SYSTEM_ZUS_UNIVERSAL_ID } from "@/fhir/system-urls";

type Props = PatientMedicationsTabbedProps;

export default {
  tags: ["autodocs"],
  component: PatientMedicationsTabbed,
  decorators: [
    (Story, { args }) => (
      <CTWProvider env="dev" authToken="ey.12345" builderId="12345">
        <PatientProvider patientID="007" systemURL={SYSTEM_ZUS_UNIVERSAL_ID}>
          <Story args={args} />
        </PatientProvider>
      </CTWProvider>
    ),
  ],
  args: {
    hideAddToRecord: undefined,
    forceHorizontalTabs: undefined,
    onAfterOpenHistoryDrawer: undefined,
    onOpenHistoryDrawer: undefined,
  },
} as Meta<Props>;

export const Basic: StoryObj<Props> = {
  ...setupMedicationMocks({ providerMedications, otherProviderMedications }),
};

export const ForceHorizontalTabs: StoryObj<Props> = {
  ...Basic,
  args: {
    forceHorizontalTabs: true,
  },
};

export const HideAddToRecord: StoryObj<Props> = {
  ...Basic,
  args: {
    hideAddToRecord: true,
  },
};
