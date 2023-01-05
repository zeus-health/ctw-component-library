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
        id: "1",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-10T19:37:12.106+00:00",
            },
          ],
          versionId: "2",
          lastUpdated: "2022-11-10T19:37:12.363+00:00",
          source: "#8409b0f1adee8ee2",
          security: [
            {
              system: "http://terminology.hl7.org/CodeSystem/v3-ActReason",
              code: "HTEST",
            },
          ],
          tag: [
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/123",
              display: "Storybook Medical - Test Customer",
            },
          ],
        },
        identifier: [
          {
            system: "https://example.com/patient-id",
            value: "001",
          },
          {
            system: "https://zusapi.com/fhir/identifier/universal-id",
            value: "u12345",
          },
        ],
        name: [
          {
            family: "Marsden",
            given: ["Penny"],
          },
        ],
        telecom: [
          {
            system: "email",
            value: "penny.marsden@example.com",
          },
          {
            system: "phone",
            value: "555-030-6283",
            use: "home",
          },
          {
            system: "phone",
            value: "555-348-9139",
            use: "mobile",
          },
          {
            system: "phone",
            value: "555-516-4894",
            use: "work",
          },
        ],
        gender: "female",
        birthDate: "1980-09-03",
        address: [
          {
            line: ["469 SHADOW LN"],
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
              family: "Marsden",
              given: ["Jeffrey"],
            },
            telecom: [
              {
                system: "phone",
                value: "555-402-8964",
                use: "home",
              },
              {
                system: "email",
                value: "jeffrey.marsden@example.com",
              },
            ],
          },
        ],
        managingOrganization: {
          reference: "Organization/09ab9086-6dfc-4dc9-b040-1520aa4fea92",
        },
      },
      search: {
        mode: "match",
      },
    },
    {
      resource: {
        resourceType: "Organization",
        id: "09ab9086-6dfc-4dc9-b040-1520aa4fea92",
        meta: {
          extension: [
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2022-11-10T19:37:09.031+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2022-11-10T19:37:09.032+00:00",
          source: "#RdK4JAWrQkSRa9Qw",
          tag: [
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/b123",
              display: "Storybook Medical - Test Customer",
            },
          ],
        },
        name: "Demo Health",
      },
      search: {
        mode: "include",
      },
    },
  ],
};
