import { CTWProvider } from "@/components/core/ctw-provider";
import { PatientProvider } from "@/components/core/patient-provider";
import { SYSTEM_SUMMARY, SYSTEM_ZUS_UNIVERSAL_ID } from "@/fhir/system-urls";
import type { Meta, StoryObj } from "@storybook/react";
import { rest } from "msw";
import { Conditions, ConditionsProps } from "../conditions";
import { heartConditions } from "./mocks/forms-data-conditions-search";
import { historyChronsDisease } from "./mocks/history-crohns-disease";
import { historyDermatitis } from "./mocks/history-dermatitis";
import { historyGeneralizedAnxiety } from "./mocks/history-generalized-anxiety";
import { historyIronDeficiency } from "./mocks/history-iron-deficiency";
import { historyOralContraception } from "./mocks/history-oral-contraception";
import { otherConditions } from "./mocks/other-conditions";
import { patient } from "./mocks/patient";
import { patientConditions } from "./mocks/patient-conditions";

type Props = ConditionsProps;

export default {
  component: Conditions,
  tags: ["docsPage"],
  decorators: [
    (Story, { args }) => (
      <CTWProvider env="dev" authToken="dummy-token" builderId="b123">
        <PatientProvider patientID="u12345" systemURL={SYSTEM_ZUS_UNIVERSAL_ID}>
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
      // Mock condition autocomplete, using responses for "heart".
      rest.get(
        "https://api.dev.zusapi.com/forms-data/terminology/conditions",
        (req, res, ctx) => res(ctx.status(200), ctx.json(heartConditions))
      ),
      rest.get("https://api.dev.zusapi.com/fhir/Condition", (req, res, ctx) => {
        const codeParam = req.url.searchParams.get("code");

        // Search by code is used for condition history.
        if (codeParam) {
          const histories = {
            "34000006": historyChronsDisease,
            "4979002": historyDermatitis,
            "21897009": historyGeneralizedAnxiety,
            "35240004": historyIronDeficiency,
            "5935008": historyOralContraception,
          };

          const historyMatch = Object.entries(histories).find((entry) =>
            codeParam.includes(entry[0])
          );
          if (historyMatch) {
            return res(ctx.status(200), ctx.json(historyMatch[1]));
          }
        }

        // Search for either patient or other provider conditions.
        const tagParam = req.url.searchParams.get("_tag");
        const other = tagParam === `${SYSTEM_SUMMARY}|Common`;
        return res(
          ctx.status(200),
          ctx.json(other ? otherConditions : patientConditions)
        );
      }),
    ],
  },
} as Meta<Props>;

export const Basic: StoryObj<Props> = {};
