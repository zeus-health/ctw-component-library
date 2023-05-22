import { MedicationStatement } from "fhir/r4";
import { rest } from "msw";
import { ComponentType, createElement } from "react";
import { v4 as uuidv4 } from "uuid";
import { searchDosagesALB } from "./forms-data-terminology-dosages";
import { medicationAdministration } from "./medication-administration";
import { medicationDispense } from "./medication-dispense";
import { medicationRequest } from "./medication-request";
import { patient } from "./patient";
import {
  getMockBasicPost,
  getMockBasicPut,
} from "@/components/content/story-helpers/mocks/requests/basic";
import { newBundleCaches } from "@/components/content/story-helpers/types";
import { cloneDeep, find } from "@/utils/nodash/fp";

const cache = newBundleCaches();

// Sets mocks for getting/creating medications. Cache is reset on story load.
export function setupMedicationMocks({
  providerMedications,
  otherProviderMedications,
}: Record<string, fhir4.Bundle>) {
  return {
    decorators: [
      (Story: ComponentType) => {
        cache.builder = cloneDeep(providerMedications);
        cache.outside = cloneDeep(otherProviderMedications);
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
    // Add ctx.delay(750), delay to show loading, we set this to 750ms to be
    // less than the default testing-library timeout of 1000ms.
    (req, res, ctx) => res(ctx.delay(750), ctx.status(200), ctx.json(patient))
  );

  const mockMedicationStatementGet = rest.get(
    "https://api.dev.zusapi.com/fhir/MedicationStatement",
    (req, res, ctx) => {
      if (req.url.searchParams.get("firstparty")) {
        return res(ctx.status(200), ctx.json(cache.builder));
      }
      return res(ctx.delay(750), ctx.status(200), ctx.json(cache.outside));
    }
  );

  // Mocked post will add the new medication to cache.builder
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
      cache.builder.entry?.push({
        resource: newMedication,
        search: { mode: "match" },
      });
      cache.builder.total = cache.builder.entry?.length;

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

  const mockProvenancePost = rest.post(
    "https://api.dev.zusapi.com/fhir/Provenance",
    (_, res, ctx) => res(ctx.status(200))
  );

  const mockTerminologyDosageGet = rest.get(
    "https://api.dev.zusapi.com/forms-data/terminology/dosages",
    (req, res, ctx) => {
      const search = req.url.searchParams.get("display") ?? "";
      const results = searchDosagesALB.filter((item) => item.display.indexOf(search) !== -1);
      return res(
        ctx.status(200),
        ctx.json({
          total: results.length,
          data: results,
        })
      );
    }
  );

  return [
    mockPatientGet,
    mockTerminologyDosageGet,
    mockMedicationStatementGet,
    mockMedicationStatementPost,
    mockMedicationRequestGet,
    mockMedicationDispenseGet,
    mockMedicationAdministrationGet,
    mockProvenancePost,
    getMockBasicPost("MedicationStatement", cache),
    getMockBasicPut(cache),
  ];
}
