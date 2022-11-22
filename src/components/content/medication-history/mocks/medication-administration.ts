export const medicationAdministration = {
  resourceType: "Bundle",
  id: "e23143d2",
  type: "searchset",
  total: 3,
  entry: [
    {
      resource: {
        resourceType: "MedicationAdministration",
        id: "d7571c17-1e36-4c38-8149-e30ee3b18481",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/terminology/enrichment/sha256sum",
              valueBase64Binary: "QpOAfH5cGwbtNc6rbx+7OW2gBaNqUpZjKFW5H10aaDQ=",
            },
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-21T18:21:42.877+00:00",
            },
          ],
          versionId: "2",
          lastUpdated: "2022-11-21T18:21:43.037+00:00",
          source: "#5b771d76a2028e1c",
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
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
            valueString: "57ddcfa9-6df8-4d00-a86d-c63c0faad93f",
          },
        ],
        status: "completed",
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
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "ClinicalDrug_TTY_SCD",
                },
              ],
              system: "http://www.nlm.nih.gov/research/umls/rxnorm",
              code: "2179744",
              display: "100 ML insulin, regular, human 1 UNT/ML Injection",
              userSelected: false,
            },
          ],
        },
        subject: {
          reference: "Patient/976954a4-2fb6-43cf-a360-1a6383d259c7",
          type: "Patient",
        },
        effectivePeriod: {
          start: "2022-06-11T03:15:00+00:00",
          end: "2022-06-11T03:15:00+00:00",
        },
        dosage: {
          route: {
            text: "Intramuscular",
          },
          dose: {
            value: 100,
            unit: "ml",
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
        id: "976954a4-2fb6-43cf-a360-1a6383d259c7",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-21T18:21:42.532+00:00",
            },
          ],
          versionId: "2",
          lastUpdated: "2022-11-21T18:21:42.735+00:00",
          source: "#68bb7ed53a5b0f5d",
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
              code: "builder/12345",
              display: "Storybook Medical - Test Customer",
            },
          ],
        },
        identifier: [
          {
            system: "https://zusapi.com/fhir/identifier/universal-id",
            value: "57ddcfa9-6df8-4d00-a86d-c63c0faad93f",
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
            value: "555-951-2842",
            use: "home",
          },
          {
            system: "phone",
            value: "555-861-6875",
            use: "mobile",
          },
        ],
        gender: "male",
        birthDate: "2007-12-13",
        address: [
          {
            line: ["121 SHADOW LN"],
            city: "LAS VEGAS",
            state: "NV",
            postalCode: "89106-4119",
          },
        ],
        managingOrganization: {
          reference: "Organization/af0276b9-9a91-4a34-871e-6ac2115fae17",
        },
      },
      search: {
        mode: "include",
      },
    },
    {
      resource: {
        resourceType: "Organization",
        id: "af0276b9-9a91-4a34-871e-6ac2115fae17",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-21T18:21:37.320+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2022-11-21T18:21:37.321+00:00",
          source: "#XgOPpWgfRvpfdykH",
          tag: [
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/12345",
              display: "Storybook Medical - Test Customer",
            },
          ],
        },
        name: "Endo Health",
      },
      search: {
        mode: "include",
      },
    },
  ],
};
