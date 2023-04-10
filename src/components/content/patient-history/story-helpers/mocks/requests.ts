import { rest } from "msw";
import { patient } from "./patient";
import { patientHistory } from "./patient-history";

export function setupPatientHistoryMocks() {
  return {
    parameters: {
      msw: {
        handlers: { mocks: mockRequests() },
      },
    },
  };
}

function mockRequests() {
  const mockPatientGet = rest.get(
    "https://api.dev.zusapi.com/fhir/Patient",
    (req, res, ctx) => res(ctx.status(200), ctx.json(patient))
  );

  const mockPatientHistoryGet = rest.get(
    "https://api.dev.zusapi.com/patient-history/messages",
    (_, res, ctx) => res(ctx.status(200), ctx.json(patientHistory))
  );

  const mockPatientPut = rest.put(
    "https://api.dev.zusapi.com/fhir/Patient/:patientId",
    (req, res, ctx) => res(ctx.status(200), ctx.json(patient))
  );

  const mockProvenancePost = rest.post(
    "https://api.dev.zusapi.com/fhir/Provenance",
    (_, res, ctx) => res(ctx.status(200))
  );

  // https://api.dev.zusapi.com/patient-history/patient/u12345/refresh?consent=1
  const mockPatientHistoryPost = rest.post(
    "https://api.dev.zusapi.com/patient-history/patient/:patientId/refresh",
    (req, res, ctx) => res(ctx.status(200), ctx.json({}))
  );

  return [
    mockPatientHistoryPost,
    mockProvenancePost,
    mockPatientPut,
    mockPatientGet,
    mockPatientHistoryGet,
  ];
}
