export const immunizations: fhir4.Bundle = {
  resourceType: "Bundle",
  id: "f2b911f3-b5cc-42c0-899c-f4f3ed92cfd1",
  meta: {
    lastUpdated: "2023-01-26T16:02:38.923+00:00",
  },
  type: "searchset",
  total: 2,
  link: [
    {
      relation: "self",
      url: "https://api.sandbox.zusapi.com/fhir/Immunization?_count=10&_offset=0&_sort=-_lastUpdated&_total=accurate",
    },
  ],
  entry: [
    {
      fullUrl:
        "https://api.sandbox.zusapi.com/fhir/Immunization/efc72c61-a46c-412f-9c24-adca7a99a498",
      resource: {
        resourceType: "Immunization",
        id: "efc72c61-a46c-412f-9c24-adca7a99a498",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2023-01-26T15:49:39.352+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2023-01-26T15:49:39.354+00:00",
          source: "#nzL1s2NVRsaV2H7S",
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
            },
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/f09f6b6f-ae4b-45f4-a653-5677b1582115",
              display: "HLTH 2022 - Gunther",
            },
          ],
        },
        extension: [
          {
            url: "https://zusapi.com/fhir/identifier/universal-id",
            valueString: "b640bda1-aec7-4be6-a890-e3685a55bce3",
          },
        ],
        status: "completed",
        vaccineCode: {
          coding: [
            {
              system: "http://hl7.org/fhir/sid/cvx",
              code: "205",
            },
          ],
          text: "Influenza vaccine, quadrivalent, adjuvanted\t",
        },
        patient: {
          reference: "Patient/07d6b737-8cf4-42e8-8eda-66777985aa15",
          type: "Patient",
        },
        occurrenceDateTime: "2022-07-10",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.sandbox.zusapi.com/fhir/Immunization/7c2c8f76-d8ca-4ea7-9977-4bfd8b2f5085",
      resource: {
        resourceType: "Immunization",
        id: "7c2c8f76-d8ca-4ea7-9977-4bfd8b2f5085",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2023-01-26T15:49:39.087+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2023-01-26T15:49:39.102+00:00",
          source: "#C2QEi5NSLV0uyr1o",
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
            },
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/f09f6b6f-ae4b-45f4-a653-5677b1582115",
              display: "HLTH 2022 - Gunther",
            },
          ],
        },
        extension: [
          {
            url: "https://zusapi.com/fhir/identifier/universal-id",
            valueString: "b640bda1-aec7-4be6-a890-e3685a55bce3",
          },
        ],
        status: "completed",
        vaccineCode: {
          coding: [
            {
              system: "http://hl7.org/fhir/sid/cvx",
              code: "211",
            },
          ],
          text: "COVID-19, subunit, rS-nanoparticle+Matrix-M1 Adjuvant, PF, 0.5 mL",
        },
        patient: {
          reference: "Patient/07d6b737-8cf4-42e8-8eda-66777985aa15",
          type: "Patient",
        },
        occurrenceDateTime: "2022-04-01",
      },
      search: {
        mode: "match",
      },
    },
  ],
};
