import { rest } from "msw";
import { patient } from "./patient";
import { patientHistory } from "./patient-history";

export const mockPatientGet = rest.get(
  "https://api.dev.zusapi.com/fhir/Patient",
  (req, res, ctx) => res(ctx.status(200), ctx.json(patient))
);

export const mockPatientHistoryGet = rest.get(
  "https://api.dev.zusapi.com/patient-history/messages",
  (_, res, ctx) => res(ctx.status(200), ctx.json(patientHistory))
);

export const mockPatientPut = rest.put(
  "https://api.dev.zusapi.com/fhir/Patient/:patientId",
  (req, res, ctx) => res(ctx.status(200), ctx.json(patient))
);

export const mockProvenancePost = rest.post(
  "https://api.dev.zusapi.com/fhir/Provenance",
  (_, res, ctx) => res(ctx.status(200))
);

// https://api.dev.zusapi.com/patient-history/patient/u12345/refresh?consent=1
export const mockPatientHistoryPost = rest.post(
  "https://api.dev.zusapi.com/patient-history/patient/:patientId/refresh",
  (req, res, ctx) => res(ctx.status(200), ctx.json({}))
);
