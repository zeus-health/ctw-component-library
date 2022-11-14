export const medicationStatement = {
  resourceType: "Bundle",
  id: "be63733e-16d0-4d60-9c91-431c61b62630",
  meta: {
    lastUpdated: "2022-11-14T19:07:22.958+00:00",
  },
  type: "searchset",
  total: 3,
  link: [
    {
      relation: "self",
      url: "https://api.sandbox.zusapi.com/fhir/MedicationStatement?_count=250&_id=0e1e097b-eed6-4c1f-b508-314f2fd8ee96&_include=MedicationStatement%3Apatient&_include=MedicationStatement%3Amedication&_include%3Aiterate=Patient%3Aorganization",
    },
  ],
  entry: [
    {
      fullUrl:
        "https://api.sandbox.zusapi.com/fhir/MedicationStatement/0e1e097b-eed6-4c1f-b508-314f2fd8ee96",
      resource: {
        resourceType: "MedicationStatement",
        id: "0e1e097b-eed6-4c1f-b508-314f2fd8ee96",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/terminology/enrichment/sha256sum",
              valueBase64Binary: "epixaZTVHuAeIf6niYDrfVV4pQV5q/HeQz2uHgQq/zo=",
            },
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-08T15:03:20.252+00:00",
            },
          ],
          versionId: "2",
          lastUpdated: "2022-11-08T15:03:20.341+00:00",
          source: "#e22fb32b790ccefa",
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
            },
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/009204f2-5e4c-48da-99cc-6d5f6a99282d",
              display: "Canvas Medical - Test Customer",
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
          reference: "Patient/4b92e70f-8476-461b-8980-047e50aa2dab",
          type: "Patient",
        },
        context: {
          reference: "Encounter/1a547d9a-8a31-48e4-a53e-6f9a0e96b25d",
          type: "Encounter",
          display: "Office visit 30 min, Sally McCann",
        },
        dateAsserted: "2022-08-29",
        informationSource: {
          reference: "Practitioner/6c7f3ad6-6849-4dd8-9cd6-6c16865cfdd8",
          type: "Practitioner",
          display: "Sally McCann",
        },
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
      fullUrl:
        "https://api.sandbox.zusapi.com/fhir/Patient/4b92e70f-8476-461b-8980-047e50aa2dab",
      resource: {
        resourceType: "Patient",
        id: "4b92e70f-8476-461b-8980-047e50aa2dab",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-08T15:02:19.434+00:00",
            },
          ],
          versionId: "2",
          lastUpdated: "2022-11-08T15:02:20.204+00:00",
          source: "#7b1503c2b2558700",
          security: [
            {
              system: "http://terminology.hl7.org/CodeSystem/v3-ActReason",
              code: "HTEST",
            },
          ],
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
            },
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/009204f2-5e4c-48da-99cc-6d5f6a99282d",
              display: "Canvas Medical - Test Customer",
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
        managingOrganization: {
          reference: "Organization/93bb6f30-ca25-4ca3-bb22-acae1356d8b5",
        },
      },
      search: {
        mode: "include",
      },
    },
    {
      fullUrl:
        "https://api.sandbox.zusapi.com/fhir/Organization/93bb6f30-ca25-4ca3-bb22-acae1356d8b5",
      resource: {
        resourceType: "Organization",
        id: "93bb6f30-ca25-4ca3-bb22-acae1356d8b5",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-08T15:02:12.231+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2022-11-08T15:02:12.239+00:00",
          source: "#PBAb44ovUWIiO2TB",
          tag: [
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/009204f2-5e4c-48da-99cc-6d5f6a99282d",
              display: "Canvas Medical - Test Customer",
            },
          ],
        },
        name: "Northway Pediatrics",
      },
      search: {
        mode: "include",
      },
    },
  ],
};

export const medicationRequest = {
  resourceType: "Bundle",
  id: "1e2d41d5-ee2c-4535-97d1-1c75222c434a",
  meta: {
    lastUpdated: "2022-11-14T19:07:22.952+00:00",
  },
  type: "searchset",
  total: 2,
  link: [
    {
      relation: "self",
      url: "https://api.sandbox.zusapi.com/fhir/MedicationRequest?_count=250&_id=6a16eba4-7d86-4e4a-8005-34367553ca05&_include=MedicationRequest%3Apatient&_include=MedicationRequest%3Amedication&_include%3Aiterate=Patient%3Aorganization",
    },
  ],
  entry: [
    {
      fullUrl:
        "https://api.sandbox.zusapi.com/fhir/MedicationRequest/6a16eba4-7d86-4e4a-8005-34367553ca05",
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
              code: "builder/009204f2-5e4c-48da-99cc-6d5f6a99282d",
              display: "Canvas Medical - Test Customer",
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
      fullUrl:
        "https://api.sandbox.zusapi.com/fhir/Patient/88a0a417-c046-4dc8-b3dc-f1c1c2d3a1ce",
      resource: {
        resourceType: "Patient",
        id: "88a0a417-c046-4dc8-b3dc-f1c1c2d3a1ce",
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
              code: "builder/009204f2-5e4c-48da-99cc-6d5f6a99282d",
              display: "Canvas Medical - Test Customer",
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

export const medicationDispense = {
  resourceType: "Bundle",
  id: "3890b281-3943-4b3e-95d9-1dbb03317829",
  meta: {
    lastUpdated: "2022-11-14T19:07:22.968+00:00",
  },
  type: "searchset",
  total: 7,
  link: [
    {
      relation: "self",
      url: "https://api.sandbox.zusapi.com/fhir/MedicationDispense?_count=250&_id=d88a5a54-8a45-4027-ab9e-233e80fc8899%2C4c19932e-500f-4738-8600-54dec77f343d%2C99b5e53c-81b7-4aae-ab20-fe0b7ad7ce55%2Cfa20f4e2-8a10-4555-952c-07d622fdcb50%2C6b16e363-662e-401f-9f3f-5323f81f2149&_include=MedicationDispense%3Apatient&_include=MedicationDispense%3Amedication&_include=MedicationDispense%3Aperformer&_include%3Aiterate=Patient%3Aorganization",
    },
  ],
  entry: [
    {
      fullUrl:
        "https://api.sandbox.zusapi.com/fhir/MedicationDispense/d88a5a54-8a45-4027-ab9e-233e80fc8899",
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
              code: "builder/009204f2-5e4c-48da-99cc-6d5f6a99282d",
              display: "Canvas Medical - Test Customer",
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
      fullUrl:
        "https://api.sandbox.zusapi.com/fhir/MedicationDispense/6b16e363-662e-401f-9f3f-5323f81f2149",
      resource: {
        resourceType: "MedicationDispense",
        id: "6b16e363-662e-401f-9f3f-5323f81f2149",
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
              code: "builder/009204f2-5e4c-48da-99cc-6d5f6a99282d",
              display: "Canvas Medical - Test Customer",
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
      fullUrl:
        "https://api.sandbox.zusapi.com/fhir/MedicationDispense/fa20f4e2-8a10-4555-952c-07d622fdcb50",
      resource: {
        resourceType: "MedicationDispense",
        id: "fa20f4e2-8a10-4555-952c-07d622fdcb50",
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
              code: "builder/009204f2-5e4c-48da-99cc-6d5f6a99282d",
              display: "Canvas Medical - Test Customer",
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
      fullUrl:
        "https://api.sandbox.zusapi.com/fhir/MedicationDispense/99b5e53c-81b7-4aae-ab20-fe0b7ad7ce55",
      resource: {
        resourceType: "MedicationDispense",
        id: "99b5e53c-81b7-4aae-ab20-fe0b7ad7ce55",
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
              code: "builder/009204f2-5e4c-48da-99cc-6d5f6a99282d",
              display: "Canvas Medical - Test Customer",
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
      fullUrl:
        "https://api.sandbox.zusapi.com/fhir/MedicationDispense/4c19932e-500f-4738-8600-54dec77f343d",
      resource: {
        resourceType: "MedicationDispense",
        id: "4c19932e-500f-4738-8600-54dec77f343d",
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
              code: "builder/009204f2-5e4c-48da-99cc-6d5f6a99282d",
              display: "Canvas Medical - Test Customer",
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
      fullUrl:
        "https://api.sandbox.zusapi.com/fhir/Patient/88a0a417-c046-4dc8-b3dc-f1c1c2d3a1ce",
      resource: {
        resourceType: "Patient",
        id: "88a0a417-c046-4dc8-b3dc-f1c1c2d3a1ce",
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
              code: "builder/009204f2-5e4c-48da-99cc-6d5f6a99282d",
              display: "Canvas Medical - Test Customer",
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
      fullUrl:
        "https://api.sandbox.zusapi.com/fhir/Organization/c40671c0-e0e6-4dcd-beb2-0188e1d6ee1c",
      resource: {
        resourceType: "Organization",
        id: "c40671c0-e0e6-4dcd-beb2-0188e1d6ee1c",
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
              code: "builder/009204f2-5e4c-48da-99cc-6d5f6a99282d",
              display: "Canvas Medical - Test Customer",
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
