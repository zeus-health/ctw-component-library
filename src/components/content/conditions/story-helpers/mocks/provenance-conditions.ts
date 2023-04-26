export const ProvenanceCondition = {
  resourceType: "Bundle",
  id: "4d28e915-4be3-4588-b39f-1fd5ec8bf66c",
  meta: {
    lastUpdated: "2022-12-30T20:13:50.813+00:00",
  },
  type: "searchset",
  total: 1,
  link: [
    {
      relation: "self",
      url: "https%3A%2F%2Fapi.zusapi.com%2Ffhir%2FProvenance%3Ftarget%3DCondition%2Fe2184fb8-5e90-4502-9dd0-2f772b42c734",
    },
  ],
  entry: [
    {
      fullUrl: "https://api.zusapi.com/fhir/Provenance/a05dc1fc-1d25-4362-affc-03b5da842b9c",
      resource: {
        resourceType: "Provenance",
        id: "a05dc1fc-1d25-4362-affc-03b5da842b9c",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-12-28T18:15:22.695+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2022-12-28T18:15:22.793+00:00",
          source: "#edV8OhLmjIzl0lKR",
          tag: [
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/f4599d90-6d29-4843-a16d-ae7c469eb229",
            },
          ],
        },
        target: [
          {
            reference: "Condition/faf183db-2623-44f5-943d-2318afbb51a7",
            type: "Condition",
          },
        ],
        entity: [
          {
            role: "source",
            what: {
              reference: "Binary/04ffee0b-0184-4916-a841-a5345973708a",
            },
          },
        ],
        recorded: "2022-12-28T18:15:22.647Z",
        activity: {
          coding: [
            {
              system: "http://terminology.hl7.org/3.1.0/CodeSystem-v3-DataOperation.html",
              code: "CREATE",
              display: "create",
            },
          ],
        },
        agent: [
          {
            who: {
              reference: "Practitioner/376523e4-bdbb-4f5a-8ce0-365829c83e78",
              type: "Practitioner",
              display: "Carlos Mendoza",
            },
            onBehalfOf: {
              display: "Zus Health",
            },
          },
          {
            type: {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/provenance-participant-type",
                  code: "assembler",
                  display: "Assembler",
                },
              ],
            },
            who: {
              display: "Zus Health",
            },
          },
        ],
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl: "https://api.zusapi.com/fhir/Provenance/a05dc1fc-1d25-4362-affc-03b5da842b9c",
      resource: {
        resourceType: "Provenance",
        id: "ff5dc1fc-1d23-1234-affc-03b5da842ccc",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-12-28T18:15:22.695+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2022-12-28T18:15:22.793+00:00",
          source: "#edV8OhLmjIzl0lKR",
          tag: [
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/f4599d90-6d29-4843-a16d-ae7c469eb229",
            },
          ],
        },
        target: [
          {
            reference: "Condition/7000a33a-808f-4c94-8125-1af140ce6fbe",
            type: "Condition",
          },
        ],
        entity: [
          {
            role: "source",
            what: {
              reference: "Binary/04ffee0b-0184-4916-a841-a5345973708a",
            },
          },
        ],
        recorded: "2022-12-28T18:15:22.647Z",
        activity: {
          coding: [
            {
              system: "http://terminology.hl7.org/3.1.0/CodeSystem-v3-DataOperation.html",
              code: "CREATE",
              display: "create",
            },
          ],
        },
        agent: [
          {
            who: {
              reference: "Practitioner/376523e4-bdbb-4f5a-8ce0-365829c83e78",
              type: "Practitioner",
              display: "Carlos Mendoza",
            },
            onBehalfOf: {
              display: "Zus Health",
            },
          },
          {
            type: {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/provenance-participant-type",
                  code: "assembler",
                  display: "Assembler",
                },
              ],
            },
            who: {
              display: "Zus Health",
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
