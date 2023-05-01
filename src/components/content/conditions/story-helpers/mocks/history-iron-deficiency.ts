export const historyIronDeficiency = {
  resourceType: "Bundle",
  id: "24730519-08df-4994-af12-429174c0e148",
  meta: {
    lastUpdated: "2022-11-15T20:46:59.164+00:00",
  },
  type: "searchset",
  total: 11,
  entry: [
    {
      resource: {
        resourceType: "Condition",
        id: "377d1f4e-f57f-469f-9eee-4e2f90140ff6",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/terminology/enrichment/sha256sum",
              valueBase64Binary: "fWd/lTKMDp1vxaYq5d/UxCEBlkxWJfxc4vSaRByo0Jk=",
            },
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-10T19:38:13.603+00:00",
            },
          ],
          versionId: "2",
          lastUpdated: "2022-11-10T19:38:13.671+00:00",
          source: "#f70398b96186af37",
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
              system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
            },
          ],
        },
        verificationStatus: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/condition-ver-status",
              code: "confirmed",
            },
          ],
        },
        category: [
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/condition-category",
                code: "encounter-diagnosis",
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "35240004",
              display: "Iron deficiency",
            },
            {
              system: "http://hl7.org/fhir/sid/icd-10-cm",
              code: "E61.1",
              display: "Iron deficiency",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "ICD10",
                },
              ],
              system: "http://hl7.org/fhir/sid/icd-10-cm",
              code: "E61.1",
              display: "Iron deficiency",
              userSelected: false,
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "CCS",
                },
              ],
              system: "https://www.hcup-us.ahrq.gov/toolssoftware/ccsr/dxccsr.jsp",
              code: "END007",
              display: "Nutritional deficiencies",
              userSelected: false,
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "CCI",
                },
              ],
              system: "http://www.hcup-us.ahrq.gov/toolssoftware/chronic_icd10/chronic_icd10.jsp",
              code: "A",
              display: "Acute",
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
              code: "35240004",
              display: "Iron deficiency",
              userSelected: false,
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "Unknown HCC",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
          text: "Iron deficiency",
        },
        subject: {
          reference: "Patient/39f4e0fc-7b50-4fc6-b9b3-dfcf377a6dc8",
          type: "Patient",
        },
        encounter: {
          reference: "Encounter/32bac2a2-f6d2-4a9a-9948-3d8d4dde7a23",
          type: "Encounter",
          display: "Office visit 30 min, Jasmin Keller",
        },
        onsetPeriod: {
          start: "2021-07-01",
        },
        recordedDate: "2021-07-01",
        recorder: {
          reference: "Practitioner/7dd225a0-5d84-4b04-87f8-0e5d6c05e13b",
          type: "Practitioner",
          display: "Jasmin Keller",
        },
      },
      search: {
        mode: "match",
      },
    },
    {
      resource: {
        resourceType: "Condition",
        id: "b4c7ec40-7f0f-4533-b572-1535e18e0c75",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/terminology/enrichment/sha256sum",
              valueBase64Binary: "fWd/lTKMDp1vxaYq5d/UxCEBlkxWJfxc4vSaRByo0Jk=",
            },
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-10T19:38:23.668+00:00",
            },
          ],
          versionId: "2",
          lastUpdated: "2022-11-10T19:38:23.721+00:00",
          source: "#75403bf18ab88091",
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
              system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
            },
          ],
        },
        verificationStatus: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/condition-ver-status",
              code: "confirmed",
            },
          ],
        },
        category: [
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/condition-category",
                code: "encounter-diagnosis",
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "35240004",
              display: "Iron deficiency",
            },
            {
              system: "http://hl7.org/fhir/sid/icd-10-cm",
              code: "E61.1",
              display: "Iron deficiency",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "ICD10",
                },
              ],
              system: "http://hl7.org/fhir/sid/icd-10-cm",
              code: "E61.1",
              display: "Iron deficiency",
              userSelected: false,
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "CCS",
                },
              ],
              system: "https://www.hcup-us.ahrq.gov/toolssoftware/ccsr/dxccsr.jsp",
              code: "END007",
              display: "Nutritional deficiencies",
              userSelected: false,
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "CCI",
                },
              ],
              system: "http://www.hcup-us.ahrq.gov/toolssoftware/chronic_icd10/chronic_icd10.jsp",
              code: "A",
              display: "Acute",
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
              code: "35240004",
              display: "Iron deficiency",
              userSelected: false,
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "Unknown HCC",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
          text: "Iron deficiency",
        },
        subject: {
          reference: "Patient/ac9b9cfd-8f8f-4108-9620-029cc583d1e8",
          type: "Patient",
        },
        encounter: {
          reference: "Encounter/9454e861-178c-428a-8acb-1546c5b7aa1a",
          type: "Encounter",
          display: "Office visit 45 min, Jacob Calvano",
        },
        onsetPeriod: {
          start: "2022-06-08",
        },
        recordedDate: "2022-06-08",
        recorder: {
          reference: "Practitioner/8fc34aba-47bb-4fe7-9485-951abdff5c6e",
          type: "Practitioner",
          display: "Jacob Calvano",
        },
      },
      search: {
        mode: "match",
      },
    },
    {
      resource: {
        resourceType: "Condition",
        id: "e6757977-9148-4b84-aff6-8b59d7f57c2f",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/terminology/enrichment/sha256sum",
              valueBase64Binary: "fWd/lTKMDp1vxaYq5d/UxCEBlkxWJfxc4vSaRByo0Jk=",
            },
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-10T19:38:26.358+00:00",
            },
          ],
          versionId: "2",
          lastUpdated: "2022-11-10T19:38:26.422+00:00",
          source: "#483d1d67a2ebef10",
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
              system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
            },
          ],
        },
        verificationStatus: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/condition-ver-status",
              code: "confirmed",
            },
          ],
        },
        category: [
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/condition-category",
                code: "encounter-diagnosis",
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "35240004",
              display: "Iron deficiency",
            },
            {
              system: "http://hl7.org/fhir/sid/icd-10-cm",
              code: "E61.1",
              display: "Iron deficiency",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "ICD10",
                },
              ],
              system: "http://hl7.org/fhir/sid/icd-10-cm",
              code: "E61.1",
              display: "Iron deficiency",
              userSelected: false,
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "CCS",
                },
              ],
              system: "https://www.hcup-us.ahrq.gov/toolssoftware/ccsr/dxccsr.jsp",
              code: "END007",
              display: "Nutritional deficiencies",
              userSelected: false,
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "CCI",
                },
              ],
              system: "http://www.hcup-us.ahrq.gov/toolssoftware/chronic_icd10/chronic_icd10.jsp",
              code: "A",
              display: "Acute",
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
              code: "35240004",
              display: "Iron deficiency",
              userSelected: false,
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "Unknown HCC",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
          text: "Iron deficiency",
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
        id: "9454e861-178c-428a-8acb-1546c5b7aa1a",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-10T19:38:22.556+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2022-11-10T19:38:22.559+00:00",
          source: "#nfw0bAaFNbnYzLOO",
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
          reference: "Patient/ac9b9cfd-8f8f-4108-9620-029cc583d1e8",
          type: "Patient",
        },
        participant: [
          {
            type: [
              {
                coding: [
                  {
                    system: "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                    code: "PPRF",
                  },
                ],
              },
            ],
            individual: {
              reference: "Practitioner/8fc34aba-47bb-4fe7-9485-951abdff5c6e",
              type: "Practitioner",
              display: "Jacob Calvano",
            },
          },
        ],
        period: {
          start: "2022-06-08",
        },
      },
      search: {
        mode: "include",
      },
    },
    {
      resource: {
        resourceType: "Patient",
        id: "ac9b9cfd-8f8f-4108-9620-029cc583d1e8",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-10T19:37:19.207+00:00",
            },
          ],
          versionId: "2",
          lastUpdated: "2022-11-10T19:37:19.333+00:00",
          source: "#fc9a07a0b430d331",
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
          reference: "Organization/1d66cab4-2a1c-48a0-b6bb-65a56930cebf",
        },
      },
      search: {
        mode: "include",
      },
    },
    {
      resource: {
        resourceType: "Patient",
        id: "39f4e0fc-7b50-4fc6-b9b3-dfcf377a6dc8",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-10T19:37:14.667+00:00",
            },
          ],
          versionId: "2",
          lastUpdated: "2022-11-10T19:37:14.806+00:00",
          source: "#195aff437545b6e9",
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
          reference: "Organization/c03a28a0-a1b0-4e2a-a3b7-c34cffb50b40",
        },
      },
      search: {
        mode: "include",
      },
    },
    {
      resource: {
        resourceType: "Organization",
        id: "c03a28a0-a1b0-4e2a-a3b7-c34cffb50b40",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-10T19:37:08.749+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2022-11-10T19:37:08.750+00:00",
          source: "#IZN0Vnh5eaX0r6kF",
          tag: [
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/1379ba20-fc3c-4105-bd1a-0d2d5400f942",
              display: "HLTH 2022 - Spare",
            },
          ],
        },
        name: "City Health",
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
                    system: "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
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
    {
      resource: {
        resourceType: "Organization",
        id: "1d66cab4-2a1c-48a0-b6bb-65a56930cebf",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-10T19:37:09.547+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2022-11-10T19:37:09.548+00:00",
          source: "#QuUFEAKpYENOFjRM",
          tag: [
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/1379ba20-fc3c-4105-bd1a-0d2d5400f942",
              display: "HLTH 2022 - Spare",
            },
          ],
        },
        name: "Main St. Medical",
      },
      search: {
        mode: "include",
      },
    },
  ],
};
