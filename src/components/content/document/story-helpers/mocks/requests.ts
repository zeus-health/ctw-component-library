import { graphql, rest } from "msw";
import { documents } from "./document";
import { documentFQS } from "./document-fqs";
import { patient } from "./patient";
import {
  mockBinaryGet,
  mockUnleashFQSEnabledGet,
} from "@/components/content/story-helpers/mocks/requests/requests";

export function setupDocumentMocks() {
  return {
    parameters: {
      msw: { handlers: { mocks: mockRequests() } },
    },
  };
}

function mockRequests() {
  const mockUnleashGet = mockUnleashFQSEnabledGet("documents");

  const mockPatientGet = rest.get(
    "https://api.dev.zusapi.com/fhir/Patient",
    // Add ctx.delay(750), delay to show loading, we set this to 750ms to be
    // less than the default testing-library timeout of 1000ms.
    (req, res, ctx) => res(ctx.delay(750), ctx.status(200), ctx.json(patient))
  );

  const mockDocumentGet = rest.get(
    "https://api.dev.zusapi.com/fhir/DocumentReference",
    (req, res, ctx) => res(ctx.status(200), ctx.json(documents))
  );

  const mockDocumentFQSPost = graphql.query("DocumentReference", (_, res, ctx) =>
    res(ctx.delay(750), ctx.status(200), ctx.data(documentFQS))
  );

  return [mockUnleashGet, mockPatientGet, mockDocumentGet, mockDocumentFQSPost, ...mockBinaryGet()];
}
