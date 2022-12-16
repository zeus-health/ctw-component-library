export const otherProviderMedications: fhir4.Bundle = {
  resourceType: "Bundle",
  id: "7c7a1c16",
  type: "searchset",
  total: 5,
  entry: [
    {
      resource: {
        resourceType: "MedicationStatement",
        id: "84c35b67",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-21T18:21:52.653+00:00",
            },
          ],
          versionId: "2",
          lastUpdated: "2022-11-08T15:03:31.124+00:00",
          source: "#b9875aae99734b0c",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ActiveMedications",
            },
            {
              system: "https://zusapi.com/summary",
              code: "Common",
            },
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/12345",
              display: "Storybook Medical - Test Customer",
            },
            {
              system: "https://zusapi.com/lens/upid",
              code: "57ddcfa9-6df8-4d00-a86d-c63c0faad93f",
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
                  reference:
                    "MedicationAdministration/d7571c17-1e36-4c38-8149-e30ee3b18481",
                  type: "MedicationAdministration",
                },
              },
            ],
          },
          {
            url: "https://zusapi.com/lens/extension/medicationLastFillDate",
            valueString: "NO-VALUE",
          },
          {
            url: "https://zusapi.com/lens/extension/medicationLastPrescribedDate",
            valueString: "NO-VALUE",
          },
          {
            url: "https://zusapi.com/lens/extension/medicationQuantity",
            valueQuantity: {
              value: 100,
              unit: "ml",
            },
          },
          {
            url: "https://zusapi.com/lens/extension/medicationDaysSupply",
            valueString: "NO-VALUE",
          },
          {
            url: "https://zusapi.com/lens/extension/medicationRefills",
            valueString: "NO-VALUE",
          },
          {
            url: "https://zusapi.com/lens/extension/medicationLastPrescriber",
            valueString: "NO-VALUE",
          },
          {
            url: "https://zusapi.com/fhir/identifier/universal-id",
            valueString: "57ddcfa9-6df8-4d00-a86d-c63c0faad93f",
          },
        ],
        status: "active",
        medicationCodeableConcept: {
          coding: [
            {
              system: "http://www.nlm.nih.gov/research/umls/rxnorm",
              code: "2179744",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "ActiveIngredient",
                },
              ],
              system: "http://www.nlm.nih.gov/research/umls/rxnorm",
              code: "253182",
              display: "insulin, regular, human",
              userSelected: false,
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "BrandName",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
          text: "regular insulin, human 100 UNT in 100 ML Injection",
        },
        subject: {
          reference: "Patient/007",
          type: "Patient",
        },
        dateAsserted: "2022-06-11T03:15:00+00:00",
        dosage: [
          {
            route: {
              text: "Intramuscular",
            },
            doseAndRate: [
              {
                doseQuantity: {
                  value: 100,
                  unit: "ml",
                },
              },
            ],
          },
        ],
      },
      search: {
        mode: "match",
      },
    },
    {
      resource: {
        resourceType: "MedicationStatement",
        id: "6f7a2c5e",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-21T18:22:55.266+00:00",
            },
          ],
          versionId: "2",
          lastUpdated: "2022-11-08T15:03:31.148+00:00",
          source: "#b9875aae99734b0c",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ActiveMedications",
            },
            {
              system: "https://zusapi.com/summary",
              code: "Common",
            },
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/12345",
              display: "Storybook Medical - Test Customer",
            },
            {
              system: "https://zusapi.com/lens/upid",
              code: "57ddcfa9-6df8-4d00-a86d-c63c0faad93f",
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
                  reference:
                    "MedicationDispense/8952694e-c4ef-4432-ada6-6aeb2e193b88",
                  type: "MedicationDispense",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference:
                    "MedicationDispense/0beb9677-f9b4-451d-9552-66652741ae58",
                  type: "MedicationDispense",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference:
                    "MedicationDispense/503b8b45-c132-4ad2-8d2b-69e6d0e192d9",
                  type: "MedicationDispense",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference:
                    "MedicationRequest/dbfa6885-b087-4fda-a9d6-f494dfe51e0a",
                  type: "MedicationRequest",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference:
                    "MedicationDispense/6ec0dc8c-8f96-44ad-800d-e4efce371314",
                  type: "MedicationDispense",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference:
                    "MedicationDispense/57d85687-4a53-4fb1-aa13-ef802fc741c0",
                  type: "MedicationDispense",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference:
                    "MedicationStatement/c3644cd7-676e-4d9d-9248-1479d70f5527",
                  type: "MedicationStatement",
                },
              },
            ],
          },
          {
            url: "https://zusapi.com/lens/extension/medicationLastFillDate",
            valueDateTime: "2022-11-07",
          },
          {
            url: "https://zusapi.com/lens/extension/medicationLastPrescribedDate",
            valueDateTime: "2021-08-01",
          },
          {
            url: "https://zusapi.com/lens/extension/medicationQuantity",
            valueQuantity: {
              value: 90,
              unit: "days",
            },
          },
          {
            url: "https://zusapi.com/lens/extension/medicationDaysSupply",
            valueQuantity: {
              value: 90,
            },
          },
          {
            url: "https://zusapi.com/lens/extension/medicationRefills",
            valueUnsignedInt: 4,
          },
          {
            url: "https://zusapi.com/lens/extension/medicationLastPrescriber",
            valueReference: {
              reference: "Practitioner/a8b57218-3699-4354-bf39-b73175ba85e0",
              type: "Practitioner",
              display: "Sally McCann",
            },
          },
          {
            url: "https://zusapi.com/fhir/identifier/universal-id",
            valueString: "57ddcfa9-6df8-4d00-a86d-c63c0faad93f",
          },
        ],
        status: "active",
        medicationCodeableConcept: {
          coding: [
            {
              system: "http://www.nlm.nih.gov/research/umls/rxnorm",
              code: "977840",
            },
            {
              system: "http://hl7.org/fhir/sid/ndc",
              code: "54569663100",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "ActiveIngredient",
                },
              ],
              system: "http://www.nlm.nih.gov/research/umls/rxnorm",
              code: "51428",
              display: "insulin aspart, human",
              userSelected: false,
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "BrandName",
                },
              ],
              system: "http://www.nlm.nih.gov/research/umls/rxnorm",
              code: "1372741",
              display: "NovoLog Mix",
              userSelected: false,
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "ClinicalDrug_TTY_SCD",
                },
              ],
              system: "http://www.nlm.nih.gov/research/umls/rxnorm",
              code: "847191",
              display:
                "3 ML insulin aspart protamine, human 70 UNT/ML / insulin aspart, human 30 UNT/ML Pen Injector",
              userSelected: false,
            },
          ],
          text: "3 ML insulin aspart protamine, human 70 UNT/ML / insulin aspart, human 30 UNT/ML Pen Injector [NovoLog Mix]",
        },
        subject: {
          reference: "Patient/007",
          type: "Patient",
        },
        dateAsserted: "2022-11-07",
        dosage: [
          {
            text: "Inject 3 ML before meals. Quantity: 90 days",
          },
        ],
      },
      search: {
        mode: "match",
      },
    },
    {
      resource: {
        resourceType: "MedicationStatement",
        id: "c2610752",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-21T18:22:55.266+00:00",
            },
          ],
          versionId: "2",
          lastUpdated: "2022-11-08T15:03:31.098+00:00",
          source: "#b9875aae99734b0c",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ActiveMedications",
            },
            {
              system: "https://zusapi.com/summary",
              code: "Common",
            },
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/12345",
              display: "Storybook Medical - Test Customer",
            },
            {
              system: "https://zusapi.com/lens/upid",
              code: "57ddcfa9-6df8-4d00-a86d-c63c0faad93f",
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
                  reference:
                    "MedicationDispense/d03627d0-31cc-48b7-b435-21767d0bb7cc",
                  type: "MedicationDispense",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference:
                    "MedicationDispense/f991a969-8848-4493-b794-3dfadd047f6c",
                  type: "MedicationDispense",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference:
                    "MedicationDispense/e89f2f5f-3429-4288-9e84-2b9db45473eb",
                  type: "MedicationDispense",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference:
                    "MedicationDispense/c82e7f47-7ee7-4b53-b901-21e068fd7b59",
                  type: "MedicationDispense",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference:
                    "MedicationRequest/902e3223-b7c1-449c-a716-59e5687b4af6",
                  type: "MedicationRequest",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference:
                    "MedicationDispense/6837bd08-5ba3-4ce7-82d7-abf3676d75b5",
                  type: "MedicationDispense",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference:
                    "MedicationStatement/146fe496-2343-4a5d-9814-730e8ef3fdb4",
                  type: "MedicationStatement",
                },
              },
            ],
          },
          {
            url: "https://zusapi.com/lens/extension/medicationLastFillDate",
            valueDateTime: "2022-11-07",
          },
          {
            url: "https://zusapi.com/lens/extension/medicationLastPrescribedDate",
            valueDateTime: "2021-08-01",
          },
          {
            url: "https://zusapi.com/lens/extension/medicationQuantity",
            valueQuantity: {
              value: 90,
              unit: "days",
            },
          },
          {
            url: "https://zusapi.com/lens/extension/medicationDaysSupply",
            valueQuantity: {
              value: 90,
            },
          },
          {
            url: "https://zusapi.com/lens/extension/medicationRefills",
            valueUnsignedInt: 4,
          },
          {
            url: "https://zusapi.com/lens/extension/medicationLastPrescriber",
            valueReference: {
              reference: "Practitioner/a8b57218-3699-4354-bf39-b73175ba85e0",
              type: "Practitioner",
              display: "Sally McCann",
            },
          },
          {
            url: "https://zusapi.com/fhir/identifier/universal-id",
            valueString: "57ddcfa9-6df8-4d00-a86d-c63c0faad93f",
          },
        ],
        status: "active",
        medicationCodeableConcept: {
          coding: [
            {
              system: "http://www.nlm.nih.gov/research/umls/rxnorm",
              code: "847232",
            },
            {
              system: "http://hl7.org/fhir/sid/ndc",
              code: "00088502000",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "ActiveIngredient",
                },
              ],
              system: "http://www.nlm.nih.gov/research/umls/rxnorm",
              code: "274783",
              display: "insulin glargine",
              userSelected: false,
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "BrandName",
                },
              ],
              system: "http://www.nlm.nih.gov/research/umls/rxnorm",
              code: "261551",
              display: "Lantus",
              userSelected: false,
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "ClinicalDrug_TTY_SCD",
                },
              ],
              system: "http://www.nlm.nih.gov/research/umls/rxnorm",
              code: "847230",
              display: "3 ML insulin glargine 100 UNT/ML Pen Injector",
              userSelected: false,
            },
          ],
          text: "3 ML insulin glargine 100 UNT/ML Pen Injector [Lantus]",
        },
        subject: {
          reference: "Patient/007",
          type: "Patient",
        },
        dateAsserted: "2022-11-07",
        dosage: [
          {
            text: "Inject 3 ML with enclosed pen injector every morning. ",
          },
        ],
      },
      search: {
        mode: "match",
      },
    },
    {
      resource: {
        resourceType: "MedicationStatement",
        id: "219fe7ae",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-21T18:22:55.266+00:00",
            },
          ],
          versionId: "2",
          lastUpdated: "2022-11-08T15:03:31.174+00:00",
          source: "#b9875aae99734b0c",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ActiveMedications",
            },
            {
              system: "https://zusapi.com/summary",
              code: "Common",
            },
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/12345",
              display: "Storybook Medical - Test Customer",
            },
            {
              system: "https://zusapi.com/lens/upid",
              code: "57ddcfa9-6df8-4d00-a86d-c63c0faad93f",
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
                  reference:
                    "MedicationRequest/d2102ea3-e515-45be-a611-eac1daf4d345",
                  type: "MedicationRequest",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference:
                    "MedicationDispense/8110cb8c-927e-49aa-9513-cb559d9875cc",
                  type: "MedicationDispense",
                },
              },
            ],
          },
          {
            url: "https://zusapi.com/lens/extension/medicationLastFillDate",
            valueDateTime: "2022-09-20",
          },
          {
            url: "https://zusapi.com/lens/extension/medicationLastPrescribedDate",
            valueDateTime: "2022-09-20",
          },
          {
            url: "https://zusapi.com/lens/extension/medicationQuantity",
            valueQuantity: {
              value: 14,
              unit: "days",
            },
          },
          {
            url: "https://zusapi.com/lens/extension/medicationDaysSupply",
            valueQuantity: {
              value: 14,
            },
          },
          {
            url: "https://zusapi.com/lens/extension/medicationRefills",
            valueUnsignedInt: 0,
          },
          {
            url: "https://zusapi.com/lens/extension/medicationLastPrescriber",
            valueReference: {
              reference: "Practitioner/a8b57218-3699-4354-bf39-b73175ba85e0",
              type: "Practitioner",
              display: "Sally McCann",
            },
          },
          {
            url: "https://zusapi.com/fhir/identifier/universal-id",
            valueString: "57ddcfa9-6df8-4d00-a86d-c63c0faad93f",
          },
        ],
        status: "active",
        medicationCodeableConcept: {
          coding: [
            {
              system: "http://www.nlm.nih.gov/research/umls/rxnorm",
              code: "1180459",
            },
            {
              system: "http://hl7.org/fhir/sid/ndc",
              code: "55887023697",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "Standardization",
                },
              ],
              system: "http://www.nlm.nih.gov/research/umls/rxnorm",
              code: "876195",
              display:
                "polyethylene glycol 3350 17000 MG Powder for Oral Solution [Miralax]",
              userSelected: false,
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "ActiveIngredient",
                },
              ],
              system: "http://www.nlm.nih.gov/research/umls/rxnorm",
              code: "221147",
              display: "polyethylene glycol 3350",
              userSelected: false,
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "BrandName",
                },
              ],
              system: "http://www.nlm.nih.gov/research/umls/rxnorm",
              code: "261575",
              display: "Miralax",
              userSelected: false,
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "ClinicalDrug_TTY_SCD",
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
                  valueString: "ClinicalDrug_TTY_SCD",
                },
              ],
              system: "http://www.nlm.nih.gov/research/umls/rxnorm",
              code: "876193",
              display:
                "polyethylene glycol 3350 17000 MG Powder for Oral Solution",
              userSelected: false,
            },
          ],
          text: "Miralax Oral Product",
        },
        subject: {
          reference: "Patient/007",
          type: "Patient",
        },
        dateAsserted: "2022-09-20",
        dosage: [
          {
            text: "Dissolve 17g in 4–8oz liquid and drink once daily for up to 7 days.",
          },
        ],
      },
      search: {
        mode: "match",
      },
    },
    {
      resource: {
        resourceType: "MedicationStatement",
        id: "0851de14",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-21T19:52:58.330+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2022-11-08T18:47:34.568+00:00",
          source: "#5685aa4fa060a7f4",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ActiveMedications",
            },
            {
              system: "https://zusapi.com/summary",
              code: "Common",
            },
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/12345",
              display: "Storybook Medical - Test Customer",
            },
            {
              system: "https://zusapi.com/lens/upid",
              code: "57ddcfa9-6df8-4d00-a86d-c63c0faad93f",
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
                  reference:
                    "MedicationStatement/e23c0023-d7ad-4834-9adb-a71e54ccbcd2",
                  type: "MedicationStatement",
                },
              },
            ],
          },
          {
            url: "https://zusapi.com/lens/extension/medicationLastFillDate",
            valueString: "NO-VALUE",
          },
          {
            url: "https://zusapi.com/lens/extension/medicationLastPrescribedDate",
            valueString: "NO-VALUE",
          },
          {
            url: "https://zusapi.com/lens/extension/medicationQuantity",
            valueString: "NO-VALUE",
          },
          {
            url: "https://zusapi.com/lens/extension/medicationDaysSupply",
            valueString: "NO-VALUE",
          },
          {
            url: "https://zusapi.com/lens/extension/medicationRefills",
            valueString: "NO-VALUE",
          },
          {
            url: "https://zusapi.com/lens/extension/medicationLastPrescriber",
            valueString: "NO-VALUE",
          },
          {
            url: "https://zusapi.com/fhir/identifier/universal-id",
            valueString: "57ddcfa9-6df8-4d00-a86d-c63c0faad93f",
          },
        ],
        status: "active",
        medicationCodeableConcept: {
          coding: [
            {
              system: "http://www.nlm.nih.gov/research/umls/rxnorm",
              code: "895994",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "ActiveIngredient",
                },
              ],
              system: "http://www.nlm.nih.gov/research/umls/rxnorm",
              code: "50121",
              display: "fluticasone propionate",
              userSelected: false,
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "BrandName",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
          text: "120 ACTUAT fluticasone propionate 0.044 MG/ACTUAT Metered Dose Inhaler",
        },
        subject: {
          reference: "Patient/007",
          type: "Patient",
        },
        dosage: [
          {
            text: "2 puffs daily",
          },
        ],
      },
      search: {
        mode: "match",
      },
    },
  ],
};
