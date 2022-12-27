import { MedicationStatement } from "fhir/r4";
import { cloneDeep, find } from "lodash/fp";
import { rest } from "msw";
import { ComponentType, createElement } from "react";
import { v4 as uuidv4 } from "uuid";
import { medicationAdministration } from "./medication-administration";
import { medicationDispense } from "./medication-dispense";
import { medicationRequest } from "./medication-request";
import { patient } from "./patient";

let patientProviderMedsCache: fhir4.Bundle;
let patientOtherProviderMedsCache: fhir4.Bundle;

// Sets mocks for getting/creating medications. Cache is reset on story load.
export function setupMedicationMocks({
  providerMedications,
  otherProviderMedications,
}: Record<string, fhir4.Bundle>) {
  return {
    decorators: [
      (Story: ComponentType) => {
        patientProviderMedsCache = cloneDeep(providerMedications);
        patientOtherProviderMedsCache = cloneDeep(otherProviderMedications);
        return createElement(Story);
      },
    ],
    parameters: {
      msw: [
        mockPatientGet,
        mockMedicationStatementGet,
        mockMedicationStatementPost,
        mockMedicationRequestGet,
        mockMedicationDispenseGet,
        mockMedicationAdministrationGet,
        mockBasicPost,
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

const mockMedicationStatementGet = rest.get(
  "https://api.dev.zusapi.com/fhir/MedicationStatement",
  (req, res, ctx) => {
    if (req.url.searchParams.get("_tag:not")) {
      return res(ctx.status(200), ctx.json(patientProviderMedsCache));
    }
    return res(ctx.status(200), ctx.json(patientOtherProviderMedsCache));
  }
);

// Mocked post will add the new medication to patientProviderMedsCache
const mockMedicationStatementPost = rest.post(
  "https://api.dev.zusapi.com/fhir",
  async (req, res, ctx) => {
    const findMedStatementInBundleFn = find({
      resource: { resourceType: "MedicationStatement" },
    });
    const bundle = await req.json();
    const newMedication = findMedStatementInBundleFn(bundle.entry)?.resource as
      | MedicationStatement
      | undefined;
    if (!newMedication) {
      return res(ctx.status(400));
    }

    newMedication.id = uuidv4();
    patientProviderMedsCache.entry?.push({
      resource: newMedication,
      search: { mode: "match" },
    });
    patientProviderMedsCache.total = patientProviderMedsCache.entry?.length;

    return res(ctx.delay(500), ctx.status(200), ctx.json(newMedication));
  }
);

const mockMedicationRequestGet = rest.get(
  "https://api.dev.zusapi.com/fhir/MedicationRequest",
  (req, res, ctx) => res(ctx.status(200), ctx.json(medicationRequest))
);

const mockMedicationDispenseGet = rest.get(
  "https://api.dev.zusapi.com/fhir/MedicationDispense",
  (req, res, ctx) => res(ctx.status(200), ctx.json(medicationDispense))
);

const mockMedicationAdministrationGet = rest.get(
  "https://api.dev.zusapi.com/fhir/MedicationAdministration",
  (req, res, ctx) => res(ctx.status(200), ctx.json(medicationAdministration))
);

// Mock the creation of a Basic resource and add the dismissed/retained medication to the correct
// mocked cache.
const mockBasicPost = rest.post(
  "https://api.dev.zusapi.com/fhir/Basic",
  async (req, res, ctx) => {
    const newBasicResource = await req.json();
    newBasicResource.search = { mode: "include" };
    newBasicResource.id = uuidv4();
    patientOtherProviderMedsCache.entry?.push({
      resource: newBasicResource,
      search: { mode: "include" },
    });

    patientOtherProviderMedsCache.total =
      patientOtherProviderMedsCache.entry?.length || 0;
    return res(ctx.status(200), ctx.json(newBasicResource));
  }
);
