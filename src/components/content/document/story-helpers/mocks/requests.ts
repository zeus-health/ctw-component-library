import { rest } from "msw";
import { documents } from "./document";
import { patient } from "./patient";
import { conditionBinary } from "@/components/content/conditions/story-helpers/mocks/condition-binary";

function mockDocumentRequests() {
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

  const mockConditionBinaryDocumentinDocumentReference = rest.get(
    "https://api.dev.zusapi.com/fhir/Binary",
    async (_, res, ctx) => res(ctx.status(200), ctx.json(conditionBinary))
  );
  return [
    mockPatientGet,
    mockDocumentGet,
    mockConditionBinaryDocumentinDocumentReference,
  ];
}

export function setupDocumentMocks() {
  return {
    parameters: {
      msw: mockDocumentRequests(),
    },
  };
}
