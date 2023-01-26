export const patient = {
  resourceType: "Bundle",
  id: "0cd95281",
  meta: {
    lastUpdated: "2023-01-26T15:52:40.206+00:00"
  },
  type: "searchset",
  link: [ {
    relation: "self",
    url: "https://api.sandbox.zusapi.com/fhir/Patient?_count=1&_include=Patient%3Aorganization&_tag=https%3A%2F%2Fzusapi.com%2Faccesscontrol%2Fowner%7C&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Fthirdparty%2Fsource%7Csurescripts&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Fthirdparty%2Fsource%7Ccommonwell&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Fthirdparty%2Fsource%7Celation&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Fthirdparty%2Fsource%7Ccollective-medical&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Fthirdparty%2Fsource%7Cquest&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Flens%7CActiveMedications&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Flens%7CChronicConditions&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Fsummary%7CCommon&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Ffhir%2Ftag%2Fupi-record-type%7Cuniversal&identifier=https%3A%2F%2Fzusapi.com%2Ffhir%2Fidentifier%2Funiversal-id%7Cb640bda1-aec7-4be6-a890-e3685a55bce3"
  }, {
    relation: "next",
    url: "https://api.sandbox.zusapi.com/fhir/Patient?_count=1&_include=Patient%3Aorganization&_offset=1&_tag=https%3A%2F%2Fzusapi.com%2Faccesscontrol%2Fowner%7C&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Fthirdparty%2Fsource%7Csurescripts&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Fthirdparty%2Fsource%7Ccommonwell&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Fthirdparty%2Fsource%7Celation&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Fthirdparty%2Fsource%7Ccollective-medical&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Fthirdparty%2Fsource%7Cquest&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Flens%7CActiveMedications&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Flens%7CChronicConditions&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Fsummary%7CCommon&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Ffhir%2Ftag%2Fupi-record-type%7Cuniversal&identifier=https%3A%2F%2Fzusapi.com%2Ffhir%2Fidentifier%2Funiversal-id%7Cb640bda1-aec7-4be6-a890-e3685a55bce3"
  } ],
  entry: [ {
    fullUrl: "https://api.sandbox.zusapi.com/fhir/Patient/76b42bff-b0cf-4056-bc28-45717a2826b9",
    resource: {
      resourceType: "Patient",
      id: "76b42bff",
      meta: {
        extension: [ {
          url: "https://zusapi.com/created-at",
          valueInstant: "2023-01-26T15:49:33.410+00:00"
        } ],
        versionId: "2",
        lastUpdated: "2023-01-26T15:49:34.787+00:00",
        source: "#fb414c905229fd74",
        security: [ {
          system: "http://terminology.hl7.org/CodeSystem/v3-ActReason",
          code: "HTEST"
        } ],
        tag: [ {
          system: "https://zusapi.com/accesscontrol/owner",
          code: "builder/f09f6b6f",
          display: "HLTH 2022 - Gunther"
        } ]
      },
      identifier: [ {
        system: "https://zusapi.com/fhir/identifier/universal-id",
        value: "b640bda1"
      } ],
      active: true,
      name: [ {
        family: "Zhang",
        given: [ "Bruno" ]
      } ],
      telecom: [ {
        system: "email",
        value: "brunozhang@example.com"
      }, {
        system: "phone",
        value: "555-569-2000",
        use: "home"
      }, {
        system: "phone",
        value: "555-536-3933",
        use: "mobile"
      }, {
        system: "phone",
        value: "555-843-3265",
        use: "work"
      } ],
      gender: "male",
      birthDate: "1970-05-09",
      address: [ {
        line: [ "357 SHADOW LN" ],
        city: "LAS VEGAS",
        state: "NV",
        postalCode: "89106-4119"
      } ],
      maritalStatus: {
        coding: [ {
          system: "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
          code: "D",
          display: "Divorced"
        } ],
        text: "Divorced"
      },
      contact: [ {
        relationship: [ {
          coding: [ {
            system: "http://terminology.hl7.org/CodeSystem/v2-0131",
            code: "C",
            display: "Emergency contact"
          } ],
          text: "Emergency contact"
        } ],
        name: {
          family: "Liu",
          given: [ "Wendy" ]
        },
        telecom: [ {
          system: "phone",
          value: "555-993-5207",
          use: "home"
        }, {
          system: "email",
          value: "wendy.liu@example.com"
        } ]
      } ],
      managingOrganization: {
        reference: "Organization/56bb2e9c"
      }
    },
    search: {
      mode: "match"
    }
  }, {
    fullUrl: "https://api.sandbox.zusapi.com/fhir/Organization/56bb2e9c",
    resource: {
      resourceType: "Organization",
      id: "56bb2e9c",
      meta: {
        extension: [ {
          url: "https://zusapi.com/created-at",
          valueInstant: "2023-01-26T15:49:29.814+00:00"
        } ],
        versionId: "1",
        lastUpdated: "2023-01-26T15:49:29.815+00:00",
        source: "#8XARW8z21o5TqSvA",
        tag: [ {
          system: "https://zusapi.com/accesscontrol/owner",
          code: "builder/f09f6b6f",
          display: "HLTH 2022 - Gunther"
        } ]
      },
      name: "Demo Health"
    },
    search: {
      mode: "include"
    }
  } ]
}