import { graphql, rest } from "msw";
import { careTeamFQS } from "./care-team-fqs";
import { careTeam } from "./careteam";
import { patient } from "./patient";
import { mockUnleashFQSEnabledGet } from "@/components/content/story-helpers/mocks/requests/requests";

export function setupCareTeamMocks() {
  return {
    parameters: {
      msw: { handlers: { mocks: mockCareTeamRequests() } },
    },
  };
}

function mockCareTeamRequests() {
  const mockUnleashGet = mockUnleashFQSEnabledGet("careTeam");

  const mockPatientGet = rest.get(
    "https://api.*.zusapi.com/fhir/Patient",
    // Add ctx.delay(750), delay to show loading, we set this to 750ms to be
    // less than the default testing-library timeout of 1000ms.
    (req, res, ctx) => res(ctx.delay(750), ctx.status(200), ctx.json(patient))
  );

  const mockCareTeamGet = rest.get("https://api.dev.zusapi.com/fhir/CareTeam", (req, res, ctx) =>
    res(ctx.status(200), ctx.json(careTeam))
  );

  const mockCareTeamFQSPost = graphql.query("CareTeam", (_, res, ctx) =>
    res(ctx.delay(750), ctx.status(200), ctx.data(careTeamFQS))
  );

  return [mockPatientGet, mockCareTeamGet, mockUnleashGet, mockCareTeamFQSPost];
}
