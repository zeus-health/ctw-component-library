export const conditionFQS = {
  ConditionConnection: {
    pageInfo: {
      hasNextPage: false,
    },
    edges: [
      {
        node: {
          id: "bc3b44c1-599e-466c-a957-7fe2335cbfb0",
          resourceType: "Condition",
          meta: {
            tag: [
              {
                system: "https://zusapi.com/summary",
                code: "Common",
              },
              {
                system: "https://zusapi.com/accesscontrol/owner",
                code: "builder/d8ab3e86-7ff2-482d-bbed-b30df2dd7ec7",
              },
            ],
            versionId: "1",
          },
          extension: [
            {
              url: "https://zusapi.com/lens/extension/aggregatedFrom",
              valueString: null,
            },
            {
              url: "https://zusapi.com/lens/id",
              valueString: "15c61e1c-f582-449f-bdb3-8cad7134a454",
            },
            {
              url: "https://zusapi.com/fhir/identifier/universal-id",
              valueString: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
            },
          ],
          subject: {
            reference: "Patient/e6a53fd7-494e-46c6-a3d2-8e53ce3ed2cb",
            resource: {
              id: "e6a53fd7-494e-46c6-a3d2-8e53ce3ed2cb",
              resourceType: "Patient",
              extension: null,
              active: null,
              identifier: [
                {
                  use: null,
                  system: "https://zusapi.com/fhir/identifier/universal-id",
                  value: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
                },
              ],
              contact: null,
              birthDate: "1978-07-31",
              gender: "male",
              maritalStatus: null,
              telecom: [
                {
                  use: null,
                  value: "BRUNOZHANG@EXAMPLE.COM",
                  system: "email",
                },
                {
                  use: "home",
                  value: "5559280469",
                  system: "phone",
                },
                {
                  use: "mobile",
                  value: "5555686025",
                  system: "phone",
                },
                {
                  use: "work",
                  value: "5554705935",
                  system: "phone",
                },
              ],
              address: [
                {
                  city: "LAS VEGAS",
                  country: null,
                  district: null,
                  line: ["109SHADOWLN"],
                  period: null,
                  postalCode: "891064119",
                  state: "NV",
                  text: null,
                  type: null,
                  use: null,
                },
              ],
              name: [
                {
                  family: "ZHANG",
                  given: ["BRUNO"],
                  prefix: null,
                  suffix: null,
                  text: null,
                  use: null,
                },
              ],
              managingOrganization: null,
            },
          },
          abatementAge: null,
          abatementDateTime: null,
          abatementPeriod: null,
          abatementRange: null,
          abatementString: null,
          clinicalStatus: {
            coding: [
              {
                code: "active",
                display: null,
                system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
                extension: null,
              },
            ],
          },
          asserter: null,
          bodySite: null,
          category: null,
          code: {
            coding: [
              {
                code: "10509002",
                display: "Acute bronchitis (disorder)",
                system: "http://snomed.info/sct",
                extension: null,
              },
              {
                code: "RSP005",
                display: "Acute bronchitis",
                system: "https://www.hcup-us.ahrq.gov/toolssoftware/ccsr/dxccsr.jsp",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "CCS",
                  },
                ],
              },
              {
                code: "A",
                display: "Acute",
                system: "http://www.hcup-us.ahrq.gov/toolssoftware/chronic_icd10/chronic_icd10.jsp",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "CCI",
                  },
                ],
              },
              {
                code: "10509002",
                display: "Acute bronchitis",
                system: "http://snomed.info/sct",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "SNOMED",
                  },
                ],
              },
              {
                code: "UNK",
                display: "unknown",
                system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "Unknown ICD10",
                  },
                ],
              },
              {
                code: "UNK",
                display: "unknown",
                system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "Unknown HCC",
                  },
                ],
              },
            ],
          },
          encounter: null,
          evidence: null,
          verificationStatus: null,
          note: null,
          onsetAge: null,
          onsetDateTime: null,
          onsetPeriod: null,
          onsetRange: null,
          onsetString: null,
          recordedDate: "2023-06-08",
          recorder: null,
          severity: null,
          stage: null,
        },
      },
      {
        node: {
          id: "ab2995ce-81d8-4c82-b29a-2d6e55a06bdd",
          resourceType: "Condition",
          meta: {
            tag: [
              {
                system: "https://zusapi.com/summary",
                code: "Common",
              },
              {
                system: "https://zusapi.com/accesscontrol/owner",
                code: "builder/d8ab3e86-7ff2-482d-bbed-b30df2dd7ec7",
              },
            ],
            versionId: "3",
          },
          extension: [
            {
              url: "https://zusapi.com/lens/extension/aggregatedFrom",
              valueString: null,
            },
            {
              url: "https://zusapi.com/lens/id",
              valueString: "8dab73a2-0aed-483f-bcb3-57708be2149d",
            },
            {
              url: "https://zusapi.com/fhir/identifier/universal-id",
              valueString: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
            },
          ],
          subject: {
            reference: "Patient/e6a53fd7-494e-46c6-a3d2-8e53ce3ed2cb",
            resource: {
              id: "e6a53fd7-494e-46c6-a3d2-8e53ce3ed2cb",
              resourceType: "Patient",
              extension: null,
              active: null,
              identifier: [
                {
                  use: null,
                  system: "https://zusapi.com/fhir/identifier/universal-id",
                  value: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
                },
              ],
              contact: null,
              birthDate: "1978-07-31",
              gender: "male",
              maritalStatus: null,
              telecom: [
                {
                  use: null,
                  value: "BRUNOZHANG@EXAMPLE.COM",
                  system: "email",
                },
                {
                  use: "home",
                  value: "5559280469",
                  system: "phone",
                },
                {
                  use: "mobile",
                  value: "5555686025",
                  system: "phone",
                },
                {
                  use: "work",
                  value: "5554705935",
                  system: "phone",
                },
              ],
              address: [
                {
                  city: "LAS VEGAS",
                  country: null,
                  district: null,
                  line: ["109SHADOWLN"],
                  period: null,
                  postalCode: "891064119",
                  state: "NV",
                  text: null,
                  type: null,
                  use: null,
                },
              ],
              name: [
                {
                  family: "ZHANG",
                  given: ["BRUNO"],
                  prefix: null,
                  suffix: null,
                  text: null,
                  use: null,
                },
              ],
              managingOrganization: null,
            },
          },
          abatementAge: null,
          abatementDateTime: null,
          abatementPeriod: null,
          abatementRange: null,
          abatementString: null,
          clinicalStatus: {
            coding: [
              {
                code: "active",
                display: null,
                system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
                extension: null,
              },
            ],
          },
          asserter: null,
          bodySite: null,
          category: null,
          code: {
            coding: [
              {
                code: "L64.9",
                display: "Androgenic alopecia, unspecified",
                system: "http://hl7.org/fhir/sid/icd-10-cm",
                extension: null,
              },
              {
                code: "L64.9",
                display: "Androgenic alopecia, unspecified",
                system: "http://hl7.org/fhir/sid/icd-10-cm",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "ICD10",
                  },
                ],
              },
              {
                code: "87872006",
                display: "Male pattern alopecia",
                system: "http://snomed.info/sct",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "SNOMED",
                  },
                ],
              },
              {
                code: "SKN007",
                display: "Other specified and unspecified skin disorders",
                system: "https://www.hcup-us.ahrq.gov/toolssoftware/ccsr/dxccsr.jsp",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "CCS",
                  },
                ],
              },
              {
                code: "A",
                display: "Acute",
                system: "http://www.hcup-us.ahrq.gov/toolssoftware/chronic_icd10/chronic_icd10.jsp",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "CCI",
                  },
                ],
              },
              {
                code: "UNK",
                display: "unknown",
                system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "Unknown HCC",
                  },
                ],
              },
            ],
          },
          encounter: null,
          evidence: null,
          verificationStatus: null,
          note: null,
          onsetAge: null,
          onsetDateTime: null,
          onsetPeriod: null,
          onsetRange: null,
          onsetString: null,
          recordedDate: "2023-01-17",
          recorder: null,
          severity: null,
          stage: null,
        },
      },
      {
        node: {
          id: "c4f9dd82-4b46-461e-8e82-57c23da0bf16",
          resourceType: "Condition",
          meta: {
            tag: [
              {
                system: "https://zusapi.com/summary",
                code: "Common",
              },
              {
                system: "https://zusapi.com/lens",
                code: "ChronicConditions",
              },
              {
                system: "https://zusapi.com/accesscontrol/owner",
                code: "builder/d8ab3e86-7ff2-482d-bbed-b30df2dd7ec7",
              },
            ],
            versionId: "2",
          },
          extension: [
            {
              url: "https://zusapi.com/lens/extension/aggregatedFrom",
              valueString: null,
            },
            {
              url: "https://zusapi.com/lens/id",
              valueString: "a6b07132-3f76-4f7c-aaea-6e4fc8334ed0",
            },
            {
              url: "https://zusapi.com/fhir/identifier/universal-id",
              valueString: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
            },
          ],
          subject: {
            reference: "Patient/e6a53fd7-494e-46c6-a3d2-8e53ce3ed2cb",
            resource: {
              id: "e6a53fd7-494e-46c6-a3d2-8e53ce3ed2cb",
              resourceType: "Patient",
              extension: null,
              active: null,
              identifier: [
                {
                  use: null,
                  system: "https://zusapi.com/fhir/identifier/universal-id",
                  value: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
                },
              ],
              contact: null,
              birthDate: "1978-07-31",
              gender: "male",
              maritalStatus: null,
              telecom: [
                {
                  use: null,
                  value: "BRUNOZHANG@EXAMPLE.COM",
                  system: "email",
                },
                {
                  use: "home",
                  value: "5559280469",
                  system: "phone",
                },
                {
                  use: "mobile",
                  value: "5555686025",
                  system: "phone",
                },
                {
                  use: "work",
                  value: "5554705935",
                  system: "phone",
                },
              ],
              address: [
                {
                  city: "LAS VEGAS",
                  country: null,
                  district: null,
                  line: ["109SHADOWLN"],
                  period: null,
                  postalCode: "891064119",
                  state: "NV",
                  text: null,
                  type: null,
                  use: null,
                },
              ],
              name: [
                {
                  family: "ZHANG",
                  given: ["BRUNO"],
                  prefix: null,
                  suffix: null,
                  text: null,
                  use: null,
                },
              ],
              managingOrganization: null,
            },
          },
          abatementAge: null,
          abatementDateTime: null,
          abatementPeriod: null,
          abatementRange: null,
          abatementString: null,
          clinicalStatus: {
            coding: [
              {
                code: "active",
                display: null,
                system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
                extension: null,
              },
            ],
          },
          asserter: null,
          bodySite: null,
          category: null,
          code: {
            coding: [
              {
                code: "55822004",
                display: "Hyperlipidemia, unspecified",
                system: "http://snomed.info/sct",
                extension: null,
              },
              {
                code: "E78.5",
                display: "Hyperlipidemia, unspecified",
                system: "http://hl7.org/fhir/sid/icd-10-cm",
                extension: null,
              },
              {
                code: "E78.5",
                display: "Hyperlipidemia, unspecified",
                system: "http://hl7.org/fhir/sid/icd-10-cm",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "ICD10",
                  },
                ],
              },
              {
                code: "END010",
                display: "Disorders of lipid metabolism",
                system: "https://www.hcup-us.ahrq.gov/toolssoftware/ccsr/dxccsr.jsp",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "CCS",
                  },
                ],
              },
              {
                code: "C",
                display: "Chronic",
                system: "http://www.hcup-us.ahrq.gov/toolssoftware/chronic_icd10/chronic_icd10.jsp",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "CCI",
                  },
                ],
              },
              {
                code: "55822004",
                display: "Hyperlipidemia",
                system: "http://snomed.info/sct",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "SNOMED",
                  },
                ],
              },
              {
                code: "UNK",
                display: "unknown",
                system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "Unknown HCC",
                  },
                ],
              },
            ],
          },
          encounter: null,
          evidence: null,
          verificationStatus: null,
          note: null,
          onsetAge: null,
          onsetDateTime: null,
          onsetPeriod: null,
          onsetRange: null,
          onsetString: null,
          recordedDate: "2023-01-17",
          recorder: null,
          severity: null,
          stage: null,
        },
      },
      {
        node: {
          id: "b0df5939-6069-4e33-94b6-e2e6ab3c49ed",
          resourceType: "Condition",
          meta: {
            tag: [
              {
                system: "https://zusapi.com/summary",
                code: "Common",
              },
              {
                system: "https://zusapi.com/lens",
                code: "ChronicConditions",
              },
              {
                system: "https://zusapi.com/accesscontrol/owner",
                code: "builder/d8ab3e86-7ff2-482d-bbed-b30df2dd7ec7",
              },
            ],
            versionId: "3",
          },
          extension: [
            {
              url: "https://zusapi.com/lens/extension/aggregatedFrom",
              valueString: null,
            },
            {
              url: "https://zusapi.com/lens/id",
              valueString: "ffab3c3d-8ef6-4562-89b3-5f9462f53b80",
            },
            {
              url: "https://zusapi.com/fhir/identifier/universal-id",
              valueString: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
            },
          ],
          subject: {
            reference: "Patient/e6a53fd7-494e-46c6-a3d2-8e53ce3ed2cb",
            resource: {
              id: "e6a53fd7-494e-46c6-a3d2-8e53ce3ed2cb",
              resourceType: "Patient",
              extension: null,
              active: null,
              identifier: [
                {
                  use: null,
                  system: "https://zusapi.com/fhir/identifier/universal-id",
                  value: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
                },
              ],
              contact: null,
              birthDate: "1978-07-31",
              gender: "male",
              maritalStatus: null,
              telecom: [
                {
                  use: null,
                  value: "BRUNOZHANG@EXAMPLE.COM",
                  system: "email",
                },
                {
                  use: "home",
                  value: "5559280469",
                  system: "phone",
                },
                {
                  use: "mobile",
                  value: "5555686025",
                  system: "phone",
                },
                {
                  use: "work",
                  value: "5554705935",
                  system: "phone",
                },
              ],
              address: [
                {
                  city: "LAS VEGAS",
                  country: null,
                  district: null,
                  line: ["109SHADOWLN"],
                  period: null,
                  postalCode: "891064119",
                  state: "NV",
                  text: null,
                  type: null,
                  use: null,
                },
              ],
              name: [
                {
                  family: "ZHANG",
                  given: ["BRUNO"],
                  prefix: null,
                  suffix: null,
                  text: null,
                  use: null,
                },
              ],
              managingOrganization: null,
            },
          },
          abatementAge: null,
          abatementDateTime: null,
          abatementPeriod: null,
          abatementRange: null,
          abatementString: null,
          clinicalStatus: {
            coding: [
              {
                code: "active",
                display: null,
                system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
                extension: null,
              },
            ],
          },
          asserter: null,
          bodySite: null,
          category: null,
          code: {
            coding: [
              {
                code: "313297008",
                display: "Chronic obstructive pulmonary disease, unspecified",
                system: "http://snomed.info/sct",
                extension: null,
              },
              {
                code: "J44.9",
                display: "Chronic obstructive pulmonary disease, unspecified",
                system: "http://hl7.org/fhir/sid/icd-10-cm",
                extension: null,
              },
              {
                code: "J44.9",
                display: "Chronic obstructive pulmonary disease, unspecified",
                system: "http://hl7.org/fhir/sid/icd-10-cm",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "ICD10",
                  },
                ],
              },
              {
                code: "111",
                display: "Chronic obstructive pulmonary disease, unspecified",
                system: "http://terminology.hl7.org/CodeSystem/cmshcc",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "HCC",
                  },
                ],
              },
              {
                code: "RSP008",
                display: "Chronic obstructive pulmonary disease and bronchiectasis",
                system: "https://www.hcup-us.ahrq.gov/toolssoftware/ccsr/dxccsr.jsp",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "CCS",
                  },
                ],
              },
              {
                code: "C",
                display: "Chronic",
                system: "http://www.hcup-us.ahrq.gov/toolssoftware/chronic_icd10/chronic_icd10.jsp",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "CCI",
                  },
                ],
              },
              {
                code: "313297008",
                display: "Moderate chronic obstructive pulmonary disease",
                system: "http://snomed.info/sct",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "SNOMED",
                  },
                ],
              },
            ],
          },
          encounter: null,
          evidence: null,
          verificationStatus: null,
          note: null,
          onsetAge: null,
          onsetDateTime: null,
          onsetPeriod: null,
          onsetRange: null,
          onsetString: null,
          recordedDate: "2023-01-17",
          recorder: null,
          severity: null,
          stage: null,
        },
      },
      {
        node: {
          id: "af88ca36-5cf4-4936-a3ea-c32a179761bc",
          resourceType: "Condition",
          meta: {
            tag: [
              {
                system: "https://zusapi.com/summary",
                code: "Common",
              },
              {
                system: "https://zusapi.com/lens",
                code: "ChronicConditions",
              },
              {
                system: "https://zusapi.com/accesscontrol/owner",
                code: "builder/d8ab3e86-7ff2-482d-bbed-b30df2dd7ec7",
              },
            ],
            versionId: "2",
          },
          extension: [
            {
              url: "https://zusapi.com/lens/extension/aggregatedFrom",
              valueString: null,
            },
            {
              url: "https://zusapi.com/lens/id",
              valueString: "7f370788-1a14-4efc-b12c-9758ff87eb02",
            },
            {
              url: "https://zusapi.com/fhir/identifier/universal-id",
              valueString: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
            },
          ],
          subject: {
            reference: "Patient/e6a53fd7-494e-46c6-a3d2-8e53ce3ed2cb",
            resource: {
              id: "e6a53fd7-494e-46c6-a3d2-8e53ce3ed2cb",
              resourceType: "Patient",
              extension: null,
              active: null,
              identifier: [
                {
                  use: null,
                  system: "https://zusapi.com/fhir/identifier/universal-id",
                  value: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
                },
              ],
              contact: null,
              birthDate: "1978-07-31",
              gender: "male",
              maritalStatus: null,
              telecom: [
                {
                  use: null,
                  value: "BRUNOZHANG@EXAMPLE.COM",
                  system: "email",
                },
                {
                  use: "home",
                  value: "5559280469",
                  system: "phone",
                },
                {
                  use: "mobile",
                  value: "5555686025",
                  system: "phone",
                },
                {
                  use: "work",
                  value: "5554705935",
                  system: "phone",
                },
              ],
              address: [
                {
                  city: "LAS VEGAS",
                  country: null,
                  district: null,
                  line: ["109SHADOWLN"],
                  period: null,
                  postalCode: "891064119",
                  state: "NV",
                  text: null,
                  type: null,
                  use: null,
                },
              ],
              name: [
                {
                  family: "ZHANG",
                  given: ["BRUNO"],
                  prefix: null,
                  suffix: null,
                  text: null,
                  use: null,
                },
              ],
              managingOrganization: null,
            },
          },
          abatementAge: null,
          abatementDateTime: null,
          abatementPeriod: null,
          abatementRange: null,
          abatementString: null,
          clinicalStatus: {
            coding: [
              {
                code: "active",
                display: null,
                system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
                extension: null,
              },
            ],
          },
          asserter: null,
          bodySite: null,
          category: null,
          code: {
            coding: [
              {
                code: "239872002",
                display: "Bilateral primary osteoarthritis of hip",
                system: "http://snomed.info/sct",
                extension: null,
              },
              {
                code: "M16.0",
                display: "Bilateral primary osteoarthritis of hip",
                system: "http://hl7.org/fhir/sid/icd-10-cm",
                extension: null,
              },
              {
                code: "M16.0",
                display: "Bilateral primary osteoarthritis of hip",
                system: "http://hl7.org/fhir/sid/icd-10-cm",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "ICD10",
                  },
                ],
              },
              {
                code: "MUS006",
                display: "Osteoarthritis",
                system: "https://www.hcup-us.ahrq.gov/toolssoftware/ccsr/dxccsr.jsp",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "CCS",
                  },
                ],
              },
              {
                code: "C",
                display: "Chronic",
                system: "http://www.hcup-us.ahrq.gov/toolssoftware/chronic_icd10/chronic_icd10.jsp",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "CCI",
                  },
                ],
              },
              {
                code: "239872002",
                display: "Osteoarthritis of hip",
                system: "http://snomed.info/sct",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "SNOMED",
                  },
                ],
              },
              {
                code: "UNK",
                display: "unknown",
                system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "Unknown HCC",
                  },
                ],
              },
            ],
          },
          encounter: null,
          evidence: null,
          verificationStatus: null,
          note: null,
          onsetAge: null,
          onsetDateTime: null,
          onsetPeriod: null,
          onsetRange: null,
          onsetString: null,
          recordedDate: "2023-01-17",
          recorder: null,
          severity: null,
          stage: null,
        },
      },
      {
        node: {
          id: "97eafd27-9137-4b73-8091-ac921668ae14",
          resourceType: "Condition",
          meta: {
            tag: [
              {
                system: "https://zusapi.com/summary",
                code: "Common",
              },
              {
                system: "https://zusapi.com/accesscontrol/owner",
                code: "builder/d8ab3e86-7ff2-482d-bbed-b30df2dd7ec7",
              },
            ],
            versionId: "1",
          },
          extension: [
            {
              url: "https://zusapi.com/lens/extension/aggregatedFrom",
              valueString: null,
            },
            {
              url: "https://zusapi.com/lens/id",
              valueString: "5fc3a77f-51b9-4e88-aa0f-b166d6fb095a",
            },
            {
              url: "https://zusapi.com/fhir/identifier/universal-id",
              valueString: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
            },
          ],
          subject: {
            reference: "Patient/e6a53fd7-494e-46c6-a3d2-8e53ce3ed2cb",
            resource: {
              id: "e6a53fd7-494e-46c6-a3d2-8e53ce3ed2cb",
              resourceType: "Patient",
              extension: null,
              active: null,
              identifier: [
                {
                  use: null,
                  system: "https://zusapi.com/fhir/identifier/universal-id",
                  value: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
                },
              ],
              contact: null,
              birthDate: "1978-07-31",
              gender: "male",
              maritalStatus: null,
              telecom: [
                {
                  use: null,
                  value: "BRUNOZHANG@EXAMPLE.COM",
                  system: "email",
                },
                {
                  use: "home",
                  value: "5559280469",
                  system: "phone",
                },
                {
                  use: "mobile",
                  value: "5555686025",
                  system: "phone",
                },
                {
                  use: "work",
                  value: "5554705935",
                  system: "phone",
                },
              ],
              address: [
                {
                  city: "LAS VEGAS",
                  country: null,
                  district: null,
                  line: ["109SHADOWLN"],
                  period: null,
                  postalCode: "891064119",
                  state: "NV",
                  text: null,
                  type: null,
                  use: null,
                },
              ],
              name: [
                {
                  family: "ZHANG",
                  given: ["BRUNO"],
                  prefix: null,
                  suffix: null,
                  text: null,
                  use: null,
                },
              ],
              managingOrganization: null,
            },
          },
          abatementAge: null,
          abatementDateTime: null,
          abatementPeriod: null,
          abatementRange: null,
          abatementString: null,
          clinicalStatus: {
            coding: [
              {
                code: "active",
                display: null,
                system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
                extension: null,
              },
            ],
          },
          asserter: null,
          bodySite: null,
          category: null,
          code: {
            coding: [
              {
                code: "29857009",
                display: "Chest Pain, Unspecified",
                system: "http://snomed.info/sct",
                extension: null,
              },
              {
                code: "R07.9",
                display: "Chest Pain, Unspecified",
                system: "http://hl7.org/fhir/sid/icd-10-cm",
                extension: null,
              },
              {
                code: "R07.9",
                display: "Chest pain, unspecified",
                system: "http://hl7.org/fhir/sid/icd-10-cm",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "ICD10",
                  },
                ],
              },
              {
                code: "CIR012",
                display: "Nonspecific chest pain",
                system: "https://www.hcup-us.ahrq.gov/toolssoftware/ccsr/dxccsr.jsp",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "CCS",
                  },
                ],
              },
              {
                code: "A",
                display: "Acute",
                system: "http://www.hcup-us.ahrq.gov/toolssoftware/chronic_icd10/chronic_icd10.jsp",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "CCI",
                  },
                ],
              },
              {
                code: "29857009",
                display: "Chest pain",
                system: "http://snomed.info/sct",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "SNOMED",
                  },
                ],
              },
              {
                code: "UNK",
                display: "unknown",
                system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "Unknown HCC",
                  },
                ],
              },
            ],
          },
          encounter: null,
          evidence: null,
          verificationStatus: null,
          note: null,
          onsetAge: null,
          onsetDateTime: null,
          onsetPeriod: null,
          onsetRange: null,
          onsetString: null,
          recordedDate: "2020-10-08",
          recorder: null,
          severity: null,
          stage: null,
        },
      },
      {
        node: {
          id: "285acdf5-a2f6-4063-b053-fc0766f447e9",
          resourceType: "Condition",
          meta: {
            tag: [
              {
                system: "https://zusapi.com/summary",
                code: "Common",
              },
              {
                system: "https://zusapi.com/lens",
                code: "ChronicConditions",
              },
              {
                system: "https://zusapi.com/accesscontrol/owner",
                code: "builder/d8ab3e86-7ff2-482d-bbed-b30df2dd7ec7",
              },
            ],
            versionId: "1",
          },
          extension: [
            {
              url: "https://zusapi.com/lens/extension/aggregatedFrom",
              valueString: null,
            },
            {
              url: "https://zusapi.com/lens/id",
              valueString: "cdfd52e9-b629-4315-bc07-fe5a0b8f0ca0",
            },
            {
              url: "https://zusapi.com/fhir/identifier/universal-id",
              valueString: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
            },
          ],
          subject: {
            reference: "Patient/e6a53fd7-494e-46c6-a3d2-8e53ce3ed2cb",
            resource: {
              id: "e6a53fd7-494e-46c6-a3d2-8e53ce3ed2cb",
              resourceType: "Patient",
              extension: null,
              active: null,
              identifier: [
                {
                  use: null,
                  system: "https://zusapi.com/fhir/identifier/universal-id",
                  value: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
                },
              ],
              contact: null,
              birthDate: "1978-07-31",
              gender: "male",
              maritalStatus: null,
              telecom: [
                {
                  use: null,
                  value: "BRUNOZHANG@EXAMPLE.COM",
                  system: "email",
                },
                {
                  use: "home",
                  value: "5559280469",
                  system: "phone",
                },
                {
                  use: "mobile",
                  value: "5555686025",
                  system: "phone",
                },
                {
                  use: "work",
                  value: "5554705935",
                  system: "phone",
                },
              ],
              address: [
                {
                  city: "LAS VEGAS",
                  country: null,
                  district: null,
                  line: ["109SHADOWLN"],
                  period: null,
                  postalCode: "891064119",
                  state: "NV",
                  text: null,
                  type: null,
                  use: null,
                },
              ],
              name: [
                {
                  family: "ZHANG",
                  given: ["BRUNO"],
                  prefix: null,
                  suffix: null,
                  text: null,
                  use: null,
                },
              ],
              managingOrganization: null,
            },
          },
          abatementAge: null,
          abatementDateTime: null,
          abatementPeriod: null,
          abatementRange: null,
          abatementString: null,
          clinicalStatus: {
            coding: [
              {
                code: "active",
                display: null,
                system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
                extension: null,
              },
            ],
          },
          asserter: null,
          bodySite: null,
          category: null,
          code: {
            coding: [
              {
                code: "195951007",
                display: null,
                system: "http://snomed.info/sct",
                extension: null,
              },
              {
                code: "J44.1",
                display: null,
                system: "http://hl7.org/fhir/sid/icd-10-cm",
                extension: null,
              },
              {
                code: "J44.1",
                display: "Chronic obstructive pulmonary disease with (acute) exacerbation",
                system: "http://hl7.org/fhir/sid/icd-10-cm",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "ICD10",
                  },
                ],
              },
              {
                code: "111",
                display: "Chronic obstructive pulmonary disease with (acute) exacerbation",
                system: "http://terminology.hl7.org/CodeSystem/cmshcc",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "HCC",
                  },
                ],
              },
              {
                code: "RSP008",
                display: "Chronic obstructive pulmonary disease and bronchiectasis",
                system: "https://www.hcup-us.ahrq.gov/toolssoftware/ccsr/dxccsr.jsp",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "CCS",
                  },
                ],
              },
              {
                code: "B",
                display: "Both",
                system: "http://www.hcup-us.ahrq.gov/toolssoftware/chronic_icd10/chronic_icd10.jsp",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "CCI",
                  },
                ],
              },
              {
                code: "195951007",
                display: "Acute exacerbation of chronic obstructive airways disease",
                system: "http://snomed.info/sct",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "SNOMED",
                  },
                ],
              },
            ],
          },
          encounter: null,
          evidence: null,
          verificationStatus: null,
          note: null,
          onsetAge: null,
          onsetDateTime: null,
          onsetPeriod: null,
          onsetRange: null,
          onsetString: null,
          recordedDate: "2020-10-08",
          recorder: null,
          severity: null,
          stage: null,
        },
      },
    ],
  },
};
