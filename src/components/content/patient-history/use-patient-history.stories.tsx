import type { Meta, StoryObj } from "@storybook/react";
import { setupPatientHistoryMocks } from "./story-helpers/mocks/requests";
import { usePatientHistory } from "./use-patient-history";
import { CTWProvider } from "@/components/core/providers/ctw-provider";
import { PatientProvider } from "@/components/core/providers/patient-provider";
import { SYSTEM_ZUS_UNIVERSAL_ID } from "@/fhir/system-urls";

const HookWrapper = () => {
  const { openHistoryRequestDrawer } = usePatientHistory();

  return (
    <button type="button" onClick={openHistoryRequestDrawer} className="ctw-link ctw-btn-clear">
      Request History
    </button>
  );
};

export default {
  title: "hooks/usePatientHistory",
  component: HookWrapper,
  decorators: [
    (Story, { args }) => (
      <CTWProvider env="dev" authToken="dummy-token" builderId="b123">
        <PatientProvider patientID="u12345" systemURL={SYSTEM_ZUS_UNIVERSAL_ID}>
          <Story args={args} />
        </PatientProvider>
      </CTWProvider>
    ),
  ],
} as Meta;

export const Basic: StoryObj = {
  ...setupPatientHistoryMocks(),
};
