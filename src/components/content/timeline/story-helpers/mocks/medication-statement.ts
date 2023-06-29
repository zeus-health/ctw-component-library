export const medicationStatement = {
  resourceType: "Bundle",
  id: "f4da1f39-7638-45e4-999b-9ff33d7c5201",
  meta: {
    lastUpdated: "2022-11-15T19:37:55.783+00:00",
  },
  type: "searchset",
  total: 1,
  entry: [
    {
      resource: {
        resourceType: "MedicationStatement",
        id: "0cbb026a-0535-47a1-bbbc-956fcde07dc9",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2023-03-14T02:04:12.070+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2023-03-14T02:04:12.313+00:00",
          source: "#b6a5f8c980f9ac84",
          tag: [
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/b123",
              display: "Storybook Health",
            },
            {
              system: "https://zusapi.com/lens",
              code: "ActiveMedications",
            },
            {
              system: "https://zusapi.com/summary",
              code: "Common",
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
                  reference: "MedicationDispense/612df454-aea8-4ad7-87c4-fd35ee7ce1e3",
                  type: "MedicationDispense",
                },
              },
              {
                url: "https://zusapi.com/lens/extension/aggregatedFrom",
                valueReference: {
                  reference: "MedicationRequest/104f6928-da8a-4c0c-b4eb-abeb9e4195f0",
                  type: "MedicationRequest",
                },
              },
            ],
          },
          {
            url: "https://zusapi.com/lens/extension/medicationLastFillDate",
            valueDateTime: "2023-02-21",
          },
          {
            url: "https://zusapi.com/lens/extension/medicationLastPrescribedDate",
            valueDateTime: "2023-02-21",
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
              reference: "Practitioner/2eb2b8c3-29a3-4d7f-8feb-b8234aa70701",
              type: "Practitioner",
              display: "Phyllis Reeves",
            },
          },
          {
            url: "https://zusapi.com/fhir/identifier/universal-id",
            valueString: "35bf3353-165a-454f-94f4-011227a12e18",
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
              display: "polyethylene glycol 3350 17000 MG Powder for Oral Solution [Miralax]",
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
              display: "polyethylene glycol 3350 17000 MG Powder for Oral Solution",
              userSelected: false,
            },
          ],
          text: "Miralax Oral Product",
        },
        subject: {
          reference: "Patient/a9da7271-99da-42ca-8654-8bea1b2983ca",
          type: "Patient",
        },
        dateAsserted: "2023-02-21",
        dosage: [
          {
            text: "Dissolve 17g in 4–8oz liquid and drink once daily for up to 7 days.",
          },
        ],
      },
    },
  ],
};