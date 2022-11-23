export const medicationRequest = {
  resourceType: "Bundle",
  id: "1e2d41d5",
  type: "searchset",
  total: 2,
  entry: [
    {
      resource: {
        resourceType: "MedicationRequest",
        id: "6a16eba4-7d86-4e4a-8005-34367553ca05",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/terminology/enrichment/sha256sum",
              valueBase64Binary: "epixaZTVHuAeIf6niYDrfVV4pQV5q/HeQz2uHgQq/zo=",
            },
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-08T15:03:15.075+00:00",
            },
          ],
          versionId: "2",
          lastUpdated: "2022-11-08T15:03:15.346+00:00",
          source: "#72e10f1a346fe95a",
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "surescripts",
            },
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/12345",
              display: "Storybook Medical - Test Customer",
            },
          ],
        },
        extension: [
          {
            url: "https://zusapi.com/fhir/identifier/universal-id",
            valueString: "f5ba64c5-4f66-45cf-b07d-84ed828138e0",
          },
        ],
        status: "active",
        intent: "order",
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
        },
        subject: {
          reference: "Patient/88a0a417-c046-4dc8-b3dc-f1c1c2d3a1ce",
          type: "Patient",
        },
        encounter: {
          reference: "Encounter/cd147f46-3b9a-4f71-b23c-c451b93b4620",
          type: "Encounter",
          display: "Office visit 30 min, Sally McCann",
        },
        authoredOn: "2021-08-01",
        requester: {
          reference: "Practitioner/6c7f3ad6-6849-4dd8-9cd6-6c16865cfdd8",
          type: "Practitioner",
          display: "Sally McCann",
        },
        recorder: {
          reference: "Practitioner/6c7f3ad6-6849-4dd8-9cd6-6c16865cfdd8",
          type: "Practitioner",
          display: "Sally McCann",
        },
        dosageInstruction: [
          {
            text: "Inject 3 ML with enclosed pen injector every morning. ",
          },
        ],
        dispenseRequest: {
          numberOfRepeatsAllowed: 4,
          quantity: {
            value: 90,
            unit: "days",
          },
          performer: {
            reference: "Organization/c40671c0-e0e6-4dcd-beb2-0188e1d6ee1c",
            type: "Organization",
            display: "Longs Drug Stores California LLC",
          },
        },
      },
      search: {
        mode: "match",
      },
    },
    {
      resource: {
        resourceType: "Patient",
        id: "88a0a417",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-08T15:02:24.281+00:00",
            },
          ],
          versionId: "2",
          lastUpdated: "2022-11-08T15:02:24.707+00:00",
          source: "#4173062084810e76",
          security: [
            {
              system: "http://terminology.hl7.org/CodeSystem/v3-ActReason",
              code: "HTEST",
            },
          ],
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "surescripts",
            },
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/12345",
              display: "Storybook Medical - Test Customer",
            },
          ],
        },
        identifier: [
          {
            system: "https://zusapi.com/fhir/identifier/universal-id",
            value: "f5ba64c5-4f66-45cf-b07d-84ed828138e0",
          },
        ],
        name: [
          {
            family: "Shah",
            given: ["Akhil"],
          },
        ],
        telecom: [
          {
            system: "email",
            value: "akhil.shah@example.com",
          },
          {
            system: "phone",
            value: "555-739-0835",
            use: "home",
          },
          {
            system: "phone",
            value: "555-737-8967",
            use: "mobile",
          },
        ],
        gender: "male",
        birthDate: "2010-08-16",
        address: [
          {
            line: ["83 SHADOW LN"],
            city: "LAS VEGAS",
            state: "NV",
            postalCode: "89106-4119",
          },
        ],
      },
      search: {
        mode: "include",
      },
    },
  ],
};
