import { rest } from "msw";
import { ComponentType, createElement } from "react";
import { patient } from "./patient";
import { cloneDeep } from "@/utils/nodash/fp";

let patientAllergiesCache: fhir4.Bundle;

export function setupAllergiesMocks({ allergyIntolerance }: Record<string, fhir4.Bundle>) {
  return {
    decorators: [
      (Story: ComponentType) => {
        patientAllergiesCache = cloneDeep(allergyIntolerance);
        return createElement(Story);
      },
    ],
    parameters: {
      msw: { handlers: { mocks: mockRequests() } },
    },
  };
}

function mockRequests() {
  const mockPatientGet = rest.get(
    "https://api.dev.zusapi.com/fhir/Patient",
    // Add ctx.delay(750), delay to show loading, we set this to 750ms
    (req, res, ctx) => res(ctx.delay(750), ctx.status(200), ctx.json(patient))
  );

  const mockAllergyIntolleranceGet = rest.get(
    "https://api.dev.zusapi.com/fhir/AllergyIntolerance",
    (req, res, ctx) => res(ctx.delay(750), ctx.status(200), ctx.json(patientAllergiesCache))
  );

  return [mockPatientGet, mockAllergyIntolleranceGet];
}
