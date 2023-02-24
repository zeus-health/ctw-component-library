export const provenances = {
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
      fullUrl: "https://api.dev.zusapi.com/fhir/Provenance/12345",
      resource: {
        resourceType: "Provenance",
        id: "12345",
        meta: {
          versionId: "1",
          lastUpdated: "2022-04-08T14:53:20.258+00:00",
          source: "#t3W2UKaB83PVUYcg",
          tag: [
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/f4599d90-6d29-4843-a16d-ae7c469eb229",
            },
          ],
        },
        target: [
          {
            reference: "Encounter/fc6cf519-2991-4fec-98ec-4c81ec0a0f02",
          },
        ],
        occurredPeriod: {
          start: "2022-04-08T14:53:09.794Z",
          end: "2022-04-08T14:53:20.215Z",
        },
        recorded: "2022-04-08T14:53:20.216Z",
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
        entity: [
          {
            role: "source",
            what: {
              reference: "Binary/04ffee0b-0184-4916-a841-a5345973708a",
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
