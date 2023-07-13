import type { Meta, StoryObj } from "@storybook/react";
import { setupZusAggregatedProfileMocks } from "./story-helpers/mocks/requests";
import { FAKE_AUTH, FAKE_BUILDER_ID, FAKE_PATIENT_UPID } from "../story-helpers/ids";
import { allergyIntolerance } from "@/components/content/allergies/story-helpers/mocks/allergy-intolerance";
import { otherConditions } from "@/components/content/conditions/story-helpers/mocks/other-conditions";
import { patientConditions } from "@/components/content/conditions/story-helpers/mocks/patient-conditions";
import { otherProviderMedications } from "@/components/content/medications/story-helpers/mocks/other-provider-medications";
import { providerMedications } from "@/components/content/medications/story-helpers/mocks/provider-medications";
import {
  ZusAggregatedProfileProps as Props,
  ZusAggregatedProfile,
} from "@/components/content/zus-aggregated-profile/zus-aggregated-profile";
import { CTWProvider } from "@/components/core/providers/ctw-provider";
import { PatientProvider } from "@/components/core/providers/patient-provider";
import { SYSTEM_ZUS_UNIVERSAL_ID } from "@/fhir/system-urls";

export default {
  tags: ["autodocs"],
  component: ZusAggregatedProfile,
  decorators: [
    (Story, { args }) => (
      <CTWProvider env="dev" authToken={FAKE_AUTH} builderId={FAKE_BUILDER_ID}>
        <PatientProvider patientID={FAKE_PATIENT_UPID} systemURL={SYSTEM_ZUS_UNIVERSAL_ID}>
          <Story args={args} />
        </PatientProvider>
      </CTWProvider>
    ),
  ],
  args: {
    resources: undefined,
    forceHorizontalTabs: undefined,
    title: undefined,
    allergiesProps: undefined,
    conditionsProps: undefined,
    conditionsOutsideProps: undefined,
    documentsProps: undefined,
    immunizationsProps: undefined,
    medicationsProps: undefined,
    medicationsOutsideProps: undefined,
    removeBranding: undefined,
  },
} as Meta<Props>;

const { decorators, parameters } = setupZusAggregatedProfileMocks({
  allergyIntolerance,
  otherConditions,
  otherProviderMedications,
  patientConditions,
  providerMedications,
});

export const OutsideRecords: StoryObj<Props> = {
  decorators,
  parameters,
  args: {
    resources: ["conditions-outside", "medications-outside"],
  },
};

export const ConditionsAndMedications: StoryObj<Props> = {
  decorators,
  parameters,
  args: {
    resources: ["conditions", "conditions-outside", "medications", "medications-outside"],
  },
};

export const ProblemsAndDocuments: StoryObj<Props> = {
  decorators,
  parameters,
  args: {
    resources: ["allergies", "conditions", "immunizations", "documents"],
  },
};

export const Everything: StoryObj<Props> = {
  decorators,
  parameters,
  args: {
    resources: [
      "allergies",
      "conditions",
      "conditions-outside",
      "documents",
      "immunizations",
      "medications",
      "medications-outside",
      "care-team",
      "timeline",
    ],
  },
};

export const ScrollbarsOnOverflowZap: StoryObj<Props> = {
  parameters,
  args: {
    resources: [
      "allergies",
      "conditions",
      "conditions-outside",
      "documents",
      "immunizations",
      "medications",
      "medications-outside",
      "care-team",
      "timeline",
      "diagnostic-reports",
    ],
  },
  decorators: [
    ...decorators,
    (Story, { args }) => (
      <div className="ctw-border-solid ctw-border-divider-light ctw-p-2">
        <h3>Fixed height container</h3>
        <code className="language-jsx css-1lwmlsb">
          {"// CSS\n.ctw-zus-aggregated-profile { height: 450px }"}
        </code>
        <style>{".ctw-zus-aggregated-profile { height: 450px }"}</style>
        <Story args={args} />
      </div>
    ),
  ],
};
