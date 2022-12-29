export const provenanaceConditionHistory = {
  resourceType: "Bundle",
  id: "1c4b19d6-201f-4c70-82ad-a00c4c26b374",
  meta: {
    lastUpdated: "2022-12-28T21:15:37.753+00:00",
  },
  type: "searchset",
  total: 1,
  link: [
    {
      relation: "self",
      url: "https://api.sandbox.zusapi.com/fhir/Provenance?target=Condition%2F3b1d9948-1d76-41e6-87a8-5524f79baf86",
    },
  ],
  entry: [
    {
      fullUrl:
        "https://api.sandbox.zusapi.com/fhir/Provenance/cbb00add-86f3-46d5-83ba-8d4407a59a6f",
      resource: {
        resourceType: "Provenance",
        id: "cbb00add-86f3-46d5-83ba-8d4407a59a6f",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-10T15:45:00.817+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2022-11-10T15:45:00.832+00:00",
          source: "#P7qsZJ7KUm6NWE7j",
          tag: [
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/286e696b-9b74-476f-99ad-00a2800770ca",
              display: "Better Health",
            },
          ],
        },
        target: [
          {
            reference:
              "DocumentReference/b17de071-e939-47dd-aa8a-2b298e1bb540/_history/1",
          },
          {
            reference: "Binary/0f9c163e-94d3-4767-a6de-eaf4a025a45c/_history/1",
          },
          {
            reference:
              "Condition/99efc8e9-67ea-443d-9cc4-f04231df51dc/_history/1",
          },
          {
            reference:
              "Condition/c51fd7c3-0312-4f38-b868-bfdce2773127/_history/1",
          },
        ],
        occurredPeriod: {
          start: "2022-11-10T15:43:39.496Z",
          end: "2022-11-10T15:44:57.170Z",
        },
        recorded: "2022-11-10T15:44:57.229Z",
        reason: [
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/v3-ActReason",
                code: "TREAT",
                display: "Treatment",
              },
            ],
            text: "Treatment",
          },
        ],
        activity: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/v3-DataOperation",
              code: "CREATE",
              display: "create",
            },
          ],
          text: "Create",
        },
        agent: [
          {
            type: {
              coding: [
                {
                  system:
                    "http://hl7.org/fhir/us/core/CodeSystem/us-core-provenance-participant-type",
                  code: "transmitter",
                  display: "Transmitter",
                },
              ],
              text: "Transmitter",
            },
            who: {
              display: "Test Practitioner",
            },
            onBehalfOf: {
              identifier: {
                system: "urn:oid:2.16.840.1.113883.3.9206.1.705",
              },
              display: "Zus Health",
            },
          },
          {
            type: {
              coding: [
                {
                  system:
                    "http://terminology.hl7.org/CodeSystem/provenance-participant-type",
                  code: "author",
                  display: "Author",
                },
              ],
              text: "Author",
            },
            who: {
              reference: "Organization/ca2eb841-6af2-41df-93e5-a2c58ebf581a",
              display: "Baseline West Medical Center",
            },
          },
          {
            type: {
              coding: [
                {
                  system:
                    "http://terminology.hl7.org/CodeSystem/provenance-participant-type",
                  code: "author",
                  display: "Author",
                },
              ],
              text: "Author",
            },
            who: {
              reference: "Device/e6205970-90b2-43d1-8391-c78a71180eaf",
              display: "Cerner Corporation",
            },
          },
          {
            type: {
              coding: [
                {
                  system:
                    "http://terminology.hl7.org/CodeSystem/provenance-participant-type",
                  code: "assembler",
                  display: "Assembler",
                },
              ],
              text: "Assembler",
            },
            who: {
              display: "Zus Health",
            },
          },
        ],
        entity: [
          {
            role: "source",
            what: {
              reference: "Binary/0f9c163e-94d3-4767-a6de-eaf4a025a45c",
            },
          },
        ],
      },
      search: {
        mode: "match",
      },
    },
  ],
};
