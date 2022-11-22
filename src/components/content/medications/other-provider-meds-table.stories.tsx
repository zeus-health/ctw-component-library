import { medicationDispense } from "@/components/content/medication-history/mocks/medication-dispense";
import { medicationRequest } from "@/components/content/medication-history/mocks/medication-request";
import { patient } from "@/components/content/medication-history/mocks/patient";
import {
  OtherProviderMedsTable,
  OtherProviderMedsTableProps,
} from "@/components/content/medications/other-provider-meds-table";
import { CTWProvider } from "@/components/core/ctw-provider";
import { PatientProvider } from "@/components/core/patient-provider";
import { SYSTEM_ZUS_UNIVERSAL_ID } from "@/fhir/system-urls";
import type { Meta, StoryObj } from "@storybook/react";
import { rest } from "msw";
import { otherProviderMedications } from "@/components/content/medications/mocks/other-provider-medications";
import { providerMedications } from "@/components/content/medications/mocks/provider-medications";
import { medicationAdministration } from "@/components/content/medication-history/mocks/medication-administration";

type Props = OtherProviderMedsTableProps;

export default {
  tags: ["docsPage"],
  component: OtherProviderMedsTable,
  decorators: [
    (Story, { args }) => (
      <CTWProvider env="dev" authToken="ey.12345" builderId="12345">
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
        (req, res, ctx) => {
          if (req.url.searchParams.get("_tag:not")) {
            return res(ctx.status(200), ctx.json(providerMedications));
          }
          return res(ctx.status(200), ctx.json(otherProviderMedications));
        }
      ),
      rest.get(
        "https://api.dev.zusapi.com/fhir/MedicationRequest",
        (req, res, ctx) => res(ctx.status(200), ctx.json(medicationRequest))
      ),
      rest.get(
        "https://api.dev.zusapi.com/fhir/MedicationDispense",
        (req, res, ctx) => res(ctx.status(200), ctx.json(medicationDispense))
      ),
      rest.get(
        "https://api.dev.zusapi.com/fhir/MedicationAdministration",
        (req, res, ctx) =>
          res(ctx.status(200), ctx.json(medicationAdministration))
      ),
    ],
  },
} as Meta<Props>;

export const Basic: StoryObj<Props> = {
  args: {
    sortColumn: "display",
    sortOrder: "asc",
  },
};
