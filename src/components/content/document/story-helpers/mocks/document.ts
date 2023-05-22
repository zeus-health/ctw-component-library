import { FAKE_UNIVERSAL_ID_EXTENSION, LENS_BUILDER_TAG } from "@/components/content/story-helpers/ids";

export const documents: fhir4.Bundle = {
  resourceType: "Bundle",
  id: "b8627acb-9676-47cd-a5b9-145bb680b8eb",
  meta: {
    lastUpdated: "2023-02-21T16:37:50.194+00:00",
  },
  type: "searchset",
  link: [
    {
      relation: "self",
      url: "https://api.sandbox.zusapi.com/fhir/DocumentReference?_count=250&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Flens%7CActiveMedications&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Flens%7CChronicConditions&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Fsummary%7CCommon&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Ffhir%2Ftag%2Fupi-record-type%7Cuniversal&patient.identifier=https%3A%2F%2Fzusapi.com%2Ffhir%2Fidentifier%2Funiversal-id%7C348a02df-f1a7-4413-93f9-b0802a7a4796",
    },
    {
      relation: "next",
      url: "https://api.sandbox.zusapi.com/fhir/DocumentReference?_count=250&_offset=250&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Flens%7CActiveMedications&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Flens%7CChronicConditions&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Fsummary%7CCommon&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Ffhir%2Ftag%2Fupi-record-type%7Cuniversal&patient.identifier=https%3A%2F%2Fzusapi.com%2Ffhir%2Fidentifier%2Funiversal-id%7C348a02df-f1a7-4413-93f9-b0802a7a4796",
    },
  ],
  entry: [
    {
      fullUrl:
        "https://api.sandbox.zusapi.com/fhir/DocumentReference/7fbc3222-4d45-4cf2-9bab-e56867c3c9a2",
      resource: {
        resourceType: "DocumentReference",
        id: "7fbc3222-4d45-4cf2-9bab-e56867c3c9a2",
        meta: {
          versionId: "9",
          lastUpdated: "2023-02-02T22:17:32.153+00:00",
          source: "#d6fc69a0d3aa79fb",
          tag: [
            LENS_BUILDER_TAG,
          ],
        },
        extension: [
          FAKE_UNIVERSAL_ID_EXTENSION,
        ],
        masterIdentifier: {
          use: "usual",
          system: "urn:oid:2.16.840.1.113883.4.570.10",
          value: "458",
        },
        status: "current",
        docStatus: "final",
        type: {
          coding: [
            {
              system: "http://loinc.org",
              code: "34133-9",
              display: "Summarization of Episode Note",
            },
          ],
          text: "Summarization of Episode Note",
        },
        category: [
          {
            coding: [
              {
                system: "http://loinc.org",
                code: "48765-2",
                display: "Allergies, Adverse Reactions, Alerts",
              },
            ],
            text: "Allergies, Adverse Reactions, Alerts",
          },
          {
            coding: [
              {
                system: "http://loinc.org",
                code: "10160-0",
                display: "History of Medication Use",
              },
            ],
            text: "History of Medication Use",
          },
          {
            coding: [
              {
                system: "http://loinc.org",
                code: "11450-4",
                display: "Problem List",
              },
            ],
            text: "Problem List",
          },
          {
            coding: [
              {
                system: "http://loinc.org",
                code: "47519-4",
                display: "History of Procedures",
              },
            ],
            text: "History of Procedures",
          },
          {
            coding: [
              {
                system: "http://loinc.org",
                code: "30954-2",
                display: "Relevant Diagnostic Tests and/or Laboratory Data",
              },
            ],
            text: "Relevant Diagnostic Tests and/or Laboratory Data",
          },
          {
            coding: [
              {
                system: "http://loinc.org",
                code: "42348-3",
                display: "Advance Directives",
              },
            ],
            text: "Advance Directives",
          },
          {
            coding: [
              {
                system: "http://loinc.org",
                code: "46239-0",
                display: "Chief Complaint and Reason for Visit",
              },
            ],
            text: "Chief Complaint and Reason for Visit",
          },
          {
            coding: [
              {
                system: "http://loinc.org",
                code: "8653-8",
                display: "Hospital Discharge Instructions",
              },
            ],
            text: "Hospital Discharge Instructions",
          },
          {
            coding: [
              {
                system: "http://loinc.org",
                code: "10183-2",
                display: "Hospital Discharge Medications",
              },
            ],
            text: "Hospital Discharge Medications",
          },
          {
            coding: [
              {
                system: "http://loinc.org",
                code: "46240-8",
                display: "Encounters",
              },
            ],
            text: "Encounters",
          },
          {
            coding: [
              {
                system: "http://loinc.org",
                code: "47420-5",
                display: "Functional Status",
              },
            ],
            text: "Functional Status",
          },
          {
            coding: [
              {
                system: "http://loinc.org",
                code: "11369-6",
                display: "Immunizations",
              },
            ],
            text: "Immunizations",
          },
          {
            coding: [
              {
                system: "http://loinc.org",
                code: "18776-5",
                display: "Plan of Care",
              },
            ],
            text: "Plan of Care",
          },
          {
            coding: [
              {
                system: "http://loinc.org",
                code: "29762-2",
                display: "Social History",
              },
            ],
            text: "Social History",
          },
          {
            coding: [
              {
                system: "http://loinc.org",
                code: "8716-3",
                display: "Vital Signs",
              },
            ],
            text: "Vital Signs",
          },
        ],
        subject: {
          reference: "Patient/b1b9380e-390c-42f9-b7bd-edc939edd5f1",
          type: "Patient",
          display: "SOLOMAN BERGAMEL",
        },
        date: "2022-04-13T15:00:54.460Z",
        author: [
          {
            reference: "Organization/a924058c-f6b5-4cef-8fa5-55e20628bbd7",
            type: "Organization",
            display: "Graham Hospital Association",
          },
          {
            reference: "Practitioner/fcd8664e-8840-4756-bd2b-a99db9f89119",
            type: "Practitioner",
          },
        ],
        custodian: {
          reference: "Organization/1325be70-fb8d-4f01-99b9-efca49a09d37",
          type: "Organization",
          display: "Graham Hospital Association",
        },
        description: "Continuity of Care Document (Transition of Care)",
        content: [
          {
            attachment: {
              contentType: "application/xml",
              language: "en-US",
              url: "Binary/fa5b964d-d509-458a-b893-763052df4adf",
              hash: "DOYC3qYo0MgDnxhooYVutWko1/4=",
              title: "Continuity of Care Document (Transition of Care)",
              creation: "2021-09-10T14:38:39-05:00",
            },
          },
        ],
        context: {
          event: [
            {
              coding: [
                {
                  system: "http://loinc.org",
                  code: "34133-9",
                  display: "Summarization of Episode Note",
                },
              ],
              text: "Summarization of Episode Note",
            },
          ],
        },
      },
      search: {
        mode: "match",
      },
    },
  ],
};
