import {
  FAKE_UNIVERSAL_ID_EXTENSION,
  LENS_BUILDER_TAG,
} from "@/components/content/story-helpers/ids";

export const diagnosticReport = {
  resourceType: "Bundle",
  id: "diagnostic-report-bundle-1",
  meta: {
    lastUpdated: "2023-05-26T16:45:35.693Z",
  },
  type: "searchset",
  link: [
    {
      relation: "self",
      url: "https://api.sandbox.zusapi.com/fhir/DiagnosticReport?_count=250&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Flens%2FActiveMedications%2Chttps%3A%2F%2Fzusapi.com%2Flens%2FChronicConditions%2Chttps%3A%2F%2Fzusapi.com%2Fsummary%2FCommon%2Chttps%3A%2F%2Fzusapi.com%2Ffhir%252Ftag%252Fupi-record-type%257Cuniversal&patient.identifier=https%3A%2F%2Fzusapi.com%2Ffhir%2Fidentifier%2Funiversal-id%7Cu12345",
    },
    {
      relation: "next",
      url: "https://api.sandbox.zusapi.com/fhir/DiagnosticReport?_count=250&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Flens%2FActiveMedications%2Chttps%3A%2F%2Fzusapi.com%2Flens%2FChronicConditions%2Chttps%3A%2F%2Fzusapi.com%2Fsummary%2FCommon%2Chttps%3A%2F%2Fzusapi.com%2Ffhir%252Ftag%252Fupi-record-type%257Cuniversal&patient.identifier=https%3A%2F%2Fzusapi.com%2Ffhir%2Fidentifier%2Funiversal-id%7Cu12345&_offset=250",
    },
  ],
  entry: [
    {
      search: {
        mode: "match",
      },
      fullUrl:
        "https://api.storybook.zusapi.com/fhir/DiagnosticReport/ef84fe14-1c17-4291-b9bf-2e847fda73c8",
      id: "64dca6c7-197d-4093-aa24-b2e91179e392",
      resource: {
        id: "8d118eaa-27fe-43aa-b441-2415e7b36bcc",
        resourceType: "DiagnosticReport",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/data-acquisition/extension/id",
              valueString: "cc6bf4d3-8146-4212-aafd-c1100a5dff57",
            },
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2023-04-22T16:43:20.552Z",
            },
          ],
          versionId: "1",
          lastUpdated: "2023-04-22T16:43:20.552Z",
          source: "#TDSZOXJOFHZHBCGE",
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
            },
            LENS_BUILDER_TAG,
          ],
        },
        extension: [FAKE_UNIVERSAL_ID_EXTENSION],
        identifier: [
          {
            use: "usual",
            system: "urn:oid:3.19.777.2.811837.5.0984.5.8.4069.0.8.34",
            value: "L17165719_CHEM20",
          },
        ],
        status: "preliminary",
        code: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "NI",
            },
          ],
        },
        subject: {
          reference: "Patient/e67862f3-ccbf-4c51-b8ed-ed1d0420ea19",
          type: "Patient",
          display: "Janie Williamson",
        },
        effectivePeriod: {
          start: "2023-04-22T16:43:20.552Z",
          end: "2023-04-22T16:43:20.552Z",
        },
      },
    },
    {
      search: {
        mode: "match",
      },
      fullUrl:
        "https://api.storybook.zusapi.com/fhir/DiagnosticReport/19a46270-4cc7-4084-89bc-890b6044f058",
      id: "f3007d02-902a-4bd2-8de3-b503ac878dc2",
      resource: {
        id: "b7fc7f8a-029c-4e10-80d7-8975ee080d49",
        resourceType: "DiagnosticReport",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/data-acquisition/extension/id",
              valueString: "8080594b-37ca-4577-ac39-f6f2c607ff64",
            },
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2023-05-25T18:09:29.327Z",
            },
          ],
          versionId: "1",
          lastUpdated: "2023-05-25T18:09:29.327Z",
          source: "#KEBFHFNBGJFHXXCU",
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
            },
            LENS_BUILDER_TAG,
          ],
        },
        extension: [FAKE_UNIVERSAL_ID_EXTENSION],
        identifier: [
          {
            use: "usual",
            system: "urn:oid:0.17.881.0.745801.9.0868.1.3.7209.8.8.40",
            value: "L17165719_CHEM20",
          },
        ],
        status: "final",
        code: {
          coding: [
            {
              display: "COMPREHENSIVE METABOLIC PANEL",
            },
          ],
          text: "COMPREHENSIVE METABOLIC PANEL",
        },
        subject: {
          reference: "Patient/e67862f3-ccbf-4c51-b8ed-ed1d0420ea19",
          type: "Patient",
          display: "Janie Williamson",
        },
        effectivePeriod: {
          start: "2023-05-25T18:09:29.327Z",
          end: "2023-05-25T18:09:29.327Z",
        },
        result: [
          {
            display: "4.4 g/dL",
            reference: "Observation/3b452acd-600c-49fa-b447-c31177e14e41",
            type: "Observation",
          },
          {
            display: "109 U/L",
            reference: "Observation/2801ae3e-4479-4099-92f9-4b3186fb7680",
            type: "Observation",
          },
          {
            display: "25 U/L",
            reference: "Observation/c80a28cf-09ee-4827-aec6-682ae559cab2",
            type: "Observation",
          },
          {
            display: "25 U/L",
            reference: "Observation/eb9ac55c-45ec-46ef-8a79-11cf1759f663",
            type: "Observation",
          },
          {
            display: "0.3 mg/dL",
            reference: "Observation/cec940c9-2598-40eb-97ec-9704edb8f127",
            type: "Observation",
          },
          {
            display: "18 mg/dL",
            reference: "Observation/2be3b713-c8c3-4e0b-8120-6010831d4838",
            type: "Observation",
          },
          {
            display: "9.7 mg/dL",
            reference: "Observation/fd413419-9f68-450d-843b-c966dcb68625",
            type: "Observation",
          },
          {
            display: "109 mmol/L",
            reference: "Observation/021e0e1c-39b0-48a0-a14f-5943142b23f9",
            type: "Observation",
          },
          {
            display: "25.8 meq/L",
            reference: "Observation/5f0db347-39fd-4e2c-8a10-7d9c9758f192",
            type: "Observation",
          },
          {
            display: "Mucho 60",
            reference: "Observation/6883bea7-421c-453a-931c-21541c23ea98",
            type: "Observation",
          },
          {
            display: "1.03 mg/dL",
            reference: "Observation/de9451bb-8cbe-42ea-863b-9cf6fe83e0ae",
            type: "Observation",
          },
          {
            display: "7.2 mmol/L",
            reference: "Observation/64729087-ece5-469f-8252-12b8007ffd50",
            type: "Observation",
          },
          {
            display: "163 mg/dL",
            reference: "Observation/721582ec-854f-459e-a3d0-ef7685c9427f",
            type: "Observation",
          },
          {
            display: "3.5 mmol/L",
            reference: "Observation/950f9363-cd53-4ed9-823c-9900060a6e90",
            type: "Observation",
          },
          {
            display: "142 mmol/L",
            reference: "Observation/dfc64f19-2d39-46a5-8b9b-c1d0ccbed054",
            type: "Observation",
          },
          {
            display: "7.9 g/dL",
            reference: "Observation/a7756360-6852-4986-af6a-a346053c0eee",
            type: "Observation",
          },
        ],
        performer: [
          {
            display: "Pharma John | Digital Labs",
            type: "Organization",
          },
        ],
      },
    },
    {
      search: {
        mode: "include",
      },
      fullUrl: "",
      resource: {
        resourceType: "Observation",
        id: "3b452acd-600c-49fa-b447-c31177e14e41",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/data-acquisition/extension/id",
              valueString: "ac9883ec-9460-4a3b-b3a1-3faeacad1a3c",
            },
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2023-03-07T14:32:09.402+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2023-03-07T14:32:09.402+00:00",
          source: "#WMTLEBHCOFVAFBCS",
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
            },
            LENS_BUILDER_TAG,
          ],
        },
        extension: [FAKE_UNIVERSAL_ID_EXTENSION],
        identifier: [
          {
            use: "usual",
            system: "urn:oid:2.16.840.1.113883.3.1110.3.1.1310.6.1.13",
            value: "ALB_L17165719_CHEM20_1",
          },
        ],
        status: "final",
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "33037-3",
              display: "ANION GAP",
            },
          ],
          text: "ANION GAP",
        },
        category: [
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "laboratory",
                display: "Laboratory",
              },
            ],
            text: "Laboratory",
          },
        ],
        subject: {
          reference: "Patient/e67862f3-ccbf-4c51-b8ed-ed1d0420ea19",
          type: "Patient",
          display: "Janie Williamson",
        },
        effectiveDateTime: "2023-03-07T14:32:09.402+00:00",
        valueQuantity: {
          value: 1,
          unit: "g/dL",
        },
        interpretation: [
          {
            coding: [
              {
                system: "urn:oid:2.16.840.1.113883.5.83",
                code: "N",
                display: "(High)",
              },
            ],
            text: "(High)",
          },
        ],
        note: [
          {
            text: "Suscipit eligendi voluptates quo eius est beatae. FAKE:FAKE 1 g/dL ((High))Range: 1.0 g/dL - 10.0 g/dL",
          },
        ],
        referenceRange: [
          {
            low: {
              value: 1,
              unit: "g/dL",
            },
            high: {
              value: 10,
              unit: "g/dL",
            },
          },
        ],
      },
    },
    {
      search: {
        mode: "include",
      },
      fullUrl: "",
      resource: {
        resourceType: "Observation",
        id: "2801ae3e-4479-4099-92f9-4b3186fb7680",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/data-acquisition/extension/id",
              valueString: "b500194a-073b-4486-b036-bd88bc78810e",
            },
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2023-03-07T14:32:09.402+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2023-03-07T14:32:09.402+00:00",
          source: "#MHDGDVLLOYIMEPTR",
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
            },
            LENS_BUILDER_TAG,
          ],
        },
        extension: [FAKE_UNIVERSAL_ID_EXTENSION],
        identifier: [
          {
            use: "usual",
            system: "urn:oid:2.16.840.1.113883.3.1110.3.1.1310.6.1.13",
            value: "ALB_L17165719_CHEM20_1",
          },
        ],
        status: "final",
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "1751-7",
              display: "ALBUMIN",
            },
          ],
          text: "ALBUMIN",
        },
        category: [
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "laboratory",
                display: "Laboratory",
              },
            ],
            text: "Laboratory",
          },
        ],
        subject: {
          reference: "Patient/e67862f3-ccbf-4c51-b8ed-ed1d0420ea19",
          type: "Patient",
          display: "Janie Williamson",
        },
        effectiveDateTime: "2023-03-07T14:32:09.402+00:00",
        valueQuantity: {
          value: 3.3,
          unit: "g/dL",
        },
        interpretation: [
          {
            coding: [
              {
                system: "urn:oid:2.16.840.1.113883.5.83",
                code: "N",
                display: "(High)",
              },
            ],
            text: "(High)",
          },
        ],
        note: [
          {
            text: "Delectus eligendi tempore porro inventore quae quibusdam. FAKE:FAKE 3.3 g/dL ((High))Range: 1.0 g/dL - 10.0 g/dL",
          },
        ],
        referenceRange: [
          {
            low: {
              value: 1,
              unit: "g/dL",
            },
            high: {
              value: 10,
              unit: "g/dL",
            },
          },
        ],
      },
    },
    {
      search: {
        mode: "include",
      },
      fullUrl: "",
      resource: {
        resourceType: "Observation",
        id: "c80a28cf-09ee-4827-aec6-682ae559cab2",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/data-acquisition/extension/id",
              valueString: "76de8492-0c2e-4454-bb20-f698da47077a",
            },
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2023-03-07T14:32:09.402+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2023-03-07T14:32:09.402+00:00",
          source: "#FNNHNDHXHNAJKEIR",
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
            },
            LENS_BUILDER_TAG,
          ],
        },
        extension: [FAKE_UNIVERSAL_ID_EXTENSION],
        identifier: [
          {
            use: "usual",
            system: "urn:oid:2.16.840.1.113883.3.1110.3.1.1310.6.1.13",
            value: "ALB_L17165719_CHEM20_1",
          },
        ],
        status: "final",
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "1751-7",
              display: "ALBUMIN",
            },
          ],
          text: "ALBUMIN",
        },
        category: [
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "laboratory",
                display: "Laboratory",
              },
            ],
            text: "Laboratory",
          },
        ],
        subject: {
          reference: "Patient/e67862f3-ccbf-4c51-b8ed-ed1d0420ea19",
          type: "Patient",
          display: "Janie Williamson",
        },
        effectiveDateTime: "2023-03-07T14:32:09.402+00:00",
        valueQuantity: {
          value: 7.8,
          unit: "g/dL",
        },
        interpretation: [
          {
            coding: [
              {
                system: "urn:oid:2.16.840.1.113883.5.83",
                code: "N",
                display: "(High)",
              },
            ],
            text: "(High)",
          },
        ],
        note: [
          {
            text: "Natus explicabo nulla eum dignissimos fuga veritatis. FAKE:FAKE 7.8 g/dL ((High))Range: 1.0 g/dL - 10.0 g/dL",
          },
        ],
        referenceRange: [
          {
            low: {
              value: 1,
              unit: "g/dL",
            },
            high: {
              value: 10,
              unit: "g/dL",
            },
          },
        ],
      },
    },
    {
      search: {
        mode: "include",
      },
      fullUrl: "",
      resource: {
        resourceType: "Observation",
        id: "eb9ac55c-45ec-46ef-8a79-11cf1759f663",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/data-acquisition/extension/id",
              valueString: "4cf5f50f-15aa-43f5-8b50-33ef8c01c1a4",
            },
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2023-03-07T14:32:09.402+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2023-03-07T14:32:09.402+00:00",
          source: "#RSYTWMTYFMDQFQFQ",
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
            },
            LENS_BUILDER_TAG,
          ],
        },
        extension: [FAKE_UNIVERSAL_ID_EXTENSION],
        identifier: [
          {
            use: "usual",
            system: "urn:oid:2.16.840.1.113883.3.1110.3.1.1310.6.1.13",
            value: "ALB_L17165719_CHEM20_1",
          },
        ],
        status: "final",
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "17861-6",
              display: "CALCIUM",
            },
          ],
          text: "CALCIUM",
        },
        category: [
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "laboratory",
                display: "Laboratory",
              },
            ],
            text: "Laboratory",
          },
        ],
        subject: {
          reference: "Patient/e67862f3-ccbf-4c51-b8ed-ed1d0420ea19",
          type: "Patient",
          display: "Janie Williamson",
        },
        effectiveDateTime: "2023-03-07T14:32:09.402+00:00",
        valueQuantity: {
          value: 14.2,
          unit: "g/dL",
        },
        interpretation: [
          {
            coding: [
              {
                system: "urn:oid:2.16.840.1.113883.5.83",
                code: "H",
                display: "(Normal)",
              },
            ],
            text: "(Normal)",
          },
        ],
        note: [
          {
            text: "Excepturi recusandae id praesentium rem dolore ipsa. FAKE:FAKE 14.2 g/dL ((Normal))Range: 1.0 g/dL - 10.0 g/dL",
          },
        ],
        referenceRange: [
          {
            low: {
              value: 1,
              unit: "g/dL",
            },
            high: {
              value: 10,
              unit: "g/dL",
            },
          },
        ],
      },
    },
    {
      search: {
        mode: "include",
      },
      fullUrl: "",
      resource: {
        resourceType: "Observation",
        id: "cec940c9-2598-40eb-97ec-9704edb8f127",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/data-acquisition/extension/id",
              valueString: "6f2b752a-b4c1-498a-8b71-e2a4b015776d",
            },
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2023-03-07T14:32:09.402+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2023-03-07T14:32:09.402+00:00",
          source: "#QMHAJJZYCOFEGBSZ",
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
            },
            LENS_BUILDER_TAG,
          ],
        },
        extension: [FAKE_UNIVERSAL_ID_EXTENSION],
        identifier: [
          {
            use: "usual",
            system: "urn:oid:2.16.840.1.113883.3.1110.3.1.1310.6.1.13",
            value: "ALB_L17165719_CHEM20_1",
          },
        ],
        status: "final",
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "33037-3",
              display: "ANION GAP",
            },
          ],
          text: "ANION GAP",
        },
        category: [
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "laboratory",
                display: "Laboratory",
              },
            ],
            text: "Laboratory",
          },
        ],
        subject: {
          reference: "Patient/e67862f3-ccbf-4c51-b8ed-ed1d0420ea19",
          type: "Patient",
          display: "Janie Williamson",
        },
        effectiveDateTime: "2023-03-07T14:32:09.402+00:00",
        valueQuantity: {
          value: 6.1,
          unit: "g/dL",
        },
        interpretation: [
          {
            coding: [
              {
                system: "urn:oid:2.16.840.1.113883.5.83",
                code: "N",
                display: "(High)",
              },
            ],
            text: "(High)",
          },
        ],
        note: [
          {
            text: "Expedita dicta porro error suscipit numquam fugiat. FAKE:FAKE 6.1 g/dL ((High))Range: 1.0 g/dL - 10.0 g/dL",
          },
        ],
        referenceRange: [
          {
            low: {
              value: 1,
              unit: "g/dL",
            },
            high: {
              value: 10,
              unit: "g/dL",
            },
          },
        ],
      },
    },
    {
      search: {
        mode: "include",
      },
      fullUrl: "",
      resource: {
        resourceType: "Observation",
        id: "2be3b713-c8c3-4e0b-8120-6010831d4838",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/data-acquisition/extension/id",
              valueString: "2bed4a36-3079-4496-9950-8322ab1ceb39",
            },
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2023-03-07T14:32:09.402+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2023-03-07T14:32:09.402+00:00",
          source: "#HQXCWUVTISXJUPRO",
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
            },
            LENS_BUILDER_TAG,
          ],
        },
        extension: [FAKE_UNIVERSAL_ID_EXTENSION],
        identifier: [
          {
            use: "usual",
            system: "urn:oid:2.16.840.1.113883.3.1110.3.1.1310.6.1.13",
            value: "ALB_L17165719_CHEM20_1",
          },
        ],
        status: "final",
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "2028-9",
              display: "CARBON DIOXIDE",
            },
          ],
          text: "CARBON DIOXIDE",
        },
        category: [
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "laboratory",
                display: "Laboratory",
              },
            ],
            text: "Laboratory",
          },
        ],
        subject: {
          reference: "Patient/e67862f3-ccbf-4c51-b8ed-ed1d0420ea19",
          type: "Patient",
          display: "Janie Williamson",
        },
        effectiveDateTime: "2023-03-07T14:32:09.402+00:00",
        valueQuantity: {
          value: 10.5,
          unit: "g/dL",
        },
        interpretation: [
          {
            coding: [
              {
                system: "urn:oid:2.16.840.1.113883.5.83",
                code: "H",
                display: "(Normal)",
              },
            ],
            text: "(Normal)",
          },
        ],
        note: [
          {
            text: "Necessitatibus ipsum porro itaque vel et minima. FAKE:FAKE 10.5 g/dL ((Normal))Range: 1.0 g/dL - 10.0 g/dL",
          },
        ],
        referenceRange: [
          {
            low: {
              value: 1,
              unit: "g/dL",
            },
            high: {
              value: 10,
              unit: "g/dL",
            },
          },
        ],
      },
    },
    {
      search: {
        mode: "include",
      },
      fullUrl: "",
      resource: {
        resourceType: "Observation",
        id: "fd413419-9f68-450d-843b-c966dcb68625",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/data-acquisition/extension/id",
              valueString: "c0c5b56d-0e8f-4055-b1a2-3bd93bba2b19",
            },
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2023-03-07T14:32:09.402+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2023-03-07T14:32:09.402+00:00",
          source: "#SMNTLPUUJTWHZNZE",
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
            },
            LENS_BUILDER_TAG,
          ],
        },
        extension: [FAKE_UNIVERSAL_ID_EXTENSION],
        identifier: [
          {
            use: "usual",
            system: "urn:oid:2.16.840.1.113883.3.1110.3.1.1310.6.1.13",
            value: "ALB_L17165719_CHEM20_1",
          },
        ],
        status: "final",
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "33037-3",
              display: "ANION GAP",
            },
          ],
          text: "ANION GAP",
        },
        category: [
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "laboratory",
                display: "Laboratory",
              },
            ],
            text: "Laboratory",
          },
        ],
        subject: {
          reference: "Patient/e67862f3-ccbf-4c51-b8ed-ed1d0420ea19",
          type: "Patient",
          display: "Janie Williamson",
        },
        effectiveDateTime: "2023-03-07T14:32:09.402+00:00",
        valueQuantity: {
          value: 8.4,
          unit: "g/dL",
        },
        interpretation: [
          {
            coding: [
              {
                system: "urn:oid:2.16.840.1.113883.5.83",
                code: "N",
                display: "(High)",
              },
            ],
            text: "(High)",
          },
        ],
        note: [
          {
            text: "Incidunt quidem commodi voluptatum nam voluptate debitis. FAKE:FAKE 8.4 g/dL ((High))Range: 1.0 g/dL - 10.0 g/dL",
          },
        ],
        referenceRange: [
          {
            low: {
              value: 1,
              unit: "g/dL",
            },
            high: {
              value: 10,
              unit: "g/dL",
            },
          },
        ],
      },
    },
    {
      search: {
        mode: "include",
      },
      fullUrl: "",
      resource: {
        resourceType: "Observation",
        id: "021e0e1c-39b0-48a0-a14f-5943142b23f9",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/data-acquisition/extension/id",
              valueString: "1c8e15d8-682a-49e7-9cfd-bb679cee94b3",
            },
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2023-03-07T14:32:09.402+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2023-03-07T14:32:09.402+00:00",
          source: "#RCIHFHKHDVVISJKO",
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
            },
            LENS_BUILDER_TAG,
          ],
        },
        extension: [FAKE_UNIVERSAL_ID_EXTENSION],
        identifier: [
          {
            use: "usual",
            system: "urn:oid:2.16.840.1.113883.3.1110.3.1.1310.6.1.13",
            value: "ALB_L17165719_CHEM20_1",
          },
        ],
        status: "final",
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "2028-9",
              display: "CARBON DIOXIDE",
            },
          ],
          text: "CARBON DIOXIDE",
        },
        category: [
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "laboratory",
                display: "Laboratory",
              },
            ],
            text: "Laboratory",
          },
        ],
        subject: {
          reference: "Patient/e67862f3-ccbf-4c51-b8ed-ed1d0420ea19",
          type: "Patient",
          display: "Janie Williamson",
        },
        effectiveDateTime: "2023-03-07T14:32:09.402+00:00",
        valueQuantity: {
          value: 9.2,
          unit: "g/dL",
        },
        interpretation: [
          {
            coding: [
              {
                system: "urn:oid:2.16.840.1.113883.5.83",
                code: "N",
                display: "(High)",
              },
            ],
            text: "(High)",
          },
        ],
        note: [
          {
            text: "Dolores veritatis vero cupiditate officia laudantium repellat. FAKE:FAKE 9.2 g/dL ((High))Range: 1.0 g/dL - 10.0 g/dL",
          },
        ],
        referenceRange: [
          {
            low: {
              value: 1,
              unit: "g/dL",
            },
            high: {
              value: 10,
              unit: "g/dL",
            },
          },
        ],
      },
    },
    {
      search: {
        mode: "include",
      },
      fullUrl: "",
      resource: {
        resourceType: "Observation",
        id: "5f0db347-39fd-4e2c-8a10-7d9c9758f192",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/data-acquisition/extension/id",
              valueString: "03713b12-7e87-468f-889d-3d3ce2e201d7",
            },
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2023-03-07T14:32:09.402+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2023-03-07T14:32:09.402+00:00",
          source: "#XHNNRATCRCLTOSOR",
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
            },
            LENS_BUILDER_TAG,
          ],
        },
        extension: [FAKE_UNIVERSAL_ID_EXTENSION],
        identifier: [
          {
            use: "usual",
            system: "urn:oid:2.16.840.1.113883.3.1110.3.1.1310.6.1.13",
            value: "ALB_L17165719_CHEM20_1",
          },
        ],
        status: "final",
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "1751-7",
              display: "ALBUMIN",
            },
          ],
          text: "ALBUMIN",
        },
        category: [
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "laboratory",
                display: "Laboratory",
              },
            ],
            text: "Laboratory",
          },
        ],
        subject: {
          reference: "Patient/e67862f3-ccbf-4c51-b8ed-ed1d0420ea19",
          type: "Patient",
          display: "Janie Williamson",
        },
        effectiveDateTime: "2023-03-07T14:32:09.402+00:00",
        valueQuantity: {
          value: 4.3,
          unit: "g/dL",
        },
        interpretation: [
          {
            coding: [
              {
                system: "urn:oid:2.16.840.1.113883.5.83",
                code: "N",
                display: "(High)",
              },
            ],
            text: "(High)",
          },
        ],
        note: [
          {
            text: "Quibusdam inventore adipisci expedita eligendi accusamus placeat. FAKE:FAKE 4.3 g/dL ((High))Range: 1.0 g/dL - 10.0 g/dL",
          },
        ],
        referenceRange: [
          {
            low: {
              value: 1,
              unit: "g/dL",
            },
            high: {
              value: 10,
              unit: "g/dL",
            },
          },
        ],
      },
    },
    {
      search: {
        mode: "include",
      },
      fullUrl: "",
      resource: {
        resourceType: "Observation",
        id: "6883bea7-421c-453a-931c-21541c23ea98",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/data-acquisition/extension/id",
              valueString: "ac5d7689-dc4c-4cf8-b19d-7ad037c4399b",
            },
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2023-03-07T14:32:09.402+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2023-03-07T14:32:09.402+00:00",
          source: "#PKLIWJOGMIKVBTJS",
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
            },
            LENS_BUILDER_TAG,
          ],
        },
        extension: [FAKE_UNIVERSAL_ID_EXTENSION],
        identifier: [
          {
            use: "usual",
            system: "urn:oid:2.16.840.1.113883.3.1110.3.1.1310.6.1.13",
            value: "ALB_L17165719_CHEM20_1",
          },
        ],
        status: "final",
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "2075-0",
              display: "CHLORIDE",
            },
          ],
          text: "CHLORIDE",
        },
        category: [
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "laboratory",
                display: "Laboratory",
              },
            ],
            text: "Laboratory",
          },
        ],
        subject: {
          reference: "Patient/e67862f3-ccbf-4c51-b8ed-ed1d0420ea19",
          type: "Patient",
          display: "Janie Williamson",
        },
        effectiveDateTime: "2023-03-07T14:32:09.402+00:00",
        valueQuantity: {
          value: 4.6,
          unit: "g/dL",
        },
        interpretation: [
          {
            coding: [
              {
                system: "urn:oid:2.16.840.1.113883.5.83",
                code: "N",
                display: "(High)",
              },
            ],
            text: "(High)",
          },
        ],
        note: [
          {
            text: "Et blanditiis molestias dolore officia cumque cumque. FAKE:FAKE 4.6 g/dL ((High))Range: 1.0 g/dL - 10.0 g/dL",
          },
        ],
        referenceRange: [
          {
            low: {
              value: 1,
              unit: "g/dL",
            },
            high: {
              value: 10,
              unit: "g/dL",
            },
          },
        ],
      },
    },
    {
      search: {
        mode: "include",
      },
      fullUrl: "",
      resource: {
        resourceType: "Observation",
        id: "de9451bb-8cbe-42ea-863b-9cf6fe83e0ae",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/data-acquisition/extension/id",
              valueString: "f28c88b1-7074-43b8-a1f6-c7479a33c12d",
            },
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2023-03-07T14:32:09.402+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2023-03-07T14:32:09.402+00:00",
          source: "#TLWANLBWLDVRETBP",
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
            },
            LENS_BUILDER_TAG,
          ],
        },
        extension: [FAKE_UNIVERSAL_ID_EXTENSION],
        identifier: [
          {
            use: "usual",
            system: "urn:oid:2.16.840.1.113883.3.1110.3.1.1310.6.1.13",
            value: "ALB_L17165719_CHEM20_1",
          },
        ],
        status: "final",
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "33914-3",
              display: "CREATININE ESTIMATED GFR",
            },
          ],
          text: "CREATININE ESTIMATED GFR",
        },
        category: [
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "laboratory",
                display: "Laboratory",
              },
            ],
            text: "Laboratory",
          },
        ],
        subject: {
          reference: "Patient/e67862f3-ccbf-4c51-b8ed-ed1d0420ea19",
          type: "Patient",
          display: "Janie Williamson",
        },
        effectiveDateTime: "2023-03-07T14:32:09.402+00:00",
        valueQuantity: {
          value: 14.8,
          unit: "g/dL",
        },
        interpretation: [
          {
            coding: [
              {
                system: "urn:oid:2.16.840.1.113883.5.83",
                code: "H",
                display: "(Normal)",
              },
            ],
            text: "(Normal)",
          },
        ],
        note: [
          {
            text: "Tempore officiis molestias harum doloremque nam doloribus. FAKE:FAKE 14.8 g/dL ((Normal))Range: 1.0 g/dL - 10.0 g/dL",
          },
        ],
        referenceRange: [
          {
            low: {
              value: 1,
              unit: "g/dL",
            },
            high: {
              value: 10,
              unit: "g/dL",
            },
          },
        ],
      },
    },
    {
      search: {
        mode: "include",
      },
      fullUrl: "",
      resource: {
        resourceType: "Observation",
        id: "64729087-ece5-469f-8252-12b8007ffd50",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/data-acquisition/extension/id",
              valueString: "892cceb0-c523-447c-951e-41edfdc70ab4",
            },
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2023-03-07T14:32:09.402+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2023-03-07T14:32:09.402+00:00",
          source: "#ASEXAHDYROSAJLTE",
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
            },
            LENS_BUILDER_TAG,
          ],
        },
        extension: [FAKE_UNIVERSAL_ID_EXTENSION],
        identifier: [
          {
            use: "usual",
            system: "urn:oid:2.16.840.1.113883.3.1110.3.1.1310.6.1.13",
            value: "ALB_L17165719_CHEM20_1",
          },
        ],
        status: "final",
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "33914-3",
              display: "CREATININE ESTIMATED GFR",
            },
          ],
          text: "CREATININE ESTIMATED GFR",
        },
        category: [
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "laboratory",
                display: "Laboratory",
              },
            ],
            text: "Laboratory",
          },
        ],
        subject: {
          reference: "Patient/e67862f3-ccbf-4c51-b8ed-ed1d0420ea19",
          type: "Patient",
          display: "Janie Williamson",
        },
        effectiveDateTime: "2023-03-07T14:32:09.402+00:00",
        valueQuantity: {
          value: 8.5,
          unit: "g/dL",
        },
        interpretation: [
          {
            coding: [
              {
                system: "urn:oid:2.16.840.1.113883.5.83",
                code: "N",
                display: "(High)",
              },
            ],
            text: "(High)",
          },
        ],
        note: [
          {
            text: "Illum voluptas explicabo commodi veritatis laboriosam ipsam. FAKE:FAKE 8.5 g/dL ((High))Range: 1.0 g/dL - 10.0 g/dL",
          },
        ],
        referenceRange: [
          {
            low: {
              value: 1,
              unit: "g/dL",
            },
            high: {
              value: 10,
              unit: "g/dL",
            },
          },
        ],
      },
    },
    {
      search: {
        mode: "include",
      },
      fullUrl: "",
      resource: {
        resourceType: "Observation",
        id: "721582ec-854f-459e-a3d0-ef7685c9427f",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/data-acquisition/extension/id",
              valueString: "346c75bc-9ed8-4e62-934e-e33b927015ee",
            },
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2023-03-07T14:32:09.402+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2023-03-07T14:32:09.402+00:00",
          source: "#BEROZZSNIZBHPHTQ",
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
            },
            LENS_BUILDER_TAG,
          ],
        },
        extension: [FAKE_UNIVERSAL_ID_EXTENSION],
        identifier: [
          {
            use: "usual",
            system: "urn:oid:2.16.840.1.113883.3.1110.3.1.1310.6.1.13",
            value: "ALB_L17165719_CHEM20_1",
          },
        ],
        status: "final",
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "33037-3",
              display: "ANION GAP",
            },
          ],
          text: "ANION GAP",
        },
        category: [
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "laboratory",
                display: "Laboratory",
              },
            ],
            text: "Laboratory",
          },
        ],
        subject: {
          reference: "Patient/e67862f3-ccbf-4c51-b8ed-ed1d0420ea19",
          type: "Patient",
          display: "Janie Williamson",
        },
        effectiveDateTime: "2023-03-07T14:32:09.402+00:00",
        valueQuantity: {
          value: 14.8,
          unit: "g/dL",
        },
        interpretation: [
          {
            coding: [
              {
                system: "urn:oid:2.16.840.1.113883.5.83",
                code: "H",
                display: "(Normal)",
              },
            ],
            text: "(Normal)",
          },
        ],
        note: [
          {
            text: "Corporis quis mollitia enim excepturi laudantium accusantium. FAKE:FAKE 14.8 g/dL ((Normal))Range: 1.0 g/dL - 10.0 g/dL",
          },
        ],
        referenceRange: [
          {
            low: {
              value: 1,
              unit: "g/dL",
            },
            high: {
              value: 10,
              unit: "g/dL",
            },
          },
        ],
      },
    },
    {
      search: {
        mode: "include",
      },
      fullUrl: "",
      resource: {
        resourceType: "Observation",
        id: "950f9363-cd53-4ed9-823c-9900060a6e90",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/data-acquisition/extension/id",
              valueString: "a696edb7-b7ba-4938-8aa5-89b991d0e418",
            },
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2023-03-07T14:32:09.402+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2023-03-07T14:32:09.402+00:00",
          source: "#GKBAFLSNCPEPUSLU",
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
            },
            LENS_BUILDER_TAG,
          ],
        },
        extension: [FAKE_UNIVERSAL_ID_EXTENSION],
        identifier: [
          {
            use: "usual",
            system: "urn:oid:2.16.840.1.113883.3.1110.3.1.1310.6.1.13",
            value: "ALB_L17165719_CHEM20_1",
          },
        ],
        status: "final",
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "17861-6",
              display: "CALCIUM",
            },
          ],
          text: "CALCIUM",
        },
        category: [
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "laboratory",
                display: "Laboratory",
              },
            ],
            text: "Laboratory",
          },
        ],
        subject: {
          reference: "Patient/e67862f3-ccbf-4c51-b8ed-ed1d0420ea19",
          type: "Patient",
          display: "Janie Williamson",
        },
        effectiveDateTime: "2023-03-07T14:32:09.402+00:00",
        valueQuantity: {
          value: 14.3,
          unit: "g/dL",
        },
        interpretation: [
          {
            coding: [
              {
                system: "urn:oid:2.16.840.1.113883.5.83",
                code: "H",
                display: "(Normal)",
              },
            ],
            text: "(Normal)",
          },
        ],
        note: [
          {
            text: "Labore eius deserunt quod officiis deleniti accusantium. FAKE:FAKE 14.3 g/dL ((Normal))Range: 1.0 g/dL - 10.0 g/dL",
          },
        ],
        referenceRange: [
          {
            low: {
              value: 1,
              unit: "g/dL",
            },
            high: {
              value: 10,
              unit: "g/dL",
            },
          },
        ],
      },
    },
    {
      search: {
        mode: "include",
      },
      fullUrl: "",
      resource: {
        resourceType: "Observation",
        id: "dfc64f19-2d39-46a5-8b9b-c1d0ccbed054",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/data-acquisition/extension/id",
              valueString: "3a3dc30b-41a0-4faf-8e00-0c71cef832c8",
            },
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2023-03-07T14:32:09.402+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2023-03-07T14:32:09.402+00:00",
          source: "#UCWSIADXUYOXKYBR",
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
            },
            LENS_BUILDER_TAG,
          ],
        },
        extension: [FAKE_UNIVERSAL_ID_EXTENSION],
        identifier: [
          {
            use: "usual",
            system: "urn:oid:2.16.840.1.113883.3.1110.3.1.1310.6.1.13",
            value: "ALB_L17165719_CHEM20_1",
          },
        ],
        status: "final",
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "2028-9",
              display: "CARBON DIOXIDE",
            },
          ],
        },
        category: [
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "laboratory",
                display: "Laboratory",
              },
            ],
            text: "Laboratory",
          },
        ],
        subject: {
          reference: "Patient/e67862f3-ccbf-4c51-b8ed-ed1d0420ea19",
          type: "Patient",
          display: "Janie Williamson",
        },
        effectiveDateTime: "2023-03-07T14:32:09.402+00:00",
        valueQuantity: {
          value: 12.9,
          unit: "g/dL",
        },
        interpretation: [
          {
            coding: [
              {
                system: "urn:oid:2.16.840.1.113883.5.83",
                code: "H",
                display: "(Normal)",
              },
            ],
            text: "(Normal)",
          },
        ],
        note: [
          {
            text: "Consequatur voluptates enim adipisci tempora commodi molestiae. FAKE:FAKE 12.9 g/dL ((Normal))Range: 1.0 g/dL - 10.0 g/dL",
          },
        ],
        referenceRange: [
          {
            low: {
              value: 1,
              unit: "g/dL",
            },
            high: {
              value: 10,
              unit: "g/dL",
            },
          },
        ],
      },
    },
    {
      search: {
        mode: "include",
      },
      fullUrl: "",
      resource: {
        resourceType: "Observation",
        id: "a7756360-6852-4986-af6a-a346053c0eee",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/data-acquisition/extension/id",
              valueString: "06041d44-ce4d-4ea0-bc22-9c537131e369",
            },
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2023-03-07T14:32:09.402+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2023-03-07T14:32:09.402+00:00",
          source: "#MMSMDPNWVXRNIRSX",
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
            },
            LENS_BUILDER_TAG,
          ],
        },
        extension: [FAKE_UNIVERSAL_ID_EXTENSION],
        identifier: [
          {
            use: "usual",
            system: "urn:oid:2.16.840.1.113883.3.1110.3.1.1310.6.1.13",
            value: "ALB_L17165719_CHEM20_1",
          },
        ],
        status: "final",
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "17861-6",
              display: "CALCIUM",
            },
          ],
          text: "CALCIUM",
        },
        category: [
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "laboratory",
                display: "Laboratory",
              },
            ],
            text: "Laboratory",
          },
        ],
        subject: {
          reference: "Patient/e67862f3-ccbf-4c51-b8ed-ed1d0420ea19",
          type: "Patient",
          display: "Janie Williamson",
        },
        effectiveDateTime: "2023-03-07T14:32:09.402+00:00",
        valueQuantity: {
          value: 7.4,
          unit: "g/dL",
        },
        interpretation: [
          {
            coding: [
              {
                system: "urn:oid:2.16.840.1.113883.5.83",
                code: "N",
                display: "(High)",
              },
            ],
            text: "(High)",
          },
        ],
        note: [
          {
            text: "Earum officiis debitis quo soluta eveniet modi. FAKE:FAKE 7.4 g/dL ((High))Range: 1.0 g/dL - 10.0 g/dL",
          },
        ],
        referenceRange: [
          {
            low: {
              value: 1,
              unit: "g/dL",
            },
            high: {
              value: 10,
              unit: "g/dL",
            },
          },
        ],
      },
    },
  ],
};
