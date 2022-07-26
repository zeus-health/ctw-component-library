export const medicationDispense = {
  resourceType: "Bundle",
  id: "3890b281",
  type: "searchset",
  total: 7,
  entry: [
    {
      resource: {
        resourceType: "MedicationDispense",
        id: "d88a5a54-8a45-4027-ab9e-233e80fc8899",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/terminology/enrichment/sha256sum",
              valueBase64Binary: "epixaZTVHuAeIf6niYDrfVV4pQV5q/HeQz2uHgQq/zo=",
            },
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-08T15:03:16.698+00:00",
            },
          ],
          versionId: "2",
          lastUpdated: "2022-11-08T15:03:16.794+00:00",
          source: "#a8afcb8e41fcf85f",
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
        status: "completed",
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
        performer: [
          {
            actor: {
              reference: "Organization/c40671c0-e0e6-4dcd-beb2-0188e1d6ee1c",
              type: "Organization",
              display: "Longs Drug Stores California LLC",
            },
          },
        ],
        daysSupply: {
          value: 90,
        },
        whenPrepared: "2022-11-07",
        whenHandedOver: "2022-11-07",
        dosageInstruction: [
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
        resourceType: "MedicationDispense",
        id: "6b16e363",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/terminology/enrichment/sha256sum",
              valueBase64Binary: "epixaZTVHuAeIf6niYDrfVV4pQV5q/HeQz2uHgQq/zo=",
            },
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-08T15:03:16.924+00:00",
            },
          ],
          versionId: "2",
          lastUpdated: "2022-11-08T15:03:17.023+00:00",
          source: "#a688dc760a69ef96",
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
        status: "completed",
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
        performer: [
          {
            actor: {
              reference: "Organization/c40671c0-e0e6-4dcd-beb2-0188e1d6ee1c",
              type: "Organization",
              display: "Longs Drug Stores California LLC",
            },
          },
        ],
        daysSupply: {
          value: 90,
        },
        whenPrepared: "2021-08-01",
        whenHandedOver: "2021-08-01",
        dosageInstruction: [
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
        resourceType: "MedicationDispense",
        id: "fa20f4e2",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/terminology/enrichment/sha256sum",
              valueBase64Binary: "epixaZTVHuAeIf6niYDrfVV4pQV5q/HeQz2uHgQq/zo=",
            },
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-08T15:03:16.095+00:00",
            },
          ],
          versionId: "2",
          lastUpdated: "2022-11-08T15:03:16.186+00:00",
          source: "#fb7fffbb372d7019",
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
        status: "completed",
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
        performer: [
          {
            actor: {
              reference: "Organization/c40671c0-e0e6-4dcd-beb2-0188e1d6ee1c",
              type: "Organization",
              display: "Longs Drug Stores California LLC",
            },
          },
        ],
        daysSupply: {
          value: 90,
        },
        whenPrepared: "2021-11-01",
        whenHandedOver: "2021-11-01",
        dosageInstruction: [
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
        resourceType: "MedicationDispense",
        id: "99b5e53c",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/terminology/enrichment/sha256sum",
              valueBase64Binary: "epixaZTVHuAeIf6niYDrfVV4pQV5q/HeQz2uHgQq/zo=",
            },
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-08T15:03:16.302+00:00",
            },
          ],
          versionId: "2",
          lastUpdated: "2022-11-08T15:03:16.362+00:00",
          source: "#32f8e25a6a55c5fe",
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
        status: "completed",
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
        performer: [
          {
            actor: {
              reference: "Organization/c40671c0-e0e6-4dcd-beb2-0188e1d6ee1c",
              type: "Organization",
              display: "Longs Drug Stores California LLC",
            },
          },
        ],
        daysSupply: {
          value: 90,
        },
        whenPrepared: "2022-03-26",
        whenHandedOver: "2022-03-26",
        dosageInstruction: [
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
        resourceType: "MedicationDispense",
        id: "4c19932e",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/terminology/enrichment/sha256sum",
              valueBase64Binary: "epixaZTVHuAeIf6niYDrfVV4pQV5q/HeQz2uHgQq/zo=",
            },
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-08T15:03:16.489+00:00",
            },
          ],
          versionId: "2",
          lastUpdated: "2022-11-08T15:03:16.575+00:00",
          source: "#4f8e7042439c27dd",
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
        status: "completed",
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
        performer: [
          {
            actor: {
              reference: "Organization/c40671c0-e0e6-4dcd-beb2-0188e1d6ee1c",
              type: "Organization",
              display: "Longs Drug Stores California LLC",
            },
          },
        ],
        daysSupply: {
          value: 90,
        },
        whenPrepared: "2022-07-05",
        whenHandedOver: "2022-07-05",
        dosageInstruction: [
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
    {
      resource: {
        resourceType: "Organization",
        id: "c40671c0",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-08T15:02:12.472+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2022-11-08T15:02:12.528+00:00",
          source: "#tOneu1PaqCCk4CMB",
          tag: [
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/12345",
              display: "Storybook Medical - Test Customer",
            },
          ],
        },
        name: "Longs Drug Stores California LLC",
        telecom: [
          {
            system: "phone",
            value: "702-255-2554",
          },
        ],
        address: [
          {
            line: ["9430 DEL WEBB BLVD"],
            city: "LAS VEGAS",
            state: "NV",
            postalCode: "89134-8314",
          },
        ],
      },
      search: {
        mode: "include",
      },
    },
  ],
};
