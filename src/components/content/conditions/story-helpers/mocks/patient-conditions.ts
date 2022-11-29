// Contains the following:
//  1. Active Generalized anxiety disorder which matches
//     condition in other and therefor it is filtered out.
//  2. Active PTSD, in the same category as the above to test sorting.
//  3. Inactive Crohn's disease which is recorded earlier
//     than the one in other and therefor it is NOT filtered out.
export const patientConditions: fhir4.Bundle = {
  resourceType: "Bundle",
  id: "f958f3e3-e585-4845-b666-6bf1a6914087",
  meta: {
    lastUpdated: "2022-11-15T19:37:56.623+00:00",
  },
  type: "searchset",
  total: 3,
  entry: [
    {
      resource: {
        resourceType: "Condition",
        id: "faf183db-2623-44f5-943d-2318afbb51a7",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-10T19:38:15.035+00:00",
            },
          ],
          versionId: "2",
          lastUpdated: "2022-11-10T19:38:36.663+00:00",
          source: "#7cb535fd22ce30df",
          tag: [
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/b123",
              display: "Storybook Medical - Test Customer",
            },
            {
              system: "https://zusapi.com/lens/upid",
              code: "u12345",
            },
          ],
        },
        extension: [
          {
            url: "https://zusapi.com/fhir/identifier/universal-id",
            valueString: "u12345",
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
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "21897009",
              display: "Generalized anxiety disorder",
            },
            {
              system: "http://hl7.org/fhir/sid/icd-10-cm",
              code: "F41.1",
              display: "Generalized anxiety disorder",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "ICD10",
                },
              ],
              system: "http://hl7.org/fhir/sid/icd-10-cm",
              code: "F41.1",
              display: "Generalized anxiety disorder",
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
                  valueString: "Unknown HCC",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
        },
        subject: {
          reference: "Patient/1",
          type: "Patient",
        },
        onsetPeriod: {
          start: "2022-09-17",
        },
        recordedDate: "2022-09-18",
      },
      search: {
        mode: "match",
      },
    },
    {
      resource: {
        resourceType: "Condition",
        id: "faf183db-2623-44f5-943d-2318afbb51a6",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-10T19:38:15.035+00:00",
            },
          ],
          versionId: "2",
          lastUpdated: "2022-11-10T19:38:36.663+00:00",
          source: "#7cb535fd22ce30df",
          tag: [
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/b123",
              display: "Storybook Medical - Test Customer",
            },
            {
              system: "https://zusapi.com/lens/upid",
              code: "u12345",
            },
          ],
        },
        extension: [
          {
            url: "https://zusapi.com/fhir/identifier/universal-id",
            valueString: "u12345",
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
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "47505003",
              display: "Posttraumatic stress disorder",
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
              code: "47505003",
              display: "Posttraumatic stress disorder",
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
        },
        subject: {
          reference: "Patient/1",
          type: "Patient",
        },
        onsetPeriod: {
          start: "2022-09-17",
        },
        recordedDate: "2022-09-18",
      },
      search: {
        mode: "match",
      },
    },
    {
      resource: {
        resourceType: "Condition",
        id: "48023ec1-b7e1-4a38-8dbd-69b71dd17c4c",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-10T19:38:36.519+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2022-11-10T19:38:36.621+00:00",
          source: "#7cb535fd22ce30df",
          tag: [
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/b123",
              display: "Storybook Medical - Test Customer",
            },
            {
              system: "https://zusapi.com/lens/upid",
              code: "u12345",
            },
          ],
        },
        extension: [
          {
            url: "https://zusapi.com/fhir/identifier/universal-id",
            valueString: "u12345",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "inactive",
            },
          ],
        },
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
        },
        subject: {
          reference: "Patient/1",
          type: "Patient",
        },
        onsetPeriod: {
          start: "2021-08-16",
        },
        recordedDate: "2021-08-16",
      },
      search: {
        mode: "match",
      },
    },
  ],
};
