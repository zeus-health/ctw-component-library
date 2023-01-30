export const patient = {
  resourceType: "Bundle",
  id: "f4da1f39-7638-45e4-999b-9ff33d7c5201",
  meta: {
    lastUpdated: "2022-11-15T19:37:55.783+00:00",
  },
  type: "searchset",
  entry: [
    {
      resource: {
        resourceType: "Patient",
        id: "u12345",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2023-01-26T15:49:38.110+00:00",
            },
          ],
          versionId: "2",
          lastUpdated: "2023-01-26T15:49:38.553+00:00",
          source: "#cacbf4a51c11b1b0",
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
              code: "builder/f09f6b6f-ae4b-45f4-a653-5677b1582115",
              display: "HLTH 2022 - Gunther",
            },
          ],
        },
        identifier: [
          {
            system: "https://zusapi.com/fhir/identifier/universal-id",
            value: "b640bda1-aec7-4be6-a890-e3685a55bce3",
          },
        ],
        name: [
          {
            family: "Zhang",
            given: ["Bruno"],
          },
        ],
        telecom: [
          {
            system: "email",
            value: "brunozhang@example.com",
          },
          {
            system: "phone",
            value: "555-569-2000",
            use: "home",
          },
          {
            system: "phone",
            value: "555-536-3933",
            use: "mobile",
          },
          {
            system: "phone",
            value: "555-843-3265",
            use: "work",
          },
        ],
        gender: "male",
        birthDate: "1970-05-09",
        address: [
          {
            line: ["357 SHADOW LN"],
            city: "LAS VEGAS",
            state: "NV",
            postalCode: "89106-4119",
          },
        ],
        managingOrganization: {
          reference: "Organization/79a1c124-a752-4d9a-a44e-2c02499ae402",
        },
      },
      search: {
        mode: "match",
      },
    },
  ],
};
