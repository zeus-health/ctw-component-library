import { cloneDeep } from "lodash";
import { rest } from "msw";
import { ComponentType, createElement } from "react";
import { v4 as uuidv4 } from "uuid";
import { heartConditions } from "./forms-data-conditions-search";
import { historyChronsDisease } from "./history-crohns-disease";
import { historyDermatitis } from "./history-dermatitis";
import { historyGeneralizedAnxiety } from "./history-generalized-anxiety";
import { historyIronDeficiency } from "./history-iron-deficiency";
import { historyOralContraception } from "./history-oral-contraception";
import { patient } from "./patient";
import { patientHistoryMessage } from "./patient-history-message";
import { SYSTEM_SUMMARY } from "@/fhir/system-urls";

let patientConditionsCache: fhir4.Bundle;
let otherConditionsCache: fhir4.Bundle;

// Sets up a bunch of mocks and uses some global caches
// to allow adding/editing/deleting.
// Cache is reset to provided other & patient conditions on story load.
export function setupConditionMocks({
  otherConditions,
  patientConditions,
}: Record<string, fhir4.Bundle>) {
  return {
    // Use decorator to reset our caches on story load.
    // This way, each story gets a fresh cache.
    decorators: [
      (Story: ComponentType) => {
        patientConditionsCache = cloneDeep(patientConditions);
        otherConditionsCache = cloneDeep(otherConditions);
        return createElement(Story);
      },
    ],

    parameters: {
      msw: [
        mockPatientGet,
        mockConditionSearch,
        mockProvenancePost,
        mockConditionGet,
        mockConditionPost,
        mockConditionPut,
        mockPatientHistoryGet,
        mockConditionsBasic,
        mockConditionsBasicPut,
      ],
    },
  };
}

const mockPatientGet = rest.get(
  "https://api.dev.zusapi.com/fhir/Patient",
  // Add ctx.delay(750), delay to show loading, we set this to 750ms to be
  // less than the default testing-library timeout of 1000ms.
  (req, res, ctx) => res(ctx.delay(750), ctx.status(200), ctx.json(patient))
);

const mockPatientHistoryGet = rest.get(
  "https://api.dev.zusapi.com/patient-history/messages",
  (req, res, ctx) => res(ctx.status(200), ctx.json(patientHistoryMessage))
);

const mockProvenancePost = rest.post(
  "https://api.dev.zusapi.com/fhir/Provenance",
  (req, res, ctx) => res(ctx.status(200))
);

const mockConditionSearch = rest.get(
  "https://api.dev.zusapi.com/forms-data/terminology/conditions",
  (req, res, ctx) => res(ctx.status(200), ctx.json(heartConditions))
);

// Mocked post will add the new condition to the
// patient conditions bundle.
const mockConditionPost = rest.post(
  "https://api.dev.zusapi.com/fhir/Condition",
  async (req, res, ctx) => {
    const newCondition = await req.json();
    newCondition.id = uuidv4();
    patientConditionsCache.entry?.push({
      resource: newCondition,
      search: { mode: "match" },
    });
    patientConditionsCache.total = patientConditionsCache.entry?.length;
    return res(ctx.status(200), ctx.json(newCondition));
  }
);

// Mocked put will modify the condition in the
// patient conditions bundle.
const mockConditionPut = rest.put(
  "https://api.dev.zusapi.com/fhir/Condition/:conditionId",
  async (req, res, ctx) => {
    const condition: fhir4.Condition = await req.json();
    const index = patientConditionsCache.entry?.findIndex(
      (entry) => entry.resource?.id === condition.id
    );
    if (index !== undefined && patientConditionsCache.entry?.[index]) {
      patientConditionsCache.entry[index].resource = condition;
    }
    return res(ctx.status(200), ctx.json(condition));
  }
);

// Mocked get will return one of the following:
//  1. History conditions based on code search param.
//  2. Other provider conditions.
//  3. Patient conditions.
const mockConditionGet = rest.get(
  "https://api.dev.zusapi.com/fhir/Condition",
  (req, res, ctx) => {
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
      return res(ctx.status(200), ctx.json([]));
    }

    // Search for either patient or other provider conditions.
    const tagParam = req.url.searchParams.get("_tag");
    const other = tagParam === `${SYSTEM_SUMMARY}|Common`;
    return res(
      ctx.status(200),
      ctx.json(other ? otherConditionsCache : patientConditionsCache)
    );
  }
);

const mockConditionsBasic = rest.post(
  "https://api.dev.zusapi.com/fhir/Basic",
  async (req, res, ctx) => {
    const newBasicResource = await req.json();
    newBasicResource.search = { mode: "include" };
    newBasicResource.id = uuidv4();
    otherConditionsCache.entry?.push({
      resource: newBasicResource,
      search: { mode: "include" },
    });

    otherConditionsCache.total = otherConditionsCache.entry?.length;
    return res(ctx.status(200), ctx.json(newBasicResource));
  }
);

const mockConditionsBasicPut = rest.put(
  "https://api.dev.zusapi.com/fhir/Basic/:basicId",
  async (req, res, ctx) => {
    const basic = await req.json();
    const index = otherConditionsCache.entry?.findIndex(
      (entry) => entry.resource?.id === basic.id
    );
    if (index !== undefined && otherConditionsCache.entry?.[index]) {
      otherConditionsCache.entry[index].resource = basic;
    }
    return res(ctx.status(200), ctx.json(basic));
  }
);
