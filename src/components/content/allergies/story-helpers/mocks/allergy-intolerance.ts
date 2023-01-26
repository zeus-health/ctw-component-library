import type { AllergyIntolerance, Bundle } from "fhir/r4";

export const allergyIntolerance: Bundle<AllergyIntolerance> = {
  resourceType: "Bundle",
  id: "e1e7d919",
  meta: {
    lastUpdated: "2023-01-26T15:54:30.956+00:00",
  },
  type: "searchset",
  total: 3,
  link: [
    {
      relation: "self",
      url: "https://api.sandbox.zusapi.com/fhir/AllergyIntolerance?_count=250&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Flens%7CActiveMedications&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Flens%7CChronicConditions&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Fsummary%7CCommon&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Ffhir%2Ftag%2Fupi-record-type%7Cuniversal&patient.identifier=https%3A%2F%2Fzusapi.com%2Ffhir%2Fidentifier%2Funiversal-id%7Cb640bda1-aec7-4be6-a890-e3685a55bce3",
    },
  ],
  entry: [
    {
      fullUrl:
        "https://api.sandbox.zusapi.com/fhir/AllergyIntolerance/5d185eaa-fa1d-43d3-a0e8-aa9544c7d140",
      resource: {
        resourceType: "AllergyIntolerance",
        id: "5d185eaa",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2023-01-26T15:49:38.359+00:00",
            },
          ],
          versionId: "2",
          lastUpdated: "2023-01-26T15:49:38.634+00:00",
          source: "#502b339023cd70ed",
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
            },
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/f09f6b6f",
              display: "HLTH 2022 - Gunther",
            },
          ],
        },
        extension: [
          {
            url: "https://zusapi.com/fhir/identifier/universal-id",
            valueString: "b640bda1",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
              code: "active",
              display: "Active",
            },
          ],
        },
        type: "intolerance",
        category: ["environment"],
        code: {
          text: "Penicillin",
        },
        patient: {
          reference: "Patient/07d6b737",
          type: "Patient",
        },
        onsetDateTime: "2021-11-02",
        recordedDate: "2021-11-02",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.sandbox.zusapi.com/fhir/AllergyIntolerance/8802e234-0ec6-4af2-9322-b2f402521c60",
      resource: {
        resourceType: "AllergyIntolerance",
        id: "8802e234",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2023-01-26T15:49:38.627+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2023-01-26T15:49:38.658+00:00",
          source: "#HdhMeNQP8LI84LNt",
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
            },
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/f09f6b6f",
              display: "HLTH 2022 - Gunther",
            },
          ],
        },
        extension: [
          {
            url: "https://zusapi.com/fhir/identifier/universal-id",
            valueString: "b640bda1",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
              code: "active",
              display: "Active",
            },
          ],
        },
        type: "allergy",
        category: ["medication"],
        code: {
          text: "Piperacillin / tazobactam",
        },
        patient: {
          reference: "Patient/07d6b737",
          type: "Patient",
        },
        onsetDateTime: "2021-11-02",
        recordedDate: "2021-11-02",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.sandbox.zusapi.com/fhir/AllergyIntolerance/54eaab33-a632-414d-9d92-908065b1db20",
      resource: {
        resourceType: "AllergyIntolerance",
        id: "54eaab33",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2023-01-26T15:49:38.842+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2023-01-26T15:49:38.845+00:00",
          source: "#heae5sSskka8GwOt",
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
            },
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/f09f6b6f",
              display: "HLTH 2022 - Gunther",
            },
          ],
        },
        extension: [
          {
            url: "https://zusapi.com/fhir/identifier/universal-id",
            valueString: "b640bda1",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
              code: "active",
              display: "Active",
            },
          ],
        },
        type: "allergy",
        category: ["medication"],
        code: {
          text: "Sulfa Antibiotics",
        },
        patient: {
          reference: "Patient/07d6b737",
          type: "Patient",
        },
        onsetDateTime: "2021-11-02",
        recordedDate: "2021-11-02",
      },
      search: {
        mode: "match",
      },
    },
  ],
};
