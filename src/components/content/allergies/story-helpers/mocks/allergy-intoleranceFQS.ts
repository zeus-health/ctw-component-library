export const allergyIntoleranceFQS = {
  data: {
    AllergyIntoleranceConnection: {
      pageInfo: {
        hasNextPage: false,
      },
      edges: [
        {
          node: {
            id: "4cd1d88b-80c3-40d0-a66b-aa5f18d41010",
            resourceType: "AllergyIntolerance",
            clinicalStatus: {
              coding: [
                {
                  code: "active",
                  display: "Active",
                  system: "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
                  extension: null,
                },
              ],
            },
            verificationStatus: null,
            type: "allergy",
            category: ["medication"],
            criticality: "high",
            code: {
              coding: [
                {
                  code: "7984",
                  display: "Penicillin V",
                  system: "http://www.nlm.nih.gov/research/umls/rxnorm",
                  extension: null,
                },
              ],
            },
            patient: {
              reference: "Patient/32e18e9a-798b-475d-9ca5-1ad39e9bc498",
              resource: {
                id: "32e18e9a-798b-475d-9ca5-1ad39e9bc498",
                resourceType: "Patient",
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
                    value: "brunozhang@example.com",
                    system: "email",
                  },
                  {
                    use: "home",
                    value: "555-928-0469",
                    system: "phone",
                  },
                  {
                    use: "mobile",
                    value: "555-568-6025",
                    system: "phone",
                  },
                  {
                    use: "work",
                    value: "555-470-5935",
                    system: "phone",
                  },
                ],
                address: [
                  {
                    city: "LAS VEGAS",
                    country: null,
                    district: null,
                    line: ["109 SHADOW LN"],
                    period: null,
                    postalCode: "89106-4119",
                    state: "NV",
                    text: null,
                    type: null,
                    use: null,
                  },
                ],
                name: [
                  {
                    family: "Zhang",
                    given: ["Bruno"],
                    prefix: null,
                    suffix: null,
                    text: null,
                    use: null,
                  },
                ],
                managingOrganization: {
                  resource: {
                    name: "Main St Medical",
                  },
                },
              },
            },
            encounter: null,
            onsetDateTime: "2022-03-13",
            onsetAge: null,
            onsetPeriod: null,
            recordedDate: "2022-03-13",
            recorder: null,
            lastOccurrence: null,
            note: null,
            reaction: [
              {
                substance: null,
                manifestation: [
                  {
                    coding: [
                      {
                        code: "39579001",
                        display: "Anaphylaxis (disorder)",
                        system: "http://snomed.info/sct",
                        extension: null,
                      },
                    ],
                  },
                ],
                onset: null,
                severity: null,
                note: null,
              },
            ],
          },
        },
        {
          node: {
            id: "51b67d73-6b1b-452a-be4e-8f7837370415",
            resourceType: "AllergyIntolerance",
            clinicalStatus: {
              coding: [
                {
                  code: "active",
                  display: "Active",
                  system: "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
                  extension: null,
                },
              ],
            },
            verificationStatus: null,
            type: "allergy",
            category: ["medication"],
            criticality: "high",
            code: {
              coding: [
                {
                  code: "7984",
                  display: "Penicillin V",
                  system: "http://www.nlm.nih.gov/research/umls/rxnorm",
                  extension: null,
                },
                {
                  code: "91936005",
                  display: "Penicillin V",
                  system: "http://snomed.info/sct",
                  extension: null,
                },
              ],
            },
            patient: {
              reference: "Patient/ccce5f74-7b50-49b3-bb5b-5b4309d9aba9",
              resource: {
                id: "ccce5f74-7b50-49b3-bb5b-5b4309d9aba9",
                resourceType: "Patient",
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
                    value: "brunozhang@example.com",
                    system: "email",
                  },
                  {
                    use: "home",
                    value: "555-928-0469",
                    system: "phone",
                  },
                  {
                    use: "mobile",
                    value: "555-568-6025",
                    system: "phone",
                  },
                  {
                    use: "work",
                    value: "555-470-5935",
                    system: "phone",
                  },
                ],
                address: [
                  {
                    city: "LAS VEGAS",
                    country: null,
                    district: null,
                    line: ["109 SHADOW LN"],
                    period: null,
                    postalCode: "89106-4119",
                    state: "NV",
                    text: null,
                    type: null,
                    use: null,
                  },
                ],
                name: [
                  {
                    family: "Zhang",
                    given: ["Bruno"],
                    prefix: null,
                    suffix: null,
                    text: null,
                    use: null,
                  },
                ],
                managingOrganization: {
                  resource: {
                    name: "Virtual Care Direct",
                  },
                },
              },
            },
            encounter: null,
            onsetDateTime: "2022-05-12",
            onsetAge: null,
            onsetPeriod: null,
            recordedDate: "2022-05-12",
            recorder: null,
            lastOccurrence: null,
            note: null,
            reaction: null,
          },
        },
        {
          node: {
            id: "6cca6806-1710-41d1-bf32-232af3c223c2",
            resourceType: "AllergyIntolerance",
            clinicalStatus: {
              coding: [
                {
                  code: "active",
                  display: "Active",
                  system: "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
                  extension: null,
                },
              ],
            },
            verificationStatus: null,
            type: "allergy",
            category: ["medication"],
            criticality: "high",
            code: {
              coding: [
                {
                  code: "10171",
                  display: "Sulfadiazine",
                  system: "http://www.nlm.nih.gov/research/umls/rxnorm",
                  extension: null,
                },
              ],
            },
            patient: {
              reference: "Patient/32e18e9a-798b-475d-9ca5-1ad39e9bc498",
              resource: {
                id: "32e18e9a-798b-475d-9ca5-1ad39e9bc498",
                resourceType: "Patient",
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
                    value: "brunozhang@example.com",
                    system: "email",
                  },
                  {
                    use: "home",
                    value: "555-928-0469",
                    system: "phone",
                  },
                  {
                    use: "mobile",
                    value: "555-568-6025",
                    system: "phone",
                  },
                  {
                    use: "work",
                    value: "555-470-5935",
                    system: "phone",
                  },
                ],
                address: [
                  {
                    city: "LAS VEGAS",
                    country: null,
                    district: null,
                    line: ["109 SHADOW LN"],
                    period: null,
                    postalCode: "89106-4119",
                    state: "NV",
                    text: null,
                    type: null,
                    use: null,
                  },
                ],
                name: [
                  {
                    family: "Zhang",
                    given: ["Bruno"],
                    prefix: null,
                    suffix: null,
                    text: null,
                    use: null,
                  },
                ],
                managingOrganization: {
                  resource: {
                    name: "Main St Medical",
                  },
                },
              },
            },
            encounter: null,
            onsetDateTime: "2023-01-13",
            onsetAge: null,
            onsetPeriod: null,
            recordedDate: "2023-01-13",
            recorder: null,
            lastOccurrence: null,
            note: null,
            reaction: [
              {
                substance: null,
                manifestation: [
                  {
                    coding: [
                      {
                        code: null,
                        display: "hives",
                        system: null,
                        extension: null,
                      },
                    ],
                  },
                ],
                onset: null,
                severity: null,
                note: null,
              },
            ],
          },
        },
        {
          node: {
            id: "5c2ab4cd-9442-4a92-b283-ef28b59e15a0",
            resourceType: "AllergyIntolerance",
            clinicalStatus: {
              coding: [
                {
                  code: "active",
                  display: "Active",
                  system: "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
                  extension: null,
                },
              ],
            },
            verificationStatus: null,
            type: "allergy",
            category: ["medication"],
            criticality: "low",
            code: {
              coding: [
                {
                  code: "74169",
                  display: "Piperacillin-Tazobactam",
                  system: "http://www.nlm.nih.gov/research/umls/rxnorm",
                  extension: null,
                },
              ],
            },
            patient: {
              reference: "Patient/32e18e9a-798b-475d-9ca5-1ad39e9bc498",
              resource: {
                id: "32e18e9a-798b-475d-9ca5-1ad39e9bc498",
                resourceType: "Patient",
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
                    value: "brunozhang@example.com",
                    system: "email",
                  },
                  {
                    use: "home",
                    value: "555-928-0469",
                    system: "phone",
                  },
                  {
                    use: "mobile",
                    value: "555-568-6025",
                    system: "phone",
                  },
                  {
                    use: "work",
                    value: "555-470-5935",
                    system: "phone",
                  },
                ],
                address: [
                  {
                    city: "LAS VEGAS",
                    country: null,
                    district: null,
                    line: ["109 SHADOW LN"],
                    period: null,
                    postalCode: "89106-4119",
                    state: "NV",
                    text: null,
                    type: null,
                    use: null,
                  },
                ],
                name: [
                  {
                    family: "Zhang",
                    given: ["Bruno"],
                    prefix: null,
                    suffix: null,
                    text: null,
                    use: null,
                  },
                ],
                managingOrganization: {
                  resource: {
                    name: "Main St Medical",
                  },
                },
              },
            },
            encounter: null,
            onsetDateTime: "1995-09-08",
            onsetAge: null,
            onsetPeriod: null,
            recordedDate: "2022-05-08",
            recorder: null,
            lastOccurrence: null,
            note: null,
            reaction: [
              {
                substance: null,
                manifestation: [
                  {
                    coding: [
                      {
                        code: null,
                        display: "Itching, shortness of breath",
                        system: null,
                        extension: null,
                      },
                    ],
                  },
                ],
                onset: null,
                severity: null,
                note: null,
              },
            ],
          },
        },
        {
          node: {
            id: "5115f90c-39b1-4ae0-a4a9-ad96fc02c92d",
            resourceType: "AllergyIntolerance",
            clinicalStatus: {
              coding: [
                {
                  code: "active",
                  display: "Active",
                  system: "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
                  extension: null,
                },
              ],
            },
            verificationStatus: null,
            type: "intolerance",
            category: ["environment"],
            criticality: "low",
            code: {
              coding: [
                {
                  code: "253157",
                  display: "Bee Pollen",
                  system: "http://www.nlm.nih.gov/research/umls/rxnorm",
                  extension: null,
                },
              ],
            },
            patient: {
              reference: "Patient/32e18e9a-798b-475d-9ca5-1ad39e9bc498",
              resource: {
                id: "32e18e9a-798b-475d-9ca5-1ad39e9bc498",
                resourceType: "Patient",
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
                    value: "brunozhang@example.com",
                    system: "email",
                  },
                  {
                    use: "home",
                    value: "555-928-0469",
                    system: "phone",
                  },
                  {
                    use: "mobile",
                    value: "555-568-6025",
                    system: "phone",
                  },
                  {
                    use: "work",
                    value: "555-470-5935",
                    system: "phone",
                  },
                ],
                address: [
                  {
                    city: "LAS VEGAS",
                    country: null,
                    district: null,
                    line: ["109 SHADOW LN"],
                    period: null,
                    postalCode: "89106-4119",
                    state: "NV",
                    text: null,
                    type: null,
                    use: null,
                  },
                ],
                name: [
                  {
                    family: "Zhang",
                    given: ["Bruno"],
                    prefix: null,
                    suffix: null,
                    text: null,
                    use: null,
                  },
                ],
                managingOrganization: {
                  resource: {
                    name: "Main St Medical",
                  },
                },
              },
            },
            encounter: null,
            onsetDateTime: "2023-01-13",
            onsetAge: null,
            onsetPeriod: null,
            recordedDate: "2023-01-13",
            recorder: null,
            lastOccurrence: null,
            note: null,
            reaction: [
              {
                substance: null,
                manifestation: [
                  {
                    coding: [
                      {
                        code: "56018004",
                        display: "Wheezing",
                        system: "http://snomed.info/sct",
                        extension: null,
                      },
                    ],
                  },
                ],
                onset: null,
                severity: null,
                note: null,
              },
            ],
          },
        },
      ],
    },
  },
};
