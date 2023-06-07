export const immunizationsFQS = {
  ImmunizationConnection: {
    pageInfo: {
      hasNextPage: false,
    },
    edges: [
      {
        node: {
          id: "436385e3-16b8-4f43-bc65-d8834f379ca2",
          resourceType: "Immunization",
          meta: {
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
          status: "completed",
          statusReason: null,
          vaccineCode: {
            text: "Zoster vaccine, inactivated",
            coding: [
              {
                code: "187",
                display: null,
                system: "http://hl7.org/fhir/sid/cvx",
                extension: null,
              },
            ],
          },
          patient: {
            reference: "Patient/e9995fa8-ff18-473c-9dcb-dac64d2a950c",
            resource: {
              id: "e9995fa8-ff18-473c-9dcb-dac64d2a950c",
              resourceType: "Patient",
              active: null,
              identifier: [
                {
                  use: null,
                  system: "https://zusapi.com/fhir/identifier/universal-id",
                  value: "38eee348-4597-4b56-92c5-add40e8a521e",
                },
              ],
              contact: null,
              birthDate: "1977-05-11",
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
                  value: "555-191-8301",
                  system: "phone",
                },
                {
                  use: "mobile",
                  value: "555-014-6871",
                  system: "phone",
                },
                {
                  use: "work",
                  value: "555-193-6507",
                  system: "phone",
                },
              ],
              address: [
                {
                  city: "LAS VEGAS",
                  country: null,
                  district: null,
                  line: ["625 SHADOW LN"],
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
          occurrenceDateTime: "2023-01-12",
          occurrenceString: null,
          recorded: null,
          lotNumber: "8JX52",
          expirationDate: null,
        },
      },
      {
        node: {
          id: "0372912e-245d-4c8f-80c7-0f7985d86362",
          resourceType: "Immunization",
          meta: {
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
          status: "completed",
          statusReason: null,
          vaccineCode: {
            text: "Tetanus/Diphth/Pertuss (Tdap) adult/adol",
            coding: [
              {
                code: "9",
                display: null,
                system: "http://hl7.org/fhir/sid/cvx",
                extension: null,
              },
            ],
          },
          patient: {
            reference: "Patient/e9995fa8-ff18-473c-9dcb-dac64d2a950c",
            resource: {
              id: "e9995fa8-ff18-473c-9dcb-dac64d2a950c",
              resourceType: "Patient",
              active: null,
              identifier: [
                {
                  use: null,
                  system: "https://zusapi.com/fhir/identifier/universal-id",
                  value: "38eee348-4597-4b56-92c5-add40e8a521e",
                },
              ],
              contact: null,
              birthDate: "1977-05-11",
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
                  value: "555-191-8301",
                  system: "phone",
                },
                {
                  use: "mobile",
                  value: "555-014-6871",
                  system: "phone",
                },
                {
                  use: "work",
                  value: "555-193-6507",
                  system: "phone",
                },
              ],
              address: [
                {
                  city: "LAS VEGAS",
                  country: null,
                  district: null,
                  line: ["625 SHADOW LN"],
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
          occurrenceDateTime: "2022-06-08",
          occurrenceString: null,
          recorded: null,
          lotNumber: "J7779AD",
          expirationDate: null,
        },
      },
      {
        node: {
          id: "688c280d-6470-46c4-a4c4-a45aad22a42f",
          resourceType: "Immunization",
          meta: {
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
          status: "completed",
          statusReason: null,
          vaccineCode: {
            text: "Influenza, injectable, quadrivalent, preservative",
            coding: [
              {
                code: "150",
                display: null,
                system: "http://hl7.org/fhir/sid/cvx",
                extension: null,
              },
            ],
          },
          patient: {
            reference: "Patient/e9995fa8-ff18-473c-9dcb-dac64d2a950c",
            resource: {
              id: "e9995fa8-ff18-473c-9dcb-dac64d2a950c",
              resourceType: "Patient",
              active: null,
              identifier: [
                {
                  use: null,
                  system: "https://zusapi.com/fhir/identifier/universal-id",
                  value: "38eee348-4597-4b56-92c5-add40e8a521e",
                },
              ],
              contact: null,
              birthDate: "1977-05-11",
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
                  value: "555-191-8301",
                  system: "phone",
                },
                {
                  use: "mobile",
                  value: "555-014-6871",
                  system: "phone",
                },
                {
                  use: "work",
                  value: "555-193-6507",
                  system: "phone",
                },
              ],
              address: [
                {
                  city: "LAS VEGAS",
                  country: null,
                  district: null,
                  line: ["625 SHADOW LN"],
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
          occurrenceDateTime: "2023-01-12",
          occurrenceString: null,
          recorded: null,
          lotNumber: "7BN33",
          expirationDate: null,
        },
      },
      {
        node: {
          id: "e5fab448-97b9-4a9d-9213-8d9fa826ab2f",
          resourceType: "Immunization",
          meta: {
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
          status: "completed",
          statusReason: null,
          vaccineCode: {
            text: "COVID-19, mRNA, LNP-S, bivalent booster, PF, 30 mcg/0.3 mL dose",
            coding: [
              {
                code: "300",
                display: null,
                system: "http://hl7.org/fhir/sid/cvx",
                extension: null,
              },
            ],
          },
          patient: {
            reference: "Patient/e9995fa8-ff18-473c-9dcb-dac64d2a950c",
            resource: {
              id: "e9995fa8-ff18-473c-9dcb-dac64d2a950c",
              resourceType: "Patient",
              active: null,
              identifier: [
                {
                  use: null,
                  system: "https://zusapi.com/fhir/identifier/universal-id",
                  value: "38eee348-4597-4b56-92c5-add40e8a521e",
                },
              ],
              contact: null,
              birthDate: "1977-05-11",
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
                  value: "555-191-8301",
                  system: "phone",
                },
                {
                  use: "mobile",
                  value: "555-014-6871",
                  system: "phone",
                },
                {
                  use: "work",
                  value: "555-193-6507",
                  system: "phone",
                },
              ],
              address: [
                {
                  city: "LAS VEGAS",
                  country: null,
                  district: null,
                  line: ["625 SHADOW LN"],
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
          occurrenceDateTime: "2023-02-05",
          occurrenceString: null,
          recorded: null,
          lotNumber: "GH5378",
          expirationDate: null,
        },
      },
      {
        node: {
          id: "53382340-5a06-4669-b4be-cec5fc78da67",
          resourceType: "Immunization",
          meta: {
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
          status: "completed",
          statusReason: null,
          vaccineCode: {
            text: "Johnson \u0026 Johnson COVID-19",
            coding: [
              {
                code: "212",
                display: null,
                system: "http://hl7.org/fhir/sid/cvx",
                extension: null,
              },
            ],
          },
          patient: {
            reference: "Patient/e9995fa8-ff18-473c-9dcb-dac64d2a950c",
            resource: {
              id: "e9995fa8-ff18-473c-9dcb-dac64d2a950c",
              resourceType: "Patient",
              active: null,
              identifier: [
                {
                  use: null,
                  system: "https://zusapi.com/fhir/identifier/universal-id",
                  value: "38eee348-4597-4b56-92c5-add40e8a521e",
                },
              ],
              contact: null,
              birthDate: "1977-05-11",
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
                  value: "555-191-8301",
                  system: "phone",
                },
                {
                  use: "mobile",
                  value: "555-014-6871",
                  system: "phone",
                },
                {
                  use: "work",
                  value: "555-193-6507",
                  system: "phone",
                },
              ],
              address: [
                {
                  city: "LAS VEGAS",
                  country: null,
                  district: null,
                  line: ["625 SHADOW LN"],
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
          occurrenceDateTime: "2022-06-29",
          occurrenceString: null,
          recorded: null,
          lotNumber: "7NGSF2",
          expirationDate: null,
        },
      },
      {
        node: {
          id: "454ad5fa-5541-486e-b6e7-21a85fbbc815",
          resourceType: "Immunization",
          meta: {
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
          status: "completed",
          statusReason: null,
          vaccineCode: {
            text: "Moderna SARS-COV-2 vaccine",
            coding: [
              {
                code: "207",
                display: null,
                system: "http://hl7.org/fhir/sid/cvx",
                extension: null,
              },
            ],
          },
          patient: {
            reference: "Patient/e9995fa8-ff18-473c-9dcb-dac64d2a950c",
            resource: {
              id: "e9995fa8-ff18-473c-9dcb-dac64d2a950c",
              resourceType: "Patient",
              active: null,
              identifier: [
                {
                  use: null,
                  system: "https://zusapi.com/fhir/identifier/universal-id",
                  value: "38eee348-4597-4b56-92c5-add40e8a521e",
                },
              ],
              contact: null,
              birthDate: "1977-05-11",
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
                  value: "555-191-8301",
                  system: "phone",
                },
                {
                  use: "mobile",
                  value: "555-014-6871",
                  system: "phone",
                },
                {
                  use: "work",
                  value: "555-193-6507",
                  system: "phone",
                },
              ],
              address: [
                {
                  city: "LAS VEGAS",
                  country: null,
                  district: null,
                  line: ["625 SHADOW LN"],
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
          occurrenceDateTime: "2021-04-07",
          occurrenceString: null,
          recorded: null,
          lotNumber: "034L70A",
          expirationDate: null,
        },
      },
    ],
  },
};
