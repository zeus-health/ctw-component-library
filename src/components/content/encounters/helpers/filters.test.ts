import { vi } from "vitest";
import { dedupeAndMergeEncounters, noteTypePredicate, noteTypeValues } from "./filters";
import { DocumentModel } from "@/fhir/models/document";
import { EncounterModel } from "@/fhir/models/encounter";
import { SYSTEM_LOINC } from "@/fhir/system-urls";

describe("encounter dedupe tests", () => {
  const encNew = new EncounterModel(
    {
      resourceType: "Encounter",
      id: "2",
      meta: {
        extension: [
          {
            url: "https://zusapi.com/created-at",
            valueInstant: "2022-10-13T20:22:32.613+00:00",
          },
        ],
        lastUpdated: "2022-10-30T04:03:11.968+00:00",
      },
      status: "finished",
      type: [],
      class: {
        system: "urn:oid:2.16.840.1.113883.5.4",
        code: "AMB",
        display: "Travel",
      },
      subject: {
        reference: "Patient/a1",
        type: "Patient",
        display: "FirstName LastName",
      },
      period: {
        start: "2022-09-01",
      },
      location: [
        {
          location: {
            display: "Main Street Medical",
          },
        },
      ],
    },
    [],
    []
  );
  vi.spyOn(encNew, "patientUPID", "get").mockReturnValue("a1");

  const encOld = new EncounterModel(
    {
      resourceType: "Encounter",
      id: "1",
      meta: {
        extension: [
          {
            url: "https://zusapi.com/created-at",
            valueInstant: "2022-10-13T20:22:32.613+00:00",
          },
        ],
      },
      status: "finished",
      type: [],
      class: {
        system: "urn:oid:2.16.840.1.113883.5.4",
        code: "AMB",
        display: "Travel",
      },
      subject: {
        reference: "Patient/a1",
        type: "Patient",
        display: "First Last",
      },
      period: {
        start: "2022-09-01",
        end: "2022-10-24",
      },
      location: [
        {
          location: {
            display: "Main Street Medical",
          },
        },
      ],
    },
    [],
    []
  );
  vi.spyOn(encOld, "patientUPID", "get").mockReturnValue("a1");

  const encPatientless = new EncounterModel(
    {
      resourceType: "Encounter",
      id: "3",
      meta: {
        extension: [
          {
            url: "https://zusapi.com/created-at",
            valueInstant: "2022-10-13T20:22:32.613+00:00",
          },
        ],
        versionId: "2",
        lastUpdated: "2022-10-30T04:03:11.968+00:00",
        source: "#s9F0aITJ2AlwfCVw",
        tag: [
          {
            system: "https://zusapi.com/accesscontrol/owner",
            code: "builder/a",
          },
        ],
      },
      extension: undefined,
      status: "finished",
      type: [],
      class: {
        system: "urn:oid:2.16.840.1.113883.5.4",
        code: "AMB",
        display: "Travel",
      },
      period: {
        start: "2022-09-01",
      },
      location: [
        {
          location: {
            display: "Main Street Medical",
          },
        },
      ],
    },
    [],
    []
  );

  const encDiff = new EncounterModel(
    {
      resourceType: "Encounter",
      id: "4",
      meta: {
        extension: [
          {
            url: "https://zusapi.com/created-at",
            valueInstant: "2022-10-13T20:22:32.613+00:00",
          },
        ],
        versionId: "2",
        lastUpdated: "2022-10-30T04:03:11.968+00:00",
        source: "#s9F0aITJ2AlwfCVw",
        tag: [
          {
            system: "https://zusapi.com/accesscontrol/owner",
            code: "builder/a",
          },
        ],
      },
      status: "finished",
      type: [],
      class: {
        system: "urn:oid:2.16.840.1.113883.5.4",
        code: "AMB",
        display: "Travel",
      },
      subject: {
        reference: "Patient/b2",
        type: "Patient",
        display: "First Last",
      },
      period: {
        start: "2022-09-01",
      },
      location: [
        {
          location: {
            display: "Side Street Medical",
          },
        },
      ],
    },
    [],
    []
  );

  vi.spyOn(encDiff, "patientUPID", "get").mockReturnValue("b2");

  test("don't dedupe", () => {
    const encs = [encOld, encPatientless, encDiff];
    expect(dedupeAndMergeEncounters(encs)).toEqual(encs);
  });
  test("dedupe", () => {
    const encs = [encOld, encNew];
    expect(dedupeAndMergeEncounters(encs).length).toBe(1);
  });
  test("merge", () => {
    const encs = [encOld, encNew];
    expect(dedupeAndMergeEncounters(encs)).toEqual([
      new EncounterModel(
        {
          resourceType: "Encounter",
          id: "2",
          meta: {
            extension: [
              {
                url: "https://zusapi.com/created-at",
                valueInstant: "2022-10-13T20:22:32.613+00:00",
              },
            ],
            lastUpdated: "2022-10-30T04:03:11.968+00:00",
          },
          status: "finished",
          type: [],
          class: {
            system: "urn:oid:2.16.840.1.113883.5.4",
            code: "AMB",
            display: "Travel",
          },
          subject: {
            reference: "Patient/a1",
            type: "Patient",
            display: "FirstName LastName",
          },
          period: {
            start: "2022-09-01",
            end: "2022-10-24",
          },
          location: [
            {
              location: {
                display: "Main Street Medical",
              },
            },
          ],
        },
        [],
        []
      ),
    ]);
  });
});

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
