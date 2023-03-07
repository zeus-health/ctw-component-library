import { rest } from "msw";
import { documents } from "./document";
import { patient } from "./patient";
import { mockBinaryGet } from "@/components/content/story-helpers/mocks/requests";

export function setupDocumentMocks() {
  return {
    parameters: {
      msw: { handlers: { mocks: mockRequests() } },
    },
  };
}

function mockRequests() {
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

  return [mockPatientGet, mockDocumentGet, mockBinaryGet()];
}
