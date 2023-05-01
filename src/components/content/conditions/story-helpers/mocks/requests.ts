import { rest } from "msw";
import { ComponentType, createElement } from "react";
import { v4 as uuidv4 } from "uuid";
import { heartConditions } from "./forms-data-conditions-search";
import { historyChronsDisease } from "./history-crohns-disease";
import { historyDermatitis } from "./history-dermatitis";
import { historyGeneralizedAnxiety } from "./history-generalized-anxiety";
import { historyGeneralizedAnxietyVersions } from "./history-generalized-anxiety-versions";
import { historyIronDeficiency } from "./history-iron-deficiency";
import { historyOralContraception } from "./history-oral-contraception";
import { patient } from "./patient";
import { patientHistoryMessage } from "./patient-history-message";
import { ProvenanceCondition } from "./provenance-conditions";
import { mockBinaryGet } from "@/components/content/story-helpers/mocks/requests";
import { SYSTEM_SUMMARY, SYSTEM_ZUS_OWNER } from "@/fhir/system-urls";
import { cloneDeep } from "@/utils/nodash";

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
      msw: { handlers: { mocks: mockRequests() } },
    },
  };
}

const getHistory = (param: string) => {
  const histories = {
    "34000006": historyChronsDisease,
    "4979002": historyDermatitis,
    "21897009": historyGeneralizedAnxiety,
    "35240004": historyIronDeficiency,
    "5935008": historyOralContraception,
  };

  const match = Object.entries(histories).find(([key]) => param.includes(key));
  return match?.[1] ?? [];
};

// Version history requests will be a bundle of requests
// for specific resource ids. Here we simplify and just match
// the first request url to a specific history bundle.
const getHistoryVersionsBundle = (requestUrls: string[]) => {
  const historyVersionBundles: Record<string, fhir4.Bundle | undefined> = {
    "/Condition/7000a33a-808f-4c94-8125-1af140ce6fbe/_history": historyGeneralizedAnxietyVersions,
  };

  // eslint-disable-next-line no-restricted-syntax
  for (const requestUrl of requestUrls) {
    if (historyVersionBundles[requestUrl]) {
      return historyVersionBundles[requestUrl];
    }
  }

  return {};
};

function mockRequests() {
  const mockPatientGet = rest.get(
    "https://api.dev.zusapi.com/fhir/Patient",
    // Add ctx.delay(750), delay to show loading, we set this to 750ms to be
    // less than the default testing-library timeout of 1000ms.
    (_, res, ctx) => res(ctx.delay(750), ctx.status(200), ctx.json(patient))
  );

  const mockPatientHistoryGet = rest.get(
    "https://api.dev.zusapi.com/patient-history/jobs",
    (_, res, ctx) => res(ctx.status(200), ctx.json(patientHistoryMessage))
  );

  const mockProvenancePost = rest.post(
    "https://api.dev.zusapi.com/fhir/Provenance",
    (_, res, ctx) => res(ctx.status(200))
  );

  const mockConditionProvenance = rest.get(
    "https://api.dev.zusapi.com/fhir/Provenance",
    async (_, res, ctx) => res(ctx.status(200), ctx.json(ProvenanceCondition))
  );

  const mockConditionSearch = rest.get(
    "https://api.dev.zusapi.com/forms-data/terminology/conditions",
    (_, res, ctx) => res(ctx.status(200), ctx.json(heartConditions))
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
        const historyMatch = getHistory(codeParam);
        return res(ctx.status(200), ctx.json(historyMatch));
      }

      // Search for either patient or other provider conditions.
      const tagParam = req.url.searchParams.get("_tag");
      const other = tagParam === `${SYSTEM_SUMMARY}|Common`;

      return res(ctx.status(200), ctx.json(other ? otherConditionsCache : patientConditionsCache));
    }
  );

  const mockConditionsBasic = rest.post(
    "https://api.dev.zusapi.com/fhir/Basic",
    async (req, res, ctx) => {
      const newBasicResource = (await req.json()) as fhir4.Basic;
      if (newBasicResource.subject?.type !== "Condition") {
        // The ZusAggregatedProfile component has multiple tabs mocking fhir
        // Basic resources. We only want to handle conditions here.
        return undefined;
      }
      newBasicResource.id = uuidv4();
      newBasicResource.meta = {
        tag: [
          {
            system: SYSTEM_ZUS_OWNER,
            code: "builder/b123",
            display: "Storybook Builder",
          },
        ],
      };
      otherConditionsCache.entry?.push({
        resource: newBasicResource,
        search: { mode: "include" },
      });

      otherConditionsCache.total = otherConditionsCache.entry?.length;
      return res(ctx.status(200), ctx.json(newBasicResource));
    }
  );

  // To handle batch request for conditions used to get version history.
  const mockConditionVersionHistoryBundle = rest.post(
    "https://api.dev.zusapi.com/fhir",
    async (req, res, ctx) => {
      const r = await req.json();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const requestUrls = r.entry?.map((entry: any) => entry.request.url) ?? [];
      return res(ctx.status(200), ctx.json(getHistoryVersionsBundle(requestUrls)));
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

  return [
    mockPatientGet,
    mockConditionSearch,
    mockProvenancePost,
    mockConditionGet,
    mockConditionPost,
    mockConditionPut,
    mockPatientHistoryGet,
    mockBinaryGet(),
    mockConditionsBasic,
    mockConditionVersionHistoryBundle,
    mockConditionProvenance,
    mockConditionsBasicPut,
  ];
}
