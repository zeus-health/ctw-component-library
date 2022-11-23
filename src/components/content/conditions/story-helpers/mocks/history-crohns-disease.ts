export const historyChronsDisease = {
  resourceType: "Bundle",
  id: "b362d4f5-04d4-4150-848a-3bb587a3bd22",
  meta: {
    lastUpdated: "2022-11-15T20:45:45.521+00:00",
  },
  type: "searchset",
  total: 4,
  entry: [
    {
      resource: {
        resourceType: "Condition",
        id: "e2184fb8-5e90-4502-9dd0-2f772b42c734",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/terminology/enrichment/sha256sum",
              valueBase64Binary: "JffqZ6SGVN+SLlJ1FyRGMvgHY1/Ie3TrcWleudSURnE=",
            },
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-10T19:38:26.049+00:00",
            },
          ],
          versionId: "2",
          lastUpdated: "2022-11-10T19:38:26.141+00:00",
          source: "#2c52f4186759a949",
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
            },
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/1379ba20-fc3c-4105-bd1a-0d2d5400f942",
              display: "HLTH 2022 - Spare",
            },
          ],
        },
        extension: [
          {
            url: "https://zusapi.com/fhir/identifier/universal-id",
            valueString: "a6e6d6ac-6496-4584-acd1-1253cd555f15",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
            },
          ],
        },
        verificationStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-ver-status",
              code: "confirmed",
            },
          ],
        },
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/condition-category",
                code: "encounter-diagnosis",
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "34000006",
              display: "Crohn's disease, unspecified, without complications",
            },
            {
              system: "http://hl7.org/fhir/sid/icd-10-cm",
              code: "K50.90",
              display: "Crohn's disease, unspecified, without complications",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "ICD10",
                },
              ],
              system: "http://hl7.org/fhir/sid/icd-10-cm",
              code: "K50.90",
              display: "Crohn's disease, unspecified, without complications",
              userSelected: false,
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "HCC",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/cmshcc",
              code: "35",
              display: "Crohn's disease, unspecified, without complications",
              userSelected: false,
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "CCS",
                },
              ],
              system:
                "https://www.hcup-us.ahrq.gov/toolssoftware/ccsr/dxccsr.jsp",
              code: "DIG011",
              display: "Regional enteritis and ulcerative colitis",
              userSelected: false,
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "CCI",
                },
              ],
              system:
                "http://www.hcup-us.ahrq.gov/toolssoftware/chronic_icd10/chronic_icd10.jsp",
              code: "C",
              display: "Chronic",
              userSelected: false,
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "SNOMED",
                },
              ],
              system: "http://snomed.info/sct",
              code: "34000006",
              display: "Crohn's disease",
              userSelected: false,
            },
          ],
          text: "Crohn's disease, unspecified, without complications",
        },
        subject: {
          reference: "Patient/001382f2-6e7d-4420-a178-d1caab57699b",
          type: "Patient",
        },
        encounter: {
          reference: "Encounter/32bac2a2-f6d2-4a9a-9948-3d8d4dde7a23",
          type: "Encounter",
          display: "Telemedicine 25 min, Abigail Smith",
        },
        onsetPeriod: {
          start: "2022-09-17",
        },
        recordedDate: "2022-09-17",
        recorder: {
          reference: "Practitioner/027bb468-9a2f-4676-8683-46688998919a",
          type: "Practitioner",
          display: "Abigail Smith",
        },
      },
      search: {
        mode: "match",
      },
    },
    {
      resource: {
        resourceType: "Patient",
        id: "001382f2-6e7d-4420-a178-d1caab57699b",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-10T19:37:16.933+00:00",
            },
          ],
          versionId: "2",
          lastUpdated: "2022-11-10T19:37:17.103+00:00",
          source: "#25a97bc5680ae45d",
          security: [
            {
              system: "http://terminology.hl7.org/CodeSystem/v3-ActReason",
              code: "HTEST",
            },
          ],
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
            },
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/1379ba20-fc3c-4105-bd1a-0d2d5400f942",
              display: "HLTH 2022 - Spare",
            },
          ],
        },
        identifier: [
          {
            system: "https://zusapi.com/fhir/identifier/universal-id",
            value: "a6e6d6ac-6496-4584-acd1-1253cd555f15",
          },
        ],
        name: [
          {
            family: "Marsden",
            given: ["Penny"],
          },
        ],
        telecom: [
          {
            system: "email",
            value: "penny.marsden@example.com",
          },
          {
            system: "phone",
            value: "555-030-6283",
            use: "home",
          },
          {
            system: "phone",
            value: "555-348-9139",
            use: "mobile",
          },
          {
            system: "phone",
            value: "555-516-4894",
            use: "work",
          },
        ],
        gender: "female",
        birthDate: "1980-09-03",
        address: [
          {
            line: ["469 SHADOW LN"],
            city: "LAS VEGAS",
            state: "NV",
            postalCode: "89106-4119",
          },
        ],
        managingOrganization: {
          reference: "Organization/c1fed888-f3a0-40c8-8b5b-f6aab759f849",
        },
      },
      search: {
        mode: "include",
      },
    },
    {
      resource: {
        resourceType: "Encounter",
        id: "32bac2a2-f6d2-4a9a-9948-3d8d4dde7a23",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-10T19:38:12.740+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2022-11-10T19:38:12.743+00:00",
          source: "#bHl2DTttxubGcINN",
          tag: [
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/1379ba20-fc3c-4105-bd1a-0d2d5400f942",
              display: "HLTH 2022 - Spare",
            },
          ],
        },
        extension: [
          {
            url: "https://zusapi.com/fhir/identifier/universal-id",
            valueString: "a6e6d6ac-6496-4584-acd1-1253cd555f15",
          },
        ],
        status: "finished",
        class: {
          system: "http://terminology.hl7.org/CodeSystem/v3-ActEncounterCode",
          code: "AMB",
        },
        subject: {
          reference: "Patient/39f4e0fc-7b50-4fc6-b9b3-dfcf377a6dc8",
          type: "Patient",
        },
        participant: [
          {
            type: [
              {
                coding: [
                  {
                    system:
                      "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                    code: "PPRF",
                  },
                ],
              },
            ],
            individual: {
              reference: "Practitioner/7dd225a0-5d84-4b04-87f8-0e5d6c05e13b",
              type: "Practitioner",
              display: "Jasmin Keller",
            },
          },
        ],
        period: {
          start: "2021-07-01",
        },
      },
      search: {
        mode: "include",
      },
    },
    {
      resource: {
        resourceType: "Organization",
        id: "c1fed888-f3a0-40c8-8b5b-f6aab759f849",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-10T19:37:09.289+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2022-11-10T19:37:09.291+00:00",
          source: "#J2k55u5o6JKQ573B",
          tag: [
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/1379ba20-fc3c-4105-bd1a-0d2d5400f942",
              display: "HLTH 2022 - Spare",
            },
          ],
        },
        name: "Gastro Health",
      },
      search: {
        mode: "include",
      },
    },
  ],
};
