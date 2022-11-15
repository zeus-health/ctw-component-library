import { rest } from "msw";
import type { Meta, StoryObj } from "@storybook/react";
import {
  MedicationHistory,
  MedicationHistoryProps,
} from "@/components/content/medication-history";
import { MedicationStatementModel } from "@/models";
import { SYSTEM_ZUS_UNIVERSAL_ID } from "@/fhir/system-urls";
import { CTWProvider } from "@/components/core/ctw-provider";
import { PatientProvider } from "@/components/core/patient-provider";
import aggregatedFromMedicationStatement from "@/components/content/medication-history/mocks/aggregated-from-med-statement";
import medicationStatement from "@/components/content/medication-history/mocks/medication-statements";
import medicationRequest from "@/components/content/medication-history/mocks/medication-request";
import medicationDispense from "@/components/content/medication-history/mocks/medication-dispense";
import patient from "@/components/content/medication-history/mocks/patient";

type Props = MedicationHistoryProps;

const medicationStatementModel = new MedicationStatementModel(
  aggregatedFromMedicationStatement
);

export default {
  component: MedicationHistory,
  decorators: [
    (Story, { args }) => (
      <CTWProvider env="dev" authToken="12345" builderId="12345">
        <PatientProvider patientID="007" systemURL={SYSTEM_ZUS_UNIVERSAL_ID}>
          <Story args={args} />
        </PatientProvider>
      </CTWProvider>
    ),
  ],
  parameters: {
    msw: [
      rest.get("https://api.dev.zusapi.com/fhir/Patient", (req, res, ctx) =>
        res(ctx.status(200), ctx.json(patient))
      ),
      rest.get(
        "https://api.dev.zusapi.com/fhir/MedicationStatement",
        (req, res, ctx) => res(ctx.status(200), ctx.json(medicationStatement))
      ),
      rest.get(
        "https://api.dev.zusapi.com/fhir/MedicationRequest",
        (req, res, ctx) => res(ctx.status(200), ctx.json(medicationRequest))
      ),
      rest.get(
        "https://api.dev.zusapi.com/fhir/MedicationDispense",
        (req, res, ctx) => res(ctx.status(200), ctx.json(medicationDispense))
      ),
    ],
  },
} as Meta<Props>;

export const Basic: StoryObj<Props> = {
  args: {
    medication: medicationStatementModel,
  },
};
