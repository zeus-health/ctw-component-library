import { FAKE_UNIVERSAL_ID_EXTENSION, LENS_BUILDER_TAG } from "@/components/content/story-helpers/ids";

export const careTeam: fhir4.Bundle = {
  resourceType: "Bundle",
  id: "9f8f9095-cc74-4cd5-ac58-ab233e6c7a92",
  type: "searchset",
  entry: [
    {
      fullUrl: "https://api.sandbox.zusapi.com/fhir/CareTeam/d2b3df4b-f5bb-445c-8612-de4458579449",
      resource: {
        resourceType: "CareTeam",
        id: "d2b3df4b-f5bb-445c-8612-de4458579449",
        meta: {
          versionId: "3",
          lastUpdated: "2022-11-03T18:27:19.991+00:00",
          source: "#N3Id7pd6FENe0Zcr",
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
            },
            LENS_BUILDER_TAG,
          ],
        },
        contained: [
          {
            resourceType: "Practitioner",
            id: "Practitioner28",
            name: [
              {
                family: "Davis",
                given: ["Albert"],
                prefix: ["Dr", "MD"],
              },
            ],
            telecom: [
              {
                system: "phone",
                value: "+1(555)555-1002",
                use: "work",
              },
            ],
            address: [
              {
                line: ["2472 Rocky Place"],
                city: "BEAVERTON",
                state: "OR",
                postalCode: "97006",
              },
            ],
            qualification: [
              {
                code: {
                  coding: [
                    {
                      system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
                      code: "NA",
                      display: "not applicable",
                    },
                  ],
                  text: "not applicable",
                },
              },
            ],
          },
        ],
        extension: [ FAKE_UNIVERSAL_ID_EXTENSION ],
        identifier: [
          {
            use: "usual",
            system: "urn:oid:2.16.840.1.113883.3.432.54321.1.1.100.11",
            value: "331829",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        status: "proposed",
        category: [
          {
            coding: [
              {
                system: "http://loinc.org",
                code: "LA27977-0",
                display: "Episode of care-focused care team",
              },
            ],
            text: "Episode of care-focused care team",
          },
        ],
        subject: {
          reference: "Patient/0743dd70-b89f-468b-9a9d-648f005805db",
          type: "Patient",
        },
        period: {
          start: "2015-06-22",
          end: "2022-06-15",
        },
        participant: [
          {
            role: [
              {
                coding: [
                  {
                    system: "urn:oid:2.16.840.1.113883.5.88",
                    code: "ATTPHYS",
                    display: "Attending Provider",
                  },
                ],
                text: "Attending Provider",
              },
            ],
            member: {
              reference: "#Practitioner28",
              type: "Practitioner",
              display: "Dr MD Albert Davis",
            },
            period: {
              start: "2015-06-22",
            },
          },
        ],
        telecom: [
          {
            system: "phone",
            value: "+1(555)555-1002",
            use: "work",
          },
        ],
      },
      search: {
        mode: "match",
      },
    },
  ],
};
