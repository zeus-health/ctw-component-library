import { rest } from "msw";
import { encounters } from "./encounters";
import { patient } from "./patient";

export const mockPatientGet = rest.get(
  "https://api.dev.zusapi.com/fhir/Patient",
  // Add ctx.delay(750), delay to show loading, we set this to 750ms to be
  // less than the default testing-library timeout of 1000ms.
  (req, res, ctx) => res(ctx.delay(750), ctx.status(200), ctx.json(patient))
);

export const mockEncounterGet = rest.get(
  "https://api.dev.zusapi.com/fhir/Encounter",
  (req, res, ctx) => res(ctx.status(200), ctx.json(encounters))
);
