import { rest } from "msw";
import { ComponentType, createElement } from "react";
import { patient } from "./patient";
import { cloneDeep } from "@/utils/nodash/fp";

let patientAllergiesCache: fhir4.Bundle;

export function setupAllergiesMocks({
  allergies,
}: Record<string, fhir4.Bundle>) {
  return {
    decorators: [
      (Story: ComponentType) => {
        patientAllergiesCache = cloneDeep(allergies);
        return createElement(Story);
      },
    ],
    parameters: {
      msw: [
        mockPatientGet,
        mockAllergiesIntolleranceGet,
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

const mockAllergiesIntolleranceGet = rest.get(
  "https://api.dev.zusapi.com/fhir/AllergyIntolerance",
  (req, res, ctx) => res(ctx.status(200), ctx.json(patientAllergiesCache))
);
