import { CTWProvider } from "@/components/core/ctw-provider";
import { PatientProvider } from "@/components/core/patient-provider";
import { SYSTEM_SUMMARY, SYSTEM_ZUS_UNIVERSAL_ID } from "@/fhir/system-urls";
import type { Meta, StoryObj } from "@storybook/react";
import { rest } from "msw";
import { Conditions, ConditionsProps } from "../conditions";
import { emptyConditions } from "./mocks/empty-conditions";
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
  argTypes: {
    className: {
      options: ["Blank", "Fixed Width"],
      control: "select",
      mapping: {
        Blank: "",
        "Fixed Width": "ctw-m-auto ctw-max-w-[600px]",
      },
    },
  },
  args: {
    className: "Empty",
    readOnly: false,
  },
  decorators: [
    (Story, { args }) => (
      <CTWProvider env="dev" authToken="dummy-token" builderId="b123">
        <PatientProvider patientID="u12345" systemURL={SYSTEM_ZUS_UNIVERSAL_ID}>
          <Story args={args} />
        </PatientProvider>
      </CTWProvider>
    ),
  ],
} as Meta<Props>;

const handlerPatient = rest.get(
  "https://api.dev.zusapi.com/fhir/Patient",
  (req, res, ctx) => res(ctx.delay(1000), ctx.status(200), ctx.json(patient))
);

const handlerConditionSearch = rest.get(
  "https://api.dev.zusapi.com/forms-data/terminology/conditions",
  (req, res, ctx) => res(ctx.status(200), ctx.json(heartConditions))
);

export const Basic: StoryObj<Props> = {
  parameters: {
    msw: [
      handlerPatient,
      handlerConditionSearch,
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
};

export const Empty: StoryObj<Props> = {
  parameters: {
    msw: [
      handlerPatient,
      handlerConditionSearch,
      rest.get("https://api.dev.zusapi.com/fhir/Condition", (req, res, ctx) =>
        res(ctx.status(200), ctx.json(emptyConditions))
      ),
    ],
  },
};
