import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { PatientMedicationsProfile } from "./patient-medications-profile";
import { setupMedicationMocks } from "./story-helpers/mocks/requests";
import { FAKE_AUTH, FAKE_BUILDER_ID, FAKE_PATIENT_UPID } from "../story-helpers/ids";
import { PatientMedicationsProps } from "@/components/content/medications/patient-medications";
import { otherProviderMedications } from "@/components/content/medications/story-helpers/mocks/other-provider-medications";
import { providerMedications } from "@/components/content/medications/story-helpers/mocks/provider-medications";
import { CTWProvider } from "@/components/core/providers/ctw-provider";
import { PatientProvider } from "@/components/core/providers/patient-provider";
import { SYSTEM_ZUS_UNIVERSAL_ID } from "@/fhir/system-urls";

type Props = PatientMedicationsProps;

export default {
  tags: ["autodocs"],
  component: PatientMedicationsProfile,
  decorators: [
    (Story, { args }) => (
      <CTWProvider env="dev" authToken={FAKE_AUTH} builderId={FAKE_BUILDER_ID}>
        <PatientProvider patientID={FAKE_PATIENT_UPID} systemURL={SYSTEM_ZUS_UNIVERSAL_ID}>
          <Story args={args} />
        </PatientProvider>
      </CTWProvider>
    ),
  ],
  argTypes: {
    onOpenHistoryDrawer: { action: "open history drawer" },
    onAddToRecord: {
      options: ["Drawer", "Log Action"],
      control: "select",
      mapping: {
        Drawer: undefined,
        "Log Action": action("add to record"),
      },
    },
  },
  args: {
    readOnly: false,
    forceHorizontalTabs: false,
    onAddToRecord: "Drawer",
  },
} as Meta<Props>;

export const Basic: StoryObj<Props> = {
  ...setupMedicationMocks({ providerMedications, otherProviderMedications }),
};

export const BasicFQS: StoryObj<Props> = {
  args: {},
  ...setupMedicationMocks({ providerMedications, otherProviderMedications }),
};
