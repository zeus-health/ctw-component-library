export default {
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
