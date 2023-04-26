export const historyGeneralizedAnxietyVersions: fhir4.Bundle = {
  resourceType: "Bundle",
  id: "25534a67-26e5-4ee3-94a8-395e8b073783",
  type: "batch-response",
  link: [
    {
      relation: "self",
      url: "https://api.sandbox.zusapi.com/fhir",
    },
  ],
  entry: [
    {
      resource: {
        resourceType: "Bundle",
        id: "520bd81d-accf-4848-9bc7-7d7093ee9fb7",
        meta: {
          lastUpdated: "2023-03-27T17:11:33.183+00:00",
        },
        type: "history",
        link: [
          {
            relation: "self",
            url: "https://api.sandbox.zusapi.com/fhir/Condition/139c822e-4f95-48c9-9fd1-a49cd3345690/_history",
          },
        ],
        entry: [
          {
            fullUrl:
              "https://api.sandbox.zusapi.com/fhir/Condition/139c822e-4f95-48c9-9fd1-a49cd3345690",
            resource: {
              resourceType: "Condition",
              id: "7000a33a-808f-4c94-8125-1af140ce6fbe",
              meta: {
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment/sha256sum",
                    valueBase64Binary: "EfW5IV9s3tyQH8Tk2cAdlN2MKJ9L+uqWOVoRF3He7Y4=",
                  },
                  {
                    url: "https://zusapi.com/created-at",
                    valueInstant: "2023-03-27T17:10:12.506+00:00",
                  },
                ],
                versionId: "6",
                lastUpdated: "2023-03-27T17:11:19.505+00:00",
                source: "#b78f5610b5415808",
                tag: [
                  {
                    system: "https://zusapi.com/accesscontrol/owner",
                    code: "builder/e520e115-d8e0-4405-9051-507fe31453f4",
                    display: "Wesley Health",
                  },
                ],
              },
              extension: [
                {
                  url: "https://zusapi.com/fhir/identifier/universal-id",
                  valueString: "48544457-8015-4dcb-aab8-9dfeb4e993a3",
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
                      code: "problem-list-item",
                      display: "Problem List Item",
                    },
                  ],
                },
              ],
              code: {
                coding: [
                  {
                    system: "http://snomed.info/sct",
                    code: "21897009",
                    display: "Generalized anxiety disorder",
                  },
                  {
                    extension: [
                      {
                        url: "https://zusapi.com/terminology/enrichment",
                        valueString: "CCS",
                      },
                    ],
                    system: "https://www.hcup-us.ahrq.gov/toolssoftware/ccsr/dxccsr.jsp",
                    code: "MBD005",
                    display: "Anxiety and fear-related disorders",
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
                    code: "21897009",
                    display: "Generalized anxiety disorder",
                    userSelected: false,
                  },
                  {
                    extension: [
                      {
                        url: "https://zusapi.com/terminology/enrichment",
                        valueString: "Unknown ICD10",
                      },
                    ],
                    system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
                    code: "UNK",
                    display: "unknown",
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
                text: "Generalized anxiety disorder",
              },
              subject: {
                reference: "Patient/a98208ef-c28e-42c1-9122-35de27677d6c",
                type: "Patient",
              },
              onsetDateTime: "2023-03-20",
              recordedDate: "2023-03-27",
              recorder: {
                display: "Carlos Mendoza",
              },
              note: [
                {
                  text: "Captured onset date from talking with the patient.\n\nStill working through a strategy with the patient to address their anxiety.",
                },
              ],
            },
            response: {
              status: "200 OK",
              etag: 'W/"6"',
            },
          },
          {
            fullUrl:
              "https://api.sandbox.zusapi.com/fhir/Condition/139c822e-4f95-48c9-9fd1-a49cd3345690",
            resource: {
              resourceType: "Condition",
              id: "7000a33a-808f-4c94-8125-1af140ce6fbe",
              meta: {
                extension: [
                  {
                    url: "https://zusapi.com/created-at",
                    valueInstant: "2023-03-27T17:10:12.506+00:00",
                  },
                ],
                versionId: "5",
                lastUpdated: "2023-03-27T17:11:19.430+00:00",
                source: "#uDQE6FKMFy6SG89Q",
                tag: [
                  {
                    system: "https://zusapi.com/accesscontrol/owner",
                    code: "builder/e520e115-d8e0-4405-9051-507fe31453f4",
                    display: "Wesley Health",
                  },
                ],
              },
              extension: [
                {
                  url: "https://zusapi.com/fhir/identifier/universal-id",
                  valueString: "48544457-8015-4dcb-aab8-9dfeb4e993a3",
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
                      code: "problem-list-item",
                      display: "Problem List Item",
                    },
                  ],
                },
              ],
              code: {
                coding: [
                  {
                    system: "http://snomed.info/sct",
                    code: "21897009",
                    display: "Generalized anxiety disorder",
                  },
                  {
                    extension: [
                      {
                        url: "https://zusapi.com/terminology/enrichment",
                        valueString: "CCS",
                      },
                    ],
                    system: "https://www.hcup-us.ahrq.gov/toolssoftware/ccsr/dxccsr.jsp",
                    code: "MBD005",
                    display: "Anxiety and fear-related disorders",
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
                    code: "21897009",
                    display: "Generalized anxiety disorder",
                    userSelected: false,
                  },
                  {
                    extension: [
                      {
                        url: "https://zusapi.com/terminology/enrichment",
                        valueString: "Unknown ICD10",
                      },
                    ],
                    system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
                    code: "UNK",
                    display: "unknown",
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
                text: "Generalized anxiety disorder",
              },
              subject: {
                reference: "Patient/a98208ef-c28e-42c1-9122-35de27677d6c",
                type: "Patient",
              },
              onsetDateTime: "2023-03-20",
              recordedDate: "2023-03-27",
              recorder: {
                display: "Carlos Mendoza",
              },
              note: [
                {
                  text: "Captured onset date from talking with the patient.",
                },
              ],
            },
            response: {
              status: "200 OK",
              etag: 'W/"5"',
            },
          },
        ],
      },
      response: {
        status: "200 OK",
      },
    },
  ],
};
