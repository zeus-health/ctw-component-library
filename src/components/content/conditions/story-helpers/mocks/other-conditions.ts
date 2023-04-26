export const otherConditions: fhir4.Bundle = {
  resourceType: "Bundle",
  id: "f958f3e3-e585-4845-b666-6bf1a6914087",
  meta: {
    lastUpdated: "2022-11-15T19:37:56.623+00:00",
  },
  type: "searchset",
  total: 5,
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
          versionId: "3",
          lastUpdated: "2022-11-10T19:38:36.663+00:00",
          source: "#7cb535fd22ce30df",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
            {
              system: "https://zusapi.com/summary",
              code: "Common",
            },
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
            url: "https://zusapi.com/lens/extension/aggregatedFrom",
            extension: [
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference: "Condition/59b72c31-9081-401a-b638-1b38fb096384",
                  type: "Condition",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference: "Condition/5c000258-d368-45a4-8085-c0c43cbac075",
                  type: "Condition",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference: "Condition/7000a33a-808f-4c94-8125-1af140ce6fbe",
                  type: "Condition",
                },
              },
            ],
          },
          {
            url: "https://zusapi.com/fhir/identifier/universal-id",
            valueString: "u12345",
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
              system: "http://www.hcup-us.ahrq.gov/toolssoftware/chronic_icd10/chronic_icd10.jsp",
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
        recordedDate: "2022-09-17",
      },
      search: {
        mode: "match",
      },
    },
    {
      resource: {
        resourceType: "Condition",
        id: "956bce92-91e2-427e-9cbc-93d114bf9956",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-10T19:38:15.035+00:00",
            },
          ],
          versionId: "3",
          lastUpdated: "2022-11-10T19:38:36.696+00:00",
          source: "#7cb535fd22ce30df",
          tag: [
            {
              system: "https://zusapi.com/summary",
              code: "Common",
            },
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
            url: "https://zusapi.com/lens/extension/aggregatedFrom",
            extension: [
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference: "Condition/4806be03-9fb3-439e-b58b-458e1174dd12",
                  type: "Condition",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference: "Condition/8e869e43-4fa1-4145-a84c-95bbb345b368",
                  type: "Condition",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference: "Condition/4d2c7c7b-451a-408e-9dc7-c750ad1191bd",
                  type: "Condition",
                },
              },
            ],
          },
          {
            url: "https://zusapi.com/fhir/identifier/universal-id",
            valueString: "u12345",
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
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "5935008",
              display: "Long term (current) use of hormonal contraceptives",
            },
            {
              system: "http://hl7.org/fhir/sid/icd-10-cm",
              code: "Z79.3",
              display: "Long term (current) use of hormonal contraceptives",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "ICD10",
                },
              ],
              system: "http://hl7.org/fhir/sid/icd-10-cm",
              code: "Z79.3",
              display: "Long term (current) use of hormonal contraceptives",
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
              code: "FAC025",
              display: "Other specified status",
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
              code: "N",
              display:
                "Not applicable (code cannot be used to identify a chronic or acute condition)",
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
              code: "5935008",
              display: "Oral contraception",
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
        recordedDate: "2022-09-17",
      },
      search: {
        mode: "match",
      },
    },
    {
      resource: {
        resourceType: "Condition",
        id: "4e6183c8-2cb3-405d-841d-04e51a7855c2",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-10T19:38:15.035+00:00",
            },
          ],
          versionId: "3",
          lastUpdated: "2022-11-10T19:38:36.552+00:00",
          source: "#7cb535fd22ce30df",
          tag: [
            {
              system: "https://zusapi.com/summary",
              code: "Common",
            },
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
            url: "https://zusapi.com/lens/extension/aggregatedFrom",
            extension: [
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference: "Condition/e6757977-9148-4b84-aff6-8b59d7f57c2f",
                  type: "Condition",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference: "Condition/b4c7ec40-7f0f-4533-b572-1535e18e0c75",
                  type: "Condition",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference: "Condition/377d1f4e-f57f-469f-9eee-4e2f90140ff6",
                  type: "Condition",
                },
              },
            ],
          },
          {
            url: "https://zusapi.com/fhir/identifier/universal-id",
            valueString: "u12345",
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
        },
        subject: {
          reference: "Patient/1",
          type: "Patient",
        },
        onsetPeriod: {
          start: "2022-09-17",
        },
        recordedDate: "2022-09-17",
      },
      search: {
        mode: "match",
      },
    },
    {
      resource: {
        resourceType: "Condition",
        id: "a3c42a03-278a-45e8-ac25-1516a4692685",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-10T19:38:25.554+00:00",
            },
          ],
          versionId: "2",
          lastUpdated: "2022-11-10T19:38:36.588+00:00",
          source: "#7cb535fd22ce30df",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
            {
              system: "https://zusapi.com/summary",
              code: "Common",
            },
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
            url: "https://zusapi.com/lens/extension/aggregatedFrom",
            extension: [
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference: "Condition/9855293c-c517-4bb7-af79-d5a70e348822",
                  type: "Condition",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference: "Condition/83babf40-277d-4704-8580-455a17b2eb5a",
                  type: "Condition",
                },
              },
            ],
          },
          {
            url: "https://zusapi.com/fhir/identifier/universal-id",
            valueString: "u12345",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "inactive",
            },
          ],
        },
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "4979002",
              display: "Other atopic dermatitis",
            },
            {
              system: "http://hl7.org/fhir/sid/icd-10-cm",
              code: "L20.89",
              display: "Other atopic dermatitis",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "ICD10",
                },
              ],
              system: "http://hl7.org/fhir/sid/icd-10-cm",
              code: "L20.89",
              display: "Other atopic dermatitis",
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
              code: "SKN002",
              display: "Other specified inflammatory condition of skin",
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
              code: "4979002",
              display: "Dermatitis",
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
        recordedDate: "2022-09-17",
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
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
            {
              system: "https://zusapi.com/summary",
              code: "Common",
            },
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
            url: "https://zusapi.com/lens/extension/aggregatedFrom",
            extension: [
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference: "Condition/e2184fb8-5e90-4502-9dd0-2f772b42c734",
                  type: "Condition",
                },
              },
            ],
          },
          {
            url: "https://zusapi.com/fhir/identifier/universal-id",
            valueString: "u12345",
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
              system: "https://www.hcup-us.ahrq.gov/toolssoftware/ccsr/dxccsr.jsp",
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
              system: "http://www.hcup-us.ahrq.gov/toolssoftware/chronic_icd10/chronic_icd10.jsp",
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
          start: "2022-09-17",
        },
        recordedDate: "2022-09-17",
      },
      search: {
        mode: "match",
      },
    },
  ],
};
