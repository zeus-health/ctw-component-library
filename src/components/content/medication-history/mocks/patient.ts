export const patient = {
  resourceType: "Bundle",
  id: "c1db2d18-e0f2-420e-88d8-c0e32676e894",
  meta: {
    lastUpdated: "2022-11-14T18:57:45.140+00:00",
  },
  type: "searchset",
  entry: [
    {
      resource: {
        resourceType: "Patient",
        id: "1234-007",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-08T15:02:14.762+00:00",
            },
          ],
          versionId: "2",
          lastUpdated: "2022-11-08T15:02:15.233+00:00",
          source: "#829e9998c8d6fa1a",
          security: [
            {
              system: "http://terminology.hl7.org/CodeSystem/v3-ActReason",
              code: "HTEST",
            },
          ],
          tag: [
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/12345",
              display: "Storybook Medical - Test Customer",
            },
          ],
        },
        identifier: [
          {
            system: "https://Storybookmedical.com/patient-id",
            value: "12345",
          },
          {
            system: "https://zusapi.com/fhir/identifier/universal-id",
            value: "007",
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
        maritalStatus: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
              code: "S",
              display: "Single",
            },
          ],
          text: "Single",
        },
        contact: [
          {
            relationship: [
              {
                coding: [
                  {
                    system: "http://terminology.hl7.org/CodeSystem/v2-0131",
                    code: "C",
                    display: "Emergency contact",
                  },
                ],
                text: "Emergency contact",
              },
            ],
            name: {
              family: "Shah",
              given: ["Sonah"],
            },
            telecom: [
              {
                system: "phone",
                value: "555-843-3900",
                use: "home",
              },
              {
                system: "email",
                value: "sonal.shah@example.com",
              },
            ],
          },
        ],
      },
      search: {
        mode: "match",
      },
    },
  ],
};
