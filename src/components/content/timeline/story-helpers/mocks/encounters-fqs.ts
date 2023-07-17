export const encountersFQS = {
  EncounterConnection: {
    pageInfo: {
      hasNextPage: false,
    },
    edges: [
      {
        node: {
          id: "f9d09e0e-9e8f-4165-84cb-9bb4a4059669",
          resourceType: "Encounter",
          meta: {
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
          status: "finished",
          class: {
            system: "http://terminology.hl7.org/CodeSystem/v3-ActEncounterCode",
            version: null,
            code: "AMB",
            display: null,
          },
          type: [
            {
              text: null,
              coding: [
                {
                  code: null,
                  display: "Office Visit",
                  system: "urn:oid:2.16.840.1.113883.5.4",
                  extension: null,
                },
              ],
            },
          ],
          serviceType: null,
          priority: null,
          diagnosis: [
            {
              condition: {
                reference: "Condition/641b067f-7311-4f2b-a051-c0e31c63d2d5",
                display: "Chronic obstructive pulmonary disease, unspecified",
              },
            },
            {
              condition: {
                reference: "Condition/b4210ed7-be3a-4ef1-b981-a8e1c7a84db6",
                display: "Hyperlipidemia, unspecified",
              },
            },
            {
              condition: {
                reference: "Condition/18b7ea3c-c237-468a-aa72-1f05add7ae1b",
                display: "Bilateral primary osteoarthritis of hip",
              },
            },
            {
              condition: {
                reference: "Condition/07bbe4f1-6401-4ccd-a100-516c5366fc61",
                display: "Androgenic alopecia, unspecified",
              },
            },
          ],
          participant: [
            {
              individual: {
                reference: "Practitioner/ddd3c051-c206-4fc8-aa14-e37eb712eccd",
                display: "Jacob Calvano",
              },
              type: [
                {
                  text: null,
                  coding: [
                    {
                      code: "PPRF",
                      display: null,
                      system: "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                      extension: null,
                    },
                  ],
                },
              ],
              period: null,
            },
          ],
          period: {
            start: "2022-03-13",
            end: null,
          },
          length: null,
          reasonCode: null,
          hospitalization: null,
          location: [
            {
              location: {
                reference: null,
                display: "Main St",
              },
              status: null,
              period: null,
            },
          ],
        },
      },
      {
        node: {
          id: "522d1807-dbd9-4639-a33d-c5bbb336869b",
          resourceType: "Encounter",
          meta: {
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
          status: "finished",
          class: {
            system: "http://terminology.hl7.org/CodeSystem/v3-ActEncounterCode",
            version: null,
            code: "AMB",
            display: null,
          },
          type: null,
          serviceType: null,
          priority: null,
          diagnosis: [
            {
              condition: {
                reference: "Condition/eb028c6f-a0dd-4aa9-8fa6-756b8b7b00e0",
                display: "Chronic obstructive pulmonary disease, unspecified",
              },
            },
            {
              condition: {
                reference: "Condition/7923b750-ee42-4357-bfce-1e159fa53e39",
                display: "Hyperlipidemia, unspecified",
              },
            },
            {
              condition: {
                reference: "Condition/e1641052-e00e-4a69-9701-d62fe411791e",
                display: "Bilateral primary osteoarthritis of hip",
              },
            },
            {
              condition: {
                reference: "Condition/126f8623-57e1-4b28-a751-892911ce0ac7",
                display: "Androgenic alopecia, unspecified",
              },
            },
          ],
          participant: [
            {
              individual: {
                reference: "Practitioner/ddd3c051-c206-4fc8-aa14-e37eb712eccd",
                display: "Jacob Calvano",
              },
              type: [
                {
                  text: null,
                  coding: [
                    {
                      code: "PPRF",
                      display: null,
                      system: "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                      extension: null,
                    },
                  ],
                },
              ],
              period: null,
            },
          ],
          period: {
            start: "2023-01-17",
            end: null,
          },
          length: null,
          reasonCode: null,
          hospitalization: null,
          location: null,
        },
      },
      {
        node: {
          id: "4a41e829-10ac-4b08-8602-e028f69b085a",
          resourceType: "Encounter",
          meta: {
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
          status: "finished",
          class: {
            system: "http://terminology.hl7.org/CodeSystem/v3-ActEncounterCode",
            version: null,
            code: "AMB",
            display: null,
          },
          type: null,
          serviceType: null,
          priority: null,
          diagnosis: [
            {
              condition: {
                reference: "Condition/e2cbb83c-55aa-4061-8736-fb03279c7169",
                display: "Androgenic alopecia, unspecified",
              },
            },
          ],
          participant: [
            {
              individual: {
                reference: "Practitioner/6c9751da-287c-476e-b841-b344e3988bb8",
                display: "Ishaan Manoharan",
              },
              type: [
                {
                  text: null,
                  coding: [
                    {
                      code: "PPRF",
                      display: null,
                      system: "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                      extension: null,
                    },
                  ],
                },
              ],
              period: null,
            },
          ],
          period: {
            start: "2022-09-09",
            end: null,
          },
          length: null,
          reasonCode: null,
          hospitalization: null,
          location: null,
        },
      },
      {
        node: {
          id: "59ae0f52-2eff-4399-9819-539f3dc0fe65",
          resourceType: "Encounter",
          meta: {
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
          status: "finished",
          class: {
            system: "http://terminology.hl7.org/CodeSystem/v3-ActEncounterCode",
            version: null,
            code: "AMB",
            display: null,
          },
          type: null,
          serviceType: null,
          priority: null,
          diagnosis: [
            {
              condition: {
                reference: "Condition/e2cbb83c-55aa-4061-8736-fb03279c7169",
                display: "Androgenic alopecia, unspecified",
              },
            },
          ],
          participant: [
            {
              individual: {
                reference: "Practitioner/6c9751da-287c-476e-b841-b344e3988bb8",
                display: "Ishaan Manoharan",
              },
              type: [
                {
                  text: null,
                  coding: [
                    {
                      code: "PPRF",
                      display: null,
                      system: "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                      extension: null,
                    },
                  ],
                },
              ],
              period: null,
            },
          ],
          period: {
            start: "2022-05-12",
            end: null,
          },
          length: null,
          reasonCode: null,
          hospitalization: null,
          location: null,
        },
      },
      {
        node: {
          id: "0f853283-1369-4850-b047-81e2be9e7245",
          resourceType: "Encounter",
          meta: {
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
          status: "finished",
          class: {
            system: "http://terminology.hl7.org/CodeSystem/v3-ActEncounterCode",
            version: null,
            code: "EMER",
            display: null,
          },
          type: [
            {
              text: null,
              coding: [
                {
                  code: null,
                  display: "Home",
                  system: "urn:oid:2.16.840.1.113883.5.4",
                  extension: null,
                },
              ],
            },
          ],
          serviceType: null,
          priority: null,
          diagnosis: [
            {
              condition: {
                reference: "Condition/76cc6424-33b6-44f5-82e2-a1f2e4f0de67",
                display: "Chronic obstructive pulmonary disease, unspecified",
              },
            },
            {
              condition: {
                reference: "Condition/475b8fe3-4215-4dcc-838b-17bcd4bcb9eb",
                display: "Chest Pain, Unspecified",
              },
            },
          ],
          participant: [
            {
              individual: {
                reference: "Practitioner/169684bd-002e-44ce-9ef5-6117941fd378",
                display: "Cassandra Lopez",
              },
              type: [
                {
                  text: null,
                  coding: [
                    {
                      code: "PPRF",
                      display: null,
                      system: "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                      extension: null,
                    },
                  ],
                },
              ],
              period: null,
            },
          ],
          period: {
            start: "2020-10-08",
            end: "2020-10-10",
          },
          length: null,
          reasonCode: null,
          hospitalization: null,
          location: [
            {
              location: {
                reference: null,
                display: "MSMC",
              },
              status: null,
              period: null,
            },
          ],
        },
      },
      {
        node: {
          id: "332a0ac0-0ce9-4fb5-b8e2-98a289541ea1",
          resourceType: "Encounter",
          meta: {
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
          status: "finished",
          class: {
            system: "http://terminology.hl7.org/CodeSystem/v3-ActEncounterCode",
            version: null,
            code: "AMB",
            display: null,
          },
          type: null,
          serviceType: null,
          priority: null,
          diagnosis: null,
          participant: [
            {
              individual: {
                reference: "Practitioner/9758ca32-ad4c-4f0f-9c89-6aaa6aa7990e",
                display: "Andrew Zhou",
              },
              type: [
                {
                  text: null,
                  coding: [
                    {
                      code: "PPRF",
                      display: null,
                      system: "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                      extension: null,
                    },
                  ],
                },
              ],
              period: null,
            },
          ],
          period: {
            start: "2021-04-08",
            end: "2021-04-08",
          },
          length: null,
          reasonCode: null,
          hospitalization: null,
          location: [
            {
              location: {
                reference: null,
                display: "Main Street Medical",
              },
              status: null,
              period: null,
            },
          ],
        },
      },
      {
        node: {
          id: "72f63b79-2adb-4c30-bb02-04bf65e3f90b",
          resourceType: "Encounter",
          meta: {
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
          status: "finished",
          class: {
            system: "http://terminology.hl7.org/CodeSystem/v3-ActEncounterCode",
            version: null,
            code: "AMB",
            display: null,
          },
          type: null,
          serviceType: null,
          priority: null,
          diagnosis: null,
          participant: [
            {
              individual: {
                reference: "Practitioner/9758ca32-ad4c-4f0f-9c89-6aaa6aa7990e",
                display: "Andrew Zhou",
              },
              type: [
                {
                  text: null,
                  coding: [
                    {
                      code: "PPRF",
                      display: null,
                      system: "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                      extension: null,
                    },
                  ],
                },
              ],
              period: null,
            },
          ],
          period: {
            start: "2020-10-08",
            end: "2020-10-10",
          },
          length: null,
          reasonCode: null,
          hospitalization: null,
          location: [
            {
              location: {
                reference: null,
                display: "Main Street Medical",
              },
              status: null,
              period: null,
            },
          ],
        },
      },
      {
        node: {
          id: "e99963b3-9669-4858-b410-c35cb3c73095",
          resourceType: "Encounter",
          meta: {
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
          status: "finished",
          class: {
            system: "http://terminology.hl7.org/CodeSystem/v3-ActEncounterCode",
            version: null,
            code: "AMB",
            display: null,
          },
          type: null,
          serviceType: null,
          priority: null,
          diagnosis: [
            {
              condition: {
                reference: "Condition/e27c3624-e966-4231-9637-84037589bd3c",
                display: "Chronic obstructive pulmonary disease, unspecified",
              },
            },
          ],
          participant: [
            {
              individual: {
                reference: "Practitioner/9758ca32-ad4c-4f0f-9c89-6aaa6aa7990e",
                display: "Andrew Zhou",
              },
              type: [
                {
                  text: null,
                  coding: [
                    {
                      code: "PPRF",
                      display: null,
                      system: "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                      extension: null,
                    },
                  ],
                },
              ],
              period: null,
            },
          ],
          period: {
            start: "2020-10-08",
            end: "2020-10-10",
          },
          length: null,
          reasonCode: null,
          hospitalization: null,
          location: [
            {
              location: {
                reference: null,
                display: "Main Street Medical",
              },
              status: null,
              period: null,
            },
          ],
        },
      },
    ],
  },
};
