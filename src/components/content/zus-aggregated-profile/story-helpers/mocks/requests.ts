import { setupAllergiesMocks } from "@/components/content/allergies/story-helpers/mocks/requests";
import { setupCareTeamMocks } from "@/components/content/care-team/story-helpers/mocks/requests";
import { setupConditionMocks } from "@/components/content/conditions/story-helpers/mocks/requests";
import { setupDocumentMocks } from "@/components/content/document/story-helpers/mocks/requests";
import { setupImmunizationMocks } from "@/components/content/immunizations/story-helpers/mocks/requests";
import { setupMedicationMocks } from "@/components/content/medications/story-helpers/mocks/requests";
import { setupTimelineMocks } from "@/components/content/timeline/story-helpers/mocks/requests";

export function setupZusAggregatedProfileMocks({
  allergyIntolerance,
  otherConditions,
  patientConditions,
  providerMedications,
  otherProviderMedications,
}: Record<string, fhir4.Bundle>) {
  const allergyMocks = setupAllergiesMocks({ allergyIntolerance });
  const careTeamMocks = setupCareTeamMocks();
  const conditionMocks = setupConditionMocks({
    otherConditions,
    patientConditions,
  });
  const documentMocks = setupDocumentMocks();
  const immunizationMocks = setupImmunizationMocks();
  const medicationMocks = setupMedicationMocks({
    providerMedications,
    otherProviderMedications,
  });
  const timelineMocks = setupTimelineMocks();

  return {
    decorators: [
      ...allergyMocks.decorators,
      ...conditionMocks.decorators,
      ...medicationMocks.decorators,
    ],
    parameters: {
      msw: {
        handlers: {
          mocks: [
            ...allergyMocks.parameters.msw.handlers.mocks,
            ...careTeamMocks.parameters.msw.handlers.mocks,
            ...conditionMocks.parameters.msw.handlers.mocks,
            ...documentMocks.parameters.msw.handlers.mocks,
            ...immunizationMocks.parameters.msw.handlers.mocks,
            ...medicationMocks.parameters.msw.handlers.mocks,
            ...timelineMocks.parameters.msw.handlers.mocks,
          ],
        },
      },
    },
  };
}
