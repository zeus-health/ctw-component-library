export const documentFQS = {
  DocumentReferenceConnection: {
    pageInfo: {
      hasNextPage: false,
    },
    edges: [
      {
        node: {
          id: "d30144d1-7f46-4956-b681-c87c578b6eeb",
          resourceType: "DocumentReference",
          meta: {
            extension: [
              {
                url: "https://zusapi.com/created-at",
                valueInstant: "2023-06-06T17:16:34.466+00:00",
              },
            ],
            tag: [
              {
                system: "https://zusapi.com/thirdparty/source",
                code: "commonwell",
              },
              {
                system: "https://zusapi.com/accesscontrol/owner",
                code: "builder/f8233266-4fe2-452f-9006-a4a54246471b",
              },
            ],
            versionId: "1",
          },
          status: "current",
          docStatus: null,
          type: null,
          category: [
            {
              text: "Reason for Visit",
              coding: [
                {
                  code: "29299-5",
                  display: null,
                  system: "urn:oid:2.16.840.1.113883.6.1",
                  extension: null,
                },
              ],
            },
            {
              text: "Encounter Details",
              coding: [
                {
                  code: "46240-8",
                  display: null,
                  system: "urn:oid:2.16.840.1.113883.6.1",
                  extension: null,
                },
              ],
            },
            {
              text: "Social History",
              coding: [
                {
                  code: "29762-2",
                  display: null,
                  system: "urn:oid:2.16.840.1.113883.6.1",
                  extension: null,
                },
              ],
            },
            {
              text: "Last Filed Vital Signs",
              coding: [
                {
                  code: "8716-3",
                  display: null,
                  system: "urn:oid:2.16.840.1.113883.6.1",
                  extension: null,
                },
              ],
            },
            {
              text: "Discharge Summaries",
              coding: [
                {
                  code: "8648-8",
                  display: null,
                  system: "urn:oid:2.16.840.1.113883.6.1",
                  extension: null,
                },
              ],
            },
            {
              text: "Discharge Instructions",
              coding: [
                {
                  code: "8653-8",
                  display: null,
                  system: "urn:oid:2.16.840.1.113883.6.1",
                  extension: null,
                },
              ],
            },
            {
              text: "Medications at Time of Discharge",
              coding: [
                {
                  code: "10183-2",
                  display: null,
                  system: "urn:oid:2.16.840.1.113883.6.1",
                  extension: null,
                },
              ],
            },
            {
              text: "Progress Notes",
              coding: [
                {
                  code: "10164-2",
                  display: null,
                  system: "urn:oid:2.16.840.1.113883.6.1",
                  extension: null,
                },
              ],
            },
            {
              text: "H\u0026P Notes",
              coding: [
                {
                  code: "34117-2",
                  display: null,
                  system: "urn:oid:2.16.840.1.113883.6.1",
                  extension: null,
                },
              ],
            },
            {
              text: "ED Notes",
              coding: [
                {
                  code: "34111-5",
                  display: null,
                  system: "urn:oid:2.16.840.1.113883.6.1",
                  extension: null,
                },
              ],
            },
            {
              text: "Miscellaneous Notes",
              coding: [
                {
                  code: "34109-9",
                  display: null,
                  system: "urn:oid:2.16.840.1.113883.6.1",
                  extension: null,
                },
              ],
            },
            {
              text: "Plan of Treatment",
              coding: [
                {
                  code: "18776-5",
                  display: null,
                  system: "urn:oid:2.16.840.1.113883.6.1",
                  extension: null,
                },
              ],
            },
            {
              text: "Procedures",
              coding: [
                {
                  code: "47519-4",
                  display: null,
                  system: "urn:oid:2.16.840.1.113883.6.1",
                  extension: null,
                },
              ],
            },
            {
              text: "Results",
              coding: [
                {
                  code: "30954-2",
                  display: null,
                  system: "urn:oid:2.16.840.1.113883.6.1",
                  extension: null,
                },
              ],
            },
            {
              text: "Visit Diagnoses",
              coding: [
                {
                  code: "51848-0",
                  display: null,
                  system: "urn:oid:2.16.840.1.113883.6.1",
                  extension: null,
                },
              ],
            },
            {
              text: "Administered Medications",
              coding: [
                {
                  code: "29549-3",
                  display: null,
                  system: "urn:oid:2.16.840.1.113883.6.1",
                  extension: null,
                },
              ],
            },
            {
              text: "Active and Recently Administered Medications",
              coding: [
                {
                  code: "80565-5",
                  display: null,
                  system: "urn:oid:2.16.840.1.113883.6.1",
                  extension: null,
                },
              ],
            },
            {
              text: "Additional Health Concerns",
              coding: [
                {
                  code: "75310-3",
                  display: null,
                  system: "urn:oid:2.16.840.1.113883.6.1",
                  extension: null,
                },
              ],
            },
            {
              text: "Care Teams",
              coding: [
                {
                  code: "85847-2",
                  display: null,
                  system: "urn:oid:2.16.840.1.113883.6.1",
                  extension: null,
                },
              ],
            },
          ],
          date: "2020-09-28T00:00:00Z",
          custodian: {
            reference: "Organization/1440117f-f53a-4ea3-a0a7-d185e9608abf",
            resource: {
              id: "1440117f-f53a-4ea3-a0a7-d185e9608abf",
              resourceType: "Organization",
              name: "Breathe Health",
              telecom: null,
              contact: null,
            },
          },
          description: null,
          content: [
            {
              attachment: {
                contentType: "application/xml",
                language: null,
                data: null,
                url: "Binary/2e546cf5-719e-4b8c-8de9-755a29d3dd6b",
                size: null,
                hash: null,
                title: "Discharge Summary",
                creation: "2020-09-28",
              },
              format: null,
            },
          ],
        },
      },
      {
        node: {
          id: "8e45e406-7d3d-4afc-a800-9bac7cfa18dd",
          resourceType: "DocumentReference",
          meta: {
            extension: [
              {
                url: "https://zusapi.com/created-at",
                valueInstant: "2023-06-06T17:16:33.189+00:00",
              },
            ],
            tag: [
              {
                system: "https://zusapi.com/thirdparty/source",
                code: "commonwell",
              },
              {
                system: "https://zusapi.com/accesscontrol/owner",
                code: "builder/f8233266-4fe2-452f-9006-a4a54246471b",
              },
            ],
            versionId: "1",
          },
          status: "current",
          docStatus: null,
          type: null,
          category: [
            {
              text: "Reason for Visit",
              coding: [
                {
                  code: "29299-5",
                  display: null,
                  system: "urn:oid:2.16.840.1.113883.6.1",
                  extension: null,
                },
              ],
            },
            {
              text: "Encounter Details",
              coding: [
                {
                  code: "46240-8",
                  display: null,
                  system: "urn:oid:2.16.840.1.113883.6.1",
                  extension: null,
                },
              ],
            },
            {
              text: "Social History",
              coding: [
                {
                  code: "29762-2",
                  display: null,
                  system: "urn:oid:2.16.840.1.113883.6.1",
                  extension: null,
                },
              ],
            },
            {
              text: "Progress Notes",
              coding: [
                {
                  code: "10164-2",
                  display: null,
                  system: "urn:oid:2.16.840.1.113883.6.1",
                  extension: null,
                },
              ],
            },
            {
              text: "Plan of Treatment",
              coding: [
                {
                  code: "18776-5",
                  display: null,
                  system: "urn:oid:2.16.840.1.113883.6.1",
                  extension: null,
                },
              ],
            },
            {
              text: "Visit Diagnoses",
              coding: [
                {
                  code: "51848-0",
                  display: null,
                  system: "urn:oid:2.16.840.1.113883.6.1",
                  extension: null,
                },
              ],
            },
            {
              text: "Additional Health Concerns",
              coding: [
                {
                  code: "75310-3",
                  display: null,
                  system: "urn:oid:2.16.840.1.113883.6.1",
                  extension: null,
                },
              ],
            },
            {
              text: "Care Teams",
              coding: [
                {
                  code: "85847-2",
                  display: null,
                  system: "urn:oid:2.16.840.1.113883.6.1",
                  extension: null,
                },
              ],
            },
          ],
          date: "2020-09-28T00:00:00Z",
          custodian: {
            reference: "Organization/41cd728d-fa98-4311-9678-a8889d142df8",
            resource: {
              id: "41cd728d-fa98-4311-9678-a8889d142df8",
              resourceType: "Organization",
              name: "MSMC",
              telecom: null,
              contact: null,
            },
          },
          description: null,
          content: [
            {
              attachment: {
                contentType: "application/xml",
                language: null,
                data: null,
                url: "Binary/740d067d-5f21-466d-b9de-5740a2015214",
                size: null,
                hash: null,
                title: "Encounter Summary",
                creation: "2020-09-28",
              },
              format: null,
            },
          ],
        },
      },
    ],
  },
};
