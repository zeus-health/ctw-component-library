export const otherProviderMedications = {
  resourceType: "Bundle",
  id: "37c381e4-2beb-4d39-92a3-94756b35973b",
  meta: {
    lastUpdated: "2022-11-15T18:29:24.646+00:00",
  },
  type: "searchset",
  total: 5,
  entry: [
    {
      resource: {
        resourceType: "MedicationStatement",
        id: "edf55906-1563-42d3-80b0-aa1aa00f9db9",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-08T15:03:18.926+00:00",
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
              code: "f5ba64c5-4f66-45cf-b07d-84ed828138e0",
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
                    "MedicationDispense/342204fe-cc99-412e-a38a-a931770b7c96",
                  type: "MedicationDispense",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference:
                    "MedicationRequest/0d5cbdee-a7b3-4058-9f7c-87b3bde95057",
                  type: "MedicationRequest",
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
              reference: "Practitioner/6c7f3ad6-6849-4dd8-9cd6-6c16865cfdd8",
              type: "Practitioner",
              display: "Sally McCann",
            },
          },
          {
            url: "https://zusapi.com/fhir/identifier/universal-id",
            valueString: "f5ba64c5-4f66-45cf-b07d-84ed828138e0",
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
        id: "8dc0812d-9e32-408a-895e-9c44cbbaa9a5",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-08T15:03:18.926+00:00",
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
              code: "f5ba64c5-4f66-45cf-b07d-84ed828138e0",
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
                    "MedicationDispense/d88a5a54-8a45-4027-ab9e-233e80fc8899",
                  type: "MedicationDispense",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference:
                    "MedicationDispense/4c19932e-500f-4738-8600-54dec77f343d",
                  type: "MedicationDispense",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference:
                    "MedicationDispense/99b5e53c-81b7-4aae-ab20-fe0b7ad7ce55",
                  type: "MedicationDispense",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference:
                    "MedicationDispense/fa20f4e2-8a10-4555-952c-07d622fdcb50",
                  type: "MedicationDispense",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference:
                    "MedicationDispense/6b16e363-662e-401f-9f3f-5323f81f2149",
                  type: "MedicationDispense",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference:
                    "MedicationRequest/6a16eba4-7d86-4e4a-8005-34367553ca05",
                  type: "MedicationRequest",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference:
                    "MedicationStatement/0e1e097b-eed6-4c1f-b508-314f2fd8ee96",
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
              reference: "Practitioner/6c7f3ad6-6849-4dd8-9cd6-6c16865cfdd8",
              type: "Practitioner",
              display: "Sally McCann",
            },
          },
          {
            url: "https://zusapi.com/fhir/identifier/universal-id",
            valueString: "f5ba64c5-4f66-45cf-b07d-84ed828138e0",
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
        id: "9e5c1cc1-7f0e-4472-8e23-4f7a2c9ce752",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-08T15:03:18.926+00:00",
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
              code: "f5ba64c5-4f66-45cf-b07d-84ed828138e0",
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
                    "MedicationDispense/b49d65f2-4d06-48c4-86a2-f32769e6c9c9",
                  type: "MedicationDispense",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference:
                    "MedicationDispense/3c9510d6-60b5-4724-9902-b012117b7bd1",
                  type: "MedicationDispense",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference:
                    "MedicationDispense/a5e0bb03-5d17-4ce9-8b4c-8261293c671b",
                  type: "MedicationDispense",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference:
                    "MedicationRequest/80c007a1-5dc3-48f4-a079-20bc613ad998",
                  type: "MedicationRequest",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference:
                    "MedicationDispense/23da3f2b-02f7-4f9f-bbac-c18873dfdaf4",
                  type: "MedicationDispense",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference:
                    "MedicationDispense/0d2d94f0-5e7a-4a03-a638-b059d5d0290f",
                  type: "MedicationDispense",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference:
                    "MedicationStatement/24f5be85-39a5-43fc-a0a0-e8f465ee4d15",
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
              reference: "Practitioner/6c7f3ad6-6849-4dd8-9cd6-6c16865cfdd8",
              type: "Practitioner",
              display: "Sally McCann",
            },
          },
          {
            url: "https://zusapi.com/fhir/identifier/universal-id",
            valueString: "f5ba64c5-4f66-45cf-b07d-84ed828138e0",
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
        id: "aac783c9-fe72-462d-ac2f-0df59fb7f812",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-08T15:03:18.926+00:00",
            },
          ],
          versionId: "2",
          lastUpdated: "2022-11-08T15:03:31.174+00:00",
          source: "#b9875aae99734b0c",
          tag: [
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
              code: "f5ba64c5-4f66-45cf-b07d-84ed828138e0",
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
                    "MedicationDispense/2e4ae1a5-a595-4e74-9c66-020c1bb60529",
                  type: "MedicationDispense",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference:
                    "MedicationDispense/ffb42ad4-978f-448c-8b63-ee331e76c746",
                  type: "MedicationDispense",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference:
                    "MedicationRequest/1d0361d7-a244-4108-ae36-b9dd08991b2d",
                  type: "MedicationRequest",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference:
                    "MedicationRequest/aff7a8c1-3bdd-4572-af82-533a1cd0b1c0",
                  type: "MedicationRequest",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference:
                    "MedicationStatement/48bead9a-e271-4e9f-ad0e-ac081d5b9cf9",
                  type: "MedicationStatement",
                },
              },
            ],
          },
          {
            url: "https://zusapi.com/lens/extension/medicationLastFillDate",
            valueDateTime: "2022-04-02",
          },
          {
            url: "https://zusapi.com/lens/extension/medicationLastPrescribedDate",
            valueDateTime: "2021-08-01",
          },
          {
            url: "https://zusapi.com/lens/extension/medicationQuantity",
            valueQuantity: {
              value: 15,
              unit: "g",
            },
          },
          {
            url: "https://zusapi.com/lens/extension/medicationDaysSupply",
            valueString: "NO-VALUE",
          },
          {
            url: "https://zusapi.com/lens/extension/medicationRefills",
            valueUnsignedInt: 4,
          },
          {
            url: "https://zusapi.com/lens/extension/medicationLastPrescriber",
            valueReference: {
              reference: "Practitioner/6c7f3ad6-6849-4dd8-9cd6-6c16865cfdd8",
              type: "Practitioner",
              display: "Sally McCann",
            },
          },
          {
            url: "https://zusapi.com/fhir/identifier/universal-id",
            valueString: "f5ba64c5-4f66-45cf-b07d-84ed828138e0",
          },
        ],
        status: "active",
        medicationCodeableConcept: {
          coding: [
            {
              system: "http://www.nlm.nih.gov/research/umls/rxnorm",
              code: "1085736",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "ActiveIngredient",
                },
              ],
              system: "http://www.nlm.nih.gov/research/umls/rxnorm",
              code: "10761",
              display: "triamcinolone acetonide",
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
              code: "202877",
              display: "Kenalog",
              userSelected: false,
            },
          ],
          text: "triamcinolone acetonide 0.147 MG/ML Topical Spray",
        },
        subject: {
          reference: "Patient/007",
          type: "Patient",
        },
        dateAsserted: "2022-04-05",
        dosage: [
          {
            text: "Apply to affected area as needed for eczema exacerbation.",
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
        id: "3c596782-025f-41b7-88a0-6fc3de9fce90",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-08T18:47:34.525+00:00",
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
              code: "f5ba64c5-4f66-45cf-b07d-84ed828138e0",
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
                    "MedicationStatement/8eabc1f1-7cc9-4c12-9ca0-145ef2e076ba",
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
            valueString: "f5ba64c5-4f66-45cf-b07d-84ed828138e0",
          },
        ],
        status: "active",
        medicationCodeableConcept: {
          coding: [
            {
              system: "http://www.nlm.nih.gov/research/umls/rxnorm",
              code: "1190220",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "ActiveIngredient",
                },
              ],
              system: "http://www.nlm.nih.gov/research/umls/rxnorm",
              code: "142153",
              display: "albuterol sulfate",
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
              code: "151539",
              display: "Combivent",
              userSelected: false,
            },
          ],
          text: "albuterol/ipratropium bromide 20/100 MCG/INHAL Metered Dose Inhalation Spray, 120 Actuations",
        },
        subject: {
          reference: "Patient/007",
          type: "Patient",
        },
        dosage: [
          {
            text: "Take 2 puffs as needed.",
          },
        ],
      },
      search: {
        mode: "match",
      },
    },
  ],
};
