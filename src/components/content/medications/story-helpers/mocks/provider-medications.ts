export const providerMedications = {
  resourceType: "Bundle",
  id: "0b13191b",
  meta: {
    lastUpdated: "2022-11-22T20:36:24.102+00:00",
  },
  type: "searchset",
  total: 1,
  entry: [
    {
      resource: {
        resourceType: "MedicationStatement",
        id: "e23c0023",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/terminology/enrichment/sha256sum",
              valueBase64Binary: "axdiRTV5h6fWBD79x7QMzrictUmnbS2kic0ua5qY5yY=",
            },
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-21T19:52:51.349+00:00",
            },
          ],
          versionId: "2",
          lastUpdated: "2022-11-21",
          source: "#90f35e548b45cbc4",
          tag: [
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/123456",
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
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString: "ClinicalDrug_TTY_SCD",
                },
              ],
              system: "http://www.nlm.nih.gov/research/umls/rxnorm",
              code: "895994",
              display:
                "120 ACTUAT fluticasone propionate 0.044 MG/ACTUAT Metered Dose Inhaler",
              userSelected: false,
            },
          ],
          text: "120 ACTUAT fluticasone propionate 0.044 MG/ACTUAT Metered Dose Inhaler ",
        },
        subject: {
          reference: "Patient/007",
          type: "Patient",
        },
        dateAsserted: "2022-11-21",
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
