export const encounters: fhir4.Bundle = {
  resourceType: "Bundle",
  id: "4b58609b-b4c2-43bb-81de-21b9a02fa62f",
  meta: {
    lastUpdated: "2023-01-03T22:30:53.366+00:00",
  },
  type: "searchset",
  total: 6,
  entry: [
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Encounter/5af9550a-f9c7-4ca6-86b2-ecdb4c164ec3",
      resource: {
        resourceType: "Encounter",
        id: "5af9550a-f9c7-4ca6-86b2-ecdb4c164ec3",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2023-01-03T20:11:44.150+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2023-01-03T20:11:44.232+00:00",
          source: "#GKzYTPJnzCuiBU0w",
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
            },
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/d037b2ef-66d6-4fcc-b228-2bc748ce4d0e",
              display: "CTW Health",
            },
          ],
        },
        extension: [
          {
            url: "https://zusapi.com/fhir/identifier/universal-id",
            valueString: "7bd02b95-a275-485b-8053-2ef190d2d86a",
          },
        ],
        status: "finished",
        class: {
          system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
          code: "UNK",
        },
        type: [
          {
            coding: [
              {
                system: "http://www.ama-assn.org/go/cpt",
                code: "99203",
                display: "Office Visit",
              },
              {
                system: "urn:oid:1.2.840.114350.1.13.418.2.7.4.698084.30",
                code: "101",
              },
              {
                system: "urn:oid:2.16.840.1.113883.5.4",
                code: "AMB",
              },
              {
                system: "urn:oid:1.2.840.114350.1.72.1.30",
                code: "101",
              },
              {
                system: "urn:oid:1.2.840.114350.1.72.1.30.1",
                code: "4",
              },
            ],
            text: "Office Visit",
          },
        ],
        subject: {
          reference: "Patient/6e6ea727-a7ac-47d0-96b8-536e1073826c",
          type: "Patient",
        },
        participant: [
          {
            type: [
              {
                coding: [
                  {
                    display: "MinuteClinic",
                  },
                  {
                    system:
                      "urn:oid:1.2.840.114350.1.13.418.2.7.10.836982.1050",
                    code: "175",
                    display: "MinuteClinic",
                  },
                ],
                text: "MinuteClinic",
              },
            ],
            individual: {
              reference: "Practitioner/8653ba26-4f9e-48f6-b3a5-a386345bc990",
              type: "Practitioner",
              display: "Mary Jane Wilson NP",
            },
          },
        ],
        period: {
          start: "2018-09-08T09:55:00-05:00",
          end: "2018-09-08T11:29:32-05:00",
        },
        length: {
          value: 94,
          unit: "minute",
          system: "http://unitsofmeasure.org",
          code: "min",
        },
        diagnosis: [
          {
            condition: {
              reference: "Condition/a73a7f57-cc74-4165-ab7b-5d8e43e71f6d",
              type: "Condition",
              display: "COPD with acute exacerbation",
            },
          },
          {
            condition: {
              reference: "Condition/5687dd21-523e-425e-8f76-e3410339aaba",
              type: "Condition",
              display: "Upper respiratory infection, acute",
            },
          },
          {
            condition: {
              reference: "Condition/12345",
              type: "Condition",
              display: "Difficulty breathing",
            },
          },
          {
            condition: {
              reference: "Condition/12345",
              type: "Condition",
              display: "Infection",
            },
          },
        ],
        location: [
          {
            location: {
              reference: "Location/e85b4d87-2cbd-4ab3-b842-a821cde3d339",
              type: "Location",
              display: "MinuteClinic OH4304",
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
        "https://api.dev.zusapi.com/fhir/Encounter/77190d01-91ef-4dbd-8af2-8183ed9a40d3",
      resource: {
        resourceType: "Encounter",
        id: "77190d01-91ef-4dbd-8af2-8183ed9a40d3",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2023-01-03T20:11:47.096+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2023-01-03T20:11:47.145+00:00",
          source: "#vpjWA3FgSp4rbi6v",
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
            },
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/d037b2ef-66d6-4fcc-b228-2bc748ce4d0e",
              display: "CTW Health",
            },
          ],
        },
        extension: [
          {
            url: "https://zusapi.com/fhir/identifier/universal-id",
            valueString: "7bd02b95-a275-485b-8053-2ef190d2d86a",
          },
        ],
        status: "finished",
        class: {
          system: "urn:oid:2.16.840.1.113883.5.4",
          code: "IMP",
        },
        subject: {
          reference: "Patient/6e6ea727-a7ac-47d0-96b8-536e1073826c",
          type: "Patient",
        },
        participant: [
          {
            type: [
              {
                coding: [
                  {
                    display: "Physical Medicine and Rehab",
                  },
                  {
                    system: "urn:oid:1.2.840.114350.1.72.1.7.7.10.688867.4160",
                    code: "86",
                    display: "Physical Medicine and Rehab",
                  },
                  {
                    system:
                      "urn:oid:1.2.840.114350.1.13.535.2.7.10.836982.1050",
                    code: "33",
                    display: "Physical Medicine and Rehab",
                  },
                ],
                text: "Physical Medicine and Rehab",
              },
            ],
            individual: {
              reference: "Practitioner/2c77e583-3dd3-45dd-888e-a31a8f3645f5",
              type: "Practitioner",
              display: "David Lee",
            },
          },
        ],
        period: {
          start: "2019-01-09T21:49:00-05:00",
          end: "2019-01-18T12:17:00-04:00",
        },
        length: {
          value: 12328,
          unit: "minute",
          system: "http://unitsofmeasure.org",
          code: "min",
        },
        diagnosis: [
          {
            condition: {
              reference: "Condition/5a7a7ddc-fafe-46eb-9ea4-0d1191603334",
              type: "Condition",
              display: "AIDP (acute inflammatory demyelinating polyneuropathy)",
            },
          },
        ],
        hospitalization: {
          dischargeDisposition: {
            coding: [
              {
                system: "urn:oid:1.2.840.114350.1.13.535.2.7.4.698084.18888",
                code: "1",
                display: "Home or Self Care",
              },
            ],
            text: "Home or Self Care",
          },
        },
        location: [
          {
            location: {
              reference: "Location/71c90541-0b1a-4bc3-a227-6787e72a11f9",
              type: "Location",
              display: "ABC 17 REHAB",
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
        "https://api.dev.zusapi.com/fhir/Encounter/c76550d6-3a5b-4fdc-91f7-f77ba29a6ce0",
      resource: {
        resourceType: "Encounter",
        id: "c76550d6-3a5b-4fdc-91f7-f77ba29a6ce0",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2023-01-03T20:11:44.673+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2023-01-03T20:11:44.747+00:00",
          source: "#2AhmrNrpGVMXgGuM",
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
            },
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/d037b2ef-66d6-4fcc-b228-2bc748ce4d0e",
              display: "CTW Health",
            },
          ],
        },
        extension: [
          {
            url: "https://zusapi.com/fhir/identifier/universal-id",
            valueString: "7bd02b95-a275-485b-8053-2ef190d2d86a",
          },
        ],
        status: "finished",
        class: {
          system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
          code: "UNK",
        },
        type: [
          {
            coding: [
              {
                system: "http://www.ama-assn.org/go/cpt",
                display: "Jerry Mason MD",
              },
              {
                system: "urn:oid:2.16.840.1.113883.4.391.23603",
                display: "(TEL)",
              },
            ],
            text: "Jerry L Mason MD",
          },
        ],
        subject: {
          reference: "Patient/6e6ea727-a7ac-47d0-96b8-536e1073826c",
          type: "Patient",
        },
        participant: [
          {
            type: [
              {
                coding: [
                  {
                    system:
                      "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
                    code: "NI",
                    display: "NoInformation",
                  },
                ],
                text: "NoInformation",
              },
            ],
            individual: {
              reference: "Practitioner/fc7ee8d7-6ad3-47a4-ab40-88f07bf7e2fa",
              type: "Practitioner",
              display: "Jerry Mason",
            },
          },
        ],
        period: {
          start: "2020-01-14",
        },
        location: [
          {
            location: {
              reference: "Location/85b347e8-bee1-40fc-bd07-799f0a0c4d74",
              type: "Location",
              display: "Jerry Mason MD",
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
        "https://api.dev.zusapi.com/fhir/Encounter/a108bf4e-7791-4f23-9a6e-ab9aabf1467e",
      resource: {
        resourceType: "Encounter",
        id: "a108bf4e-7791-4f23-9a6e-ab9aabf1467e",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2023-01-03T20:11:48.071+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2023-01-03T20:11:48.074+00:00",
          source: "#AwOEd1w67hUQRVXU",
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
            },
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/d037b2ef-66d6-4fcc-b228-2bc748ce4d0e",
              display: "CTW Health",
            },
          ],
        },
        extension: [
          {
            url: "https://zusapi.com/fhir/identifier/universal-id",
            valueString: "7bd02b95-a275-485b-8053-2ef190d2d86a",
          },
        ],
        status: "finished",
        class: {
          system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
          code: "UNK",
        },
        subject: {
          reference: "Patient/6e6ea727-a7ac-47d0-96b8-536e1073826c",
          type: "Patient",
        },
        period: {
          start: "2020-05-07T09:17:39+00:00",
        },
        diagnosis: [
          {
            condition: {
              reference: "Condition/17c54947-3fa4-42af-b6ce-2c187b4c774a",
              type: "Condition",
              display: "Sheltered homelessness",
            },
          },
        ],
        location: [
          {
            location: {
              reference: "Location/53600c9e-e46a-4f2d-912e-859aac128942",
              type: "Location",
              display: "ST. JOSEPH HHS",
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
        "https://api.dev.zusapi.com/fhir/Encounter/fc6cf519-2991-4fec-98ec-4c81ec0a0f02",
      resource: {
        resourceType: "Encounter",
        id: "fc6cf519-2991-4fec-98ec-4c81ec0a0f02",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2023-01-03T20:11:45.647+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2023-01-03T20:11:45.824+00:00",
          source: "#dVeLKurdCrwFBuZR",
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
            },
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/d037b2ef-66d6-4fcc-b228-2bc748ce4d0e",
              display: "CTW Health",
            },
          ],
        },
        extension: [
          {
            url: "https://zusapi.com/fhir/identifier/universal-id",
            valueString: "7bd02b95-a275-485b-8053-2ef190d2d86a",
          },
        ],
        status: "finished",
        class: {
          system: "urn:oid:2.16.840.1.113883.5.4",
          code: "EMER",
        },
        type: [
          {
            coding: [
              {
                system: "urn:oid:2.16.840.1.113883.5.4",
                code: "EMER",
                display: "Emergency",
              },
              {
                system: "urn:oid:1.2.840.114350.1.13.140.2.7.4.698084.30",
                code: "3",
              },
              {
                system: "urn:oid:1.2.840.114350.1.72.1.30",
                code: "3",
              },
              {
                system: "urn:oid:1.2.840.114350.1.72.1.30.1",
                code: "0",
              },
            ],
            text: "Emergency",
          },
        ],
        subject: {
          reference: "Patient/6e6ea727-a7ac-47d0-96b8-536e1073826c",
          type: "Patient",
        },
        participant: [
          {
            type: [
              {
                coding: [
                  {
                    display: "Emergency Medicine",
                  },
                  {
                    system: "urn:oid:1.2.840.114350.1.72.1.7.7.10.688867.4160",
                    code: "17",
                    display: "Emergency Medicine",
                  },
                  {
                    system:
                      "urn:oid:1.2.840.114350.1.13.140.2.7.10.836982.1050",
                    code: "49",
                    display: "Emergency Medicine",
                  },
                ],
                text: "Emergency Medicine",
              },
            ],
            individual: {
              reference: "Practitioner/f21f7b83-c187-4164-bc6a-0ac08f8da22b",
              type: "Practitioner",
              display: "Minosh Madria",
            },
          },
        ],
        period: {
          start: "2022-01-29T13:31:59-06:00",
          end: "2022-01-29T15:02:31-06:00",
        },
        length: {
          value: 90,
          unit: "minute",
          system: "http://unitsofmeasure.org",
          code: "min",
        },
        reasonCode: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "404684003",
                display: "Clinical finding (finding)",
              },
            ],
            text: "Clinical finding",
          },
        ],
        diagnosis: [
          {
            condition: {
              reference: "Condition/e1af6029-4ac3-43b9-9802-48c65d064e24",
              type: "Condition",
              display: "Tooth pain",
            },
          },
        ],
        hospitalization: {
          dischargeDisposition: {
            coding: [
              {
                system: "urn:oid:1.2.840.114350.1.13.140.2.7.4.698084.18888",
                code: "01",
                display: "Discharged to home or self care (routine discharge)",
              },
            ],
            text: "Discharged to home or self care (routine discharge)",
          },
        },
        location: [
          {
            location: {
              reference: "Location/543c2893-1ec5-45d5-9664-9d1a23d3c2b9",
              type: "Location",
              display: "ABCD Emergency Department",
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
        "https://api.dev.zusapi.com/fhir/Encounter/6b77e120-04b4-4cd6-8f0b-3543767cd51f",
      resource: {
        resourceType: "Encounter",
        id: "6b77e120-04b4-4cd6-8f0b-3543767cd51f",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2023-01-03T20:11:46.265+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2023-01-03T20:11:46.271+00:00",
          source: "#F03sLYfdmocPYxKx",
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
            },
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/d037b2ef-66d6-4fcc-b228-2bc748ce4d0e",
              display: "CTW Health",
            },
          ],
        },
        extension: [
          {
            url: "https://zusapi.com/fhir/identifier/universal-id",
            valueString: "7bd02b95-a275-485b-8053-2ef190d2d86a",
          },
        ],
        status: "finished",
        class: {
          system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
          code: "UNK",
        },
        type: [
          {
            coding: [
              {
                system: "http://www.ama-assn.org/go/cpt",
                display: "CARLINGSBAD FAMILY MEDICINE",
              },
              {
                system: "urn:oid:2.16.840.1.113883.4.391.142",
                display: "(TEL)",
              },
            ],
            text: "CARLINGSBAD FAMILY MEDICINE",
          },
        ],
        subject: {
          reference: "Patient/6e6ea727-a7ac-47d0-96b8-536e1073826c",
          type: "Patient",
        },
        participant: [
          {
            type: [
              {
                coding: [
                  {
                    system:
                      "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
                    code: "NI",
                    display: "NoInformation",
                  },
                ],
                text: "NoInformation",
              },
            ],
            individual: {
              reference: "Practitioner/26da410b-44d7-49ec-9827-26fc34f8aad7",
              type: "Practitioner",
              display: "Michael Morris, MD",
            },
          },
          {
            individual: {
              reference: "Practitioner/12345",
              type: "Practitioner",
              display: "Jenny Morris, MD",
            },
          },
          {
            individual: {
              reference: "Practitioner/12345",
              type: "Practitioner",
              display: "Rose Donald",
            },
          },
          {
            individual: {
              reference: "Practitioner/12345",
              type: "Practitioner",
              display: "Al Bundy",
            },
          },
        ],
        period: {
          start: "2020-03-14",
        },
        location: [
          {
            location: {
              reference: "Location/02b760b4-f898-4aad-a075-0c2ba1a7d1a9",
              type: "Location",
              display: "CARLINGSBAD FAMILY MEDICINE",
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
