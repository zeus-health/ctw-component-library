import { noteTypeFilter } from "./filters";
import { DocumentModel } from "@/fhir/models/document";
import { EncounterModel } from "@/fhir/models/encounter";

describe("test noteTypeFilter", () => {
  const testHistoryOfPresentIllness = {
    id: "test-doc",
    category: [
      {
        coding: [
          {
            system: "http://loinc.org",
            code: "10164-2",
          },
        ],
      },
    ],
  } as fhir4.DocumentReference;
  const hpiDoc = new DocumentModel(testHistoryOfPresentIllness);

  const testDiagnosticNarrative = {
    id: "test-doc",
    category: [
      {
        coding: [
          {
            system: "http://loinc.org",
            code: "34109-9",
          },
        ],
      },
    ],
  } as fhir4.DocumentReference;
  const narrativeDoc = new DocumentModel(testDiagnosticNarrative);

  const encounter1 = new EncounterModel({ id: "encounter1" } as fhir4.Encounter, [], []);
  encounter1.clinicalNotes = [hpiDoc, narrativeDoc]; // bypass the constructor logic and manually set the clinicalNotes

  const encounter2 = new EncounterModel({ id: "encounter2" } as fhir4.Encounter, [], []);

  test("test noteTypeFilter", () => {
    const input = [[encounter1], [encounter2], [encounter1, encounter2]];
    const expectedOutput = [[encounter1], []];
    input.forEach((encounterInput, index) => {
      const actualOutput = noteTypeFilter(["34109-9", "random"])(encounterInput);
      expect(actualOutput).toStrictEqual(expectedOutput[index]);
    });
  });
});
