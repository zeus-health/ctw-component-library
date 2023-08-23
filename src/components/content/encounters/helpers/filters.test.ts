import { noteTypePredicate, noteTypeValues } from "./filters";
import { DocumentModel } from "@/fhir/models/document";
import { EncounterModel } from "@/fhir/models/encounter";
import { SYSTEM_LOINC } from "@/fhir/system-urls";

describe("noteTypePredicate", () => {
  const docs = noteTypeValues.flatMap((values) =>
    values.key.split(",").map(
      (value) =>
        new DocumentModel({
          id: `test-doc-${value}`,
          category: [
            {
              coding: [
                {
                  system: SYSTEM_LOINC,
                  code: value,
                },
              ],
            },
          ],
        } as fhir4.DocumentReference)
    )
  );
  const otherDocs = [
    new DocumentModel({
      id: `test-doc-other-1`,
      category: [
        {
          coding: [
            {
              system: "http://not.loinc",
              code: noteTypeValues[0].key,
            },
          ],
        },
      ],
    } as fhir4.DocumentReference),
    new DocumentModel({
      id: `test-doc-other-2`,
      category: [
        {
          coding: [
            {
              system: SYSTEM_LOINC,
              code: "notAFilterableCode",
            },
          ],
        },
      ],
    } as fhir4.DocumentReference),
  ];
  const encounters = docs.map((d) => {
    const encounter = new EncounterModel({ id: `encounter-${d.id}` } as fhir4.Encounter, [], []);
    encounter.clinicalNotes = [d];
    return encounter;
  });
  const otherEncounters = otherDocs.map((d) => {
    const encounter = new EncounterModel({ id: `encounter-${d.id}` } as fhir4.Encounter, [], []);
    encounter.clinicalNotes = [d];
    return encounter;
  });
  const emptyEncounters = [
    new EncounterModel({ id: "encounter-empty" } as fhir4.Encounter, [], []),
  ];

  test("filtering on no value", () => {
    const filteredEncounters = [...encounters, ...otherEncounters, ...emptyEncounters].filter(
      (encounter) => noteTypePredicate([], encounter)
    );
    expect(filteredEncounters).toHaveLength(
      [...encounters, ...otherEncounters, ...emptyEncounters].length
    );
  });

  describe("filtering on a single value", () => {
    noteTypeValues.forEach((value) => {
      test(`${value.name}`, () => {
        const filteredEncounters = [...encounters, ...otherEncounters, ...emptyEncounters].filter(
          (encounter) => noteTypePredicate([value.key], encounter)
        );
        const expectedLength = value.key.split(",").length; // assumes each key value (comma separated) has a single associated encounter
        expect(filteredEncounters).toHaveLength(expectedLength);
      });
    });

    test("Other", () => {
      const filteredEncounters = [...encounters, ...otherEncounters, ...emptyEncounters].filter(
        (encounter) => noteTypePredicate(["other"], encounter)
      );
      expect(filteredEncounters).toHaveLength([...otherEncounters, ...emptyEncounters].length);
    });
  });

  describe("filtering on a non-other value along with other", () => {
    noteTypeValues.forEach((value) => {
      test(`${value.name}`, () => {
        const filteredEncounters = [...encounters, ...otherEncounters, ...emptyEncounters].filter(
          (encounter) => noteTypePredicate([value.key, "other"], encounter)
        );
        const expectedLength =
          value.key.split(",").length + [...otherEncounters, ...emptyEncounters].length; // assumes each key value (comma separated) has a single associated encounter
        expect(filteredEncounters).toHaveLength(expectedLength);
      });
    });
  });
});
