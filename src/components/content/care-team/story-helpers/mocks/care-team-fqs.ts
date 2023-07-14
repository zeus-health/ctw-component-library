export const careTeamFQS = {
  CareTeamConnection: {
    pageInfo: {
      hasNextPage: false,
    },
    edges: [
      {
        node: {
          id: "f57cb17d-a6c0-4bc9-9728-6d26f468f712",
          resourceType: "CareTeam",
          meta: {
            extension: [
              {
                url: "https://zusapi.com/created-at",
                valueInstant: "2023-06-06T17:17:03.133+00:00",
              },
            ],
            tag: [
              {
                system: "https://zusapi.com/accesscontrol/owner",
                code: "builder/f8233266-4fe2-452f-9006-a4a54246471b",
              },
            ],
            versionId: "1",
          },
          extension: [
            {
              url: "https://zusapi.com/fhir/identifier/universal-id",
              valueString: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
            },
          ],
          status: null,
          category: null,
          name: null,
          period: {
            start: "2023-05-17",
            end: null,
          },
          participant: [
            {
              role: [
                {
                  text: "Care Manager",
                  coding: null,
                },
              ],
              member: {
                reference: "Practitioner/191bc828-98af-4471-9963-99ef541e324f",
                resource: {
                  id: "191bc828-98af-4471-9963-99ef541e324f",
                  resourceType: "Practitioner",
                  extension: null,
                  name: [
                    {
                      family: "Marshall",
                      given: ["Sandra"],
                      prefix: null,
                      suffix: null,
                      text: null,
                      use: null,
                    },
                  ],
                  qualification: [
                    {
                      code: {
                        text: "Registered Nurse, Community Care",
                        coding: [
                          {
                            code: "163WC1500X",
                            display: "Registered Nurse, Community Care",
                            system: "http://nucc.org/provider-taxonomy",
                          },
                        ],
                      },
                      period: null,
                    },
                  ],
                },
              },
              onBehalfOf: {
                reference: "Organization/undefined",
              },
            },
          ],
          reasonCode: null,
          telecom: null,
          note: null,
        },
      },
      {
        node: {
          id: "24cfa595-6db8-4a01-9bd2-770c1cee217c",
          resourceType: "CareTeam",
          meta: {
            extension: [
              {
                url: "https://zusapi.com/created-at",
                valueInstant: "2023-06-06T17:17:02.588+00:00",
              },
            ],
            tag: [
              {
                system: "https://zusapi.com/accesscontrol/owner",
                code: "builder/f8233266-4fe2-452f-9006-a4a54246471b",
              },
            ],
            versionId: "1",
          },
          extension: [
            {
              url: "https://zusapi.com/fhir/identifier/universal-id",
              valueString: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
            },
          ],
          status: null,
          category: null,
          name: null,
          period: {
            start: "2020-10-08",
            end: null,
          },
          participant: [
            {
              role: [
                {
                  text: "Assigned Practitioner",
                  coding: null,
                },
              ],
              member: {
                reference: "Practitioner/34a0c112-c220-47fe-811c-ca4127c2dfbf",
                resource: {
                  id: "34a0c112-c220-47fe-811c-ca4127c2dfbf",
                  resourceType: "Practitioner",
                  extension: null,
                  name: [
                    {
                      family: "Seaborn",
                      given: ["Julie"],
                      prefix: null,
                      suffix: null,
                      text: null,
                      use: null,
                    },
                  ],
                  qualification: [
                    {
                      code: {
                        text: "Respitory Therapist, Certified",
                        coding: [
                          {
                            code: "2278C0205X",
                            display: "Respitory Therapist, Certified",
                            system: "http://nucc.org/provider-taxonomy",
                          },
                        ],
                      },
                      period: null,
                    },
                  ],
                },
              },
              onBehalfOf: {
                reference: "Organization/undefined",
              },
            },
          ],
          reasonCode: null,
          telecom: null,
          note: null,
        },
      },
      {
        node: {
          id: "9258eb00-6838-4fd0-a7fe-ad39eff2464d",
          resourceType: "CareTeam",
          meta: {
            extension: [
              {
                url: "https://zusapi.com/created-at",
                valueInstant: "2023-06-06T17:17:02.141+00:00",
              },
            ],
            tag: [
              {
                system: "https://zusapi.com/accesscontrol/owner",
                code: "builder/f8233266-4fe2-452f-9006-a4a54246471b",
              },
            ],
            versionId: "1",
          },
          extension: [
            {
              url: "https://zusapi.com/fhir/identifier/universal-id",
              valueString: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
            },
          ],
          status: null,
          category: null,
          name: null,
          period: {
            start: "2022-03-13",
            end: null,
          },
          participant: [
            {
              role: [
                {
                  text: "Dermatologist",
                  coding: null,
                },
              ],
              member: {
                reference: "Practitioner/36a557a2-9ce9-42e6-91c0-c54cb86b681a",
                resource: {
                  id: "36a557a2-9ce9-42e6-91c0-c54cb86b681a",
                  resourceType: "Practitioner",
                  extension: null,
                  name: [
                    {
                      family: "Keller",
                      given: ["Jasmin"],
                      prefix: null,
                      suffix: null,
                      text: null,
                      use: null,
                    },
                  ],
                  qualification: [
                    {
                      code: {
                        text: "Dermatology",
                        coding: [
                          {
                            code: "207N00000X",
                            display: "Dermatology",
                            system: "http://nucc.org/provider-taxonomy",
                          },
                        ],
                      },
                      period: null,
                    },
                  ],
                },
              },
              onBehalfOf: {
                reference: "Organization/undefined",
              },
            },
          ],
          reasonCode: null,
          telecom: null,
          note: null,
        },
      },
      {
        node: {
          id: "1f13614b-ed3b-4b3e-9de5-3cd5bd96afd7",
          resourceType: "CareTeam",
          meta: {
            extension: [
              {
                url: "https://zusapi.com/created-at",
                valueInstant: "2023-06-06T17:17:01.711+00:00",
              },
            ],
            tag: [
              {
                system: "https://zusapi.com/accesscontrol/owner",
                code: "builder/f8233266-4fe2-452f-9006-a4a54246471b",
              },
            ],
            versionId: "1",
          },
          extension: [
            {
              url: "https://zusapi.com/fhir/identifier/universal-id",
              valueString: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
            },
          ],
          status: null,
          category: null,
          name: null,
          period: {
            start: "2022-03-13",
            end: null,
          },
          participant: [
            {
              role: [
                {
                  text: "Primary Care Provider",
                  coding: null,
                },
              ],
              member: {
                reference: "Practitioner/ddd3c051-c206-4fc8-aa14-e37eb712eccd",
                resource: {
                  id: "ddd3c051-c206-4fc8-aa14-e37eb712eccd",
                  resourceType: "Practitioner",
                  extension: null,
                  name: [
                    {
                      family: "Calvano",
                      given: ["Jacob"],
                      prefix: null,
                      suffix: null,
                      text: null,
                      use: null,
                    },
                  ],
                  qualification: [
                    {
                      code: {
                        text: "Primary Care Provider",
                        coding: [
                          {
                            code: "207RP1001X",
                            display: "Primary Care Provider",
                            system: "http://nucc.org/provider-taxonomy",
                          },
                        ],
                      },
                      period: null,
                    },
                  ],
                },
              },
              onBehalfOf: {
                reference: "Organization/undefined",
              },
            },
          ],
          reasonCode: null,
          telecom: null,
          note: null,
        },
      },
      {
        node: {
          id: "d61b6c84-364a-46b8-a2f5-f9ddbfc2179c",
          resourceType: "CareTeam",
          meta: {
            extension: [
              {
                url: "https://zusapi.com/created-at",
                valueInstant: "2023-06-06T17:16:48.749+00:00",
              },
            ],
            tag: [
              {
                system: "https://zusapi.com/accesscontrol/owner",
                code: "builder/f8233266-4fe2-452f-9006-a4a54246471b",
              },
            ],
            versionId: "1",
          },
          extension: [
            {
              url: "https://zusapi.com/fhir/identifier/universal-id",
              valueString: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
            },
          ],
          status: null,
          category: null,
          name: null,
          period: {
            start: "2020-10-08",
            end: null,
          },
          participant: [
            {
              role: [
                {
                  text: "Attending Physician",
                  coding: null,
                },
              ],
              member: {
                reference: "Practitioner/169684bd-002e-44ce-9ef5-6117941fd378",
                resource: {
                  id: "169684bd-002e-44ce-9ef5-6117941fd378",
                  resourceType: "Practitioner",
                  extension: null,
                  name: [
                    {
                      family: "Lopez",
                      given: ["Cassandra"],
                      prefix: null,
                      suffix: null,
                      text: null,
                      use: null,
                    },
                  ],
                  qualification: [
                    {
                      code: {
                        text: "Emergency Medicine",
                        coding: [
                          {
                            code: "207PE0004X",
                            display: "Emergency Medicine",
                            system: "http://nucc.org/provider-taxonomy",
                          },
                        ],
                      },
                      period: null,
                    },
                  ],
                },
              },
              onBehalfOf: {
                reference: "Organization/undefined",
              },
            },
          ],
          reasonCode: null,
          telecom: null,
          note: null,
        },
      },
      {
        node: {
          id: "87ca505c-b33e-4b26-8d3a-39a6ade95210",
          resourceType: "CareTeam",
          meta: {
            extension: [
              {
                url: "https://zusapi.com/created-at",
                valueInstant: "2023-06-06T17:16:47.152+00:00",
              },
            ],
            tag: [
              {
                system: "https://zusapi.com/accesscontrol/owner",
                code: "builder/f8233266-4fe2-452f-9006-a4a54246471b",
              },
            ],
            versionId: "1",
          },
          extension: [
            {
              url: "https://zusapi.com/fhir/identifier/universal-id",
              valueString: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
            },
          ],
          status: null,
          category: null,
          name: null,
          period: {
            start: "2020-10-08",
            end: null,
          },
          participant: [
            {
              role: [
                {
                  text: "Internal Medicine, Pulmonary Disease",
                  coding: null,
                },
              ],
              member: {
                reference: "Practitioner/9758ca32-ad4c-4f0f-9c89-6aaa6aa7990e",
                resource: {
                  id: "9758ca32-ad4c-4f0f-9c89-6aaa6aa7990e",
                  resourceType: "Practitioner",
                  extension: null,
                  name: [
                    {
                      family: "Zhou",
                      given: ["Andrew"],
                      prefix: null,
                      suffix: null,
                      text: null,
                      use: null,
                    },
                  ],
                  qualification: [
                    {
                      code: {
                        text: "Internal Medicine, Pulmonary Disease",
                        coding: [
                          {
                            code: "207RP1001X",
                            display: "Internal Medicine, Pulmonary Disease",
                            system: "http://nucc.org/provider-taxonomy",
                          },
                        ],
                      },
                      period: null,
                    },
                  ],
                },
              },
              onBehalfOf: {
                reference: "Organization/undefined",
              },
            },
          ],
          reasonCode: null,
          telecom: null,
          note: null,
        },
      },
    ],
  },
};
