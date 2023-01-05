export const ProvenanceCondition = {
  resourceType: "Bundle",
  id: "4d28e915-4be3-4588-b39f-1fd5ec8bf66c",
  meta: {
    lastUpdated: "2022-12-30T20:13:50.813+00:00",
  },
  type: "searchset",
  total: 9,
  link: [
    {
      relation: "self",
      url: "https%3A%2F%2Fapi.zusapi.com%2Ffhir%2FProvenance%3Ftarget%3DCondition%2Fe2184fb8-5e90-4502-9dd0-2f772b42c734",
    },
  ],
  entry: [
    {
      fullUrl:
        "https://api.zusapi.com/fhir/Provenance/a05dc1fc-1d25-4362-affc-03b5da842b9c",
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
            reference:
              "Condition/e2184fb8-5e90-4502-9dd0-2f772b42c734/_history/11",
            type: "Condition",
          },
        ],
        recorded: "2022-12-28T18:15:22.647Z",
        activity: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/3.1.0/CodeSystem-v3-DataOperation.html",
              code: "UPDATE",
              display: "revise",
            },
          ],
        },
        agent: [
          {
            who: {
              reference: "Practitioner/376523e4-bdbb-4f5a-8ce0-365829c83e78",
              type: "Practitioner",
              display: "Luthfi Bustillos",
            },
            onBehalfOf: {
              display: "Zus Health",
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
      fullUrl:
        "https://api.sandbox.zusapi.com/fhir/Provenance/fbb3c6ff-74f1-42fb-a4e1-947bc19a9346",
      resource: {
        resourceType: "Provenance",
        id: "fbb3c6ff-74f1-42fb-a4e1-947bc19a9346",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-12-28T18:15:38.943+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2022-12-28T18:15:38.947+00:00",
          source: "#0BjLKenhmfJbHDVz",
          tag: [
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/f4599d90-6d29-4843-a16d-ae7c469eb229",
            },
          ],
        },
        target: [
          {
            reference:
              "Condition/244b3264-b207-44fb-bf14-24dba9189da8/_history/13",
            type: "Condition",
          },
        ],
        recorded: "2022-12-28T18:15:38.894Z",
        activity: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/3.1.0/CodeSystem-v3-DataOperation.html",
              code: "UPDATE",
              display: "revise",
            },
          ],
        },
        agent: [
          {
            who: {
              reference: "Practitioner/376523e4-bdbb-4f5a-8ce0-365829c83e78",
              type: "Practitioner",
              display: "Luthfi Bustillos",
            },
            onBehalfOf: {
              display: "Zus Health",
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
      fullUrl:
        "https://api.sandbox.zusapi.com/fhir/Provenance/59b4853c-1538-4fa8-9f91-f5be4135aa94",
      resource: {
        resourceType: "Provenance",
        id: "59b4853c-1538-4fa8-9f91-f5be4135aa94",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-12-29T05:50:47.843+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2022-12-29T05:50:47.952+00:00",
          source: "#Fvt15YvBE9JGc2g2",
          tag: [
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/f4599d90-6d29-4843-a16d-ae7c469eb229",
            },
          ],
        },
        target: [
          {
            reference:
              "Condition/244b3264-b207-44fb-bf14-24dba9189da8/_history/15",
            type: "Condition",
          },
        ],
        recorded: "2022-12-29T05:50:47.740Z",
        activity: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/3.1.0/CodeSystem-v3-DataOperation.html",
              code: "UPDATE",
              display: "revise",
            },
          ],
        },
        agent: [
          {
            who: {
              reference: "Practitioner/376523e4-bdbb-4f5a-8ce0-365829c83e78",
              type: "Practitioner",
              display: "Luthfi Bustillos",
            },
            onBehalfOf: {
              display: "Zus Health",
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
      fullUrl:
        "https://api.sandbox.zusapi.com/fhir/Provenance/6997f4db-41cc-4c42-9306-740148ca0e9b",
      resource: {
        resourceType: "Provenance",
        id: "6997f4db-41cc-4c42-9306-740148ca0e9b",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-12-29T05:51:08.216+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2022-12-29T05:51:08.259+00:00",
          source: "#3FwWFL4JAG38Be2Z",
          tag: [
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/f4599d90-6d29-4843-a16d-ae7c469eb229",
            },
          ],
        },
        target: [
          {
            reference:
              "Condition/244b3264-b207-44fb-bf14-24dba9189da8/_history/17",
            type: "Condition",
          },
        ],
        recorded: "2022-12-29T05:51:08.018Z",
        activity: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/3.1.0/CodeSystem-v3-DataOperation.html",
              code: "UPDATE",
              display: "revise",
            },
          ],
        },
        agent: [
          {
            who: {
              reference: "Practitioner/376523e4-bdbb-4f5a-8ce0-365829c83e78",
              type: "Practitioner",
              display: "Luthfi Bustillos",
            },
            onBehalfOf: {
              display: "Zus Health",
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
      fullUrl:
        "https://api.sandbox.zusapi.com/fhir/Provenance/aa12fdeb-dbb0-4052-8d90-385221dadec6",
      resource: {
        resourceType: "Provenance",
        id: "aa12fdeb-dbb0-4052-8d90-385221dadec6",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-12-23T20:03:32.220+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2022-12-23T20:03:32.314+00:00",
          source: "#yT0xE6MiOe1iwQ3w",
          tag: [
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/f4599d90-6d29-4843-a16d-ae7c469eb229",
            },
          ],
        },
        target: [
          {
            reference:
              "Condition/244b3264-b207-44fb-bf14-24dba9189da8/_history/3",
            type: "Condition",
          },
        ],
        recorded: "2022-12-23T20:03:32.141Z",
        activity: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/3.1.0/CodeSystem-v3-DataOperation.html",
              code: "UPDATE",
              display: "revise",
            },
          ],
        },
        agent: [
          {
            who: {
              reference: "Practitioner/376523e4-bdbb-4f5a-8ce0-365829c83e78",
              type: "Practitioner",
              display: "Luthfi Bustillos",
            },
            onBehalfOf: {
              display: "Zus Health",
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
      fullUrl:
        "https://api.sandbox.zusapi.com/fhir/Provenance/55470ca6-8459-4136-99ae-922218d86f74",
      resource: {
        resourceType: "Provenance",
        id: "55470ca6-8459-4136-99ae-922218d86f74",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-12-23T20:09:31.478+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2022-12-23T20:09:31.531+00:00",
          source: "#2MSHhIame8SmELyH",
          tag: [
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/f4599d90-6d29-4843-a16d-ae7c469eb229",
            },
          ],
        },
        target: [
          {
            reference:
              "Condition/244b3264-b207-44fb-bf14-24dba9189da8/_history/5",
            type: "Condition",
          },
        ],
        recorded: "2022-12-23T20:09:31.395Z",
        activity: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/3.1.0/CodeSystem-v3-DataOperation.html",
              code: "UPDATE",
              display: "revise",
            },
          ],
        },
        agent: [
          {
            who: {
              reference: "Practitioner/376523e4-bdbb-4f5a-8ce0-365829c83e78",
              type: "Practitioner",
              display: "Luthfi Bustillos",
            },
            onBehalfOf: {
              display: "Zus Health",
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
      fullUrl:
        "https://api.sandbox.zusapi.com/fhir/Provenance/e25fd139-3c15-4002-b9c1-859f14eb0d86",
      resource: {
        resourceType: "Provenance",
        id: "e25fd139-3c15-4002-b9c1-859f14eb0d86",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-12-27T15:51:35.778+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2022-12-27T15:51:35.832+00:00",
          source: "#ESyBxtwTdNFBdxUv",
          tag: [
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/f4599d90-6d29-4843-a16d-ae7c469eb229",
            },
          ],
        },
        target: [
          {
            reference:
              "Condition/244b3264-b207-44fb-bf14-24dba9189da8/_history/7",
            type: "Condition",
          },
        ],
        recorded: "2022-12-27T15:51:35.711Z",
        activity: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/3.1.0/CodeSystem-v3-DataOperation.html",
              code: "UPDATE",
              display: "revise",
            },
          ],
        },
        agent: [
          {
            who: {
              reference: "Practitioner/376523e4-bdbb-4f5a-8ce0-365829c83e78",
              type: "Practitioner",
              display: "Luthfi Bustillos",
            },
            onBehalfOf: {
              display: "Zus Health",
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
      fullUrl:
        "https://api.sandbox.zusapi.com/fhir/Provenance/e9f188e0-4eeb-4423-8316-3c70fff2cbef",
      resource: {
        resourceType: "Provenance",
        id: "e9f188e0-4eeb-4423-8316-3c70fff2cbef",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-12-27T19:50:46.844+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2022-12-27T19:50:46.868+00:00",
          source: "#GliABUFKdIpPOl0v",
          tag: [
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/f4599d90-6d29-4843-a16d-ae7c469eb229",
            },
          ],
        },
        target: [
          {
            reference:
              "Condition/244b3264-b207-44fb-bf14-24dba9189da8/_history/9",
            type: "Condition",
          },
        ],
        recorded: "2022-12-27T19:50:46.781Z",
        activity: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/3.1.0/CodeSystem-v3-DataOperation.html",
              code: "UPDATE",
              display: "revise",
            },
          ],
        },
        agent: [
          {
            who: {
              reference: "Practitioner/376523e4-bdbb-4f5a-8ce0-365829c83e78",
              type: "Practitioner",
              display: "Luthfi Bustillos",
            },
            onBehalfOf: {
              display: "Zus Health",
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
      fullUrl:
        "https://api.sandbox.zusapi.com/fhir/Provenance/86a6df5c-94e6-412a-be8c-bdf8d97f2cd0",
      resource: {
        resourceType: "Provenance",
        id: "86a6df5c-94e6-412a-be8c-bdf8d97f2cd0",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-12-30T17:46:06.478+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2022-12-30T17:46:06.589+00:00",
          source: "#fGCAyhHKP4bwqCUo",
          tag: [
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/f4599d90-6d29-4843-a16d-ae7c469eb229",
            },
          ],
        },
        target: [
          {
            reference:
              "Condition/244b3264-b207-44fb-bf14-24dba9189da8/_history/19",
            type: "Condition",
          },
        ],
        recorded: "2022-12-30T17:46:06.397Z",
        activity: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/3.1.0/CodeSystem-v3-DataOperation.html",
              code: "UPDATE",
              display: "revise",
            },
          ],
        },
        agent: [
          {
            who: {
              reference: "Practitioner/376523e4-bdbb-4f5a-8ce0-365829c83e78",
              type: "Practitioner",
              display: "Luthfi Bustillos",
            },
            onBehalfOf: {
              display: "Zus Health",
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
