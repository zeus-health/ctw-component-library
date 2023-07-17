export const diagnosticReportFQS = {
  DiagnosticReportConnection: {
    pageInfo: {
      hasNextPage: false,
    },
    edges: [
      {
        node: {
          id: "ef4bcb1c-41ad-4cf2-8780-ece12c4aa0b5",
          resourceType: "DiagnosticReport",
          meta: {
            extension: [
              {
                url: "https://zusapi.com/terminology/enrichment/sha256sum",
                valueInstant: null,
              },
              {
                url: "https://zusapi.com/created-at",
                valueInstant: "2023-06-06T17:16:46.880+00:00",
              },
            ],
          },
          extension: [
            {
              url: "https://zusapi.com/fhir/identifier/universal-id",
              valueString: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
            },
          ],
          basedOn: null,
          status: "final",
          category: null,
          code: {
            text: "Lipid Panel",
            coding: [
              {
                code: "24331-1",
                display: null,
                system: "http://loinc.org",
                extension: null,
              },
              {
                code: "24331-1",
                display: "Lipid 1996 panel - Serum or Plasma",
                system: "http://loinc.org",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "LOINC Standardization",
                  },
                ],
              },
              {
                code: null,
                display: "Lipid 1996 panel",
                system: "http://loinc.org",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "LOINC Component",
                  },
                ],
              },
              {
                code: null,
                display: "PANEL.CHEM",
                system: "http://loinc.org",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "LOINC Class",
                  },
                ],
              },
              {
                code: null,
                display: "Ser/Plas",
                system: "http://loinc.org",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "LOINC System",
                  },
                ],
              },
              {
                code: null,
                display: null,
                system: "http://loinc.org",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "LOINC Method Type",
                  },
                ],
              },
              {
                code: null,
                display: "Pt",
                system: "http://loinc.org",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "LOINC Time Aspect",
                  },
                ],
              },
              {
                code: "LP29693-6",
                display: "Laboratory",
                system: "http://loinc.org",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "LOINC Category",
                  },
                ],
              },
            ],
          },
          subject: {
            reference: "Patient/07d73a97-3e85-4e4c-9576-7c50c2160caa",
            resource: {
              id: "07d73a97-3e85-4e4c-9576-7c50c2160caa",
              resourceType: "Patient",
              extension: null,
              active: null,
              identifier: [
                {
                  use: null,
                  system: "https://zusapi.com/fhir/identifier/universal-id",
                  value: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
                },
              ],
              contact: null,
              birthDate: "1978-07-31",
              gender: "male",
              maritalStatus: null,
              telecom: [
                {
                  use: null,
                  value: "brunozhang@example.com",
                  system: "email",
                },
                {
                  use: "home",
                  value: "555-928-0469",
                  system: "phone",
                },
                {
                  use: "mobile",
                  value: "555-568-6025",
                  system: "phone",
                },
                {
                  use: "work",
                  value: "555-470-5935",
                  system: "phone",
                },
              ],
              address: [
                {
                  city: "LAS VEGAS",
                  country: null,
                  district: null,
                  line: ["109 SHADOW LN"],
                  period: null,
                  postalCode: "89106-4119",
                  state: "NV",
                  text: null,
                  type: null,
                  use: null,
                },
              ],
              name: [
                {
                  family: "Zhang",
                  given: ["Bruno"],
                  prefix: null,
                  suffix: null,
                  text: null,
                  use: null,
                },
              ],
            },
          },
          effectiveDateTime: "2021-04-08",
          effectivePeriod: null,
          issued: null,
          conclusion: null,
          performer: null,
          result: [
            {
              reference: "Observation/164dfe59-b05b-4367-a7af-a206cc115b55",
              display: null,
              resource: {
                id: "164dfe59-b05b-4367-a7af-a206cc115b55",
                resourceType: "Observation",
                extension: [
                  {
                    url: "https://zusapi.com/fhir/identifier/universal-id",
                    valueString: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
                  },
                ],
                status: "final",
                category: null,
                effectivePeriod: null,
                effectiveDateTime: "2021-04-08",
                referenceRange: [
                  {
                    text: "\u003c or =2.34",
                  },
                ],
                code: {
                  text: "LDL/HDL RATIO",
                  coding: [
                    {
                      code: "16616-5",
                      display: null,
                      system: "http://loinc.org",
                      extension: null,
                    },
                    {
                      code: "16616-5",
                      display:
                        "Cholesterol in HDL/Cholesterol in LDL [Mass Ratio] in Serum or Plasma",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Standardization",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Cholesterol.in HDL/Cholesterol.in LDL",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Component",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "CHEM",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Class",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Ser/Plas",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC System",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: null,
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Method Type",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Pt",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Time Aspect",
                        },
                      ],
                    },
                    {
                      code: "LP29693-6",
                      display: "Laboratory",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Category",
                        },
                      ],
                    },
                  ],
                },
                valueQuantity: {
                  unit: "mg/dL",
                  value: 2.1310344826,
                  system: null,
                  code: null,
                },
                valueCodeableConcept: null,
                valueString: null,
                valueBoolean: null,
                valueInteger: null,
                valueRange: null,
                valueRatio: null,
                valueTime: null,
                valueDateTime: null,
                valuePeriod: null,
                interpretation: null,
              },
            },
            {
              reference: "Observation/37854f07-08df-4c75-b238-78b9e2cd4f77",
              display: null,
              resource: {
                id: "37854f07-08df-4c75-b238-78b9e2cd4f77",
                resourceType: "Observation",
                extension: [
                  {
                    url: "https://zusapi.com/fhir/identifier/universal-id",
                    valueString: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
                  },
                ],
                status: "final",
                category: null,
                effectivePeriod: null,
                effectiveDateTime: "2021-04-08",
                referenceRange: [
                  {
                    text: "\u003c or =150",
                  },
                ],
                code: {
                  text: "TRIGLYCERIDES",
                  coding: [
                    {
                      code: "2571-8",
                      display: null,
                      system: "http://loinc.org",
                      extension: null,
                    },
                    {
                      code: "2571-8",
                      display: "Triglyceride [Mass/volume] in Serum or Plasma",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Standardization",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Triglyceride",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Component",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "CHEM",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Class",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Ser/Plas",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC System",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: null,
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Method Type",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Pt",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Time Aspect",
                        },
                      ],
                    },
                    {
                      code: "LP29693-6",
                      display: "Laboratory",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Category",
                        },
                      ],
                    },
                  ],
                },
                valueQuantity: {
                  unit: "mg/dL",
                  value: 117,
                  system: null,
                  code: null,
                },
                valueCodeableConcept: null,
                valueString: null,
                valueBoolean: null,
                valueInteger: null,
                valueRange: null,
                valueRatio: null,
                valueTime: null,
                valueDateTime: null,
                valuePeriod: null,
                interpretation: null,
              },
            },
            {
              reference: "Observation/c5d01afa-8007-4595-bc0e-ec2fd4e08257",
              display: null,
              resource: {
                id: "c5d01afa-8007-4595-bc0e-ec2fd4e08257",
                resourceType: "Observation",
                extension: [
                  {
                    url: "https://zusapi.com/fhir/identifier/universal-id",
                    valueString: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
                  },
                ],
                status: "final",
                category: null,
                effectivePeriod: null,
                effectiveDateTime: "2021-04-08",
                referenceRange: [
                  {
                    text: "\u003c or =200",
                  },
                ],
                code: {
                  text: "CHOLESTEROL",
                  coding: [
                    {
                      code: "2093-3",
                      display: null,
                      system: "http://loinc.org",
                      extension: null,
                    },
                    {
                      code: "2093-3",
                      display: "Cholesterol [Mass/volume] in Serum or Plasma",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Standardization",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Cholesterol",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Component",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "CHEM",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Class",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Ser/Plas",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC System",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: null,
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Method Type",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Pt",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Time Aspect",
                        },
                      ],
                    },
                    {
                      code: "LP29693-6",
                      display: "Laboratory",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Category",
                        },
                      ],
                    },
                  ],
                },
                valueQuantity: {
                  unit: "mg/dL",
                  value: 205,
                  system: null,
                  code: null,
                },
                valueCodeableConcept: null,
                valueString: null,
                valueBoolean: null,
                valueInteger: null,
                valueRange: null,
                valueRatio: null,
                valueTime: null,
                valueDateTime: null,
                valuePeriod: null,
                interpretation: null,
              },
            },
            {
              reference: "Observation/b3686591-b445-4b93-8b71-f66ecaea3f3e",
              display: null,
              resource: {
                id: "b3686591-b445-4b93-8b71-f66ecaea3f3e",
                resourceType: "Observation",
                extension: [
                  {
                    url: "https://zusapi.com/fhir/identifier/universal-id",
                    valueString: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
                  },
                ],
                status: "final",
                category: null,
                effectivePeriod: null,
                effectiveDateTime: "2021-04-08",
                referenceRange: [
                  {
                    text: "0-130.00",
                  },
                ],
                code: {
                  text: "LDL CALCULATION",
                  coding: [
                    {
                      code: "13457-7",
                      display: null,
                      system: "http://loinc.org",
                      extension: null,
                    },
                    {
                      code: "13457-7",
                      display: "Cholesterol in LDL [Mass/volume] in Serum or Plasma by calculation",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Standardization",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Cholesterol.in LDL",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Component",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "CHEM",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Class",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Ser/Plas",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC System",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Calculated",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Method Type",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Pt",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Time Aspect",
                        },
                      ],
                    },
                    {
                      code: "LP29693-6",
                      display: "Laboratory",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Category",
                        },
                      ],
                    },
                  ],
                },
                valueQuantity: {
                  unit: "mg/dL",
                  value: 123.6,
                  system: null,
                  code: null,
                },
                valueCodeableConcept: null,
                valueString: null,
                valueBoolean: null,
                valueInteger: null,
                valueRange: null,
                valueRatio: null,
                valueTime: null,
                valueDateTime: null,
                valuePeriod: null,
                interpretation: null,
              },
            },
            {
              reference: "Observation/6fbb7022-69d7-46c1-ac7b-41214913e95f",
              display: null,
              resource: {
                id: "6fbb7022-69d7-46c1-ac7b-41214913e95f",
                resourceType: "Observation",
                extension: [
                  {
                    url: "https://zusapi.com/fhir/identifier/universal-id",
                    valueString: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
                  },
                ],
                status: "final",
                category: null,
                effectivePeriod: null,
                effectiveDateTime: "2021-04-08",
                referenceRange: [
                  {
                    text: "\u003e or =46",
                  },
                ],
                code: {
                  text: "HDL CHOLESTEROL",
                  coding: [
                    {
                      code: "2085-9",
                      display: null,
                      system: "http://loinc.org",
                      extension: null,
                    },
                    {
                      code: "2085-9",
                      display: "Cholesterol in HDL [Mass/volume] in Serum or Plasma",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Standardization",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Cholesterol.in HDL",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Component",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "CHEM",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Class",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Ser/Plas",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC System",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: null,
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Method Type",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Pt",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Time Aspect",
                        },
                      ],
                    },
                    {
                      code: "LP29693-6",
                      display: "Laboratory",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Category",
                        },
                      ],
                    },
                  ],
                },
                valueQuantity: {
                  unit: "mg/dL",
                  value: 58,
                  system: null,
                  code: null,
                },
                valueCodeableConcept: null,
                valueString: null,
                valueBoolean: null,
                valueInteger: null,
                valueRange: null,
                valueRatio: null,
                valueTime: null,
                valueDateTime: null,
                valuePeriod: null,
                interpretation: [
                  {
                    text: null,
                    coding: [
                      {
                        code: "H",
                        display: "High",
                        system: "urn:oid:2.16.840.1.113883.5.83",
                        extension: null,
                      },
                    ],
                  },
                ],
              },
            },
            {
              reference: "Observation/fa0373ed-e7ec-465b-a1d3-3a1f39722c73",
              display: null,
              resource: {
                id: "fa0373ed-e7ec-465b-a1d3-3a1f39722c73",
                resourceType: "Observation",
                extension: [
                  {
                    url: "https://zusapi.com/fhir/identifier/universal-id",
                    valueString: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
                  },
                ],
                status: "final",
                category: null,
                effectivePeriod: null,
                effectiveDateTime: "2021-04-08",
                referenceRange: [
                  {
                    text: "0.00-7.00",
                  },
                ],
                code: {
                  text: "CHOL/HDL RATIO",
                  coding: [
                    {
                      code: "9830-1",
                      display: null,
                      system: "http://loinc.org",
                      extension: null,
                    },
                    {
                      code: "9830-1",
                      display:
                        "Cholesterol.total/Cholesterol in HDL [Mass Ratio] in Serum or Plasma",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Standardization",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Cholesterol.total/Cholesterol.in HDL",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Component",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "CHEM",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Class",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Ser/Plas",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC System",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: null,
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Method Type",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Pt",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Time Aspect",
                        },
                      ],
                    },
                    {
                      code: "LP29693-6",
                      display: "Laboratory",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Category",
                        },
                      ],
                    },
                  ],
                },
                valueQuantity: {
                  unit: "mg/dL",
                  value: 3.53,
                  system: null,
                  code: null,
                },
                valueCodeableConcept: null,
                valueString: null,
                valueBoolean: null,
                valueInteger: null,
                valueRange: null,
                valueRatio: null,
                valueTime: null,
                valueDateTime: null,
                valuePeriod: null,
                interpretation: null,
              },
            },
            {
              reference: "Observation/972108d7-8d32-404e-a510-fa4f40cd1a25",
              display: null,
              resource: {
                id: "972108d7-8d32-404e-a510-fa4f40cd1a25",
                resourceType: "Observation",
                extension: [
                  {
                    url: "https://zusapi.com/fhir/identifier/universal-id",
                    valueString: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
                  },
                ],
                status: "final",
                category: null,
                effectivePeriod: null,
                effectiveDateTime: "2021-04-08",
                referenceRange: [
                  {
                    text: "5.0-40.0",
                  },
                ],
                code: {
                  text: "VLDL CALCULATION",
                  coding: [
                    {
                      code: "13458-5",
                      display: null,
                      system: "http://loinc.org",
                      extension: null,
                    },
                    {
                      code: "13458-5",
                      display:
                        "Cholesterol in VLDL [Mass/volume] in Serum or Plasma by calculation",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Standardization",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Cholesterol.in VLDL",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Component",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "CHEM",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Class",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Ser/Plas",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC System",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Calculated",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Method Type",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Pt",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Time Aspect",
                        },
                      ],
                    },
                    {
                      code: "LP29693-6",
                      display: "Laboratory",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Category",
                        },
                      ],
                    },
                  ],
                },
                valueQuantity: {
                  unit: "mg/dL",
                  value: 23.4,
                  system: null,
                  code: null,
                },
                valueCodeableConcept: null,
                valueString: null,
                valueBoolean: null,
                valueInteger: null,
                valueRange: null,
                valueRatio: null,
                valueTime: null,
                valueDateTime: null,
                valuePeriod: null,
                interpretation: null,
              },
            },
          ],
          contained: null,
        },
      },
      {
        node: {
          id: "9415ef9d-9cd7-45c3-91b4-d0c96087b564",
          resourceType: "DiagnosticReport",
          meta: {
            extension: [
              {
                url: "https://zusapi.com/terminology/enrichment/sha256sum",
                valueInstant: null,
              },
              {
                url: "https://zusapi.com/created-at",
                valueInstant: "2023-06-06T17:16:44.392+00:00",
              },
            ],
          },
          extension: [
            {
              url: "https://zusapi.com/fhir/identifier/universal-id",
              valueString: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
            },
          ],
          basedOn: null,
          status: "final",
          category: null,
          code: {
            text: "Lipid Panel",
            coding: [
              {
                code: "24331-1",
                display: null,
                system: "http://loinc.org",
                extension: null,
              },
              {
                code: "24331-1",
                display: "Lipid 1996 panel - Serum or Plasma",
                system: "http://loinc.org",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "LOINC Standardization",
                  },
                ],
              },
              {
                code: null,
                display: "Lipid 1996 panel",
                system: "http://loinc.org",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "LOINC Component",
                  },
                ],
              },
              {
                code: null,
                display: "PANEL.CHEM",
                system: "http://loinc.org",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "LOINC Class",
                  },
                ],
              },
              {
                code: null,
                display: "Ser/Plas",
                system: "http://loinc.org",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "LOINC System",
                  },
                ],
              },
              {
                code: null,
                display: null,
                system: "http://loinc.org",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "LOINC Method Type",
                  },
                ],
              },
              {
                code: null,
                display: "Pt",
                system: "http://loinc.org",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "LOINC Time Aspect",
                  },
                ],
              },
              {
                code: "LP29693-6",
                display: "Laboratory",
                system: "http://loinc.org",
                extension: [
                  {
                    url: "https://zusapi.com/terminology/enrichment",
                    valueString: "LOINC Category",
                  },
                ],
              },
            ],
          },
          subject: {
            reference: "Patient/07d73a97-3e85-4e4c-9576-7c50c2160caa",
            resource: {
              id: "07d73a97-3e85-4e4c-9576-7c50c2160caa",
              resourceType: "Patient",
              extension: null,
              active: null,
              identifier: [
                {
                  use: null,
                  system: "https://zusapi.com/fhir/identifier/universal-id",
                  value: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
                },
              ],
              contact: null,
              birthDate: "1978-07-31",
              gender: "male",
              maritalStatus: null,
              telecom: [
                {
                  use: null,
                  value: "brunozhang@example.com",
                  system: "email",
                },
                {
                  use: "home",
                  value: "555-928-0469",
                  system: "phone",
                },
                {
                  use: "mobile",
                  value: "555-568-6025",
                  system: "phone",
                },
                {
                  use: "work",
                  value: "555-470-5935",
                  system: "phone",
                },
              ],
              address: [
                {
                  city: "LAS VEGAS",
                  country: null,
                  district: null,
                  line: ["109 SHADOW LN"],
                  period: null,
                  postalCode: "89106-4119",
                  state: "NV",
                  text: null,
                  type: null,
                  use: null,
                },
              ],
              name: [
                {
                  family: "Zhang",
                  given: ["Bruno"],
                  prefix: null,
                  suffix: null,
                  text: null,
                  use: null,
                },
              ],
            },
          },
          effectiveDateTime: "2020-10-08",
          effectivePeriod: null,
          issued: null,
          conclusion: null,
          performer: null,
          result: [
            {
              reference: "Observation/5925a978-4192-4fa1-874c-9421596b686f",
              display: null,
              resource: {
                id: "5925a978-4192-4fa1-874c-9421596b686f",
                resourceType: "Observation",
                extension: [
                  {
                    url: "https://zusapi.com/fhir/identifier/universal-id",
                    valueString: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
                  },
                ],
                status: "final",
                category: null,
                effectivePeriod: null,
                effectiveDateTime: "2020-10-08",
                referenceRange: [
                  {
                    text: "\u003c or =2.34",
                  },
                ],
                code: {
                  text: "LDL/HDL RATIO",
                  coding: [
                    {
                      code: "16616-5",
                      display: null,
                      system: "http://loinc.org",
                      extension: null,
                    },
                    {
                      code: "16616-5",
                      display:
                        "Cholesterol in HDL/Cholesterol in LDL [Mass Ratio] in Serum or Plasma",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Standardization",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Cholesterol.in HDL/Cholesterol.in LDL",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Component",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "CHEM",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Class",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Ser/Plas",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC System",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: null,
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Method Type",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Pt",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Time Aspect",
                        },
                      ],
                    },
                    {
                      code: "LP29693-6",
                      display: "Laboratory",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Category",
                        },
                      ],
                    },
                  ],
                },
                valueQuantity: {
                  unit: "mg/dL",
                  value: 1.716363636,
                  system: null,
                  code: null,
                },
                valueCodeableConcept: null,
                valueString: null,
                valueBoolean: null,
                valueInteger: null,
                valueRange: null,
                valueRatio: null,
                valueTime: null,
                valueDateTime: null,
                valuePeriod: null,
                interpretation: null,
              },
            },
            {
              reference: "Observation/255bec15-04bb-4b91-9d78-1c5d882418b4",
              display: null,
              resource: {
                id: "255bec15-04bb-4b91-9d78-1c5d882418b4",
                resourceType: "Observation",
                extension: [
                  {
                    url: "https://zusapi.com/fhir/identifier/universal-id",
                    valueString: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
                  },
                ],
                status: "final",
                category: null,
                effectivePeriod: null,
                effectiveDateTime: "2020-10-08",
                referenceRange: [
                  {
                    text: "\u003c or =150",
                  },
                ],
                code: {
                  text: "TRIGLYCERIDES",
                  coding: [
                    {
                      code: "2571-8",
                      display: null,
                      system: "http://loinc.org",
                      extension: null,
                    },
                    {
                      code: "2571-8",
                      display: "Triglyceride [Mass/volume] in Serum or Plasma",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Standardization",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Triglyceride",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Component",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "CHEM",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Class",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Ser/Plas",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC System",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: null,
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Method Type",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Pt",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Time Aspect",
                        },
                      ],
                    },
                    {
                      code: "LP29693-6",
                      display: "Laboratory",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Category",
                        },
                      ],
                    },
                  ],
                },
                valueQuantity: {
                  unit: "mg/dL",
                  value: 128,
                  system: null,
                  code: null,
                },
                valueCodeableConcept: null,
                valueString: null,
                valueBoolean: null,
                valueInteger: null,
                valueRange: null,
                valueRatio: null,
                valueTime: null,
                valueDateTime: null,
                valuePeriod: null,
                interpretation: null,
              },
            },
            {
              reference: "Observation/2d22aa20-bc33-43f6-a12a-5fd8f15d1be3",
              display: null,
              resource: {
                id: "2d22aa20-bc33-43f6-a12a-5fd8f15d1be3",
                resourceType: "Observation",
                extension: [
                  {
                    url: "https://zusapi.com/fhir/identifier/universal-id",
                    valueString: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
                  },
                ],
                status: "final",
                category: null,
                effectivePeriod: null,
                effectiveDateTime: "2020-10-08",
                referenceRange: [
                  {
                    text: "\u003c or =200",
                  },
                ],
                code: {
                  text: "CHOLESTEROL",
                  coding: [
                    {
                      code: "2093-3",
                      display: null,
                      system: "http://loinc.org",
                      extension: null,
                    },
                    {
                      code: "2093-3",
                      display: "Cholesterol [Mass/volume] in Serum or Plasma",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Standardization",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Cholesterol",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Component",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "CHEM",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Class",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Ser/Plas",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC System",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: null,
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Method Type",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Pt",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Time Aspect",
                        },
                      ],
                    },
                    {
                      code: "LP29693-6",
                      display: "Laboratory",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Category",
                        },
                      ],
                    },
                  ],
                },
                valueQuantity: {
                  unit: "mg/dL",
                  value: 175,
                  system: null,
                  code: null,
                },
                valueCodeableConcept: null,
                valueString: null,
                valueBoolean: null,
                valueInteger: null,
                valueRange: null,
                valueRatio: null,
                valueTime: null,
                valueDateTime: null,
                valuePeriod: null,
                interpretation: [
                  {
                    text: null,
                    coding: [
                      {
                        code: "H",
                        display: "High",
                        system: "urn:oid:2.16.840.1.113883.5.83",
                        extension: null,
                      },
                    ],
                  },
                ],
              },
            },
            {
              reference: "Observation/f7064a8a-695e-49cd-a7c1-6ffc28370a65",
              display: null,
              resource: {
                id: "f7064a8a-695e-49cd-a7c1-6ffc28370a65",
                resourceType: "Observation",
                extension: [
                  {
                    url: "https://zusapi.com/fhir/identifier/universal-id",
                    valueString: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
                  },
                ],
                status: "final",
                category: null,
                effectivePeriod: null,
                effectiveDateTime: "2020-10-08",
                referenceRange: [
                  {
                    text: "0-130.00",
                  },
                ],
                code: {
                  text: "LDL CALCULATION",
                  coding: [
                    {
                      code: "13457-7",
                      display: null,
                      system: "http://loinc.org",
                      extension: null,
                    },
                    {
                      code: "13457-7",
                      display: "Cholesterol in LDL [Mass/volume] in Serum or Plasma by calculation",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Standardization",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Cholesterol.in LDL",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Component",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "CHEM",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Class",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Ser/Plas",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC System",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Calculated",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Method Type",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Pt",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Time Aspect",
                        },
                      ],
                    },
                    {
                      code: "LP29693-6",
                      display: "Laboratory",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Category",
                        },
                      ],
                    },
                  ],
                },
                valueQuantity: {
                  unit: "mg/dL",
                  value: 94.4,
                  system: null,
                  code: null,
                },
                valueCodeableConcept: null,
                valueString: null,
                valueBoolean: null,
                valueInteger: null,
                valueRange: null,
                valueRatio: null,
                valueTime: null,
                valueDateTime: null,
                valuePeriod: null,
                interpretation: null,
              },
            },
            {
              reference: "Observation/655f220d-e06f-4ffe-b850-fb6033aa5222",
              display: null,
              resource: {
                id: "655f220d-e06f-4ffe-b850-fb6033aa5222",
                resourceType: "Observation",
                extension: [
                  {
                    url: "https://zusapi.com/fhir/identifier/universal-id",
                    valueString: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
                  },
                ],
                status: "final",
                category: null,
                effectivePeriod: null,
                effectiveDateTime: "2020-10-08",
                referenceRange: [
                  {
                    text: "\u003e or =46",
                  },
                ],
                code: {
                  text: "HDL CHOLESTEROL",
                  coding: [
                    {
                      code: "2085-9",
                      display: null,
                      system: "http://loinc.org",
                      extension: null,
                    },
                    {
                      code: "2085-9",
                      display: "Cholesterol in HDL [Mass/volume] in Serum or Plasma",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Standardization",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Cholesterol.in HDL",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Component",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "CHEM",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Class",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Ser/Plas",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC System",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: null,
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Method Type",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Pt",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Time Aspect",
                        },
                      ],
                    },
                    {
                      code: "LP29693-6",
                      display: "Laboratory",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Category",
                        },
                      ],
                    },
                  ],
                },
                valueQuantity: {
                  unit: "mg/dL",
                  value: 55,
                  system: null,
                  code: null,
                },
                valueCodeableConcept: null,
                valueString: null,
                valueBoolean: null,
                valueInteger: null,
                valueRange: null,
                valueRatio: null,
                valueTime: null,
                valueDateTime: null,
                valuePeriod: null,
                interpretation: [
                  {
                    text: null,
                    coding: [
                      {
                        code: "H",
                        display: "High",
                        system: "urn:oid:2.16.840.1.113883.5.83",
                        extension: null,
                      },
                    ],
                  },
                ],
              },
            },
            {
              reference: "Observation/73ecf178-e198-4272-86ca-1d15c6694035",
              display: null,
              resource: {
                id: "73ecf178-e198-4272-86ca-1d15c6694035",
                resourceType: "Observation",
                extension: [
                  {
                    url: "https://zusapi.com/fhir/identifier/universal-id",
                    valueString: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
                  },
                ],
                status: "final",
                category: null,
                effectivePeriod: null,
                effectiveDateTime: "2020-10-08",
                referenceRange: [
                  {
                    text: "0.00-7.00",
                  },
                ],
                code: {
                  text: "CHOL/HDL RATIO",
                  coding: [
                    {
                      code: "9830-1",
                      display: null,
                      system: "http://loinc.org",
                      extension: null,
                    },
                    {
                      code: "9830-1",
                      display:
                        "Cholesterol.total/Cholesterol in HDL [Mass Ratio] in Serum or Plasma",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Standardization",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Cholesterol.total/Cholesterol.in HDL",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Component",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "CHEM",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Class",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Ser/Plas",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC System",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: null,
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Method Type",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Pt",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Time Aspect",
                        },
                      ],
                    },
                    {
                      code: "LP29693-6",
                      display: "Laboratory",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Category",
                        },
                      ],
                    },
                  ],
                },
                valueQuantity: {
                  unit: "mg/dL",
                  value: 3.18,
                  system: null,
                  code: null,
                },
                valueCodeableConcept: null,
                valueString: null,
                valueBoolean: null,
                valueInteger: null,
                valueRange: null,
                valueRatio: null,
                valueTime: null,
                valueDateTime: null,
                valuePeriod: null,
                interpretation: null,
              },
            },
            {
              reference: "Observation/1670c568-a951-40db-a621-367019e32a47",
              display: null,
              resource: {
                id: "1670c568-a951-40db-a621-367019e32a47",
                resourceType: "Observation",
                extension: [
                  {
                    url: "https://zusapi.com/fhir/identifier/universal-id",
                    valueString: "eeff12bb-b43d-4e65-aff7-297a4bb2f736",
                  },
                ],
                status: "final",
                category: null,
                effectivePeriod: null,
                effectiveDateTime: "2020-10-08",
                referenceRange: [
                  {
                    text: "5.0-40.0",
                  },
                ],
                code: {
                  text: "VLDL CALCULATION",
                  coding: [
                    {
                      code: "13458-5",
                      display: null,
                      system: "http://loinc.org",
                      extension: null,
                    },
                    {
                      code: "13458-5",
                      display:
                        "Cholesterol in VLDL [Mass/volume] in Serum or Plasma by calculation",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Standardization",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Cholesterol.in VLDL",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Component",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "CHEM",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Class",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Ser/Plas",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC System",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Calculated",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Method Type",
                        },
                      ],
                    },
                    {
                      code: null,
                      display: "Pt",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Time Aspect",
                        },
                      ],
                    },
                    {
                      code: "LP29693-6",
                      display: "Laboratory",
                      system: "http://loinc.org",
                      extension: [
                        {
                          url: "https://zusapi.com/terminology/enrichment",
                          valueString: "LOINC Category",
                        },
                      ],
                    },
                  ],
                },
                valueQuantity: {
                  unit: "mg/dL",
                  value: 25.6,
                  system: null,
                  code: null,
                },
                valueCodeableConcept: null,
                valueString: null,
                valueBoolean: null,
                valueInteger: null,
                valueRange: null,
                valueRatio: null,
                valueTime: null,
                valueDateTime: null,
                valuePeriod: null,
                interpretation: null,
              },
            },
          ],
          contained: null,
        },
      },
    ],
  },
};
